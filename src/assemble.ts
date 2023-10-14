import * as readline from "node:readline/promises";
import * as parser from "./parse";
import * as code from "./code";
import { MachineInstruction } from "./types";
import { intTo15BitBinary } from "./helpers";
import { Readable, Writable } from "stream";

export const assemble = async (
  input: Readable,
  output: Writable,
  symbolTable: Map<string, number>,
): Promise<void> => {
  const rl = readline.createInterface({
    input: input,
    crlfDelay: Infinity,
  });
  const variables = {
    nextFreeAddress: 16,
  };

  return new Promise((resolve, reject) => {
    const writeStream = output;

    rl.on("line", (line) => {
      const assemblyInstruction = parser.clean(line);
      if (assemblyInstruction.length !== 0) {
        const instructionType = parser.instructionType(assemblyInstruction);
        if (instructionType !== parser.INSTRUCTION_TYPE.L_INSTRUCTION) {
          const machineInstruction =
            instructionType === parser.INSTRUCTION_TYPE.C_INSTRUCTION
              ? assembleCInstruction(assemblyInstruction)
              : assembleAInstruction(
                  assemblyInstruction,
                  symbolTable,
                  variables,
                );
          writeStream.write(`${machineInstruction}\n`);
        }
      }
    });

    rl.on("close", () => {
      writeStream.end();
    });

    writeStream.on("finish", () => {
      resolve();
    });

    writeStream.on("error", (error) => {
      reject(error);
    });
  });
};

export const assembleCInstruction = (
  instruction: string,
): MachineInstruction => {
  const compMicroCode = code.codeComp(parser.parseComp(instruction));
  const destMicroCode = code.codeDest(parser.parseDest(instruction));
  const jumpMicroCode = code.codeJump(parser.parseJump(instruction));
  return `111${compMicroCode}${destMicroCode}${jumpMicroCode}`;
};

export const assembleAInstruction = (
  instruction: string,
  symbolTable: Map<string, number>,
  variableStore: {
    nextFreeAddress: number;
  },
): MachineInstruction => {
  const symbol = parser.parseSymbol(instruction);
  if (!isNaN(parseInt(symbol))) {
    return `0${intTo15BitBinary(parseInt(symbol))}`;
  }
  const isNewVariable = !symbolTable.has(symbol);
  if (isNewVariable) {
    symbolTable.set(symbol, variableStore.nextFreeAddress);
    variableStore.nextFreeAddress = variableStore.nextFreeAddress + 1;
  }

  return `0${intTo15BitBinary(symbolTable.get(symbol)!)}`;
};

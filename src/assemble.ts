import * as readline from "node:readline/promises";
import * as parser from "./parse";
import * as code from "./code";
import { MachineInstruction } from "./types";
import { intTo15BitBinary } from "./helpers";
import { Readable, Writable } from "stream";

export const assemble = async (
  input: Readable,
  output: Writable,
): Promise<void> => {
  const rl = readline.createInterface({
    input: input,
    crlfDelay: Infinity,
  });

  return new Promise((resolve, reject) => {
    const writeStream = output;

    rl.on("line", (line) => {
      const assemblyInstruction = parser.clean(line);
      if (assemblyInstruction.length !== 0) {
        const instructionType = parser.instructionType(assemblyInstruction);
        const machineInstruction =
          instructionType === parser.INSTRUCTION_TYPE.C_INSTRUCTION
            ? assembleCInstruction(assemblyInstruction)
            : assembleAInstruction(assemblyInstruction);
        writeStream.write(`${machineInstruction}\n`);
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
): MachineInstruction => {
  const decimalAddress = Number.parseInt(parser.parseSymbol(instruction));
  return `0${intTo15BitBinary(decimalAddress)}`;
};

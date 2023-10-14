import { Readable } from "stream";
import * as readline from "node:readline/promises";
import * as parser from "./parse";

export const createSymbolTable = async (
  input: Readable,
): Promise<Map<string, number>> => {
  const rl = readline.createInterface({
    input: input,
    crlfDelay: Infinity,
  });
  const symbolTable = new Map<string, number>();
  symbolTable.set("SP", 0);
  symbolTable.set("LCL", 1);
  symbolTable.set("ARG", 2);
  symbolTable.set("THIS", 3);
  symbolTable.set("THAT", 4);
  symbolTable.set("SCREEN", 16384);
  symbolTable.set("KBD", 24576);

  // R0-R15 registers
  for (let i = 0; i <= 15; i++) {
    symbolTable.set(`R${i}`, i);
  }
  let nextInstructionAddress = 0;

  return new Promise((resolve, reject) => {
    rl.on("line", (line) => {
      const assemblyInstruction = parser.clean(line);
      if (assemblyInstruction.length !== 0) {
        const instructionType = parser.instructionType(assemblyInstruction);
        if (instructionType === parser.INSTRUCTION_TYPE.L_INSTRUCTION) {
          const label = parser.parseSymbol(assemblyInstruction);
          symbolTable.set(label, nextInstructionAddress);
        } else {
          nextInstructionAddress++;
        }
      }
    });
    rl.on("close", () => {
      return resolve(symbolTable);
    });
  });
};

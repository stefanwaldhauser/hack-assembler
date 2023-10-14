import {
  CompBinaryCode,
  CompMnemonics,
  DestBinaryCode,
  DestMnemonics,
  JumpBinaryCode,
  JumpMnemonics,
} from "./types";
import { toBinary } from "./helpers";

export const dest = (mnemonic: DestMnemonics | null): DestBinaryCode => {
  if (mnemonic === null) {
    return "000";
  }
  const ABit = toBinary(mnemonic.includes("A"));
  const DBit = toBinary(mnemonic.includes("D"));
  const MBit = toBinary(mnemonic.includes("M"));
  return `${ABit}${DBit}${MBit}`;
};

export const jump = (mnemonic: JumpMnemonics | null): JumpBinaryCode => {
  if (mnemonic === null) {
    return "000";
  }
  switch (mnemonic) {
    case "JGT":
      return "001";
    case "JEQ":
      return "010";
    case "JGE":
      return "011";
    case "JLT":
      return "100";
    case "JNE":
      return "101";
    case "JLE":
      return "110";
    case "JMP":
      return "111";
  }
};

export const comp = (mnemonic: CompMnemonics): CompBinaryCode => {
  const mnemonicToBinaryMap: Map<CompMnemonics, CompBinaryCode> = new Map([
    ["0", "0101010"],
    ["1", "0111111"],
    ["-1", "0111010"],
    ["D", "0001100"],
    ["A", "0110000"],
    ["M", "1110000"],
    ["!D", "0001101"],
    ["!A", "0110001"],
    ["!M", "1110001"],
    ["-D", "0001111"],
    ["-A", "0110011"],
    ["-M", "1110011"],
    ["D+1", "0011111"],
    ["A+1", "0110111"],
    ["M+1", "1110111"],
    ["D-1", "0001110"],
    ["A-1", "0110010"],
    ["M-1", "1110010"],
    ["D+A", "0000010"],
    ["D+M", "1000010"],
    ["D-A", "0010011"],
    ["D-M", "1010011"],
    ["A-D", "0000111"],
    ["M-D", "1000111"],
    ["D&A", "0000000"],
    ["D&M", "1000000"],
    ["D|A", "0010101"],
    ["D|M", "1010101"],
  ]);
  return mnemonicToBinaryMap.get(mnemonic) as CompBinaryCode;
};

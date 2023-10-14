import {
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

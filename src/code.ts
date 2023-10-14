import { DestBinaryCode, DestMnemonics } from "./types";
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

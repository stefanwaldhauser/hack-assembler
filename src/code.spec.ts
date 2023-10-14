import { equal } from "assert";
import { DestMnemonics, DestBinaryCode } from "./types";
import { dest } from "./code";

describe("dest", () => {
  type inputOutput = [DestMnemonics | null, DestBinaryCode];
  const tests: inputOutput[] = [
    [null, "000"],
    ["M", "001"],
    ["D", "010"],
    ["DM", "011"],
    ["A", "100"],
    ["AM", "101"],
    ["AD", "110"],
    ["ADM", "111"],
  ];

  tests.forEach(([mnemonic, binaryCode]) => {
    it(`should translate mnemonic ${mnemonic} into binary code ${binaryCode}`, () => {
      equal(dest(mnemonic), binaryCode);
    });
  });
});

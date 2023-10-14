import { equal } from "assert";
import {
  DestMnemonics,
  DestBinaryCode,
  JumpMnemonics,
  JumpBinaryCode,
} from "./types";
import { dest, jump } from "./code";

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

describe("jump", () => {
  type inputOutput = [JumpMnemonics | null, JumpBinaryCode];
  const tests: inputOutput[] = [
    [null, "000"],
    ["JGT", "001"],
    ["JEQ", "010"],
    ["JGE", "011"],
    ["JLT", "100"],
    ["JNE", "101"],
    ["JLE", "110"],
    ["JMP", "111"],
  ];

  tests.forEach(([mnemonic, binaryCode]) => {
    it(`should translate mnemonic ${mnemonic} into binary code ${binaryCode}`, () => {
      equal(jump(mnemonic), binaryCode);
    });
  });
});

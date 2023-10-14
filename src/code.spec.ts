import { equal } from "assert";
import {
  DestMnemonics,
  DestBinaryCode,
  JumpMnemonics,
  JumpBinaryCode,
  CompMnemonics,
  CompBinaryCode,
} from "./types";
import { comp, dest, jump } from "./code";

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

describe("comp", () => {
  type inputOutput = [CompMnemonics, CompBinaryCode];
  const tests: inputOutput[] = [
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
  ];

  tests.forEach(([mnemonic, binaryCode]) => {
    it(`should translate mnemonic ${mnemonic} into binary code ${binaryCode}`, () => {
      equal(comp(mnemonic), binaryCode);
    });
  });
});

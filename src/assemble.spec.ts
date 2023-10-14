import fs from "fs";
import mock from "mock-fs";
import {
  assemble,
  assembleAInstruction,
  assembleCInstruction,
} from "./assemble";
import { equal } from "assert";

describe("assemble function", () => {
  before(() => {
    mock({
      "./input.asm": "D=M\n0;JMP\n",
      "./output.hack": "",
    });
  });

  after(() => {
    mock.restore();
  });

  it("should assemble instruction correctly", async () => {
    const input = fs.createReadStream("./input.asm");
    const output = fs.createWriteStream("./output.hack", { flags: "w" });

    await assemble(input, output, new Map());

    const outputFileContent = fs
      .readFileSync("./output.hack")
      .toString("utf-8");
    const expectedOutput = "1111110000010000\n1110101010000111\n";

    equal(outputFileContent, expectedOutput);
  });
});

describe("assembleCInstruction", () => {
  it("should assemble a C instruction correctly", () => {
    const assemblyInstruction = "0;JMP";
    const machineInstruction = assembleCInstruction(assemblyInstruction);
    const expectedMachineInstruction = "1110101010000111";

    equal(machineInstruction, expectedMachineInstruction);
  });
});

describe("assembleAInstruction", () => {
  it("should assemble an A instruction correctly", () => {
    const assemblyInstruction = "@123";
    const machineInstruction = assembleAInstruction(
      assemblyInstruction,
      new Map(),
      {
        nextFreeAddress: 16,
      },
    );

    const expectedMachineInstruction = "0000000001111011";
    equal(machineInstruction, expectedMachineInstruction);
  });
});

import assert from "assert";
import {
  instructionType,
  INSTRUCTION_TYPE,
  clean,
  parseDest,
  parseComp,
  parseJump,
  parseSymbol,
} from "./parser";

describe("clean", () => {
  it("should remove comments", () => {
    const input = "D=M // Set D register to M";
    const result = clean(input);
    assert.strictEqual(result, "D=M");
  });

  it("should trim leading and trailing whitespace", () => {
    const input = "   A=D   ";
    const result = clean(input);
    assert.strictEqual(result, "A=D");
  });

  it("should throw an error for an empty instruction", () => {
    const input = "";
    assert.throws(() => clean(input), /Empty Instruction/);
  });

  it("should handle instructions without comments or extra whitespace", () => {
    const input = "M=D";
    const result = clean(input);
    assert.strictEqual(result, "M=D");
  });
});

describe("instructionType", () => {
  it("should return A_INSTRUCTION for valid A-instructions", () => {
    const result = instructionType("@R0");
    assert.strictEqual(result, INSTRUCTION_TYPE.A_INSTRUCTION);
  });

  it("should return L_INSTRUCTION for valid L-instructions", () => {
    const result = instructionType("(LOOP)");
    assert.strictEqual(result, INSTRUCTION_TYPE.L_INSTRUCTION);
  });

  it("should return C_INSTRUCTION for valid C-instructions", () => {
    const result = instructionType("D=M");
    assert.strictEqual(result, INSTRUCTION_TYPE.C_INSTRUCTION);
  });
});

describe("parseDest", () => {
  it("should parse the destination mnemonic of a valid C-instruction", () => {
    const input = "D=M+1;JMP";
    const result = parseDest(input);
    assert.strictEqual(result, "D");
  });

  it("should return null if dest is missing from the valid C-instruction", () => {
    const input = "M+1;JMP";
    const result = parseDest(input);
    assert.equal(result, null);
  });
});

describe("parseComp", () => {
  it('should parse the computation mnemonic of a valid C-instruction with both "=" and ";"', () => {
    const input = "D=M+1;JMP";
    const result = parseComp(input);
    assert.strictEqual(result, "M+1");
  });

  it('should parse the computation mnemonic of a valid C-instruction with "=" but no ";" (missing jump part)', () => {
    const input = "D=M+1";
    const result = parseComp(input);
    assert.strictEqual(result, "M+1");
  });

  it('should parse the computation mnemonic of a valid C-instruction with ";" but no "=" (missing dest part)', () => {
    const input = "M+1;JMP";
    const result = parseComp(input);
    assert.strictEqual(result, "M+1");
  });

  it('should return the whole instruction as CompMnemonics when no "=" or ";" is present (missing both dest and jump parts)', () => {
    const input = "M+1";
    const result = parseComp(input);
    assert.strictEqual(result, "M+1");
  });
});

describe("parseJump", () => {
  it('should parse the jump mnemonic of a valid C-instruction with ";"', () => {
    const input = "D=M+1;JMP";
    const result = parseJump(input);
    assert.strictEqual(result, "JMP");
  });

  it('should return null for a valid C-instruction without ";"', () => {
    const input = "D=M+1";
    const result = parseJump(input);
    assert.strictEqual(result, null);
  });
});

describe("parseSymbol", () => {
  it("should parse the symbol of a valid A-instruction", () => {
    const input = "@123";
    const result = parseSymbol(input);
    assert.strictEqual(result, "123");
  });

  it("should parse the symbol of a valid L-instruction", () => {
    const input = "(LOOP)";
    const result = parseSymbol(input);
    assert.strictEqual(result, "LOOP");
  });
});

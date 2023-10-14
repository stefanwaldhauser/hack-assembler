import { CompMnemonics, DestMnemonics } from "./types";

export enum INSTRUCTION_TYPE {
  A_INSTRUCTION, // @xxx
  C_INSTRUCTION, // dest=comp;jump
  L_INSTRUCTION, // (label)
}

export const clean = (instruction: string) =>
  [instruction]
    .map((str) => {
      const commentIndex = str.indexOf("//");
      if (commentIndex !== -1) {
        return str.substring(0, commentIndex);
      } else {
        return str;
      }
    })
    .map((str) => str.trim())
    .map((str) => {
      if (str.length === 0) {
        throw new Error("Empty Instruction");
      }
      return str;
    })[0];

export const instructionType = (instruction: string): INSTRUCTION_TYPE => {
  const cleanedInstruction = clean(instruction);
  if (cleanedInstruction.charAt(0) === "@") {
    return INSTRUCTION_TYPE.A_INSTRUCTION;
  } else if (
    cleanedInstruction.charAt(0) === "(" &&
    cleanedInstruction.charAt(cleanedInstruction.length - 1) === ")"
  ) {
    return INSTRUCTION_TYPE.L_INSTRUCTION;
  } else {
    return INSTRUCTION_TYPE.C_INSTRUCTION;
  }
};

export const parseSymbol = (aOrLInstruction: string): string => {
  const cleanedInstruction = clean(aOrLInstruction);
  const type = instructionType(cleanedInstruction);
  if (type === INSTRUCTION_TYPE.A_INSTRUCTION) {
    const atIndex = cleanedInstruction.indexOf("@");
    return cleanedInstruction.substring(atIndex + 1);
  } else {
    const openBracketIndex = cleanedInstruction.indexOf("(");
    const closedBracketIndex = cleanedInstruction.indexOf(")");
    return cleanedInstruction.substring(
      openBracketIndex + 1,
      closedBracketIndex,
    );
  }
};

export const parseDest = (cInstruction: string): DestMnemonics | null => {
  const cleanedInstruction = clean(cInstruction);
  const equalsIndex = cleanedInstruction.indexOf("=");
  const hasDestPart = equalsIndex !== -1;
  if (!hasDestPart) {
    return null;
  }
  return cleanedInstruction.substring(0, equalsIndex) as DestMnemonics;
};

export const parseJump = (cInstruction: string): DestMnemonics | null => {
  const cleanedInstruction = clean(cInstruction);
  const semiColonIndex = cleanedInstruction.indexOf(";");
  const hasJumpPart = semiColonIndex !== -1;
  if (!hasJumpPart) {
    return null;
  }
  return cleanedInstruction.substring(
    semiColonIndex + 1,
    cleanedInstruction.length,
  ) as DestMnemonics;
};

export const parseComp = (cInstruction: string): CompMnemonics => {
  const cleanedInstruction = clean(cInstruction);
  const equalsIndex = cleanedInstruction.indexOf("=");
  const semiColonIndex = cleanedInstruction.indexOf(";");
  const hasDestPart = equalsIndex !== -1;
  const hasJumpPart = semiColonIndex !== -1;

  if (!hasDestPart && !hasJumpPart) {
    return cleanedInstruction as CompMnemonics;
  } else if (!hasDestPart && hasJumpPart) {
    return cleanedInstruction.substring(0, semiColonIndex) as CompMnemonics;
  } else if (hasDestPart && !hasJumpPart) {
    return cleanedInstruction.substring(equalsIndex + 1) as CompMnemonics;
  } else {
    return cleanedInstruction.substring(
      equalsIndex + 1,
      semiColonIndex,
    ) as CompMnemonics;
  }
};

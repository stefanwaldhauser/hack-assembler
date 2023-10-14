import { CompMnemonics, DestMnemonics, JumpMnemonics } from "./types";

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
      return str;
    })[0];

export const instructionType = (instruction: string): INSTRUCTION_TYPE => {
  if (instruction.charAt(0) === "@") {
    return INSTRUCTION_TYPE.A_INSTRUCTION;
  } else if (
    instruction.charAt(0) === "(" &&
    instruction.charAt(instruction.length - 1) === ")"
  ) {
    return INSTRUCTION_TYPE.L_INSTRUCTION;
  } else {
    return INSTRUCTION_TYPE.C_INSTRUCTION;
  }
};

export const parseSymbol = (instruction: string): string => {
  const type = instructionType(instruction);
  if (type === INSTRUCTION_TYPE.A_INSTRUCTION) {
    const atIndex = instruction.indexOf("@");
    return instruction.substring(atIndex + 1);
  } else {
    const openBracketIndex = instruction.indexOf("(");
    const closedBracketIndex = instruction.indexOf(")");
    return instruction.substring(openBracketIndex + 1, closedBracketIndex);
  }
};

export const parseDest = (instruction: string): DestMnemonics | null => {
  const equalsIndex = instruction.indexOf("=");
  const hasDestPart = equalsIndex !== -1;
  if (!hasDestPart) {
    return null;
  }
  return instruction.substring(0, equalsIndex) as DestMnemonics;
};

export const parseJump = (instruction: string): JumpMnemonics | null => {
  const semiColonIndex = instruction.indexOf(";");
  const hasJumpPart = semiColonIndex !== -1;
  if (!hasJumpPart) {
    return null;
  }
  return instruction.substring(
    semiColonIndex + 1,
    instruction.length,
  ) as JumpMnemonics;
};

export const parseComp = (instruction: string): CompMnemonics => {
  const equalsIndex = instruction.indexOf("=");
  const semiColonIndex = instruction.indexOf(";");
  const hasDestPart = equalsIndex !== -1;
  const hasJumpPart = semiColonIndex !== -1;

  if (!hasDestPart && !hasJumpPart) {
    return instruction as CompMnemonics;
  } else if (!hasDestPart && hasJumpPart) {
    return instruction.substring(0, semiColonIndex) as CompMnemonics;
  } else if (hasDestPart && !hasJumpPart) {
    return instruction.substring(equalsIndex + 1) as CompMnemonics;
  } else {
    return instruction.substring(
      equalsIndex + 1,
      semiColonIndex,
    ) as CompMnemonics;
  }
};

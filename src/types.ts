export type Binary = 0 | 1;
export type DestMnemonics = "M" | "D" | "DM" | "A" | "AM" | "AD" | "ADM";
export type DestBinaryCode = `${Binary}${Binary}${Binary}`;

export type JumpMnemonics =
  | "JGT"
  | "JEQ"
  | "JGE"
  | "JLT"
  | "JNE"
  | "JLE"
  | "JMP";
export type JumpBinaryCode = `${Binary}${Binary}${Binary}`;

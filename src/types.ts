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

type ACompMnemonics =
  | "0"
  | "1"
  | "-1"
  | "D"
  | "A"
  | `${"!" | "-"}${"D" | "A"}`
  | `D${"-" | "+"}1`
  | `D${"-" | "+" | "&" | "|"}A`
  | `A${"-" | "+"}1`
  | `A-D`;

type MCompMnemonics =
  | "M"
  | `${"!" | "-"}M`
  | `M${"-" | "+"}1`
  | `D${"-" | "+" | "&" | "|"}M`
  | `M${"-"}D`;

export type CompMnemonics = ACompMnemonics | MCompMnemonics;
export type CompBinaryCode =
  `${Binary}${Binary}${Binary}${Binary}${Binary}${Binary}${Binary}`;

// 15 bit
export type BinaryAddress =
  `${Binary}${Binary}${Binary}${Binary}${Binary}${Binary}${Binary}${Binary}${Binary}${Binary}${Binary}${Binary}${Binary}${Binary}${Binary}`;

// 16 bit
export type MachineInstruction =
  `${Binary}${Binary}${Binary}${Binary}${Binary}${Binary}${Binary}${Binary}${Binary}${Binary}${Binary}${Binary}${Binary}${Binary}${Binary}${Binary}`;

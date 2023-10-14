import { Binary, BinaryAddress } from "./types";

export const toBinary = (bool: boolean): Binary => (bool ? 1 : 0);

export const intTo15BitBinary = (num: number): BinaryAddress => {
  if (num < 0 || num >= 32768) {
    throw new Error("Input integer must be between 0 and 32767 (15 bits).");
  }
  return num.toString(2).padStart(15, "0") as BinaryAddress;
};

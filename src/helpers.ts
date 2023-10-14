import { Binary } from "./types";

export const toBinary = (bool: boolean): Binary => (bool ? 1 : 0);

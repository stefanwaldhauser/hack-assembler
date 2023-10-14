import fs from "fs";
import mock from "mock-fs";
import { equal } from "assert";
import { createSymbolTable } from "./symbol-table";

describe("symbole table", () => {
  before(() => {
    mock({
      "./input.asm": "D=M\n(X)\n0;JMP\n",
    });
  });

  after(() => {
    mock.restore();
  });

  it("should set label address corrcetly", async () => {
    const input = fs.createReadStream("./input.asm");

    const symbolTable = await createSymbolTable(input);

    equal(symbolTable.get("X"), 1);
  });
});

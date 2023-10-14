#!/usr/bin/env node
import fs from "fs";
import { Command } from "commander";
import { assemble } from "./assemble";
import { createSymbolTable } from "./symbol-table";

async function run() {
  const program = new Command()
    .name("hack-assembler")
    .version("0.1.0")
    .requiredOption("-i, --inputFile <path>")
    .requiredOption("-o, --outputFile <path>");
  program.parse();
  const { inputFile, outputFile } = program.opts();
  const symbolTable = await createSymbolTable(fs.createReadStream(inputFile));
  await assemble(
    fs.createReadStream(inputFile),
    fs.createWriteStream(outputFile, { flags: "w" }),
    symbolTable,
  );
}

run();

#!/usr/bin/env node
import fs from "fs";
import { Command } from "commander";
import { assemble } from "./assemble";

async function run() {
  const program = new Command()
    .name("hack-assembler")
    .version("0.1.0")
    .requiredOption("-i, --inputFile <path>")
    .requiredOption("-o, --outputFile <path>");
  program.parse();
  const { inputFile, outputFile } = program.opts();
  const input = fs.createReadStream(inputFile);
  const output = fs.createWriteStream(outputFile, { flags: "w" });
  await assemble(input, output);
}

run();

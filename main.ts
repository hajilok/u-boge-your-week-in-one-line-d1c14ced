import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_LINE: string =
  "Listed my couch for $200 Monday; by Friday I paid a man named Keith $40 and helped him load it.";

function validateLine(line: string): string {
  const chars = Array.from(line).length;
  if (chars < 1 || chars > 100) {
    throw new Error(`Invalid character count: ${chars}`);
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("Entry must be a single line with no line breaks");
  }
  if (line.trim().length === 0) {
    throw new Error("Entry must not be only whitespace");
  }
  return line;
}

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const line = validateLine(ENTRY_LINE);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), line, { encoding: "utf8" });
}

main();

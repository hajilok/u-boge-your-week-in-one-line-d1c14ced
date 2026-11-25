import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_LINE: string =
  "Taught Dad to spot scams all week until he reported my $14 Venmo to the FBI.";

function validateLine(line: string): string {
  const chars = Array.from(line).length;
  const bytes = Buffer.byteLength(line, "utf8");
  if (chars < 1 || chars > 100) {
    throw new Error(`Invalid character count: ${chars}`);
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("Entry must be a single line with no line breaks");
  }
  if (line.trim().length === 0) {
    throw new Error("Entry must not be only whitespace");
  }
  if (!/^[\x20-\x7e]+$/.test(line) || bytes !== chars) {
    throw new Error(`Expected pure ASCII single-byte UTF-8, got ${bytes}B / ${chars}c`);
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

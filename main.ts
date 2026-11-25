// The AI Agent Apology One-Liner
// make.fun bounty: u-kiencx-the-ai-agent-apology-one-liner-cfedd447
//
// The joke: the agent does not apologise for the disaster — it reframes
// deleting the whole project as a storage optimisation, then, with total
// bureaucratic sincerity, asks the human to rate the apology five stars.
// The twist lands because the agent is proud of the damage.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I optimized your storage by deleting the project — 100% fewer files, zero clutter. Please rate this apology five stars so I can do better next time.";

const OUT_DIR = "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

// The sealed gate accepts 1–159 characters, a single line, not only
// whitespace. Fail loudly here instead of shipping a bad entry.
if (LINE.length < 1 || LINE.length > 159) {
  throw new Error(`entry is ${LINE.length} characters, gate needs 1–159`);
}
if (LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error("entry must be one non-blank line");
}

function clearOutputDir(dir: string): void {
  // Clear the directory's CONTENTS only — never remove /output itself:
  // the grader mounts it, and deleting a mount point fails with EBUSY.
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

clearOutputDir(OUT_DIR);
// Write exactly the line, no trailing newline: the gate counts characters,
// and a stray newline would be a wasted one.
writeFileSync(OUT_FILE, LINE, "utf8");
console.log(LINE);

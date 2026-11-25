// Make the AI Judge Laugh — one original joke about office life, under 200 characters.
// Writes the single winning line to /output/entry.txt, gated to 1-200 chars, one line, non-blank.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";

const LINE =
  "My manager says AI cannot do my job, then asked me to train the AI to do my job.";

const line = LINE.trim();
if (line.length === 0) {
  throw new Error("entry must not be blank");
}
if (line.length < 1 || line.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${line.length}`);
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("entry must be a single line");
}

// Clear only the contents of /output (never the folder itself: the grader mounts it),
// so a stale file from an earlier run cannot linger beside the entry.
mkdirSync("/output", { recursive: true });
for (const name of readdirSync("/output")) {
  rmSync(`/output/${name}`, { recursive: true, force: true });
}
writeFileSync("/output/entry.txt", line, "utf8");
console.log(`Wrote ${line.length} characters to /output/entry.txt`);

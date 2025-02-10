import fs from "node:fs";
import { getAbsoluteTargetExePath, getTargetTriple } from "./target.js";

const target = getTargetTriple();
const targetExePath = getAbsoluteTargetExePath(target);

// Make the CLI file executable on Unix-like systems
if (process.platform !== "win32") {
  await fs.promises.chmod(targetExePath, 0o755);
}

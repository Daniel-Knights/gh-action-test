#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { getAbsoluteTargetExePath, getTargetTriple } from "./target.js";

const target = getTargetTriple();
const targetExePath = getAbsoluteTargetExePath(target);

const result = spawnSync(targetExePath, process.argv.slice(2), {
  stdio: "inherit",
});

if (result.error) {
  console.error(
    `[changenog]: failed to execute binary for target: ${target}.  ensure the` +
      `correct optional dependency is installed (@changenog/${target})\n`
  );

  throw result.error;
}

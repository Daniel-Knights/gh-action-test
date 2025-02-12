#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { getAbsoluteTargetExePath, getTargetTriple } from "./target.js";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);

const archMap = {
  x64: "x86_64",
  arm64: "aarch64",
};

const platformMap = {
  win32: "pc-windows-msvc",
  darwin: "apple-darwin",
  linux: "unknown-linux-gnu",
};

const archName = archMap[process.arch];
const platformName = platformMap[process.platform];

if (!archName) {
  throw new Error(`[changenog]: unsupported architecture: ${process.arch}`);
}

if (!platformName) {
  throw new Error(`[changenog]: unsupported platform: ${process.platform}`);
}

const target = `${archName}-${platformName}`;

const absoluteTargetExePath = require.resolve(
  path.join(`@gh-action-test/${target}`, "changenog")
);

const result = spawnSync(absoluteTargetExePath, process.argv.slice(2), {
  stdio: "inherit",
});

if (result.error) {
  console.error(
    `[changenog]: failed to execute binary for target: ${target}.  ensure the` +
      ` correct optional dependency is installed (@changenog/${target})\n`
  );

  throw result.error;
}

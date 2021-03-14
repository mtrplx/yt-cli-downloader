#!/usr/bin/env node

const { spawnSync } = require("child_process");
const { resolve } = require("path");

const cmd = 'node --no-warnings ' + resolve(__dirname+"index.js")
spawnSync(cmd, { stdio: "inherit", shell: true });
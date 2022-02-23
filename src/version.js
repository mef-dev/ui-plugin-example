const { gitDescribeSync } = require("git-describe");
const { version, name } = require("../package.json");
const { resolve, relative } = require("path");
const { writeFileSync } = require("fs-extra");

var gitInfo = { name: "", version: "", raw: "" };
try {
  gitInfo = gitDescribeSync();
} catch (ex) {}

gitInfo.name = name;
gitInfo.version = version;

const file = resolve(__dirname, "..", "src", "environments", "version.js");
const fileTS = resolve(__dirname, "..", "src", "environments", "version.ts");
writeFileSync(
  file,
  `// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
/* tslint:disable */
export const PLUGIN_VERSION = ${JSON.stringify(gitInfo, null, 4)};
/* tslint:enable */
`,
  { encoding: "utf-8" }
);

writeFileSync(
  fileTS,
  `// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
/* tslint:disable */
export const PLUGIN_VERSION = ${JSON.stringify(gitInfo, null, 4)};
/* tslint:enable */
`,
  { encoding: "utf-8" }
);

console.log(
  `Wrote version info ${gitInfo.raw} to ${relative(
    resolve(__dirname, ".."),
    file
  )} at ${new Date().toString()}`
);

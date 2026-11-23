// SPDX-License-Identifier: MIT
// post-tiktok-day-one-day-seven — entry program for make.fun's "Day one,
// day seven" TikTok bounty. The video itself is the entry: the house reads
// it from TikTok. This program only copies the repository's VIDEO.json
// (which holds the video's URL) into /output, after checking it names a
// real TikTok video address.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";

const videoPath = new URL("./VIDEO.json", import.meta.url);
const video = JSON.parse(readFileSync(videoPath, "utf8"));
if (typeof video !== "object" || video === null || typeof video.url !== "string") {
  throw new Error("VIDEO.json must be a JSON object with a string url field");
}
if (!/^https:\/\/(www\.|m\.)?tiktok\.com\/@[^/]+\/video\/\d+$/.test(video.url)) {
  throw new Error("VIDEO.json url must be a TikTok video address: https://www.tiktok.com/@<handle>/video/<id>");
}
if (video.url.includes("PLACEHOLDER")) {
  throw new Error("VIDEO.json still holds the placeholder address — replace it with the posted video's URL");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
copyFileSync(videoPath, `${outDir}/VIDEO.json`);
console.log(`VIDEO.json copied to ${outDir}/VIDEO.json (${video.url})`);

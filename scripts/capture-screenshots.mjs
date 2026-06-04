// One-time screenshot capture for portfolio project cards.
// Uses the locally-installed Google Chrome in headless mode — no extra deps.
// Captures the top/home viewport of each live project at a desktop-ish size.
// This script is intended to be removed after the images are generated.
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT_DIR = resolve(process.cwd(), "public", "projects");
const VIEWPORT = "1440,1000";

const targets = [
  { file: "life-management-system.png", url: "https://life-vault-ai-git-master-yuvalzakay26-8804s-projects.vercel.app" },
  { file: "recipe-vault.png",           url: "https://yuval-recipe-vault-bmjm5pwli-yuvalzakay26-8804s-projects.vercel.app" },
  { file: "marzipan.png",               url: "https://marzipan-bakery-btx22ieti-yuvalzakay26-8804s-projects.vercel.app" },
  { file: "yuval-digital.png",          url: "https://yuval-digital-g29k0bymo-yuvalzakay26-8804s-projects.vercel.app" },
  { file: "pizza-romi.png",             url: "https://pizza-romi-v2-p3qxh9561-yuvalzakay26-8804s-projects.vercel.app" },
  { file: "yuvalcode-platform.png",     url: "https://yuvalcode-platform-41se2it59-yuvalzakay26-8804s-projects.vercel.app" },
  { file: "lawyer-project.png",         url: "https://ester-law-website-hc8bp0bwb-yuvalzakay26-8804s-projects.vercel.app" },
];

if (!existsSync(CHROME)) {
  console.error(`Chrome not found at ${CHROME}`);
  process.exit(1);
}

const results = [];
for (const { file, url } of targets) {
  const out = resolve(OUT_DIR, file);
  console.log(`\nCapturing ${file}  <-  ${url}`);
  const args = [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-default-browser-check",
    "--no-first-run",
    "--force-color-profile=srgb",
    `--window-size=${VIEWPORT}`,
    "--virtual-time-budget=12000", // let the page load + settle animations
    "--run-all-compositor-stages-before-draw",
    `--screenshot=${out}`,
    url,
  ];
  const r = spawnSync(CHROME, args, { stdio: "inherit", timeout: 60_000 });
  const ok = r.status === 0 && existsSync(out);
  results.push({ file, url, ok });
  console.log(ok ? `  OK -> ${out}` : `  FAILED (status=${r.status})`);
}

console.log("\n=== Summary ===");
for (const { file, ok } of results) console.log(`${ok ? "OK    " : "FAIL  "} ${file}`);
const failed = results.filter((r) => !r.ok);
process.exit(failed.length ? 2 : 0);

// Dev-experience helper: starts the Next.js dev server and, once it reports
// its Local URL, opens that exact URL in Google Chrome.
//
// It reads the real port from the dev server's output rather than assuming
// 3000, so it still opens the correct tab when 3000 is taken and Next.js
// falls back to 3001, 3002, etc. Windows-first, with macOS/Linux fallbacks.
// No extra dependencies.
import { spawn } from "node:child_process";
import http from "node:http";

const FALLBACK_URL = "http://localhost:3000";
const POLL_INTERVAL_MS = 400;
const POLL_TIMEOUT_MS = 60_000;

let opened = false;

// Start the Next.js dev server. We pipe stdout so we can read the Local URL,
// but mirror every line straight to the terminal so it behaves as usual.
const dev = spawn("npm", ["run", "dev:plain"], {
  stdio: ["inherit", "pipe", "inherit"],
  shell: true,
});

dev.on("exit", (code) => process.exit(code ?? 0));

dev.stdout.on("data", (chunk) => {
  const text = chunk.toString();
  process.stdout.write(text); // keep the normal dev-server output visible

  if (opened) return;
  // Next.js prints e.g. "- Local:        http://localhost:3001"
  const match = text.match(/https?:\/\/localhost:\d+/i);
  if (match) {
    opened = true;
    openWhenReady(match[0]);
  }
});

// As a safety net: if we never saw a Local URL line, try the default port.
setTimeout(() => {
  if (!opened) {
    opened = true;
    openWhenReady(FALLBACK_URL);
  }
}, 15_000);

// Poll the URL until it responds, then open Chrome at that exact URL.
function openWhenReady(url) {
  const deadline = Date.now() + POLL_TIMEOUT_MS;
  const attempt = () => {
    const req = http.get(url, () => {
      req.destroy();
      console.log(`\n[dev:chrome] Server ready — opening ${url} in Google Chrome...\n`);
      openChrome(url);
    });
    req.on("error", () => {
      if (Date.now() > deadline) {
        console.error(`[dev:chrome] Server did not respond at ${url} within timeout.`);
      } else {
        setTimeout(attempt, POLL_INTERVAL_MS);
      }
    });
  };
  attempt();
}

// Open Google Chrome specifically (not the default browser). Chrome reuses an
// existing window and opens a single new tab, avoiding duplicate tabs.
function openChrome(url) {
  const platform = process.platform;
  if (platform === "win32") {
    // `start "" chrome <url>` resolves chrome.exe via the App Paths registry.
    return spawn("cmd", ["/c", "start", "", "chrome", url], { stdio: "ignore" });
  }
  if (platform === "darwin") {
    return spawn("open", ["-a", "Google Chrome", url], { stdio: "ignore" });
  }
  // Linux: try common Chrome binaries.
  return spawn("google-chrome", [url], { stdio: "ignore" }).on("error", () =>
    spawn("google-chrome-stable", [url], { stdio: "ignore" })
  );
}

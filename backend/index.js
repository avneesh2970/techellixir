import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { createReadStream } from "node:fs";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = resolve(__dirname, "..");
const distDir = join(projectRoot, "dist");
const dataDir = join(__dirname, "data");
const queriesFile = join(dataDir, "queries.json");

const PORT = Number(process.env.PORT || 4174);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const TOKEN_SECRET = process.env.TOKEN_SECRET || "techellixir-local-secret";
const TOKEN_TTL_MS = 1000 * 60 * 60 * 12;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

async function ensureStore() {
  await mkdir(dataDir, { recursive: true });
  try {
    await stat(queriesFile);
  } catch {
    await writeFile(queriesFile, "[]\n", "utf8");
  }
}

async function readQueries() {
  await ensureStore();
  const raw = await readFile(queriesFile, "utf8");
  return JSON.parse(raw);
}

async function writeQueries(queries) {
  await ensureStore();
  await writeFile(queriesFile, `${JSON.stringify(queries, null, 2)}\n`, "utf8");
}

function json(res, status, payload) {
  res.writeHead(status, {
    "cache-control": "no-store",
    "content-type": "application/json; charset=utf-8",
  });
  res.end(JSON.stringify(payload));
}

function notFound(res) {
  json(res, 404, { error: "Not found" });
}

async function readBody(req) {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 1_000_000) {
      throw new Error("Request body is too large");
    }
  }
  return raw ? JSON.parse(raw) : {};
}

function signToken(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", TOKEN_SECRET).update(body).digest("base64url");
  return `${body}.${signature}`;
}

function verifyToken(token) {
  if (!token || !token.includes(".")) return false;
  const [body, signature] = token.split(".");
  const expected = createHmac("sha256", TOKEN_SECRET).update(body).digest("base64url");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  return payload.role === "admin" && payload.expiresAt > Date.now();
}

function requireAdmin(req, res) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!verifyToken(token)) {
    json(res, 401, { error: "Unauthorized" });
    return false;
  }
  return true;
}

function normalizeQuery(input) {
  const fullName = String(input.fullName || "").trim();
  const email = String(input.email || "").trim().toLowerCase();
  const subject = String(input.subject || "").trim();
  const message = String(input.message || "").trim();

  if (fullName.length < 2) return { error: "Please enter your full name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }
  if (subject.length < 3) return { error: "Please enter a subject." };
  if (message.length < 10) {
    return { error: "Please write a message with at least 10 characters." };
  }

  return {
    query: {
      createdAt: new Date().toISOString(),
      email,
      fullName,
      id: randomUUID(),
      message,
      status: "new",
      subject,
      updatedAt: new Date().toISOString(),
    },
  };
}

async function handleApi(req, res, url) {
  try {
    if (req.method === "GET" && url.pathname === "/api/health") {
      json(res, 200, { ok: true });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/queries") {
      const body = await readBody(req);
      const normalized = normalizeQuery(body);
      if (normalized.error) {
        json(res, 400, { error: normalized.error });
        return;
      }
      const queries = await readQueries();
      queries.unshift(normalized.query);
      await writeQueries(queries);
      json(res, 201, { query: normalized.query });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/admin/login") {
      const body = await readBody(req);
      if (String(body.password || "") !== ADMIN_PASSWORD) {
        json(res, 401, { error: "Invalid admin password." });
        return;
      }
      const token = signToken({
        expiresAt: Date.now() + TOKEN_TTL_MS,
        role: "admin",
      });
      json(res, 200, { token });
      return;
    }

    if (url.pathname === "/api/admin/queries") {
      if (!requireAdmin(req, res)) return;
      if (req.method !== "GET") {
        notFound(res);
        return;
      }
      const queries = await readQueries();
      json(res, 200, { queries });
      return;
    }

    const queryMatch = url.pathname.match(/^\/api\/admin\/queries\/([^/]+)$/);
    if (queryMatch) {
      if (!requireAdmin(req, res)) return;
      const id = queryMatch[1];
      const queries = await readQueries();
      const index = queries.findIndex((query) => query.id === id);
      if (index === -1) {
        notFound(res);
        return;
      }

      if (req.method === "PATCH") {
        const body = await readBody(req);
        const allowed = new Set(["new", "in-progress", "resolved", "archived"]);
        if (!allowed.has(body.status)) {
          json(res, 400, { error: "Invalid status." });
          return;
        }
        queries[index] = {
          ...queries[index],
          status: body.status,
          updatedAt: new Date().toISOString(),
        };
        await writeQueries(queries);
        json(res, 200, { query: queries[index] });
        return;
      }

      if (req.method === "DELETE") {
        const [deleted] = queries.splice(index, 1);
        await writeQueries(queries);
        json(res, 200, { query: deleted });
        return;
      }
    }

    notFound(res);
  } catch (error) {
    json(res, 500, { error: error instanceof Error ? error.message : "Server error" });
  }
}

async function serveStatic(req, res, url) {
  const requestedPath = url.pathname === "/" ? "/index.html" : url.pathname;
  const cleanPath = requestedPath.replace(/^\/+/, "");
  const filePath = resolve(distDir, cleanPath);
  const isInsideDist = filePath.startsWith(distDir);

  try {
    if (!isInsideDist) throw new Error("Invalid path");
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) throw new Error("Not a file");
    res.writeHead(200, {
      "content-type": mimeTypes[extname(filePath)] || "application/octet-stream",
    });
    createReadStream(filePath).pipe(res);
  } catch {
    const fallback = join(distDir, "index.html");
    try {
      await stat(fallback);
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      createReadStream(fallback).pipe(res);
    } catch {
      json(res, 404, {
        error: "Frontend build not found. Run npm run build before starting the backend.",
      });
    }
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (url.pathname.startsWith("/api/")) {
    await handleApi(req, res, url);
    return;
  }

  await serveStatic(req, res, url);
});

server.listen(PORT, () => {
  console.log(`TechEllixir backend running on http://localhost:${PORT}`);
});

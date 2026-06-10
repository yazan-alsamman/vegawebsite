import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { seedDatabase } from "./seed.js";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import uploadRoutes from "./routes/upload.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const uploadsDir = path.join(rootDir, "uploads");
const PORT = Number(process.env.PORT) || 3001;
const isProd = process.env.NODE_ENV === "production";

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

seedDatabase();

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json({ limit: "2mb" }));

app.use("/uploads", express.static(uploadsDir));
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", mode: isProd ? "production" : "development" });
});

if (isProd && fs.existsSync(distDir)) {
  app.use(
    express.static(distDir, {
      index: false,
      fallthrough: true,
      maxAge: "7d",
    }),
  );

  app.get(/^(?!\/api|\/uploads).*/, (req, res, next) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      next();
      return;
    }
    res.sendFile(path.join(distDir, "index.html"), (err) => {
      if (err) next(err);
    });
  });

  console.log(`Serving frontend from ${distDir}`);
} else if (isProd) {
  console.warn("Production mode but dist/ not found. Run: npm run build");
}

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(err);
    res.status(500).json({ error: err.message || "Internal server error" });
  },
);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`VegaCore server running at http://localhost:${PORT}`);
  if (!isProd) {
    console.log("Dev tip: run npm run dev for hot-reload frontend on :5173");
  }
});

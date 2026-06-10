import { Router } from "express";
import bcrypt from "bcryptjs";
import { db } from "../database.js";
import { signToken, verifyToken } from "../middleware/auth.js";

const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body as { username?: string; password?: string };

  if (!username?.trim() || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  const user = db
    .prepare("SELECT id, username, password_hash FROM admin_users WHERE username = ?")
    .get(username.trim()) as { id: number; username: string; password_hash: string } | undefined;

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = signToken({ userId: user.id, username: user.username });

  res.json({
    token,
    user: { id: user.id, username: user.username },
  });
});

router.get("/me", (req, res) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  try {
    const payload = verifyToken(header.slice(7));
    res.json({ user: { id: payload.userId, username: payload.username } });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;

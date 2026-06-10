import { Router } from "express";
import bcrypt from "bcryptjs";
import { AdminUser } from "../models/AdminUser.js";
import { signToken, verifyToken } from "../middleware/auth.js";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body as { username?: string; password?: string };

    if (!username?.trim() || !password) {
      res.status(400).json({ error: "Username and password are required" });
      return;
    }

    const user = await AdminUser.findOne({ username: username.trim() });

    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const userId = user._id.toString();
    const token = signToken({ userId, username: user.username });

    res.json({
      token,
      user: { id: userId, username: user.username },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
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

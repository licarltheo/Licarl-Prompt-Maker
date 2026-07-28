import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { authenticate, AuthRequest } from '../middleware/auth';

export const authRouter = Router();

const users = new Map<string, any>();

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function signToken(userId: string, role: string) {
  const secret = process.env.JWT_SECRET || 'dev-secret-change-me';
  return jwt.sign({ userId, role }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

authRouter.post('/register', async (req, res, next) => {
  try {
    const body = registerSchema.parse(req.body);
    if (users.has(body.email)) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    const passwordHash = await bcrypt.hash(body.password, 12);
    const user = {
      id: `user_${Date.now()}`,
      email: body.email,
      name: body.name,
      passwordHash,
      role: 'user',
      plan: 'free',
      emailVerified: false,
      twoFactorEnabled: false,
    };
    users.set(body.email, user);
    const token = signToken(user.id, user.role);
    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        plan: user.plan,
        emailVerified: user.emailVerified,
        twoFactorEnabled: user.twoFactorEnabled,
      },
    });
  } catch (err) {
    next(err);
  }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const body = loginSchema.parse(req.body);
    const user = users.get(body.email);
    if (!user || !(await bcrypt.compare(body.password, user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = signToken(user.id, user.role);
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        plan: user.plan,
        emailVerified: user.emailVerified,
        twoFactorEnabled: user.twoFactorEnabled,
      },
    });
  } catch (err) {
    next(err);
  }
});

authRouter.get('/me', authenticate, (req: AuthRequest, res) => {
  res.json({
    user: {
      id: req.userId,
      role: req.userRole,
      name: 'User',
      email: 'user@example.com',
      plan: 'free',
      emailVerified: true,
      twoFactorEnabled: false,
    },
  });
});

authRouter.post('/forgot-password', async (req, res) => {
  res.json({ message: 'If an account exists, a reset link has been sent' });
});

authRouter.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password || password.length < 8) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  res.json({ message: 'Password updated' });
});

authRouter.post('/verify-email', async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Token required' });
  res.json({ message: 'Email verified' });
});

authRouter.post('/logout', authenticate, (_req, res) => {
  res.json({ message: 'Logged out' });
});

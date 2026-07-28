import { Router } from 'express';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth';

export const promptsRouter = Router();

const prompts = new Map<string, any>();

const createSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  tags: z.array(z.string()).optional(),
  folderId: z.string().optional(),
});

promptsRouter.get('/', (req: AuthRequest, res) => {
  const list = Array.from(prompts.values()).filter((p) => p.userId === req.userId && !p.isArchived);
  res.json({ prompts: list });
});

promptsRouter.get('/:id', (req: AuthRequest, res) => {
  const p = prompts.get(req.params.id);
  if (!p || p.userId !== req.userId) return res.status(404).json({ error: 'Not found' });
  res.json({ prompt: p });
});

promptsRouter.post('/', (req: AuthRequest, res, next) => {
  try {
    const body = createSchema.parse(req.body);
    const prompt = {
      id: `prompt_${Date.now()}`,
      userId: req.userId,
      ...body,
      tags: body.tags || [],
      isFavorite: false,
      isArchived: false,
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    prompts.set(prompt.id, prompt);
    res.status(201).json({ prompt });
  } catch (err) {
    next(err);
  }
});

promptsRouter.put('/:id', (req: AuthRequest, res, next) => {
  try {
    const p = prompts.get(req.params.id);
    if (!p || p.userId !== req.userId) return res.status(404).json({ error: 'Not found' });
    const body = createSchema.partial().parse(req.body);
    Object.assign(p, body, { updatedAt: new Date().toISOString(), version: p.version + 1 });
    res.json({ prompt: p });
  } catch (err) {
    next(err);
  }
});

promptsRouter.delete('/:id', (req: AuthRequest, res) => {
  const p = prompts.get(req.params.id);
  if (!p || p.userId !== req.userId) return res.status(404).json({ error: 'Not found' });
  p.isArchived = true;
  res.json({ message: 'Archived' });
});

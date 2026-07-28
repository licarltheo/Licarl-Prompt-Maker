import { Router } from 'express';
import { AuthRequest } from '../middleware/auth';
import crypto from 'crypto';

export const providersRouter = Router();

const keys = new Map<string, any>();

function encrypt(text: string): string {
  const key = Buffer.from((process.env.ENCRYPTION_KEY || 'dev-key-32-bytes-long!!!!!!!!!!').slice(0, 32));
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const enc = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, enc]).toString('base64');
}

providersRouter.get('/', (req: AuthRequest, res) => {
  const list = Array.from(keys.values())
    .filter((k) => k.userId === req.userId)
    .map(({ encryptedKey, ...rest }) => ({ ...rest, hasKey: true }));
  res.json({ providers: list });
});

providersRouter.post('/', (req: AuthRequest, res) => {
  const { provider, apiKey, isDefault } = req.body;
  if (!provider || !apiKey) return res.status(400).json({ error: 'provider and apiKey required' });
  const record = {
    id: `key_${Date.now()}`,
    userId: req.userId,
    provider,
    encryptedKey: encrypt(apiKey),
    isDefault: !!isDefault,
    isEnabled: true,
    createdAt: new Date().toISOString(),
  };
  keys.set(`${req.userId}:${provider}`, record);
  res.status(201).json({ provider: { id: record.id, provider: record.provider, isDefault: record.isDefault, isEnabled: true, hasKey: true } });
});

providersRouter.delete('/:provider', (req: AuthRequest, res) => {
  keys.delete(`${req.userId}:${req.params.provider}`);
  res.json({ message: 'Deleted' });
});

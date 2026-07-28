# Deployment

## Docker

```bash
docker-compose up -d
```

## Vercel (Frontend)

Connect the `apps/web` directory. Set `VITE_API_URL` to your API URL.

## Railway / Render (API)

Use the root or `apps/api` with the provided Dockerfile. Set `DATABASE_URL`, `JWT_SECRET`, `ENCRYPTION_KEY`.

## GitHub Actions

CI workflow runs on every push to `main`.

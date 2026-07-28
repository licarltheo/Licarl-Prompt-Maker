# API Reference

Base URL: `/api`

## Auth

| Method | Path | Description |
|--------|------|-------------|
| POST | /auth/register | Create account |
| POST | /auth/login | Login |
| GET | /auth/me | Current user |
| POST | /auth/forgot-password | Request reset |
| POST | /auth/reset-password | Reset password |
| POST | /auth/verify-email | Verify email |
| POST | /auth/logout | Logout |

## Prompts

| Method | Path | Description |
|--------|------|-------------|
| GET | /prompts | List prompts |
| GET | /prompts/:id | Get prompt |
| POST | /prompts | Create |
| PUT | /prompts/:id | Update |
| DELETE | /prompts/:id | Archive |

## Providers

| Method | Path | Description |
|--------|------|-------------|
| GET | /providers | List configured providers |
| POST | /providers | Add encrypted API key |
| DELETE | /providers/:provider | Remove key |

## Health

`GET /health` — service status

WebSocket: connect to same origin for realtime notifications and streaming.

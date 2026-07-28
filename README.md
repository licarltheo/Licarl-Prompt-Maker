# Licarl Prompt Maker

**Enterprise-grade AI workspace** for creating, testing, organizing, optimizing, sharing, and collaborating on AI prompts.

Supports all major AI providers through users' own API keys.

![License](https://img.shields.io/badge/license-MIT-blue)
![Node](https://img.shields.io/badge/node-%3E%3D20-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)

## Features

- **Prompt Builder** — Monaco editor, variables, templates, version history, folders, tags, collections
- **Prompt Optimizer** — Grammar, role, CoT, token, readability improvements with AI recommendations
- **Multi-Provider Tester** — Test one prompt across ChatGPT, Claude, Gemini, Grok, DeepSeek, Mistral, Groq, OpenRouter, Together, Cohere, Azure OpenAI, Ollama simultaneously
- **AI Chat** — Streaming, markdown, code highlighting, file uploads, conversation history
- **AI Agents** — System prompts, memory, tools, marketplace
- **Workflow Builder** — Visual drag-and-drop pipelines with conditions, loops, API nodes and scheduling
- **Marketplace** — Publish, download, rate, and discover prompts
- **Team Collaboration** — Organizations, roles, shared folders, comments, mentions and full audit logs
- **Knowledge Base** — PDF, DOCX, Markdown, TXT with vector-search ready architecture
- **Analytics** — Token usage, provider costs, charts, exports
- **Security** — AES-256 key encryption, JWT, 2FA, CSRF, rate limiting and RLS

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, Monaco Editor |
| Backend | Node.js, Express, TypeScript, Prisma ORM |
| Database | PostgreSQL |
| Auth | JWT + OAuth (Google, GitHub, Microsoft) + 2FA |
| Realtime | WebSocket |
| Deploy | Docker, Vercel, Railway, Render, GitHub Actions |

## Quick Start

```bash
# Clone
git clone https://github.com/licarltheo/Licarl-Prompt-Maker.git
cd Licarl-Prompt-Maker

# Install
npm install

# Environment
cp .env.example .env
# Edit .env with your DATABASE_URL, JWT_SECRET, ENCRYPTION_KEY

# Database
npm run db:push

# Development
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:3001
- API Docs: http://localhost:3001/api/docs

## Documentation

- [INSTALL.md](docs/INSTALL.md) — Detailed installation
- [DEPLOYMENT.md](docs/DEPLOYMENT.md) — Docker, Vercel, Railway, Render
- [API.md](docs/API.md) — REST & WebSocket reference
- [CONTRIBUTING.md](docs/CONTRIBUTING.md)
- [CHANGELOG.md](CHANGELOG.md)

## License

MIT © licarltheo

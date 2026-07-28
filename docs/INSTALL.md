# Installation

## Prerequisites

- Node.js >= 20
- PostgreSQL 14+
- Redis (optional)
- npm or pnpm

## Steps

1. Clone the repository
2. `cp .env.example .env` and fill secrets
3. `npm install`
4. Start Postgres (`docker-compose up -d postgres`)
5. `npm run db:push`
6. `npm run dev`

Frontend: http://localhost:5173  
API: http://localhost:3001

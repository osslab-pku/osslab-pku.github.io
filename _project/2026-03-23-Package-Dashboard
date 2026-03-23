---
 layout: project
 title: "Package Dashboard"
 date: 2026-03-23 11:03:00
 description: 'A cross-ecosystem SCA tool that provides a unified view of supply chain risk by analyzing both software artifacts and upstream community health.'
 github: https://github.com/osslab-pku/PackageDashboard
 website: https://pkgdash.osslab-pku.org
 author: Ziheng Liu
 published: true
 comments: true
---

A cross-ecosystem SCA tool that provides a unified view of supply chain risk by analyzing both software artifacts and upstream community health.

## Project Layout

```text
.
├── backend/   # FastAPI app, data access, analyzers, runtime config
├── frontend/  # Vue 3 + Vite UI
├── scripts/   # Root-level install/dev helpers
└── Makefile   # Single entrypoint for common workflows
```

## Prerequisites

- Python 3.10+
- [Poetry](https://python-poetry.org/)
- [pnpm](https://pnpm.io/installation)
- MongoDB
- ClickHouse
- [scancode-toolkit](https://scancode-toolkit.readthedocs.io/en/stable/getting-started/install.html#source-code-install)

Some dependency analysis flows also rely on system libraries such as `libsolv1` and `libapt-pkg-dev`.

## Quick Start

1. Copy the local configuration templates.

```bash
cp backend/.secrets.example.toml backend/.secrets.toml
cp frontend/.env.example frontend/.env
```

2. Install all dependencies from the repository root.

```bash
make install
```

3. Start backend and frontend together.

```bash
make dev
```

After startup:

- Frontend: `http://127.0.0.1:19429`
- Backend API: `http://127.0.0.1:19428`
- Health check: `http://127.0.0.1:19428/api/health`

## Common Commands

```bash
make help
make install-backend
make install-frontend
make dev-backend
make dev-frontend
make build-frontend
```

## Configuration

### Backend

Backend defaults live in `backend/settings.toml`. Local overrides should go in `backend/.secrets.toml`.

Useful backend settings:

- `api_host`
- `api_port`
- `frontend_urls`
- `mongodb.url`
- `mongodb.db`
- `clickhouse.url`

Environment variables with the `PKGDASH_` prefix can also override runtime settings, for example:

```bash
export PKGDASH_API_PORT=18080
export PKGDASH_FRONTEND_URLS=http://localhost:19429,http://127.0.0.1:19429
```

### Frontend

The frontend now uses Vite environment variables instead of storing the backend URL in browser local storage.

- `VITE_DEV_API_TARGET`: backend target used by the Vite dev proxy
- `VITE_API_BASE_URL`: optional explicit API origin for preview/production
- `VITE_HOST`
- `VITE_PORT`

In local development, requests to `/api/*` are proxied automatically to the backend, so no manual API URL setup is required.

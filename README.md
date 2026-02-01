# WebExDX Taskify Service

A Koa-based backend service for the Taskify module in the WebExDX ecosystem.

## Features

- **Task Logic**: core business logic for task management.
- **Microservice Ready**: built to work within the WebExDX architecture.
- **Koa Wrapped**: uses `@webexdx/koa-wrap` for standard middleware and error handling.
- **Persistent Storage**: MongoDB backend.

## Tech Stack

- **Framework**: Koa with `@webexdx/koa-wrap`
- **Language**: TypeScript
- **Database**: MongoDB
- **Validation**: Joi
- **Logging**: Winston
- **Process Manager**: PM2
- **Tooling**: Biome

## Prerequisites

- **Node.js**: >= 22
- **Package Manager**: pnpm
- **MongoDB**: Access to a MongoDB instance.

## Getting Started

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm run start
```

### Build

```bash
pnpm run build:prod
```

## Available Scripts

- `pnpm run start`: Development mode with nodemon.
- `pnpm run build:prod`: Production build.
- `pnpm run start:prod`: Production runtime using PM2.
- `pnpm run lint`: Code quality check using Biome.
- `pnpm run fix`: Auto-format and fix using Biome.

## Docker

### Build

```bash
docker build -t webexdx-taskify-service .
```

### Run

```bash
docker run -p 3002:3002 --env-file .env webexdx-taskify-service
```

The service will be available at `http://localhost:3002`.

## License

ISC

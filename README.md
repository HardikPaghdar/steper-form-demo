# Multi-Step Form Demo

A full-stack stepper-form demo using React, Redux, Node.js, MongoDB, Socket.IO, and RabbitMQ. The repository has separate `frontend-app/` and `backend-app/` projects.

## Requirements

- Node.js 20 or later
- npm or Yarn
- MongoDB
- RabbitMQ
- Socket.IO configuration used by the backend

## Frontend

```bash
cd frontend-app
npm install
cp .env.example .env
npm run dev
```

Set `VITE_API_URL` and `VITE_SOCKET_URL` in your local `.env` to the actual backend and Socket.IO URLs. The example uses placeholders that must be replaced. Build with `npm run build`.

## Backend

```bash
cd backend-app
npm install
cp .env.example .env
npm start
```

Set the backend port, database settings, and RabbitMQ URL in the local `.env`. The example file contains placeholders only. If using the sample database, create `stepper-form-db` and import the dump files in `DbDump/` as appropriate for the current schema.

## Before deploying

Verify frontend/backend ports, database configuration, RabbitMQ and Socket.IO settings, authentication/authorization, and error handling. Sample database dumps may contain test data; review them before sharing or using in production. Keep credentials and real user data out of source control.

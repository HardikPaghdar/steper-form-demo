# Multi-Step Form Demo

A full-stack stepper-form demo using React, Redux, Node.js, MongoDB, Socket.IO, and RabbitMQ. The README describes separate frontend and backend setup.

## Requirements

- Node.js 20 or later
- npm or Yarn
- MongoDB
- RabbitMQ
- Socket.IO configuration used by the backend

## Frontend

From the frontend directory:

```bash
npm install
npm run dev
npm run build
```

Use the package manager and scripts defined by the frontend's `package.json` if they differ.

## Backend

1. Copy the tracked example environment file to a local `.env` file and configure values for your machine. Do not commit the resulting `.env`.
2. Install dependencies from the backend directory:

   ```bash
   npm install
   ```

3. Start the backend using the script in `package.json`, or the documented command:

   ```bash
   npm start
   ```

4. If using the sample database, create `stepper-form-db` and import the dump files in `DbDump/` as appropriate for the current schema.

## Before deploying

Verify the frontend/backend ports, database configuration, RabbitMQ and Socket.IO connection settings, authentication/authorization, and error handling. Sample database dumps may contain test data; review them before sharing or using in production. Keep credentials and real user data out of source control.

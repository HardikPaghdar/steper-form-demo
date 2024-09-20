# Multi Step Form API

## Requirements
- Node.js version 20 or greater
- MongoDB server
- RabbitMQ installed on system
- SocketIO server

## Setup

#### 1. Rename file
Rename `env.example` to `.env` and configure it according to your local machine requirements by adding the necessary parameters.

#### 2. Install Node.js dependencies:
   ```bash
   npm install
   ````
#### 3. Start Node.js project:
   ```bash
   nodemon server.js 
   ```
   or
   ```bash
   node server.js 
   ```
   or
   ```bash
   npm start 
   ```

#### 4. Import data into DB:
   ```bash
   Make a new database named `stepper-form-db` and import dump data files stored in `DbDump` folder.
   ````


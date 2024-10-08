# steper-form-demo
Multi Step form with React, Redux, RabbitMQ, Socket.io, NodeJS, MongoDB

# Frontend App
Running the Application
To start the development server and view the Stepper Form in your browser:

**Prerequisites**

Ensure that you have the following installed:

Node.js (version 20 or higher)
npm or Yarn package manager

``npm install``

To run the project

``npm run dev``

To create a build

``npm run build``

# Backend App

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

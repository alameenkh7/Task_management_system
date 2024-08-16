# Task Management System

## Overview

This repository contains a task management system implemented using NestJS in a monorepo setup. The system includes multiple microservices:

This repository contains a task management system implemented using NestJS in a monorepo setup. The system includes multiple microservices:

- **Nashville**: Web API (Backend Facing Frontend)
- **Gallatin**: Task Manager microservice
- **Ashland**: Logger microservice

## Prerequisites

Before you start, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Setup
### 1. Clone the Repository
First, clone the repository to your local machine:

```bash
git clone https://github.com/your-repository/task-management-system.git
cd task-management-system
```

### 2. Install Dependencies
Install the dependencies for all microservices and the monorepo:

```bash
npm install
```

### 3. Configure Environment Variables
Each microservice may require different environment variables. Ensure that you create .env files in the root directory of each microservice (apps/nashville, apps/gallatin, apps/ashland) with the appropriate configuration.

Example .env for Nashville (apps/nashville/.env):

```bash
PORT=3001
```
Example .env for Gallatin (apps/gallatin/.env):

```bash
PORT=3002
```

Example .env for Ashland (apps/ashland/.env):

```bash
PORT=3003
```
### 4. Build All Microservices
To build all microservices, use the following command:

```bash
npm run build:all
```

This command will:

Navigate to each microservice directory
Run the npm run build command for each service
Compile TypeScript files into JavaScript

### 5. Running the Services
To run all microservices, you can use the following commands:

Start Individual Microservices
Nashville:

```bash
cd apps/nashville
npm run start
```
Gallatin:

```bash
cd apps/gallatin
npm run start
```

Ashland:

```bash
cd apps/ashland
npm run start
```

Start All Services Simultaneously
To start all services at once, you can use:

```bash
npm run start:all
```

Ensure that each service is configured to listen on a different port (3001, 3002, 3003, etc.) to avoid port conflicts.

### 6. Verify the Setup
Once all services are running:

Nashville should be accessible at http://localhost:3001
Gallatin should be accessible at http://localhost:3002
Ashland should be accessible at http://localhost:3003
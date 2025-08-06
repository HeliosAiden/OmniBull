# OmniBull Backend Setup Guide

  

This guide will help you set up and run the backend for the OmniBull project, including a PostgreSQL database using Docker Compose and Prisma for database migrations.


---

  

## 📦 Prerequisites

  

Make sure the following tools are installed on your machine:

  

- [Docker](https://www.docker.com/)

- [Docker Compose](https://docs.docker.com/compose/)

- [Node.js (v18+ recommended)](https://nodejs.org/)

- [Yarn](https://classic.yarnpkg.com/en/docs/install/)

  

---

  

## ⚙️ Environment Configuration

  

Create a `.env` file at the root of the project with the following content:

  

```env

# Database config

POSTGRES_USER=admin

POSTGRES_PASSWORD=secret_password

POSTGRES_DB=omnibull_db

POSTGRES_PORT=5432

  

# Backend config

BACKEND_PORT=8000

DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${POSTGRES_PORT}/${POSTGRES_DB}

JWT_SECRET=your_jwt_secret_here

ENCRYPTION_KEY=your_encryption_key_here

```
##  Run Docker Compose

From the `backend` directory, run:
```
docker compose up -d --build
```
This will spin up a PostgreSQL container using the configuration from your `docker-compose.yml`.

To check the running container:
```
sudo docker ps -a
```
You should see something like:
```
CONTAINER ID   IMAGE         COMMAND                  CREATED          STATUS          PORTS                                         NAMES
CONTAINER_ID   postgres:16   "docker-entrypoint.s…"   x minutes ago   Up x minutes   0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp   omni_bull_db
```


##  Initialize & Migrate Prisma

Install Dependencies
```
yarn install
```
Generate Prisma Client
```
yarn prisma generate
```

Migrate with existing schema:

```
yarn prisma migrate dev --name init
```
Your database should now have all the tables it need
To start developing, run:
 
```
yarn dev
```

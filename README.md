# Product Catalog

## Table of contents
1. [Installing](#installing)
2. [Prisma](#prisma)

## Technologies Used

Next.js, Nest.js, TypeScript, Prisma, Stripe, MySQL, sass, Redux Toolkit, Formik

## Installing

### Getting Started

To get started with the project(backend and frontend), follow these steps:

- Go to backend folder:
  ```bash
    cd backend
  ```
  
- Install all dependencies:
  ```bash
    npm install
  ```

- Generate prisma:
  ```bash
    npm run prisma:generate
  ```

- Go to frontend folder:
  ```bash
    cd frontend
  ```

- Install all dependencies:
  ```bash
    npm install
  ```

### Environment Configuration

Each app includes an example.env file. You should create the environment files in each app (.env). 

You can use the example.env file as a template.

### Running the Backend

- Development:
  ```bash
    npm run start:dev
  ```

- Production:
  ```bash
    npm run start
  ```

### Running the Frontend

- Development:
  ```bash
    npm run dev
  ```

- Production:
  ```bash
    npm run start
  ```

## Prisma

To get started with Prisma

- Generate prisma:
  ```bash
    npm run prisma:generate
  ```

- Get new changes from db:
  ```bash
    npm run prisma:pull
  ```

- Push new changes from schema to db:
  ```bash
    npm run prisma:push
  ```
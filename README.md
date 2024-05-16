<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app
Prerequisite: Set up a Postgres server locally with the following credentials
 ```json
 {
  "username": "postgres",
  "password": "postgres",
  "database": "task-management",
 }
 ```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Alternatively, if you have Docker Installed, you can run Docker compose up.
App runs on port 4000

# Data Models

## User
```json
  {
    "id": "string - Unique identifier",
    "username": "string",
    "tasks": "Task array"
  }
```

## Task
```json
  {
    "id": "string - Unique identifier",
    "title": "string",
    "description": "string",
    "status": "string ENUM('OPEN'`, `'IN_PROGRESS'`, `'DONE')"
  }
```

# API Documentation

This document provides information about the authentication API endpoints.

## Signing Up

- **Endpoint:** `POST /auth/signup`
- **Description:** This endpoint allows users to sign up by providing a username and a strong password.
- **Request Body:**
  ```json
  {
    "username": "string (4-16 characters)",
    "password": "string (8-32 characters, at least one uppercase letter, one lowercase letter, one number or special character)"
  }

- **Response:**
- **Status:** `201 Created`
- **Body:** `None`

## Signing In

- **Endpoint:** `POST /auth/signin`
- **Description:** This endpoint allows users to sign in by providing their credentials (Username and password)
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }

- **Response:**
- **Status:** `201 OK`
- **Body:**
  ```json
  {
    "accessToken": "string"
  }

## Get Tasks

- **Endpoint:** `GET /tasks`
- **Description:** This endpoint retrieves tasks based on optional filtering criteria.
- **Query Parameters:**
  - `status` (optional): Task status (`'OPEN'`, `'IN_PROGRESS'`, `'DONE'`)
  - `search` (optional): Search query string
- **Request Header:** JWT token for user authentication
- **Response:**
  - **Status:** 200 OK
  - **Body:** Array of tasks

## Create Task

- **Endpoint:** `POST /tasks`
- **Description:** This endpoint creates a new task.
- **Request Body:**
  ```json
  {
    "title": "string (required)",
    "description": "string (required)"
  }
- **Response:**
- **Status:** `200 OK`
- **Body:**
  ```json
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "status": "string",
  }

## Get Single Task

- **Endpoint:** `POST /tasks/:id`
- **Description:** This endpoint retrieves a single task by ID.
- **Path Parameter:**
  - `id` (required): Task id (string)
- **Request Body:** `None`
- **Response:**
- **Status:** `200 OK`
- **Body:**
  ```json
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "status": "string",
    "user": "User Object"
  }

## Delete Single Task

- **Endpoint:** `DELETE /tasks/:id`
- **Description:** This endpoint deletes a single task by ID.
- **Path Parameter:**
  - `id` (required): Task id (string)
- **Request Body:** `None`
- **Response:**
- **Status:** `200 OK`
- **Body:** `Array of remaining tasks`

## Update Task Status

- **Endpoint:** `PATCH /tasks/:id/status`
- **Description:** This endpoint updates the status of a single task by ID. 
- **Path Parameter:**
  - `id` (required): Task id (string)
- **Request Body:**
  ```json
  {
    "status": "string (required, 'OPEN', 'IN_PROGRESS', 'DONE')"
  }
- **Response:**
- **Status:** `200 OK`
- **Body:**
  ```json
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "status": "string",
    "user": "User Object"
  }

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

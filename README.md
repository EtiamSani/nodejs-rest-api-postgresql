# REST API with Postgresql

## Purpose

This project serves as a REST API implementation that performs CRUD operations on PostgreSQL and includes an authentication system for user signup and signin.

## Usage

Navigate to the "back" folder and follow these steps:

Install dependencies:

```npm install```

Set up the local environment with Docker Compose:

```docker-compose up -d```

Run server locally

```node server.js or nodemon server.js```

Database seeding

navigate to the "script" folder then : 

```node seedingDB.js```

Tear down local environment with docker-compose

```docker-compose down```


### Local

We use docker-compose to setup local environment (postgreSQL and pgAdmin4)

### Env variables

Use `.env.example` to generate your `.env` file

## Authentication

Users must be authorized with a JSON Web Token (JWT) to access their data.

Include the following header in your requests:

```Authorization: Bearer jwt-token```

## Roles 

The application supports role-based access control. Each user has an associated role, determining their level of access. The following roles are available:

    - Admin: Full access to all resources and operations.
    - User: Standard user role with limited privileges.

To assign a role during user creation, include the role parameter in the signup request:

POST /auth/signup

```
{
  "email":"user@example.com",
  "username": "example",
  "password": "securepassword",
  "role": "user" // or "admin" for admin privileges
}
```


### Routes

The following routes require authentication:

```
GET /products
GET /products/:id
PATCH /products/:id
POST /products
DELETE /products/:id
```

The following routes require authentication and admin role:

```
PATCH /products/:id
POST /products
DELETE /products/:id
```

## Structure

```
├───back
│   │   .env
│   │   .env.example
│   │   .gitignore
│   │   app.js
│   │   docker-compose.yml
│   │   package-lock.json
│   │   package.json
│   │   server.js
│   │   
│   ├───app
│       ├───controller
│       │       authController.js
│       │       productController.js
│       │       
│       ├───db
│       │       init_tables.sql
│       │       pg.js
│       │       
│       ├───middlewares
│       │       index.js
│       │       isAdminMiddleware.js
│       │       isAuthMiddleware.js
│       │       
│       ├───model
│       │       coreDatamapper.js
│       │       productsModel.js
│       │       usersModel.js
│       │       
│       ├───routes
│       │       authRoute.js
│       │       productsRoute.js
│       │       
│       └───script
│               .env
│               products.json
│               seedingDB.js
```

- app: contains REST API routes
    - controller: Contains controllers for authentication and products.
    - routes: Contains routes for authentication and products.
    - db: Includes scripts and configurations related to the database. It contains init_tables.sql for initializing database tables and pg.js for PostgreSQL database connections.
    - middlewares: Holds middleware functions used in the request-response cycle. The index.js file typically exports all middleware functions, and specific middleware, such as isAdminMiddleware.js and isAuthMiddleware.js, handle authorization and authentication checks.
    - model: Consists of model files defining the data structures and database interactions. coreDatamapper.js serves as a foundational data mapper, while productsModel.js and usersModel.js define specific models for products and users, respectively.
    - script: Contains scripts. The seedingDB.js script, for instance, is responsible for seeding the database with initial data.


## Overview
CNS Admin API is a backend service built with Express.js that provides user authentication, user management, and service request functionality. This API uses MongoDB as its database and JWT for authentication.

## Table of Contents
1. [Environment Configuration](#environment-configuration)
2. [Database Connection](#database-connection)
3. [API Routes](#api-routes)
4. [Authentication](#authentication)
5. [User Management](#user-management)
6. [Service Requests](#service-requests)
7. [Error Handling](#error-handling)
8. [Project Structure](#project-structure)


## Database Connection
The application connects to MongoDB using Mongoose. The connection is established when the server starts.

## API Routes

The API has the following base routes:

- `/api/v1/auth`: Authentication routes
- `/api/v1/users`: User management routes
- `/api/v1/serviceRequest`: Service request routes
- `/`: Welcome route

## Authentication

### Endpoints

#### Register
- **Route**: POST `/api/v1/auth/register`
- **Description**: Creates a new user account
- **Request Body**:
```json
{
    "admin": boolean,
    "userName": string,
    "password": string,
    "email": string
  }
```

- **Response**:
```json
{
    "success": true,
    "message": "User successfully registered",
    "token": "jwt_token"
  }
```


#### Login
- **Route**: POST `/api/v1/auth/login`
- **Description**: Authenticates a user
- **Request Body**:
```json
{
    "email": string,
    "password": string
  }
```

- **Response**:
```json
{
    "success": true,
    "message": "User successfully logged in",
    "data": {
      "user": {/* user object */},
      "token": "jwt_token"
    }
  }
```


### Authentication Middleware

The `authorize` middleware verifies the JWT token provided in cookies and adds the user to the request object if authentication is successful.

## User Management

### Endpoints

#### Get All Users
- **Route**: GET `/api/v1/users/`
- **Description**: Retrieves all users
- **Authentication**: Required
- **Response**:
```json
{
    "success": true,
    "data": [/* array of user objects */]
  }
```


#### Get User by ID
- **Route**: GET `/api/v1/users/:id`
- **Description**: Retrieves a specific user by ID
- **Authentication**: Required
- **Response**:
```json
{
    "success": true,
    "data": {/* user object without password */}
  }
```


## Service Requests

### Endpoints

The service request endpoints allow creating, retrieving, updating, and deleting service requests.

#### Get All Service Requests
- **Route**: GET `/api/v1/serviceRequest/`
- **Authentication**: Required

#### Create Service Request
- **Route**: POST `/api/v1/serviceRequest/`
- **Authentication**: Not required

#### Get Service Request by ID
- **Route**: GET `/api/v1/serviceRequest/:id`
- **Authentication**: Required

#### Delete Service Request
- **Route**: DELETE `/api/v1/serviceRequest/:id`
- **Authentication**: Required

#### Update Service Request
- **Route**: PUT `/api/v1/serviceRequest/:id`
- **Authentication**: Required

#### Partially Update Service Request
- **Route**: PATCH `/api/v1/serviceRequest/:id`
- **Authentication**: Required

#### Update Status
- **Route**: PATCH `/api/v1/serviceRequest/:id/status`
- **Authentication**: Required

#### Update Rating and Review
- **Route**: PATCH `/api/v1/serviceRequest/:id/review`
- **Authentication**: Not required

#### Update Price Estimate
- **Route**: PATCH `/api/v1/serviceRequest/:id/price`
- **Authentication**: Required

## Error Handling

The application uses a centralized error handling middleware that formats error responses consistently:

```json
{
  "success": false,
  "error": {
    "message": "Error message"
  }
}
```


Common error types handled:
- CastError (404): Resource not found
- ValidationError (400): Invalid input data
- JsonWebTokenError (401): Invalid token
- Duplicate key errors (409): Duplicate field value entered

## Project Structure

```
/
├── app.js                    # Main application entry point
├── config/
│   └── env.js                # Environment variable configuration
├── controllers/
│   ├── auth.controller.js    # Authentication controller
│   ├── user.controller.js    # User management controller
│   └── serviceRequest.controllers,js.js  # Service request controller
├── database/
│   └── mongodb.js            # MongoDB connection setup
├── middleware/
│   ├── auth.middleware.js    # Authentication middleware
│   └── error.middleware.js   # Error handling middleware
├── models/
│   └── users.model.js        # User data model
├── routes/
│   ├── auth.routes.js        # Authentication routes
│   ├── user.routes.js        # User management routes
│   └── serviceRequest.routes.js  # Service request routes
└── .env.*.local              # Environment configuration files
```


## User Model

The user model schema includes:
- `admin` (Boolean): Indicates if the user has admin privileges
- `userName` (String): The user's display name
- `password` (String): Hashed password for authentication
- `email` (String): User's email address (unique)

The schema includes validation for all fields and timestamps for creation and updates.

## Security Features

- Password hashing using bcryptjs
- JWT token-based authentication
- Secure cookie options for production
- MongoDB session transactions for critical operations

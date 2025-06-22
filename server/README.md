# MERN Authentication Project - Server

This is the backend server component of the MERN Authentication Project. It provides a robust API for user authentication, email verification, and password reset functionality.

## Technology Stack

### Core Technologies
- **Node.js**: JavaScript runtime environment for executing server-side code
- **Express.js**: Web application framework for building RESTful APIs
- **MongoDB**: NoSQL database for storing user data
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB

### Authentication & Security
- **JSON Web Tokens (JWT)**: For secure authentication and authorization
- **bcrypt**: Library for hashing and comparing passwords
- **cookie-parser**: Middleware for handling HTTP cookies
- **dotenv**: For managing environment variables
- **cors**: Middleware for enabling Cross-Origin Resource Sharing
- **helmet**: Middleware to set secure HTTP headers

### Email Services
- **Nodemailer**: Library for sending emails (verification and password reset)
- **Handlebars**: Templating engine for creating email templates

### Development Tools
- **Nodemon**: Development tool for automatically restarting the server on file changes

## API Endpoints

### Authentication Routes
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Authenticate a user and return a token
- `GET /api/auth/logout`: Log out the current user
- `GET /api/auth/isAuthenticated`: Check if the user is authenticated

### Email Verification Routes
- `POST /api/auth/send-verify-otp`: Send a verification OTP to the user's email
- `POST /api/auth/verify-email`: Verify user's email using OTP

### Password Reset Routes
- `POST /api/auth/send-reset-otp`: Send a password reset OTP to the user's email
- `POST /api/auth/verify-reset-otp`: Verify reset OTP and allow password reset

### User Routes
- `GET /api/user/profile`: Get the current user's profile
- `PUT /api/user/profile`: Update the current user's profile

## Project Structure

```
server/
  ├── config/            # Configuration files
  │   ├── mongodb.js     # MongoDB connection setup
  │   └── nodemailer.js  # Email service configuration
  ├── controller/        # Request handlers
  │   ├── auth.controller.js   # Authentication controllers
  │   └── user.controller.js   # User-related controllers
  ├── middlewares/       # Express middlewares
  │   └── auth.middleware.js   # Authentication middleware
  ├── models/            # Database models
  │   └── user.model.js  # User model schema
  ├── routes/            # API routes
  │   ├── authRoute.js   # Authentication routes
  │   └── user.Routes.js # User-related routes
  ├── server.js          # Main application entry point
  └── package.json       # Project dependencies
```

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=8000
   DB_URL=mongodb://localhost:27017/mern_auth
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   CLIENT_URL=http://localhost:5173
   ```

3. Start the server:
   ```
   # Development mode with Nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

## Security Features

- HTTP-only cookies for storing JWT tokens
- Password hashing with bcrypt
- CORS protection for API routes
- Secure HTTP headers with Helmet
- Environment variable protection with dotenv
- OTP-based email verification and password reset
- Token expiration and refresh mechanism

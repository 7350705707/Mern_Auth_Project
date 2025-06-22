# MERN Authentication Project

A comprehensive authentication system built with the MERN stack (MongoDB, Express.js, React, and Node.js), featuring user registration, login, email verification, and password reset functionality.

## Features

- User registration with email verification
- Secure login with JWT authentication
- Password reset via email
- Protected routes and user sessions
- Modern, responsive UI built with Tailwind CSS
- Form validation
- Toast notifications for user feedback
- OTP verification system for email verification
- Persistent authentication with HTTP-only cookies

## Technology Stack

### Frontend

- **React 19**: Latest version of the React library for building dynamic user interfaces
- **Vite**: Next-generation frontend tooling for faster development and optimized builds
- **React Router (v7)**: For client-side routing and navigation
- **TanStack Query (React Query)**: For efficient server state management and data fetching
- **Axios**: Promise-based HTTP client for API requests
- **React Cookie**: For cookie management
- **React Toastify**: For displaying toast notifications
- **Tailwind CSS 4**: Utility-first CSS framework for styling
- **FontAwesome Icons**: For UI icons and visual elements

### Backend

- **Node.js**: JavaScript runtime for the server
- **Express.js 5**: Web framework for Node.js
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: MongoDB object modeling tool
- **JSON Web Token (JWT)**: For secure authentication
- **bcryptjs**: For password hashing
- **Nodemailer**: For sending verification and password reset emails
- **Cookie-Parser**: Middleware for parsing cookies
- **CORS**: Cross-Origin Resource Sharing middleware for secure API requests
- **dotenv**: For environment variable management
- **nodemon**: For development server auto-restart

## Project Structure

```
.
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   └── src/                # React source files
│       ├── assets/         # Images, icons, and other assets
│       ├── components/     # Reusable UI components
│       ├── context/        # React context for state management
│       └── pages/          # React page components
└── server/                 # Backend Node.js application
    ├── config/             # Configuration files
    ├── controller/         # Request controllers
    ├── middlewares/        # Express middlewares
    ├── models/             # Mongoose database models
    └── routes/             # API route definitions
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Mern_Auth_Project
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

4. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   DB_URL=mongodb://localhost:27017/mern_auth
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   CLIENT_URL=http://localhost:5173
   ```

### Running the Application

1. Start the server:
   ```bash
   cd server
   npm run dev
   ```

2. Start the client:
   ```bash
   cd client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

- **POST /api/auth/register**: Register a new user
- **POST /api/auth/login**: User login
- **GET /api/auth/logout**: User logout
- **POST /api/auth/send-verify-otp**: Send email verification OTP
- **POST /api/auth/verify-email**: Verify email with OTP
- **POST /api/auth/send-reset-otp**: Send password reset OTP
- **POST /api/auth/verify-reset-otp**: Verify reset OTP and update password
- **GET /api/auth/authenticated**: Check if user is authenticated

## Security Features

- Passwords hashed using bcrypt
- JWT authentication with HTTP-only cookies
- CSRF protection
- OTP expiration for verification links
- Secure HTTP headers
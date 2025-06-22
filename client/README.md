# MERN Authentication Project - Client

This is the frontend client component of the MERN Authentication Project. It provides a modern, responsive user interface for authentication features including registration, login, email verification, and password reset.

## Technology Stack

### Core Technologies
- **React**: JavaScript library for building user interfaces
- **Vite**: Next-generation frontend tooling for faster development
- **React Router Dom**: Library for handling routing in React applications
- **Context API**: React's built-in state management for app-wide state

### API Communication & Data Management
- **Axios**: Promise-based HTTP client for making API requests
- **TanStack Query (React Query)**: Data fetching and state management library
- **React Query DevTools**: Development tools for debugging React Query

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **React Icons**: Library providing popular icon sets as React components
- **Hero Icons**: Collection of SVG icons designed by the Tailwind CSS team

### Form Management
- **React Hook Form**: Library for flexible form handling with validation
- **Zod**: TypeScript-first schema validation library

### User Experience
- **React Hot Toast**: Lightweight notification library for user feedback
- **React Spinners**: Loading spinner components for React

## Project Structure

```
client/
  ├── public/            # Static files
  │   ├── favicon.svg    # Website favicon
  │   └── bg_img.png     # Background image
  ├── src/               # Source code
  │   ├── assets/        # Static assets
  │   │   ├── assets.js  # Assets exports
  │   │   └── ...        # Images, icons and email templates
  │   ├── components/    # Reusable UI components
  │   │   ├── Header.jsx # App header component
  │   │   └── Navbar.jsx # Navigation component
  │   ├── context/       # React context providers
  │   │   └── AppContext.jsx # Global app state
  │   ├── pages/         # Application pages
  │   │   ├── Home.jsx           # Dashboard page
  │   │   ├── Login.jsx          # Authentication page
  │   │   ├── ResetPassword.jsx  # Password reset page
  │   │   └── VerifyEmail.jsx    # Email verification page
  │   ├── App.jsx        # Main application component
  │   ├── main.jsx       # Entry point with providers
  │   └── index.css      # Global styles
  ├── index.html         # HTML template
  ├── vite.config.js     # Vite configuration
  ├── package.json       # Project dependencies
  └── eslint.config.js   # ESLint configuration
```

## Features Implementation

### Authentication Flows
- **User Registration**: Form with name, email, and password fields
- **Login System**: Secure authentication with JWT stored in HTTP-only cookies
- **Email Verification**: OTP-based verification system with auto-focus inputs
- **Password Reset**: Secure password reset flow with email verification

### UI Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Form Validation**: Real-time feedback on input errors
- **Loading States**: Visual feedback during asynchronous operations
- **Toast Notifications**: User-friendly feedback for actions and errors
- **Protected Routes**: Navigation guards for authenticated sections

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with:
   ```
   VITE_BACKEND_URL=http://localhost:8000
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Build for production:
   ```
   npm run build
   ```

## Development Tools

- **ESLint**: For code linting and enforcing best practices
- **Vite's Hot Module Replacement (HMR)**: For fast refresh during development
- **React Query DevTools**: For monitoring API calls and cache state

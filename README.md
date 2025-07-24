# 📱 PhoneBook App

A full-stack web application for managing contacts with user authentication, Google OAuth, file uploads, email features, and advanced filtering. Built with React frontend and Node.js backend.

## 🏗️ Project Structure

```
phonebook-app/
├── backend/          # Node.js/Express server
├── frontend/         # React application
└── README.md        # This file
```

## 🔧 Technologies

### Frontend

- **React 19** - User interface library
- **Redux Toolkit** - State management
- **React Router DOM 7** - Client-side routing
- **Vite 7** - Build tool and development server
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Icons** - Icon library
- **React Loader Spinner** - Loading states

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Passport.js + passport-google-oauth20** - Google OAuth
- **Multer** - File uploads
- **Cloudinary** - Image hosting
- **Nodemailer** - Email sending
- **bcrypt** - Password hashing

## 🌟 Features

### Authentication

- ✅ User registration and login
- ✅ Google account login via OAuth
- ✅ JWT token-based authentication
- ✅ Password reset via email
- ✅ Automatic session refresh
- ✅ Protected routes

### Contact Management

- ✅ Add, edit, delete contacts
- ✅ Upload contact photos
- ✅ Mark contacts as favorites
- ✅ Contact types (personal, work, etc.)
- ✅ Search and filter contacts
- ✅ Pagination for large contact lists
- ✅ Sort contacts by different criteria

### Advanced Features

- ✅ File upload to Cloudinary
- ✅ Email notifications
- ✅ Responsive design
- ✅ Error handling and validation
- ✅ Loading states and user feedback
- ✅ Modern UI with CSS modules

## 📦 Deployment

### Frontend Deployment - Vercel

### Backend Deployment - Render

## 👨‍💻 Author

Created with ❤️ by a passionate developer

## 🛠️ Future Improvements

1. Refine the reset password functionality for enhanced security and usability.
2. Replace CSS modules with Tailwind CSS for faster development and a modern look.
3. Add TypeScript for improved code stability and maintainability.
4. Increase unit test coverage for core business logic.
5. Integrate automatic code formatting (Prettier) and linting (ESLint).
6. Add additional types of notifications to the existing notifications system

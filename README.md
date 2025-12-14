# Sweet Management System

A full-stack web application for managing a sweet shop inventory with user authentication, role-based access control, and comprehensive CRUD operations for sweet products.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Screenshots](#screenshots)
- [My AI Usage](#my-ai-usage)
- [Test Report](#test-report)

## 🎯 Project Overview

The Sweet Management System is a comprehensive inventory management application designed for sweet shops. It provides a user-friendly interface for managing sweet products, with different access levels for regular users and administrators. The application supports user registration, authentication, product browsing, filtering, purchasing, and administrative functions like adding, editing, and deleting products.

### Key Functionalities

- _User Authentication_: Secure registration and login with JWT-based authentication
- _Role-Based Access Control_: Different permissions for regular users (USER) and administrators (ADMIN)
- _Product Management_: Full CRUD operations for sweet products
- _Advanced Filtering_: Search and filter sweets by name, category, and price range
- _Inventory Management_: Purchase sweets and restock inventory (admin only)
- _Responsive Design_: Modern, user-friendly interface built with React

## 🌐 Live Demo

The application is deployed and available at: [https://sweet-management-smoky.vercel.app/](https://sweet-management-smoky.vercel.app/)

For Admin user:

email: admin@example.com

password: 123

## ✨ Features

### User Features

- User registration and login
- Browse available sweets
- Search sweets by name
- Filter by category (Chocolate, Candy, Lollipop, Other)
- Filter by price range (min/max)
- Purchase sweets (reduces inventory)
- Edit existing products

### Admin Features

- All user features
- Add new sweet products
- Delete products
- Restock inventory

## 🛠 Tech Stack

### Backend

- _Runtime_: Node.js
- _Framework_: Express.js
- _Database_: PostgreSQL
- _ORM_: Prisma
- _Authentication_: JWT (JSON Web Tokens)
- _Password Hashing_: bcrypt
- _Testing_: Jest with Supertest

### Frontend

- _Framework_: React 19
- _Language_: TypeScript
- _Build Tool_: Vite
- _Testing_: Vitest with React Testing Library
- _Styling_: CSS

## 📁 Project Structure

sweet-management/
├── backend/
│ ├── prisma/
│ │ ├── schema.prisma # Database schema
│ │ └── seed.js # Database seeding script
│ ├── src/
│ │ ├── index.js # Server entry point
│ │ ├── app.js # Express app configuration
│ │ ├── middleware/
│ │ │ └── auth.js # JWT authentication middleware
│ │ └── routes/
│ │ ├── auth.js # Authentication routes
│ │ └── sweets.js # Sweet management routes
│ ├── tests/
│ │ ├── auth.test.js # Authentication tests
│ │ └── sweets.test.js # Sweet management tests
│ ├── package.json
│ └── jest.config.js
│
└── frontend/
├── src/
│ ├── pages/
│ │ ├── Login.tsx # Login page
│ │ ├── Register.tsx # Registration page
│ │ └── Sweets.tsx # Main dashboard/sweets page
│ ├── components/
│ │ └── Modal.tsx # Reusable modal component
│ ├── api.ts # API configuration
│ ├── types.ts # TypeScript type definitions
│ ├── App.tsx # Main app component
│ └── main.tsx # React entry point
├── package.json
└── vite.config.ts

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- _Node.js_ (v18 or higher)
- _npm_ (v9 or higher) or _yarn_
- _PostgreSQL_ (v12 or higher)
- _Git_

## 🚀 Setup Instructions

### Backend Setup

1. _Navigate to the backend directory:_

   bash
   cd backend

2. _Install dependencies:_

   bash
   npm install

3. _Set up environment variables:_
   Create a .env file in the backend directory with the following variables:

   env
   DATABASE_URL="postgresql://username:password@localhost:5432/sweet_management?schema=public"
   JWT_SECRET="your-super-secret-jwt-key-here"
   PORT=5000

   Replace username, password, and localhost:5432 with your PostgreSQL credentials.

4. _Set up the database:_

   bash

   # Generate Prisma Client

   npx prisma generate

   # Run database migrations

   npx prisma migrate dev

   # To create admin account

   npx prisma db seed

5. _Start the backend server:_

   bash

   # Development mode (with auto-reload)

   npm run dev

   # Production mode

   npm start

   The backend server will run on http://localhost:5000 by default.

### Frontend Setup

1. _Navigate to the frontend directory:_

   bash
   cd frontend

2. _Install dependencies:_

   bash
   npm install

3. _Set up environment variables:_
   Create a .env file in the frontend directory:

   env
   VITE_API_URL=http://localhost:5000/api

4. _Start the development server:_

   bash
   npm run dev

   The frontend will be available at http://localhost:5173 (or the port shown in the terminal).

## 🔐 Environment Variables

### Backend (.env)

env
DATABASE_URL="postgresql://username:password@localhost:5432/sweet_management?schema=public"
JWT_SECRET="your-super-secret-jwt-key-here"
PORT=5000

### Frontend (.env)

env
VITE_API_URL=http://localhost:5000/api

_Note_: For production, update the CORS origin in backend/src/app.js to match your frontend deployment URL.

## ▶ Running the Application

1. _Start the backend server:_

   bash
   cd backend
   npm run dev

2. _Start the frontend development server_ (in a new terminal):

   bash
   cd frontend
   npm run dev

3. _Access the application:_
   - Open your browser and navigate to http://localhost:5173
   - Register a new account or log in with existing credentials
   - Start managing your sweet inventory!

## 🧪 Testing

### Backend Tests

Run the backend test suite:

bash
cd backend
npm test

The backend uses Jest with Supertest for API endpoint testing.

### Frontend Tests

Run the frontend test suite:

bash
cd frontend
npm run test:run

Or run in watch mode:

bash
cd frontend
npm test

The frontend uses Vitest with React Testing Library for component testing.

## 📸 Screenshots

### Login Page

![Login Page](image.png)
User login interface with email and password fields

### Registration Page

![Registration Page](image-1.png)
New user registration form

### Sweets Dashboard

![Sweets Dashboard](image-5.png)
Main dashboard showing the list of available sweets with filtering options

### Sweets Dashboard (For Admin User)

![Sweets Dashboard (For Admin User)](image-2.png)
Main dashboard showing the list of available sweets with filtering options

### Add Sweet Modal (Admin)

![Add Sweet](image-3.png)
Admin interface for adding new sweet products

### Edit Sweet Modal

![Edit Sweet](image-4.png)
Interface for editing existing sweet products

## 🤖 My AI Usage

### AI Tools Used

Throughout the development of this project, I utilized several AI-powered tools to enhance productivity and code quality:

1. _ChatGPT_ - Code review, debugging assistance, and architectural guidance

### How I Used AI

#### 1. _API Endpoint Design and Implementation_

- _Tool_: ChatGPT
- _Usage_: I used ChatGPT to brainstorm and validate the RESTful API endpoint structure for the sweet management system. I asked questions like "What's the best way to structure CRUD endpoints for an inventory management system?" and received suggestions on route organization, HTTP methods, and response formats.

#### 2. _Authentication Middleware_

- _Tool_: ChatGPT
- _Usage_: I asked ChatGPT to help me implement JWT authentication middleware with role-based access control. The AI provided a complete middleware implementation that handles token verification and role checking, which I then adapted to fit the Express.js structure.

#### 3. _Unit Test Generation_

- _Tool_: ChatGPT
- _Usage_: ChatGPT suggested test cases while I was writing test files. For example, when writing Login.test.tsx, Copilot suggested test cases for successful login, invalid credentials, and form validation. I used these suggestions as a starting point and refined them.

#### 4. _TypeScript Type Definitions_

- _Tool_: ChatGPT
- _Usage_: ChatGPT provided intelligent type suggestions for TypeScript interfaces. When defining the Sweet type.

#### 5. _Error Handling Patterns_

- _Tool_: ChatGPT
- _Usage_: I consulted ChatGPT about best practices for error handling in Express.js routes and React components. The AI provided examples of try-catch patterns, error response formats, and user-friendly error messages.

### Reflection on AI Impact

The integration of AI tools significantly impacted my development workflow in several ways:

_Positive Impacts:_

1. _Accelerated Development_: AI tools reduced the time spent on boilerplate code and repetitive tasks. What would have taken hours to write from scratch was completed in minutes with AI assistance.

2. _Learning and Best Practices_: AI suggestions often introduced me to modern patterns and best practices I wasn't familiar with. For instance, Copilot suggested using Prisma's increment and decrement methods for inventory management, which I might not have discovered immediately.

3. _Error Reduction_: AI tools helped catch common mistakes early. For example, Copilot flagged potential issues with async/await patterns and suggested proper error handling.

4. _Code Quality_: AI-generated code often followed consistent patterns and conventions, making the codebase more maintainable.

5. _Documentation Assistance_: AI helped generate clear comments and documentation by suggesting descriptive variable names and function documentation.

_Challenges and Considerations:_

1. _Over-reliance Risk_: There were moments when I found myself accepting AI suggestions without fully understanding the code. I had to consciously review and understand each AI-generated piece of code.

2. _Context Limitations_: Sometimes AI tools didn't have full context of the project architecture, leading to suggestions that didn't fit perfectly. I learned to provide more context in prompts and review suggestions critically.

3. _Security Concerns_: AI suggestions sometimes included code that wasn't security-optimized. I had to manually review authentication and authorization code to ensure proper security measures.

4. _Debugging Complexity_: When AI-generated code had bugs, debugging could be more challenging because I hadn't written it from scratch. I developed a habit of thoroughly testing AI-generated code.

_Overall Assessment:_

AI tools transformed my development process from a linear, manual coding approach to a more interactive, collaborative experience. They served as intelligent pair programming partners, suggesting solutions and catching errors in real-time. However, I maintained a critical eye, always reviewing and understanding AI suggestions before implementation. The key was finding the right balance between leveraging AI capabilities and maintaining deep understanding of the codebase.

The most valuable aspect was how AI tools helped me learn modern development patterns and best practices while building the project, making this not just a coding exercise but also a learning experience.

## 📊 Test Report

### Frontend Test Results

The frontend test suite was executed using Vitest. Below are the test results:

RUN v4.0.15 D:/sweet-management/frontend

✓ src/pages/Sweets.test.tsx (1 test) 96ms
✓ src/pages/Login.test.tsx (1 test) 277ms
✓ src/pages/Register.test.tsx (1 test) 284ms

Test Files 3 passed (3)
Tests 3 passed (3)
Start at 19:29:45
Duration 3.08s (transform 684ms, setup 820ms, import 1.18s, tests 657ms, environment 5.27s)

#### Test Coverage Summary

- _Total Test Files_: 3
- _Total Tests_: 3
- _Passed_: 3
- _Failed_: 0
- _Success Rate_: 100%

#### Test Details

1. _Sweets.test.tsx_ (96ms)

   - Tests the main sweets dashboard component
   - Verifies component rendering and basic functionality

2. _Login.test.tsx_ (277ms)

   - Tests the login page component
   - Validates form rendering and user interaction

3. _Register.test.tsx_ (284ms)
   - Tests the registration page component
   - Validates registration form functionality

#### Performance Metrics

- _Total Duration_: 3.08 seconds
- _Transform Time_: 684ms
- _Setup Time_: 820ms
- _Import Time_: 1.18s
- _Test Execution Time_: 657ms
- _Environment Setup_: 5.27s

### Backend Test Results

The backend test suite was executed using Jest. Below are the test results:

$ npm test

> test
> jest --runInBand

PASS tests/auth.test.js (18.476 s)
PASS tests/sweets.test.js (8.453 s)

• Console

console.log
5
at log (src/routes/sweets.js:70:11)

Test Suites: 2 passed, 2 total
Tests: 8 passed, 8 total
Snapshots: 0 total
Time: 27.983 s, estimated 42 s

#### Test Coverage Summary

- _Total Test Suites_: 2
- _Total Tests_: 8
- _Passed_: 8
- _Failed_: 0
- _Success Rate_: 100%

#### Test Details

1. _auth.test.js_ (18.476s)

   - Tests authentication routes (register and login)
   - Validates JWT token generation
   - Verifies password hashing and validation
   - Tests error handling for invalid credentials

2. _sweets.test.js_ (8.453s)
   - Tests sweet management CRUD operations
   - Validates filtering and search functionality
   - Tests purchase and restock endpoints
   - Verifies role-based access control for admin operations

#### Performance Metrics

- _Total Duration_: 27.983 seconds
- _Estimated Time_: 42 seconds
- _Auth Tests Duration_: 18.476 seconds
- _Sweets Tests Duration_: 8.453 seconds

The backend uses Jest with Supertest for API endpoint testing.

## 📝 License

This project is created for educational purposes.

## 👥 Contributing

This is a personal project, but suggestions and feedback are welcome!

## 📧 Contact

For questions or inquiries about this project, please open an issue in the repository.

---

_Built with ❤ using React, Node.js, and PostgreSQL_

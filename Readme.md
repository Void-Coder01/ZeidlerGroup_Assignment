# TodoWallah - Task Management Application

## Description

A full-stack web application that enables users to manage their tasks and receive email reminders for upcoming deadlines. Users must register and log in to create and manage their todos.

## Tech Stack

**Frontend:** React.js, JavaScript, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Additional:** JWT Authentication, Nodemailer, Node-cron

## Features

- User authentication (Signup/Login)
- Create, read, update, and delete todos
- Set due dates and times for tasks
- Mark tasks as complete
- Email reminders 30 minutes before due time
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Gmail account (for email reminders)
- npm or yarn

## Local Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Void-Coder01/ZeidlerGroup_Assignment.git
cd ZeidlerGroup_Assignment
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

**Backend:**
```bash
cd backend
create a .env file 
```
Edit the `.env` file and add your credentials:
- `PORT` - Your Port number to run the application
- `MONGO_URI` - Your MongoDB connection string
- `JWT_SECRET` - Any random secure string
- `EMAIL_USER` - Your Gmail address
- `EMAIL_PASSWORD` - Gmail App Password
The default configuration should work for local development.

### 4. Run the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm start
# OR for development with auto-reload
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

### 5. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## Project Structure
```
ZeidlerGroup_Assignment/
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── Utils/
│   ├── .env.example
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── App.jsx
│   ├── .env.example
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /user/signup` - Register new user
- `POST /user/login` - User login
- `GET /user/logout` - User logout
- `GET /user/verify` - Verify authentication

### Todos
- `GET /user/my-todo` - Fetch all user todos
- `POST /user/todo` - Create new todo
- `PUT /user/update/:id` - Update todo
- `DELETE /user/delete/:id` - Delete todo
- `PATCH /user/complete/:id` - Toggle completion status

## Environment Variables

Refer to `.env.example` files in both `backend` and `frontend` folders for required environment variables.

**Note:** Never commit `.env` files to version control. They contain sensitive credentials.

## Gmail App Password Setup

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Navigate to [App Passwords](https://myaccount.google.com/apppasswords)
4. Generate a new app password
5. Copy and paste into your `.env` file

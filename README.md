![registerPage](https://github.com/SiddheshJagdale/chat-app/blob/master/Images/register.png)
![setAvatarPage](https://github.com/SiddheshJagdale/chat-app/blob/master/Images/setAvatar.png)
![chatPage](https://github.com/SiddheshJagdale/chat-app/blob/master/Images/chat.png)
![chatPage2](https://github.com/SiddheshJagdale/chat-app/blob/master/Images/chat2.png)




# ChatApp

## Overview

ChatApp is a real-time chat application built using the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to register, log in, and chat with other users in real-time. The app features user authentication, persistent chat history, and a responsive user interface.

## Features

- User registration and authentication
- Real-time messaging with Socket.io
- Persistent chat history stored in MongoDB
- Responsive design for both desktop and mobile devices
- User-friendly interface

## Technologies Used

- **Frontend**: React, Axios, CSS (Bootstrap)
- **Backend**: Node.js, Express.js, Socket.io
- **Database**: MongoDB, Mongoose
- **Authentication**: bcrypt
- **Other**: dotenv for environment variables

## Installation

### Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher) or yarn
- MongoDB

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/SiddheshJagdale/chatapp.git
   cd chatapp
   ```

2. Install dependencies for both the frontend and backend:

   **Backend**
   ```bash
   cd backend
   npm install
   ```

   **Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:

   **Backend**
   ```bash
   cd backend
   npm run dev
   ```

   **Frontend**
   ```bash
   cd ../frontend
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. Register a new user account or log in with an existing account.
2. Start a new conversation by selecting a user from the user list.
3. Send and receive messages in real-time.

## Project Structure

```
chatapp/
│
├── backend/            # Backend source files
│   ├── config/         # Configuration files
│   ├── controllers/    # Controllers for handling requests
│   ├── models/         # Mongoose models
│   ├── routes/         # Express routes
│   ├── server.js       # Entry point for the backend
│   └── .env            # Environment variables
│
├── frontend/           # Frontend source files
│   ├── public/         # Public assets
│   ├── src/            # React source files
│   │   ├── components/ # React components
│   │   ├── pages/      # React pages
│   │   ├── App.js      # Main React component
│   │   └── index.js    # Entry point for the frontend
│   │   
│   └── .env            # Environment variables
│
└── README.md           # This README file
```


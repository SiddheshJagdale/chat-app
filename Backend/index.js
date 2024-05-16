//Required Imports
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "../server/routes/userRoutes.js";
import bodyParser from "body-parser";
import messageRouter from "./routes/messageRoutes.js";
import { Socket, Server } from "socket.io";
dotenv.config();

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const port = process.env.PORT;
const mongoDBUrl = process.env.MONGO_DB_URL;
const app = express();

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(messageRouter);

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});

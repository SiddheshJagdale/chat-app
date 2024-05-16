import { addMessage,getMessages } from "../controllers/messageController.js";
import { Router } from "express";

const messageRouter = Router();

messageRouter.post("/addmsg", addMessage);
messageRouter.post("/getmsg", getMessages);

export default  messageRouter;
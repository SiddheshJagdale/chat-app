// Required Imports
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Logout from "./Logout.jsx";
import ChatInput from "./ChatInput.jsx";
import Axios from "axios";
import { recieveMessageRoute, sendMessageRoute } from "../utils/APIRoutes.js";
import { v4 as uuidv4 } from "uuid";

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function ChatContainer({ currentChat, currentUser, socket }) {
  // Hooks
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const getMessages = async () => {
      const response = await Axios.post(recieveMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    };
    if (currentChat) {
      getMessages();
    }
  }, [currentChat]);
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // Handling submit
  const handleSendMessage = async (message) => {
    const { data } = await Axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: message,
    });

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      message,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: message });
    setMessages(msgs);
  };
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <Container>
      <div className="chat-header">
        <div className="chat-avatar">
          <img
            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
            alt="avatar"
          />
        </div>
        <div className="chat-username">
          <h2>{currentChat.username}</h2>
        </div>
        <div>
          <Logout />
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ChatInput handleSendMessage={handleSendMessage} />
    </Container>
  );
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//CSS Styling
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 12px;
    background-color: #2c7865;
  }
  .chat-avatar {
    height: 3rem;

    img {
      height: 100%;
    }
  }
  .chat-username {
    color: #ffff;
    text-transform: capitalize;
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    background-color: #d9edbf;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: ##ff9800;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #ffff;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #2c7865;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #ff9800;
      }
    }
  }
`;
export default ChatContainer;

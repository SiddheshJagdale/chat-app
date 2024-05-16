// Required Imports
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import bg from "../img/more-leaves.png";
import { allUsersRoute } from "../utils/APIRoutes";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";
import { host } from "../utils/APIRoutes";

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const Chat = () => {
  // Hooks

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();
  const socket = useRef();
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    const setData = async () => {
      if (!localStorage.getItem(process.env.APP_KEY)) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem(process.env.APP_KEY)));
      }
    };
    setData();
  }, []);
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const userID = currentUser._id;
          const { data } = await Axios.get(`${allUsersRoute}/${userID}`);
          setContacts(data.users);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    fetchData();
  }, [currentUser]);
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Handling change
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />

        {currentChat === undefined ? (
          <Welcome />
        ) : (
          <ChatContainer
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </Container>
  );
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//CSS Styling

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: url(${bg});
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #ffff;
    display: grid;
    grid-template-columns: 30% 70%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Chat;

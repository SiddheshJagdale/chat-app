// Required Imports

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import hello from "../img/hello.gif";

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const Welcome = () => {
  //Hooks
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const getData = async () => {
      setUserName(
        await JSON.parse(localStorage.getItem(process.env.APP_KEY)).username
      );
    };
    getData();
  }, []);
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <Container>
      <img src={hello} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
};

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//CSS Styling

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  h3,
  h1 {
    color: #2c7865;
  }
  img {
    height: 20rem;
  }
  span {
    color: #ff9800;
  }
`;

export default Welcome;

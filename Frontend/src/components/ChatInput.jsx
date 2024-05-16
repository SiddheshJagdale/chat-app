//Required imports
import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const ChatInput = ({ handleSendMessage }) => {
  const [isEmojiVisible, setIsEmojiVisible] = useState(false);
  const [message, setMessage] = useState("");

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //handle Emoji Picker Visibility
  const handleEmojiShowHide = () => {
    setIsEmojiVisible(!isEmojiVisible);
  };
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Handling emoji click
  const handleEmojiClick = (emojiObject) => {
    let msg = message;
    msg += emojiObject.emoji;
    setMessage(msg);
    msg = " ";
  };
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //Handling Submit

  const sendChat = (event) => {
    event.preventDefault();
    if (message.length > 0) {
      handleSendMessage(message);
      setMessage("");
    }

    if (isEmojiVisible == true) {
      setIsEmojiVisible(!isEmojiVisible);
    }
  };
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <Container>
      <div className="button-container">
        <div className="emoji-button">
          <BsEmojiSmileFill
            className="smilefill"
            onClick={handleEmojiShowHide}
          />
          {isEmojiVisible && (
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              className="emoji-picker-react "
            />
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          placeholder="type your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Styling
const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #90d26d;
  padding: 0 2rem;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: #ff9800;
    gap: 1rem;

    .emoji-button {
      position: relative;

      .smilefill {
        font-size: 1.6rem;
        cursor: pointer;
        background-color: #ffff;
        border-radius: 50%;
      }
      .emoji-picker-react {
        position: absolute;
        top: -470px;
        background-color: #2c7865;
        box-shadow: 0 5px 10px #ff9800;
        border-color: #ff9800;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #000;
          width: 5px;
          &-thumb {
            background-color: #0000;
          }
        }
        .emoji-categories {
          background-color: #ff9800;
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #2c7865;
        }
        .emoji-group:before {
          background-color: #ff9800;
        }
      }
    }
  }

  .input-container {
    width: 100%;
    height: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;

    input {
      width: 90%;
      height: 80%;
      background-color: transparent;
      color: #ffff;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::placeholder {
        color: #ffff;
      }

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 1.4rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ff9800;
      border: none;
      cursor: pointer;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

export default ChatInput;

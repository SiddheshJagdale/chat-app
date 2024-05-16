// Required Imports
import React, { useEffect, useState } from "react";
import styled from "styled-components";
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const Contacts = ({ contacts, currentUser, changeChat }) => {
  // Hooks
  const [currentUserName, setCurrentUsername] = useState(undefined);
  const [currentUserAvatarImage, setCurrentUserAvatarImage] =
    useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (currentUser) {
      setCurrentUsername(currentUser.username);
      setCurrentUserAvatarImage(currentUser.avatarImage);
    }
  }, [currentUser]);
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Changing Chat
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      {currentUserName && currentUserAvatarImage && (
        <Container>
          <div className="brand">
            <h3>Gossip</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserAvatarImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// CSS Styling
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #ff9800;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      font-size: 1.5rem;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #2c7865;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #90d26d;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.4rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      text-transform: capitalize;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: #ffff;
        }
      }
    }
    .selected {
      background-color: #2c7865;
    }
  }

  .current-user {
    background-color: #2c7865;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: #ffff;
        text-transform: capitalize;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contacts;

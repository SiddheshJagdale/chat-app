import React, { useState, useEffect } from "react";
import loader from "../img/loader.gif";
import bg from "../img/more-leaves.png";
import styled from "styled-components";
import { Buffer } from "buffer";
import Axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const SetAvatar = () => {
  //API Route
  const api = "https://api.multiavatar.com/YhmXtj4cW0LndB/435";

  //Hooks
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Toast Options
  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    hideProgressBar: true,
  };
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem(process.env.APP_KEY));

      const { data } = await Axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(process.env.APP_KEY, JSON.stringify(user));
        navigate("/chat");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const img = await Axios.get(
          `${api}/${Math.round(Math.random() * 500)}`
        );
        const buffer = Buffer(img.data);
        data.push(buffer.toString("base64"));
      }

      setAvatars(data);
      setIsLoading(!isLoading);
    };
    fetchData();
  }, []);
  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title">
            <h1>Select a Avatar for your Profile Picture</h1>
          </div>

          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//CSS Styling

const Container = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url(${bg});
  gap: 5rem;

  .title {
    color: rgb(255, 152, 0);
  }

  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
        cursor: pointer;
      }
    }
    .selected {
      border: 0.4rem solid rgb(255, 152, 0);
    }
  }
  button {
    background-color: rgb(255, 152, 0);
    padding: 10px;
    border-radius: 23px;
    color: #ffff;
    border: solid 2px white;
    font-size: 1.2rem;
    text-transform: uppercase;
  }
  button:hover {
    color: rgb(255, 152, 0);
    background-color: #ffff;
    border: solid 2px rgb(255, 152, 0);
    cursor: pointer;
    transition: 0.4s ease-in-out;
  }
`;

export default SetAvatar;

import { useEffect, useState } from "react";
import styled from "styled-components";
import { CustomButton } from "../components/Button";
import loader from "../assets/images/loader.gif";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";
const Avatar = () => {
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvatars = async () => {
      const avatars = [];
      for (let i = 0; i < 4; ++i) {
        let avatarId = Math.random().toString(32).substring(7);
        const response = await fetch(
          `https://api.multiavatar.com/${avatarId}?apikey=NZMUb0GgKDHXIk`
        );
        const svg = await response.text();
        avatars.push(svg);
      }

      try {
        setAvatars(avatars);
      } catch (error) {
        console.error("Error storing avatars:", error);
      }
    };

    fetchAvatars();
  }, []);
  const setAvatarHandler = async () => {
    const email = localStorage.getItem("user");
    localStorage.clear("user");
    const response = await fetch("/api/v1/auth/register/set-avatar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, avatar: avatars[selectedAvatar] }),
    });
    const result = await response.json();
    if (response.ok) {
      toast.success(result.msg);
      return navigate("/login");
    } else {
      return toast.error(result.msg);
    }
  };
  return (
    <>
      {avatars.length === 0 ? (
        <div>
          <img src={loader} alt="loader" width={400} height={400} />
        </div>
      ) : (
        <AvatarContainer>
          <h1>Pick an avatar as a profile</h1>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div key={index}>
                <img
                  className={selectedAvatar === index ? "selected" : ""}
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(avatar)}`}
                  alt={`Avatar ${index}`}
                  onClick={() => {
                    setSelectedAvatar(index);
                  }}
                />
              </div>
            ))}
          </div>
          <CustomButton variant="contained" onClick={setAvatarHandler}>
            set as a profile image
          </CustomButton>
        </AvatarContainer>
      )}
    </>
  );
};

export default Avatar;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1rem;
  h1 {
    margin-bottom: 1rem;
    font-weight: 500;
  }
  .avatars {
    display: flex;
    gap: 1rem;
    img {
      width: 150px;
      height: 150px;
    }
    .selected {
      border: 3px solid #007bff;
      border-radius: 50%;
      object-fit: cover;
    }
  }
`;

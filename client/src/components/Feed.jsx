import { Box } from "@mui/material";
import { useChattyContext } from "../pages/Home";
import styled from "styled-components";
import SendMessage from "./SendMessage";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Feed = () => {
  const { socket, sideBarOpen, ContactWith, CurrentUser } = useChattyContext();
  console.log(CurrentUser, ContactWith);
  const [messages, setMsg] = useState([]);
  const [prevMessages, setPrevMessages] = useState([]);
  useEffect(() => {
    const handleRecievePreviousMessage = async () => {
      if (ContactWith && CurrentUser) {
        const response = await fetch(
          `/api/v1/feed/previousMsg/${ContactWith._id}`
        );
        const result = await response.json();
        if (response.ok) {
          setPrevMessages(result.messages);
          // console.log(result.messages, " ", CurrentUser);
        } else {
          toast.error(result);
        }
      }
    };
    handleRecievePreviousMessage();
  }, [ContactWith, CurrentUser]);

  useEffect(() => {
    const handleReceivePrivateMessage = (payload) => {
      setMsg((prevMessages) => [...prevMessages, payload.msg]);
    };

    socket.on("recievePrivateMessage", handleReceivePrivateMessage);

    return () => {
      socket.off("recievePrivateMessage", handleReceivePrivateMessage);
    };
  }, [socket]);
  useEffect(() => {
    const handleReceivePrivateMessage = () => {
      setMsg([]);
    };
    handleReceivePrivateMessage();
  }, [ContactWith]);

  return (
    <Box flex={sideBarOpen ? "3" : "40"} p={2} height="100vh">
      <FeedContainer>
        {ContactWith && (
          <>
            <header className="header">
              <div className="user">
                <img
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(
                    ContactWith.avatarSrc
                  )}`}
                  alt={`Avatar ${ContactWith.userName}`}
                  width={80}
                  height={80}
                />
                <h2>{ContactWith.userName}</h2>
              </div>
              <div className="setting">
                <PowerSettingsNewIcon />
              </div>
            </header>
          </>
        )}
        <ul className="prevMsg">
          {prevMessages.map((content, index) => (
            <li
              key={index}
              className={
                CurrentUser === content.sender ? "senderClass" : "recieverClass"
              }
            >
              {content.message}
            </li>
          ))}
        </ul>
        <ul className="newMsg">
          {messages.map((content, index) => (
            <li
              key={index}
              className={
                CurrentUser === content.sender ? "senderClass" : "recieverClass"
              }
            >
              {content.message}
            </li>
          ))}
        </ul>
        <SendMessage />
      </FeedContainer>
    </Box>
  );
};

const FeedContainer = styled.div`
  overflow-y: scroll;
  .header {
    display: flex;
    align-items: center;
    gap: 2rem;
    justify-content: space-between;
    background-color: #00060a;
    border-radius: 1rem;
    padding: 0.6rem;
    position: fixed;
    top: 10%;
    width: 55%;
    color: white;
    .user {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
    .setting {
      cursor: pointer;
      padding: 6px;
      border-radius: 50%;
    }
  }
  .prevMsg {
    margin-top: 11rem;
  }
  .newMsg {
    margin-bottom: 15rem;
  }
  ul {
    li {
      text-decoration-style: none;
      list-style: none;
      border-radius: 1rem;
      padding: 1rem;
      margin: 8px 0 8px 0;
      color: white;
    }
    .senderClass {
      background-color: #031933;
    }
    .recieverClass {
      background-color: #2074d4;
    }
  }
  @media screen and (max-width: 900px) {
    .header {
      width: 90%;
    }
    .img {
      height: 40px;
      width: 40px;
    }
    h2 {
      font-size: 18px;
    }
  }
`;
export default Feed;

import { Box } from "@mui/material";
import { useChattyContext } from "../pages/Home";
import styled from "styled-components";
import SendMessage from "./SendMessage";
import MyFriendsUserMenu from "./MyFriendsUserMenu";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LanguageDetector from "./LanguageDetector";
import welcome from "../assets/images/wlcome.gif";

const Feed = () => {
  const {
    socket,
    sideBarOpen,
    ContactWith,
    CurrentUser,
    notifyIsTypingHandler,
    notifyIsTyping,
    RoomWith,
  } = useChattyContext();
  const [messages, setMsg] = useState([]);
  const [prevMessages, setPrevMessages] = useState([]);
  const [showFullMessage, setShowFullMessage] = useState([]);
  // useEffect(() => {
  //   const handleRecievePreviousMessage = async () => {
  //     if (ContactWith && CurrentUser) {
  //       const response = await fetch(
  //         `/api/v1/feed/previousMsg/${ContactWith._id}`
  //       );
  //       const result = await response.json();
  //       notifyIsTypingHandler("");
  //       if (response.ok) {
  //         setPrevMessages(result.messages);
  //         // console.log(CurrentUser)

  //         // console.log(result)
  //       } else {
  //         toast.error(result);
  //       }
  //     }
  //   };
  //   handleRecievePreviousMessage();
  // }, [ContactWith, CurrentUser]);

  // useEffect(() => {
  //   const handleReceivePrivateMessage = (payload) => {
  //     setMsg((prevMessages) => [...prevMessages, payload.msg]);
  //     notifyIsTypingHandler("");
  //   };

  //   socket.on("recievePrivateMessage", handleReceivePrivateMessage);

  //   return () => {
  //     socket.off("recievePrivateMessage", handleReceivePrivateMessage);
  //   };
  // }, [socket]);
  // useEffect(() => {
  //   const handleReceivePrivateMessage = (payload) => {
  //     notifyIsTypingHandler(payload.msg, payload.sender);
  //   };

  //   socket.on("notify-is-typing", handleReceivePrivateMessage);

  //   return () => {
  //     socket.off("notify-is-typing", handleReceivePrivateMessage);
  //   };
  // }, [socket, ContactWith]);
  // useEffect(() => {
  //   const handleReceivePrivateMessage = () => {
  //     setMsg([]);
  //   };
  //   handleReceivePrivateMessage();
  // }, [ContactWith]);
  // const handleReadMore = (index) => {
  //   const updatedShowFullMessage = [...showFullMessage];
  //   updatedShowFullMessage[index] = true;
  //   setShowFullMessage(updatedShowFullMessage);
  // };

  return (
    <Box flex={sideBarOpen ? "3" : "40"} p={2} height="100vh">
      {!RoomWith ? (
        <WelcomingContainer>
          <img src={welcome} alt="loader" />
        </WelcomingContainer>
      ) : (
        <FeedContainer>
          {RoomWith && (
            <>
              <header className={sideBarOpen ? "header" : "header full-width"}>
                <div className="user">
                  <img
                    src="https://cdn.sanity.io/images/kts928pd/production/d4f96a14f70da85a81bbfa8eeb05c054439dfef5-731x731.png"
                    alt={`Avatar ${RoomWith.name}`}
                    width={80}
                    height={80}
                  />
                  <div>
                    <h2>{RoomWith.name}</h2>
                    {/* {notifyIsTyping[1] === ContactWith._id && (
                      <p className="notify-typing">{notifyIsTyping[0]}</p>
                    )} */}
                  </div>
                </div>
                <div className="setting">
                  <MyFriendsUserMenu />
                </div>
              </header>
            </>
          )}
          {/* <ul className="prevMsg">
            {prevMessages.map((content, index) => (
              <li
                key={index}
                className={`${
                  CurrentUser === content.sender
                    ? "senderClass"
                    : "recieverClass"
                } ${
                  LanguageDetector(content.message) === "arabic"
                    ? "arabic"
                    : "english"
                }`}
              >
                {content.message.split(/\s+/).length > 30 ? (
                  <>
                    {showFullMessage[index] ? (
                      <>
                        {content.message}
                        <span className="time-date">{`${new Date(
                          content.timestamp
                        ).toLocaleDateString()} ${new Date(
                          content.timestamp
                        ).toLocaleTimeString()}`}</span>
                      </>
                    ) : (
                      <>
                        <>
                          {content.message.split(/\s+/).slice(0, 30).join(" ")}
                          <span className={"time-date"}>{`${new Date(
                            content.timestamp
                          ).toLocaleDateString()} ${new Date(
                            content.timestamp
                          ).toLocaleTimeString()}`}</span>
                        </>
                        <span
                          className="readMore"
                          onClick={() => handleReadMore(index)}
                        >
                          {LanguageDetector(content.message) === "arabic"
                            ? "قراءة المزيد"
                            : "read more ..."}
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {content.message}
                    <span className="time-date">{`${new Date(
                      content.timestamp
                    ).toLocaleDateString()} ${new Date(
                      content.timestamp
                    ).toLocaleTimeString()}`}</span>
                  </>
                )}
              </li>
            ))}
          </ul>
          <ul className="newMsg">
            {messages.map((content, index) => (
              <li
                key={index}
                className={`${
                  CurrentUser === content.sender
                    ? "senderClass"
                    : "recieverClass"
                } ${
                  LanguageDetector(content.message) === "arabic"
                    ? "arabic"
                    : "english"
                }`}
              >
                {content.message.split(/\s+/).length > 30 ? (
                  <>
                    {showFullMessage[index] ? (
                      <>
                        {content.message}
                        <span className="time-date">{`${new Date(
                          content.timestamp
                        ).toLocaleDateString()} ${new Date(
                          content.timestamp
                        ).toLocaleTimeString()}`}</span>
                      </>
                    ) : (
                      <>
                        <>
                          {content.message.split(/\s+/).slice(0, 30).join(" ")}
                          <span className="time-date">{`${new Date(
                            content.timestamp
                          ).toLocaleDateString()} ${new Date(
                            content.timestamp
                          ).toLocaleTimeString()}`}</span>
                        </>
                        <span
                          className="readMore"
                          onClick={() => handleReadMore(index)}
                        >
                          {LanguageDetector(content.message) === "arabic"
                            ? "قراءة المزيد"
                            : "read more..."}
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {content.message}
                    <span className="time-date">{`${new Date(
                      content.timestamp
                    ).toLocaleDateString()} ${new Date(
                      content.timestamp
                    ).toLocaleTimeString()}`}</span>
                  </>
                )}
              </li>
            ))}
          </ul> */}
          <SendMessage />
        </FeedContainer>
      )}
    </Box>
  );
};
const WelcomingContainer = styled.div`
  img {
    width: 1000px;
    height: 700px;
  }
  @media screen and (max-width: 900px) {
    img {
      width: 500px;
      height: 500px;
    }
  }
  @media screen and (min-width: 900px) and (max-width: 1100px) {
    img {
      width: 700px;
      height: 600px;
    }
  }
`;
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
    z-index: 1;
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
    .notify-typing {
      font-size: 10px;
    }
  }
  .header.full-width {
    width: 72.5%;
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
      padding: 2rem 1rem;
      margin: 8px 0 8px 0;
      color: white;
      width: 50%;
      overflow: hidden;
      position: relative;
      box-sizing: border-box;
      .readMore {
        background-color: rgba(0, 0, 0, 0.5);
        padding: 0.2rem;
        cursor: pointer;
        text-decoration: underline;
        font-size: 10px;
        border-radius: 5px;
      }
      .time-date {
        position: absolute;
        top: 8px;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 0.2rem;
        border-radius: 5px;
        font-size: 12px;
      }
    }
    .senderClass {
      background-color: #96a0ae;
      margin-left: auto;
    }
    .recieverClass {
      background-color: #6298d5;
    }
    .senderClass.arabic {
      text-align: right;
    }
    .senderClass.English {
      text-align: left;
    }
    .recieverClass.arabic {
      text-align: right;
    }
    .recieverClass.English {
      text-align: left;
    }

    .recieverClass.english span.time-date {
      right: 2px;
    }
    .recieverClass.arabic span.time-date {
      left: 2px;
    }
    .recieverClass.arabic span.readMore {
      margin-right: 0.5rem;
    }
    .recieverClass.english span.readMore {
      margin-left: 0.5rem;
    }
    .senderClass.arabic span.readMore {
      margin-right: 0.5rem;
    }
    .senderClass.english span.readMore {
      margin-left: 0.5rem;
    }
    .senderClass.english span.time-date {
      right: 2px;
    }
    .senderClass.arabic span.time-date {
      left: 2px;
    }
  }
  @media screen and (max-width: 900px) {
    .header {
      width: 87%;
    }
    .header.full-width {
      width: 87%;
    }

    .img {
      height: 40px;
      width: 40px;
    }
    h2 {
      font-size: 18px;
    }
    ul {
      li {
        width: 100%;
      }
    }
  }
  @media screen and (min-width: 900px) and (max-width: 1100px) {
    .header.full-width {
      width: 55%;
    }
  }
  @media screen and (min-width: 1100px) and (max-width: 1300px) {
    .header.full-width {
      width: 65%;
    }
  }
`;
export default Feed;

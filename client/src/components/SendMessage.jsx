import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import { useChattyContext } from "../pages/Home";
import { toast } from "react-toastify";
import { useEffect } from "react";
const SendMessage = () => {
  const { socket, ContactWith, sideBarOpen, CurrentUserFullData } =
    useChattyContext();
  useEffect(() => {
    const notifyOfflineHandler = (payload) => {
      // console.log("fffffffffffff");
      toast.error(`${ContactWith.userName} ${payload.msg}`);
    };

    socket.on("notify-is-offline", notifyOfflineHandler);

    return () => {
      // Cleanup the listener when the component unmounts
      socket.off("notify-is-offline", notifyOfflineHandler);
    };
  }, [socket, ContactWith]);
  const sendMsgHandler = (value) => {
    if (ContactWith) {
      socket.emit("chatWith", { chatWithUserId: ContactWith._id, msg: value });
    }
  };
  return (
    <SendMsgContainer>
      <div className={sideBarOpen ? "sendMsg" : "sendMsg full-width"}>
        <input
          id="send-msg-input"
          type="text"
          placeholder="enter a message"
          onChange={() => {
            // console.log(ContactWith);
            if (ContactWith) {
              socket.emit("someone-is-typing", {
                msg: `${CurrentUserFullData.userName} is typing ...`,
                contactWith: ContactWith,
                sender: CurrentUserFullData._id,
              });
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMsgHandler(document.getElementById("send-msg-input").value);
              document.getElementById("send-msg-input").value = "";
            }
          }}
        />
        <SendIcon
          className="send-icon"
          onClick={() => {
            sendMsgHandler(document.getElementById("send-msg-input").value);
            document.getElementById("send-msg-input").value = "";
          }}
        />
      </div>
    </SendMsgContainer>
  );
};

const SendMsgContainer = styled.div`
  .sendMsg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 55%;
    bottom: 2rem;
    position: fixed;
  }
  .sendMsg.full-width {
    width: 71.5%;
  }

  input {
    width: 100%;
    height: 50px;
    border-radius: 1rem;
    outline: none;
    border: 1px solid;
    padding: 1rem;
    font-size: 1.2rem;
    &::placeholder {
      font-size: 1rem;
    }
  }
  .send-icon {
    position: absolute;
    right: 1rem;
    cursor: pointer;
  }
  @media screen and (max-width: 900px) {
    .sendMsg {
      width: 90%;
    }
    .sendMsg.full-width {
      width: 90%;
    }
  }
  @media screen and (min-width: 900px) and (max-width: 1100px) {
    .sendMsg {
      width: 60%;
    }
    .sendMsg.full-width {
      width: 60%;
    }
  }
  @media screen and (min-width: 1100px) and (max-width: 1300px) {
    .sendMsg {
      width: 60%;
    }
    .sendMsg.full-width {
      width: 65%;
    }
  }
`;
export default SendMessage;

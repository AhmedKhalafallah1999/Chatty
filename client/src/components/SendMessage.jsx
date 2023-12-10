import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import { useChattyContext } from "../pages/Home";
const SendMessage = () => {
  const { socket, ContactWith } = useChattyContext();
  const sendMsgHandler = (value) => {
    if (ContactWith) {
      socket.emit("chatWith", { chatWithUserId: ContactWith._id, msg: value });
      // socket.emit("send-msg", value);
    }
  };
  return (
    <SendMsgContainer>
      <div className="sendMsg">
        <input
          id="send-msg-input"
          type="text"
          placeholder="enter a message"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMsgHandler(document.getElementById("send-msg-input").value);
            }
          }}
        />
        <SendIcon
          className="send-icon"
          onClick={() =>
            sendMsgHandler(document.getElementById("send-msg-input").value)
          }
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
  }
  @media screen and (min-width: 900px) and (max-width: 1200px) {
    .sendMsg {
      width: 60%;
    }
  }
`;
export default SendMessage;

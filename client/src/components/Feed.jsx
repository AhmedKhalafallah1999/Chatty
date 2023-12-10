import { Box, Typography } from "@mui/material";
import { useChattyContext } from "../pages/Home";
import styled from "styled-components";
import SendMessage from "./SendMessage";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useEffect, useState } from "react";
const Feed = () => {
  const { socket, sideBarOpen, ContactWith } = useChattyContext();
  const [msg, setMsg] = useState();
  useEffect(() => {
    socket.on("recievePrivateMessage", (payload) => {
      setMsg(payload.msg);
    });
  }, [socket]);

  return (
    <Box flex={sideBarOpen ? "3" : "40"} p={2} height="100vh">
      <FeedContainer>
        {ContactWith && (
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
        )}
        <Typography sx={{ textAlign: "center" }}>{msg}</Typography>
        <SendMessage />
      </FeedContainer>
    </Box>
  );
};

const FeedContainer = styled.div`
  .header {
    display: flex;
    align-items: center;
    gap: 2rem;
    justify-content: space-between;
    .user {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
    .setting {
      cursor: pointer;
      padding: 6px;
      border-radius: 50%;

      &:hover {
        background: #bdbdbd;
      }
    }
  }
`;
export default Feed;

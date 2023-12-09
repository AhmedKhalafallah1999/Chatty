import { Box, Typography } from "@mui/material";
import { useChattyContext } from "../pages/Home";
import SendMessage from "./SendMessage";
import { useEffect, useState } from "react";
const Feed = () => {
  const { socket, sideBarOpen } = useChattyContext();
  const [msg, setMsg] = useState([]);
  useEffect(() => {
    socket.on("recievePrivateMessage", (payload) => {
      setMsg(payload.msg);
    });
  }, [socket]);

  return (
    <Box flex={sideBarOpen ? "3" : "40"} p={2} height="100vh">
      <Typography sx={{ textAlign: "center" }}>{msg}</Typography>
      <SendMessage />
    </Box>
  );
};
export default Feed;

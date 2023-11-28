import { Box, Stack } from "@mui/material";
import Feed from "../components/Feed";
import NavBar from "../components/NavBar";
import RightBar from "../components/RightBar";
import SideBar from "../components/SideBar";
import { createContext, useContext, useState } from "react";
const ChattyContext = createContext();

const Home = () => {
  const [sideBarOpen, setSideBarState] = useState(true);
  const [ModalState, setModalState] = useState(false);

  const sideBarHandlerOpen = () => {
    setSideBarState(true);
  };
  const sideBarHandlerClose = () => {
    setSideBarState(false);
  };
  const OpenModalHandler = () => {
    setModalState(true);
  };

  const CloseModalHandler = () => {
    setModalState(false);
  };

  return (
    <ChattyContext.Provider
      value={{
        sideBarHandlerOpen,
        sideBarHandlerClose,
        sideBarOpen,
        OpenModalHandler,
        CloseModalHandler,
        ModalState,
      }}
    >
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <NavBar />
        <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
          <SideBar />
          <Feed />
          <RightBar />
        </Stack>
      </Box>
    </ChattyContext.Provider>
  );
};
export const useChattyContext = () => useContext(ChattyContext);
export default Home;

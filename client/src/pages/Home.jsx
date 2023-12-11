import { Box, Stack } from "@mui/material";
import Feed from "../components/Feed";
import NavBar from "../components/NavBar";
import RightBar from "../components/RightBar";
import SideBar from "../components/SideBar";
import { createContext, useContext, useState } from "react";
import GlobalStyles from "../components/Global";
const ChattyContext = createContext();

const Home = ({ socket }) => {
  const [sideBarOpen, setSideBarState] = useState(true);
  const [rightBarOpen, setRightBarState] = useState(true);
  const [ModalState, setModalState] = useState(false);
  const [ContactWith, setContactWith] = useState();
  const [CurrentUser, setCurrentUser] = useState();

  const sideBarHandlerOpen = () => {
    setSideBarState(true);
  };
  const sideBarHandlerClose = () => {
    setSideBarState(false);
  };

  const rightBarHandlerOpen = () => {
    setRightBarState(true);
  };
  const rightBarHandlerClose = () => {
    setRightBarState(false);
  };
  const OpenModalHandler = () => {
    setModalState(true);
  };

  const CloseModalHandler = () => {
    setModalState(false);
  };
  const OpenChatContainerHandler = (contactWithUser) => {
    setContactWith(contactWithUser);
  };
  const currentUserDataHandler = (currentUserId) => {
    setCurrentUser(currentUserId);
  };
  return (
    <ChattyContext.Provider
      value={{
        sideBarHandlerOpen,
        sideBarHandlerClose,
        sideBarOpen,
        rightBarHandlerClose,
        rightBarHandlerOpen,
        rightBarOpen,
        OpenModalHandler,
        CloseModalHandler,
        ModalState,
        socket,
        OpenChatContainerHandler,
        ContactWith,
        currentUserDataHandler,
        CurrentUser,
      }}
    >
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <GlobalStyles />
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

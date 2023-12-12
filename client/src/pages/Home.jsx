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
  const [ModalRightState, setModalRightState] = useState(false);
  const [ContactWith, setContactWith] = useState();
  const [CurrentUser, setCurrentUser] = useState();
  const [CurrentUserFullData, setCurrentUserFullData] = useState([]);
  const [notifyIsTyping, setNotifyIsTyping] = useState();

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
  const CloseRightModalHandler = () => {
    setModalRightState(false);
  };
  const OpenRightModalHandler = () => {
    setModalRightState(true);
  };
  const OpenChatContainerHandler = (contactWithUser) => {
    setContactWith(contactWithUser);
  };
  const currentUserDataHandler = (currentUserId, currentUserFullData) => {
    setCurrentUser(currentUserId);
    setCurrentUserFullData(currentUserFullData);
  };
  const notifyIsTypingHandler = (msg) => {
    setNotifyIsTyping(msg);
  };
  return (
    <ChattyContext.Provider
      value={{
        sideBarHandlerOpen,
        sideBarHandlerClose,
        sideBarOpen,
        rightBarHandlerClose,
        rightBarHandlerOpen,
        CloseRightModalHandler,
        OpenRightModalHandler,
        rightBarOpen,
        OpenModalHandler,
        CloseModalHandler,
        ModalState,
        ModalRightState,
        socket,
        OpenChatContainerHandler,
        ContactWith,
        currentUserDataHandler,
        CurrentUser,
        CurrentUserFullData,
        notifyIsTypingHandler,
        notifyIsTyping,
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

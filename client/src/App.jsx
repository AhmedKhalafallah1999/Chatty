import Feed from "./components/Feed";
import NavBar from "./components/NavBar";
import RightBar from "./components/RightBar";
import SideBar from "./components/SideBar";
import { Box, Stack } from "@mui/material";
import { createContext, useContext, useState } from "react";

const ChattyContext = createContext();
function App() {  
  const [sideBarOpen, setSideBarState] = useState(true);
  const sideBarHandlerOpen = () => {
    setSideBarState(true);
  };
  const sideBarHandlerClose = () => {
    setSideBarState(false);
  };

  return (
    <ChattyContext.Provider
      value={{ sideBarHandlerOpen, sideBarHandlerClose, sideBarOpen }}
    >
      <Box>
        <NavBar />
        <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
          <SideBar />
          <Feed />
          <RightBar />
        </Stack>
      </Box>
    </ChattyContext.Provider>
  );
}
export const useChattyContext = () => useContext(ChattyContext);
export default App;

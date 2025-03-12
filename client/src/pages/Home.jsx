import { Box, Stack } from "@mui/material";
import Feed from "../components/Feed";
import NavBar from "../components/NavBar";
import RightBar from "../components/RightBar";
import SideBar from "../components/SideBar";
import GlobalStyles from "../components/Global";
import RoomFeed from "../components/RoomFeed";
import { ChattyProvider, useChattyContext } from "./ChattyContextProvider";
const Home = ({ socket }) => {
  return (
    <ChattyProvider socket={socket}>
      <HomeContent />
    </ChattyProvider>
  );
};
//  i will use this sepearate component for initilizing the provider before
// useChattyContext
const HomeContent = () => {
  const { ContactWith } = useChattyContext();
  return (
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <GlobalStyles />
      <NavBar />
      <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
        <SideBar />
        {ContactWith ? <Feed /> : <RoomFeed />}
        <RightBar />
      </Stack>
    </Box>
  );
};

// export const useChattyContext = () => useContext(ChattyContext);
export default Home;

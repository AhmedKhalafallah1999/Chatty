import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import styled from "@emotion/styled";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import { useChattyContext } from "../pages/Home";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useAppContext } from "../App";
import OnlineUsers from "./OnlineUsers";
import LatestConversations from "./LatestConversations";
import LatestStories from "./LatestStories";

const DrawerHeader = styled(Toolbar)(() => ({
  justifyContent: "flex-end",
}));

const RightDrawer = ({ isSmall, theme, isBig }) => {
  const { ModalRightState, rightBarHandlerClose, rightBarOpen } =
    useChattyContext();
  // console.log(ContactWith);
  const { lightThemeHandler, mode, darkThemeHandler } = useAppContext();

  return (
    <Drawer
      sx={{
        "& .MuiDrawer-paper": isSmall
          ? {
              width: "300px",
              height: "100vh",
              overflow: "scroll",
              position: "fixed",
              top: "65px",
              boxSizing: "border-box",
              overflowX: "hidden",
              whiteSpace: "nowrap",
            }
          : {
              width: "350px",
              top: "65px",
              boxSizing: "border-box",
              overflowX: "hidden",
            },
      }}
      open={isBig ? rightBarOpen : ModalRightState}
      variant="persistent"
      anchor="right"
    >
      <DrawerHeader>
        {isBig && (
          <IconButton onClick={rightBarHandlerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightRoundedIcon />
            ) : (
              <KeyboardArrowLeftRoundedIcon />
            )}
          </IconButton>
        )}
        {isSmall &&
          (mode === "dark" ? (
            <IconButton onClick={lightThemeHandler}>
              <LightModeIcon />
            </IconButton>
          ) : (
            <IconButton onClick={darkThemeHandler}>
              <DarkModeIcon />
            </IconButton>
          ))}
      </DrawerHeader>
      <Divider />
      <Box flex={1} p={2}>
        <Typography variant="h6">Online users</Typography>
        <OnlineUsers />
        <Typography variant="h6">Lates Conversations</Typography>
        <LatestConversations />
        <Typography variant="h6">Lates Stories</Typography>
        <LatestStories />
      </Box>
    </Drawer>
  );
};
export default RightDrawer;

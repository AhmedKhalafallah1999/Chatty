import { Box, Divider, IconButton, Typography } from "@mui/material";
import OnlineUsers from "./OnlineUsers";
import LatestConversations from "./LatestConversations";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LatestStories from "./LatestStories";
import { useChattyContext } from "../pages/Home";
import { useTheme } from "@mui/material/styles";
const RightBar = () => {
  const theme = useTheme();

  const { rightBarHandlerClose, rightBarOpen } = useChattyContext();
  return (
    <Box
      flex={1}
      p={2}
      sx={{
        display: rightBarOpen === false ? "none" : "block",
        borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
      }}
    >
      <Box mt={10}>
        <IconButton onClick={rightBarHandlerClose}>
          <ChevronRightIcon />
        </IconButton>
        <Divider />
        <Typography variant="h6">Online users</Typography>
        <OnlineUsers />
        <Typography variant="h6">Lates Conversations</Typography>
        <LatestConversations />
        <Typography variant="h6">Lates Stories</Typography>
        <LatestStories />
      </Box>
    </Box>
  );
};
export default RightBar;

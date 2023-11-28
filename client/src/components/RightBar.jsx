import { Box, Typography } from "@mui/material";
import OnlineUsers from "./OnlineUsers";
import LatestConversations from "./LatestConversations";
import LatestStories from "./LatestStories";
const RightBar = () => {
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", md: "block" } }}>
      <Box>
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

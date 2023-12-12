import { Box } from "@mui/material";
import RightDrawer from "./RightDrawer";
// export default RightBar;
const RightBar = () => {
  return (
    <Box
      display={"flex"}
      flex={1}
      sx={{ display: { xs: "none", md: "block" } }}
    >
      <RightDrawer theme isBig />
    </Box>
  );
};
export default RightBar;

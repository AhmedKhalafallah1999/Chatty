import { Box } from "@mui/material";
import DrawerSlider from "./Drawer";
const SideBar = (theme) => {
  return (
    <Box
      display={"flex"}
      flex={1}
      sx={{ display: { xs: "none", md: "block" } }}
    >
      <DrawerSlider theme isBig />
    </Box>
  );
};
export default SideBar;

import { Box } from "@mui/material";

const RightBar = () => {
  return (
    <Box
      bgcolor={"pink"}
      width="27%"
      p={2}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      RightBar
    </Box>
  );
};
export default RightBar;

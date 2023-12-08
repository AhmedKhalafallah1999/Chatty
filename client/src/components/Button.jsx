import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { purple } from "@mui/material/colors";
import { Link } from "react-router-dom";
const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

export const ColorButton = styled(Button)(({ theme }) => ({
  textTransform: "capitalize",
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));
export const CustomButton = styled(Button)(({ theme }) => ({
  textTransform: "capitalize",
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: "#382153",
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

export default function CustomizedButtons() {
  return (
    <Stack spacing={2} display={"flex"} direction={"row"} marginTop={2}>
      <ColorButton component={Link} to="/register" variant="contained">
        register
      </ColorButton>

      <BootstrapButton component={Link} to="/login" variant="contained">
        Login
      </BootstrapButton>
      <CustomButton component={Link} to="/home" variant="contained">
        Explore the App
      </CustomButton>
    </Stack>
  );
}

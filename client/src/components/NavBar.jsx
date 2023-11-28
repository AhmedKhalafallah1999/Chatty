import {
  AppBar,
  InputBase,
  Typography,
  Toolbar,
  styled,
  Box,
  Badge,
  IconButton,
} from "@mui/material";
import { Mail, Pets, Notifications } from "@mui/icons-material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import BasicModal from "./Modal";
import LightModeIcon from "@mui/icons-material/LightMode";
import UserMenu from "./UserMenu";
import { useChattyContext } from "../pages/Home";
import { useAppContext } from "../App";
import DarkModeIcon from "@mui/icons-material/DarkMode";
const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  width: "40%",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
}));
const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));
const UserIcons = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const NavBar = () => {
  const { sideBarHandlerOpen, sideBarOpen, OpenModalHandler, ModalState } =
    useChattyContext();
  const { lightThemeHandler, mode, darkThemeHandler } = useAppContext();

  return (
    <AppBar position="sticky">
      <StyledToolBar>
        <Typography
          variant="h6"
          sx={{
            display: { xs: "none", sm: "flex" },
            gap: "20px",
            alignItems: "center",
          }}
        >
          Chatty
          {!sideBarOpen && (
            <IconButton sx={{ color: "inherit" }} onClick={sideBarHandlerOpen}>
              {" "}
              <MenuRoundedIcon sx={{ display: { xs: "none", md: "block" } }} />
            </IconButton>
          )}
        </Typography>
        <Pets sx={{ display: { xs: "block", sm: "none" } }} />
        {!ModalState && (
          <IconButton sx={{ color: "inherit" }} onClick={OpenModalHandler}>
            {" "}
            <MenuRoundedIcon sx={{ display: { xs: "block", md: "none" } }} />
          </IconButton>
        )}
        {ModalState && <BasicModal />}
        <Search placeholder="Search...">
          <InputBase placeholder="Search..."></InputBase>
        </Search>
        <Icons>
          <Badge
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            badgeContent={4}
            color="error"
          >
            <Mail />
          </Badge>
          <Badge
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            badgeContent={4}
            color="error"
          >
            <Notifications />
          </Badge>
          {mode === "dark" && (
            <IconButton onClick={lightThemeHandler}>
              <LightModeIcon />
            </IconButton>
          )}
          {mode === "light" && (
            <IconButton onClick={darkThemeHandler}>
              <DarkModeIcon />
            </IconButton>
          )}

          <UserMenu />
        </Icons>
        <UserIcons>
          <Typography variant="h6">User Name</Typography>
          <UserMenu />
        </UserIcons>
      </StyledToolBar>
    </AppBar>
  );
};
export default NavBar;

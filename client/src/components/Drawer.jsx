import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import styled from "@emotion/styled";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import { useChattyContext } from "../pages/Home";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useAppContext } from "../App";

const DrawerHeader = styled(Toolbar)(() => ({
  justifyContent: "flex-end",
}));

const DrawerSlider = ({ isSmall, theme, isBig }) => {
  const { sideBarOpen, ModalState, sideBarHandlerClose } = useChattyContext();
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
            }
          : { width: "250px", top: "65px", boxSizing: "border-box" },
      }}
      open={isBig ? sideBarOpen : ModalState}
      variant="persistent"
      anchor="left"
    >
      <DrawerHeader>
        {isBig && (
          <IconButton onClick={sideBarHandlerClose}>
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
      <List>
        {["Archive", "Starred", "Chat", "Drafts"].map((task, index) => {
          return (
            <ListItem key={index}>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={task} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        {[
          "Ahmed Khalafallah",
          "Hamdy Abdelsabour",
          "Mohamed Tawheed",
          "Eslam Fares",
          "Mohamed Elnady",
          "Mahmoud Elgamal",
          "Marawan Hagag",
          "Mahmoud Abdelsamea",
          "Ahmed Ebrahim",
          "Gerges",
          "Ahmed Salah",
        ].map((name, index) => {
          return (
            <ListItem key={index}>
              <ListItemButton>
                <ListItemIcon>{<AccountCircleIcon />}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};
export default DrawerSlider;

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
  Typography,
} from "@mui/material";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import styled from "@emotion/styled";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import { useChattyContext } from "../pages/Home";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useAppContext } from "../App";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DrawerHeader = styled(Toolbar)(() => ({
  justifyContent: "flex-end",
}));

const DrawerSlider = ({ isSmall, theme, isBig }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const {
    sideBarOpen,
    ModalState,
    sideBarHandlerClose,
    socket,
    OpenChatContainerHandler,
    currentUserDataHandler,
    notifyIsTyping,
    ContactWith,
  } = useChattyContext();
  // console.log(ContactWith);
  const { lightThemeHandler, mode, darkThemeHandler } = useAppContext();
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await fetch("/api/v1/feed/current-user");
      const result = await response.json();
      if (response.ok) {
        // console.log(result.currentUser);
        currentUserDataHandler(result.currentUserId.userId, result.currentUser);
        socket.emit("associated-current-user", {
          currentUserId: result.currentUserId.userId,
        });
      } else {
        toast.error(result.msg);
        return navigate("/login");
      }
    };
    fetchCurrentUser();
  }, [socket, navigate]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/v1/feed/all-users");
      const result = await response.json();
      if (response.ok) {
        setUsers(result);
      }
    };
    fetchUsers();
  }, []);
  const openChatTogetherHandler = (user) => {
    OpenChatContainerHandler(user);
  };

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
        {users.map((user, index) => {
          return (
            <ListItem key={index}>
              <ListItemButton onClick={() => openChatTogetherHandler(user)}>
                <ListItemIcon>
                  {" "}
                  <img
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(
                      user.avatarSrc
                    )}`}
                    alt={`Avatar ${index}`}
                    width={30}
                    height={30}
                  />
                  {/* <AccountCircleIcon /> */}
                </ListItemIcon>
                <div>
                  <ListItemText primary={user.userName} />
                  {ContactWith && ContactWith._id === user._id && (
                    // <ListItemText secondary={notifyIsTyping} />
                    <Typography variant="body2" style={{ fontSize: "10px" }}>
                      {notifyIsTyping}
                    </Typography>
                  )}
                </div>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};
export default DrawerSlider;

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
import sound from "../assets/images/notify.mp3";
import MyFriendsUserMenu from "./MyFriendsUserMenu";
import CustomizedListArchieved from "./Archived";
import Rooms from "./Rooms";
const DrawerHeader = styled(Toolbar)(() => ({
  justifyContent: "flex-end",
}));

const DrawerSlider = ({ isSmall, theme, isBig }) => {
  const notificationSound = new Audio(sound);

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [msgNumber, setMsgNumber] = useState(() => {
    // Retrieve unread messages from localStorage on component mount
    const storedUnreadMessages = localStorage.getItem("unreadMessages");
    return storedUnreadMessages ? JSON.parse(storedUnreadMessages) : {};
  });
  const {
    sideBarOpen,
    ModalState,
    sideBarHandlerClose,
    socket,
    OpenChatContainerHandler,
    currentUserDataHandler,
    notifyIsTyping,
    ContactWith = { _id: 0 },
    CurrentUserFullData,
  } = useChattyContext();
  const { lightThemeHandler, mode, darkThemeHandler } = useAppContext();
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await fetch("/api/v1/feed/current-user");
      const result = await response.json();
      if (response.ok) {
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
    console.log(user);
    setMsgNumber((prev) => {
      const updatedUnreadMsg = { ...prev };
      delete updatedUnreadMsg[user._id];
      return updatedUnreadMsg;
    });
    OpenChatContainerHandler(user);
  };
  useEffect(() => {
    const handleReceiveNotifyMessage = (payload) => {
      setMsgNumber((prev) => ({
        ...prev,
        [payload.myUserId]: (prev[payload.myUserId] || 0) + 1,
      }));
      notificationSound.play();
    };

    socket.on("notify-msg", handleReceiveNotifyMessage);

    return () => {
      socket.off("notify-msg", handleReceiveNotifyMessage);
    };
  }, [socket]);
  useEffect(() => {
    localStorage.setItem("unreadMessages", JSON.stringify(msgNumber));
  }, [msgNumber]);
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
          : { width: "260px", top: "65px", boxSizing: "border-box" },
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
      <CustomizedListArchieved users={users} />
      <Rooms />
      {/* < /> */}
      <Divider />
      <List>
        {users.map((user, index) => {
          // console.log(user);
          const isArchieve = user.archivedBy.includes(CurrentUserFullData._id);

          if (!isArchieve) {
            return (
              <ListItem key={index}>
                <ListItemButton onClick={() => openChatTogetherHandler(user)}>
                  <UserContainer>
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
                      <div
                        className={
                          user.socketId
                            ? "status-circle connected"
                            : "status-circle disconnected"
                        }
                      ></div>
                    </ListItemIcon>
                  </UserContainer>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "7px",
                      }}
                    >
                      <ListItemText
                        primary={user.userName}
                        sx={{ width: "110px" }}
                      />
                      {msgNumber[user._id] && ContactWith._id !== user._id && (
                        // <ListItemText secondary={notifyIsTyping} />
                        <Typography
                          variant="body2"
                          style={{
                            fontSize: "10px",
                            backgroundColor: "#DE2F2F",
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            right: "0",
                            position: "absolute",
                            marginRight: "-30px",
                            // padding: "8px",
                          }}
                        >
                          {msgNumber[user._id]}
                        </Typography>
                      )}
                    </div>
                    {notifyIsTyping[1] === user._id && (
                      // <ListItemText secondary={notifyIsTyping} />
                      <Typography variant="body2" style={{ fontSize: "9px" }}>
                        {notifyIsTyping[0]}
                      </Typography>
                    )}
                  </div>
                </ListItemButton>
                <MyFriendsUserMenu
                  user={user}
                  CurrentUserFullData={CurrentUserFullData}
                />
              </ListItem>
            );
          } else {
            return null;
          }
        })}
      </List>
    </Drawer>
  );
};
export default DrawerSlider;
const UserContainer = styled.div`
  width: 100px;
  height: 50px;
  position: relative;

  img {
    height: 45px;
    width: 45px;
    border-radius: 50%;
  }

  .status-circle {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 2px solid white;
    bottom: 0;
    right: 30%;
    position: absolute;
  }
  .status-circle.disconnected {
    background-color: grey;
  }
  .status-circle.connected {
    background-color: green;
  }
`;

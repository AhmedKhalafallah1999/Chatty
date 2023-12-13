import {
  Button,
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
import sound from "../assets/images/notify.mp3";

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
  // const [myFriendId, setMyFriendId] = useState();
  const {
    sideBarOpen,
    ModalState,
    sideBarHandlerClose,
    socket,
    OpenChatContainerHandler,
    currentUserDataHandler,
    notifyIsTyping,
    ContactWith = { _id: 0 },
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
      // notifyIsTypingHandler(payload.msg);
      // setMyFriendId(payload.myUserId);
      setMsgNumber((prev) => ({
        ...prev,
        [payload.myUserId]: (prev[payload.myUserId] || 0) + 1,
      }));
      notificationSound.play();
      // console.log(payload);
    };

    socket.on("notify-msg", handleReceiveNotifyMessage);

    return () => {
      socket.off("notify-msg", handleReceiveNotifyMessage);
    };
  }, [socket]);
  useEffect(() => {
    localStorage.setItem("unreadMessages", JSON.stringify(msgNumber));
  }, [msgNumber]);
  // const playNotificationSound = () => {
  // };
  // useEffect(() => {
  //   // Listen for the click event on the document body
  //   document.body.addEventListener("click", playNotificationSound);

  //   // Cleanup the event listener when the component unmounts
  //   return () => {
  //     document.body.removeEventListener("click", playNotificationSound);
  //   };
  // }, []);
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
          // console.log(user);
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
                    <ListItemText primary={user.userName} />
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
            </ListItem>
          );
        })}
      </List>
      {/* <Button onClick={playNotificationSound} style={{ display: "none" }}>
        Play Notification Sound
      </Button> */}
    </Drawer>
  );
};
export default DrawerSlider;
const UserContainer = styled.div`
  width: 70px;
  height: 50px;
  position: relative;

  img {
    height: 70%;
    width: 70%;
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

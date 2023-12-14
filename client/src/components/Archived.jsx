import * as React from "react";
import Box from "@mui/material/Box";
import {
  styled as MUIStyled,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import styled from "styled-components";
import MyFriendsUserMenu from "./MyFriendsUserMenu";
import { useChattyContext } from "../pages/Home";
import { Typography } from "@mui/material";

const FireNav = MUIStyled(List)({
  "& .MuiListItemButton-root": {
    // paddingLeft: 24,
    // paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    // minWidth: 0,
    // marginRight: 16,
  },
  "& .MuiSvgIcon-root": {
    // fontSize: 20,
  },
});

export default function CustomizedListArchieved(props) {
  const {
    notifyIsTyping,
    ContactWith = { _id: 0 },
    CurrentUserFullData,
    OpenChatContainerHandler,
    socket,
  } = useChattyContext();
  // const notificationSound = new Audio(sound);

  const [msgNumber, setMsgNumber] = React.useState(() => {
    // Retrieve unread messages from localStorage on component mount
    const storedUnreadMessages = localStorage.getItem("unreadMessages");
    return storedUnreadMessages ? JSON.parse(storedUnreadMessages) : {};
  });
  const [open, setOpen] = React.useState(true);
  const openChatTogetherHandler = (user) => {
    console.log(user);
    setMsgNumber((prev) => {
      const updatedUnreadMsg = { ...prev };
      delete updatedUnreadMsg[user._id];
      return updatedUnreadMsg;
    });
    OpenChatContainerHandler(user);
  };
  React.useEffect(() => {
    const handleReceiveNotifyMessage = (payload) => {
      setMsgNumber((prev) => ({
        ...prev,
        [payload.myUserId]: (prev[payload.myUserId] || 0) + 1,
      }));
      // notificationSound.play();
    };

    socket.on("notify-msg", handleReceiveNotifyMessage);

    return () => {
      socket.off("notify-msg", handleReceiveNotifyMessage);
    };
  }, [socket]);
  React.useEffect(() => {
    localStorage.setItem("unreadMessages", JSON.stringify(msgNumber));
  }, [msgNumber]);
  return (
    <Box sx={{ display: "flex" }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: "dark",
            primary: { main: "rgb(102, 157, 246)" },
            background: { paper: "rgb(5, 30, 52)" },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: 256 }}>
          <FireNav component="nav" disablePadding>
            <ListItem component="div" disablePadding>
              {/* <Tooltip title="Project Settings"></Tooltip> */}
            </ListItem>
            <Divider />
            <Box
              sx={{
                bgcolor: open ? "rgba(71, 98, 130, 0.2)" : null,
                pb: open ? 2 : 0,
              }}
            >
              <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: open ? 0 : 2.5,
                  "&:hover, &:focus": { "& svg": { opacity: open ? 1 : 0 } },
                }}
              >
                <ListItemText
                  primary="Archived"
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: "medium",
                    lineHeight: "20px",
                    mb: "2px",
                  }}
                  secondary="contains all archive chats and rooms which you have been added"
                  secondaryTypographyProps={{
                    noWrap: true,
                    fontSize: 12,
                    lineHeight: "16px",
                    color: open ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
                  }}
                  sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    opacity: 0,
                    transform: open ? "rotate(-180deg)" : "rotate(0)",
                    transition: "0.2s",
                  }}
                />
              </ListItemButton>
              {open &&
                props.users.map((user, index) => {
                  // console.log(user);
                  const isArchieve = user.archivedBy.includes(
                    CurrentUserFullData._id
                  );
                  if (isArchieve) {
                    return (
                      <ListItem key={index}>
                        <ListItemButton
                          onClick={() => openChatTogetherHandler(user)}
                        >
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
                              {msgNumber[user._id] &&
                                ContactWith._id !== user._id && (
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
                              <Typography
                                variant="body2"
                                style={{ fontSize: "9px" }}
                              >
                                {notifyIsTyping[0]}
                              </Typography>
                            )}
                          </div>
                        </ListItemButton>
                        <MyFriendsUserMenu
                          user={user}
                          CurrentUserFullData={CurrentUserFullData}
                          removedFrom={true}
                        />
                      </ListItem>
                    );
                  } else {
                    return null;
                  }
                })}
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
}
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

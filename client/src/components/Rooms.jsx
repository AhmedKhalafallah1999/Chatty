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
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import styled from "styled-components";
import { Avatar, Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Upload from "./Upload";
import SendIcon from "@mui/icons-material/Send";
import { Form, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useChattyContext } from "../pages/Home";
import PageviewIcon from "@mui/icons-material/Pageview";
import { pink } from "@mui/material/colors";
import MyFriendsUserMenu from "./MyFriendsUserMenu";

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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  // p: 4,
  // display: "flex",
  // flexDirection: "column",
  // rowGap: "15px",
};
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await fetch("/api/v1/room/create-room", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (response.ok) {
    // console.log(result);
    document.location.reload();
    return toast.success(result.msg);
  }
  return null;
};
export default function CustomizedListArchieved(props) {
  const [open, setOpen] = React.useState(true);
  const [data, setData] = React.useState([]);

  const [openModalCreateGroup, setOpenModalCreateGroup] = React.useState(false);
  const { CurrentUser, OpenRoomContainerHandler } = useChattyContext();
  const openChatTogetherHandler = (room) => {
    OpenRoomContainerHandler(room);
  };

  // console.log(CurrentUser);
  const openModalCreateGroupHandler = () => {
    setOpenModalCreateGroup(true);
  };
  const handleCloseCreateGroupHandler = () => {
    setOpenModalCreateGroup(false);
  };
  React.useEffect(() => {
    const fetchAllGroups = async () => {
      const response = await fetch(
        `/api/v1/room/fetch-all-groups/${CurrentUser}`
      );
      const result = await response.json();
      if (response.ok) {
        console.log(result);
        setData(result.rooms);
      }
    };
    fetchAllGroups();
  }, [CurrentUser]);
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
                  primary="Groups"
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: "medium",
                    lineHeight: "20px",
                    // mb: "2px",
                  }}
                  secondary="contains all gropus which you create and you added"
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
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // width: "100%",
                }}
              >
                {open && (
                  <>
                    <Button
                      variant="outlined"
                      onClick={openModalCreateGroupHandler}
                      sx={{ width: "100%" }}
                    >
                      Create Group
                    </Button>
                  </>
                )}
              </ListItem>
              {open &&
                data.map((room, index) => {
                  return (
                    <ListItem key={index} sx={{ p: "0" }}>
                      <ListItemButton
                        onClick={() => openChatTogetherHandler(room)}
                        sx={{
                          columnGap: "10px",
                        }}
                      >
                        <Avatar sx={{ bgcolor: pink }}>
                          <PageviewIcon />
                        </Avatar>
                        <ListItemText primary={room.name} />
                        <MyFriendsUserMenu />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              <Modal
                open={openModalCreateGroup}
                onClose={handleCloseCreateGroupHandler}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Form
                    method="post"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "15px",
                    }}
                  >
                    <TextField
                      required
                      id="name"
                      label="Group Name"
                      defaultValue=""
                      sx={{ width: "100%" }}
                      name="name"
                    />
                    <TextField
                      id="description"
                      label="Group description"
                      multiline
                      rows={4}
                      defaultValue=""
                      sx={{ width: "100%" }}
                      name="description"
                    />
                    <input
                      id="current-user"
                      name="groupOwner"
                      type="hidden"
                      defaultValue={CurrentUser}
                    />
                    <Button
                      variant="contained"
                      endIcon={<SendIcon />}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Form>
                </Box>
              </Modal>
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

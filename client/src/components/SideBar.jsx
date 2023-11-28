import {
  Box,
  Toolbar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  IconButton,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import { useChattyContext } from "../App";
const DrawerHeader = styled(Toolbar)(({ theme }) => ({
  justifyContent: "flex-end",
}));
const SideBar = (theme) => {
  const { sideBarHandlerClose, sideBarOpen } = useChattyContext();
  return (
    <Box
      display={"flex"}
      flex={1}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <Drawer
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "250px",
            top: "65px",
            boxSizing: "border-box",
          },
        }}
        open={sideBarOpen}
        variant="persistent"
        anchor="left"
      >
        <DrawerHeader>
          <IconButton onClick={sideBarHandlerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightRoundedIcon />
            ) : (
              <KeyboardArrowLeftRoundedIcon />
            )}
          </IconButton>
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
    </Box>
  );
};
export default SideBar;

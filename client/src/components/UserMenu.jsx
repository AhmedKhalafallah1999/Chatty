import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import { Avatar, MenuItem, styled } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useChattyContext } from "../pages/Home";
const UserMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [ItemClicked, setItemClicked] = useState("null");
  const navigate = useNavigate();
  const { socket } = useChattyContext();
  const handleLogoutItem = async () => {
    const response = await fetch("/api/v1/auth/logout");
    const result = await response.json();

    if (response.ok) {
      toast.success(result.msg);
      socket.disconnect();
      return navigate("/");
    }
    return toast.error(result.msg);
  };
  const handleOpenMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleCloseMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleClickedItem = (item) => {
    setItemClicked(item);
    console.log(item);
    handleCloseMenu();
  };
  const Dropdown = styled("div")({
    position: "relative",
  });

  return (
    <>
      <Dropdown>
        <IconButton onClick={handleOpenMenu}>
          <Avatar
            alt="User Avatar"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 30, height: 30 }}
          />
        </IconButton>
        <Menu
          open={Boolean(showMenu)}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ top: "5%" }}
        >
          <MenuItem onClick={() => handleClickedItem("profile")}>
            Profile
          </MenuItem>
          <MenuItem onClick={() => handleClickedItem("my account")}>
            My account
          </MenuItem>
          <MenuItem onClick={() => handleLogoutItem()}>Logout</MenuItem>
        </Menu>
      </Dropdown>
    </>
  );
};
export default UserMenu;

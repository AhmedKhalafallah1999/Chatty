import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
export default function PositionedMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleArchivedHandler = async (user, CurrentUserFullData) => {
    // console.log(user, CurrentUserFullData);
    const response = await fetch("/api/v1/feed/archived-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userToArchieve: user,
        currentUserFullData: CurrentUserFullData,
      }),
    });
    const result = await response.json();
    if (response.ok) {
      console.log(result);
      setAnchorEl(null);
      window.location.reload();
    } else {
      // console.log(result);
      return toast.error(result.msg);
    }
  };
  const handleUndoArchivedHandler = async (user, CurrentUserFullData) => {
    // console.log(user, CurrentUserFullData);
    const response = await fetch("/api/v1/feed/undo-archived-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userToArchieve: user,
        currentUserFullData: CurrentUserFullData,
      }),
    });
    const result = await response.json();
    if (response.ok) {
      // console.log(result);
      setAnchorEl(null);
      window.location.reload();
    } else {
      // console.log(result);
      return toast.error(result.msg);
    }
  };
  // for rooms
  const inviteFriendHandlerWithHandleClose = async (room) => {
    const inviteLink = `http://localhost:5173/join/${room._id}`;
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => {
        toast.success("Link copied to cliboard");
      })
      .catch((err) => {
        toast.error(`Unable to copy to clipboard ${err}`);
      });
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        // sx={{ width: "2px", height: "20px" }}
      >
        <span className="material-symbols-outlined" style={{ width: "0px" }}>
          more_vert
        </span>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {props.room ? (
          <>
            <MenuItem onClick={handleClose}>leave the room</MenuItem>
            <MenuItem onClick={handleClose}>Delete the room</MenuItem>
            <MenuItem onClick={handleClose}>Notify</MenuItem>
            <MenuItem
              onClick={() => inviteFriendHandlerWithHandleClose(props.room)}
            >
              invite friends
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
            {!props.removedFrom ? (
              <MenuItem
                onClick={() =>
                  handleArchivedHandler(props.user, props.CurrentUserFullData)
                }
              >
                Archived
              </MenuItem>
            ) : (
              <MenuItem
                onClick={() =>
                  handleUndoArchivedHandler(
                    props.user,
                    props.CurrentUserFullData
                  )
                }
              >
                Undo from Archived
              </MenuItem>
            )}

            <MenuItem onClick={handleClose}>Notify</MenuItem>
          </>
        )}
      </Menu>
    </div>
  );
}

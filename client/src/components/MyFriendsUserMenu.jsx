/* eslint-disable react/display-name */
// apiService.js (Extract API calls for reusability)
export const archiveUser = async (user, currentUser) => {
  const response = await fetch("/api/v1/feed/archived-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userToArchive: user,
      currentUserFullData: currentUser,
    }),
  });
  return response.json();
};

export const unarchiveUser = async (user, currentUser) => {
  const response = await fetch("/api/v1/feed/undo-archived-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userToArchive: user,
      currentUserFullData: currentUser,
    }),
  });
  return response.json();
};

export const leaveRoom = async (roomId) => {
  return fetch(`/api/v1/room/leave/${roomId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

// PositionedMenu.js (Refactored component)
import React, { useState, memo } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import { useChattyContext } from "../pages/ChattyContextProvider";
const PositionedMenu = memo(({ user, room, removedFrom }) => {
  const { socket, CurrentUserFullData } = useChattyContext();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleArchiveToggle = async () => {
    const action = removedFrom ? unarchiveUser : archiveUser;
    const response = await action(user, CurrentUserFullData);
    response.ok ? toast.success(response.msg) : toast.error(response.msg);
    setAnchorEl(null);
  };

  const handleLeaveRoom = async () => {
    const response = await leaveRoom(room._id);
    if (response.ok) {
      toast.success(response.msg);
      socket.emit("notify-someone-leave", {
        msg: `${CurrentUserFullData.userName} left this group`,
        roomId: room._id,
      });
    } else {
      toast.error(response.msg);
    }
    setAnchorEl(null);
  };

  const inviteFriend = () => {
    navigator.clipboard
      .writeText(`http://localhost:5173/join/${room._id}`)
      .then(() => toast.success("Link copied to clipboard"))
      .catch((err) => toast.error(`Unable to copy link: ${err}`));
  };

  return (
    <div>
      <Button onClick={handleClick}>
        <span className="material-symbols-outlined">more_vert</span>
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {room ? (
          <>
            <MenuItem onClick={handleLeaveRoom}>Leave the room</MenuItem>
            <MenuItem onClick={handleClose}>Delete the room</MenuItem>
            <MenuItem onClick={handleClose}>Notify</MenuItem>
            <MenuItem onClick={inviteFriend}>Invite friends</MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
            <MenuItem onClick={handleArchiveToggle}>
              {removedFrom ? "Undo from Archived" : "Archive"}
            </MenuItem>
            <MenuItem onClick={handleClose}>Notify</MenuItem>
          </>
        )}
      </Menu>
    </div>
  );
});

export default PositionedMenu;

// import * as React from "react";
// import Button from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import { toast } from "react-toastify";

// import { useChattyContext } from "../pages/ChattyContextProvider";

// // eslint-disable-next-line react/display-name
// const PositionedMenu = React.memo((props) => {
//   const { socket, CurrentUserFullData } = useChattyContext();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const handleArchivedHandler = async (user, CurrentUserFullData) => {
//     // socket.emit("test", "from fetching archived users");

//     const response = await fetch("/api/v1/feed/archived-user", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         userToArchieve: user,
//         currentUserFullData: CurrentUserFullData,
//       }),
//     });
//     const result = await response.json();
//     if (response.ok) {
//       console.log(result);
//       setAnchorEl(null);
//       window.location.reload();
//     } else {
//       // console.log(result);
//       return toast.error(result.msg);
//     }
//   };
//   const handleUndoArchivedHandler = async (user, CurrentUserFullData) => {
//     // socket.emit("test", "from undo fetching archived users");

//     const response = await fetch("/api/v1/feed/undo-archived-user", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         userToArchieve: user,
//         currentUserFullData: CurrentUserFullData,
//       }),
//     });
//     const result = await response.json();
//     if (response.ok) {
//       // console.log(result);
//       setAnchorEl(null);
//       window.location.reload();
//     } else {
//       // console.log(result);
//       return toast.error(result.msg);
//     }
//   };
//   // for rooms
//   const inviteFriendHandlerWithHandleClose = async (room) => {
//     const inviteLink = `http://localhost:5173/join/${room._id}`;
//     navigator.clipboard
//       .writeText(inviteLink)
//       .then(() => {
//         toast.success("Link copied to cliboard");
//       })
//       .catch((err) => {
//         toast.error(`Unable to copy to clipboard ${err}`);
//       });
//   };
//   const leaveTheRoomHandler = async (room) => {
//     const response = await fetch(`api/v1/room/leave/${room._id}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const result = await response.json();
//     if (response.ok) {
//       toast.success(result.msg);
//       setAnchorEl(null);

//       setTimeout(() => {
//         window.location.reload();
//       }, 1000);

//       socket.emit("notify-someone-leave", {
//         msg: `${CurrentUserFullData.userName} left this group`,
//         roomId: room._id,
//       });
//     }
//     // return null;
//     else {
//       toast.error(result.msg);
//     }
//   };

//   return (
//     <div>
//       <Button
//         id="demo-positioned-button"
//         aria-controls={open ? "demo-positioned-menu" : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? "true" : undefined}
//         onClick={handleClick}
//       >
//         <span className="material-symbols-outlined" style={{ width: "0px" }}>
//           more_vert
//         </span>
//       </Button>
//       <Menu
//         id="demo-positioned-menu"
//         aria-labelledby="demo-positioned-button"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: "top",
//           horizontal: "left",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "left",
//         }}
//       >
//         {props.room
//           ? [
//               <MenuItem
//                 key="leave"
//                 onClick={() => leaveTheRoomHandler(props.room)}
//               >
//                 Leave the room
//               </MenuItem>,
//               <MenuItem key="delete" onClick={handleClose}>
//                 Delete the room
//               </MenuItem>,
//               <MenuItem key="notify" onClick={handleClose}>
//                 Notify
//               </MenuItem>,
//               <MenuItem
//                 key="invite"
//                 onClick={() => inviteFriendHandlerWithHandleClose(props.room)}
//               >
//                 Invite friends
//               </MenuItem>,
//             ]
//           : [
//               <MenuItem key="delete" onClick={handleClose}>
//                 Delete
//               </MenuItem>,
//               !props.removedFrom ? (
//                 <MenuItem
//                   key="archived"
//                   onClick={() =>
//                     handleArchivedHandler(props.user, props.CurrentUserFullData)
//                   }
//                 >
//                   Archived
//                 </MenuItem>
//               ) : (
//                 <MenuItem
//                   key="undoArchived"
//                   onClick={() =>
//                     handleUndoArchivedHandler(
//                       props.user,
//                       props.CurrentUserFullData
//                     )
//                   }
//                 >
//                   Undo from Archived
//                 </MenuItem>
//               ),
//               <MenuItem key="notify" onClick={handleClose}>
//                 Notify
//               </MenuItem>,
//             ]}
//       </Menu>
//     </div>
//   );
// });
// export default PositionedMenu;

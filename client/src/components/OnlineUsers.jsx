import { Box, Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { useEffect, useState } from "react";

export default function OnlineUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/v1/feed/all-users");
      const result = await response.json();
      if (response.ok) {
        // console.log(result);
        setUsers(result);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Box display={"flex"} marginLeft={2} mt={2} mb={2}>
      <AvatarGroup total={24}>
        {users.map((user, key) => {
          return (
            <div key={key}>
              {user.socketId && (
                <Tooltip title={user.userName} arrow>
                <Avatar
                  alt={user.userName}
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(user.avatarSrc)}`}
                />
              </Tooltip>
              )}
            </div>
          );
        })}
      </AvatarGroup>
    </Box>
  );
}

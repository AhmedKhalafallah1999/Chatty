import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

import { useChattyContext } from "../pages/ChattyContextProvider";

export default function LatestConversations() {
  const { CurrentUserFullData } = useChattyContext();
  const [threePreviousChats, setThreePreviousChats] = useState([]);
  useEffect(() => {
    const threePreviousChatsHandler = async () => {
      const response = await fetch("/api/v1/feed/previousThreeChats");
      const result = await response.json();
      if (response.ok) {
        // console.log(result);
        setThreePreviousChats(result.messages);
      }
    };
    threePreviousChatsHandler();
  }, []);
  return (
    <List sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper" }}>
      {threePreviousChats.map((msg, key) => {
        return (
          <ListItem alignItems="flex-start" key={key}>
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src={`data:image/svg+xml;utf8,${encodeURIComponent(
                  CurrentUserFullData.avatarSrc
                )}`}
              />
            </ListItemAvatar>
            <ListItemText
              primary={`${new Date(
                msg.timestamp
              ).toLocaleDateString()} ${new Date(
                msg.timestamp
              ).toLocaleTimeString()}`}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline", marginRight: "5px" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {CurrentUserFullData.userName + ":"}
                  </Typography>
                  {msg.message}
                </React.Fragment>
              }
            />
          </ListItem>
        );
      })}

      <Divider variant="inset" component="li" />
    </List>
  );
}

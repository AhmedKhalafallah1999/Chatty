import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//
import { useChattyContext } from "../pages/ChattyContextProvider";

export const loader = async ({ params }) => {
  const roomId = params.roomId;
  const response = await fetch(`/api/v1/room/join/${roomId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  if (response.ok) {
    return toast.success(result.msg);
  }
  // return null;
  else {
    return toast.error(result.msg);
  }
};

const JoinRoom = () => {
  // const chattyContext = useChattyContext();
  const navigate = useNavigate();

  useEffect(() => {
    const joinRoom = async () => {
      try {
        // if (!chattyContext || !chattyContext.socket) {
        //   // Handle the case when the context or socket is not available
        //   console.error("Chatty context or socket is not available");
        //   return;
        // }

        // const { socket, CurrentUserFullData } = chattyContext;

        // Wait for the loader to finish
        await loader({
          params: { roomId: window.location.pathname.split("/").pop() },
        });

        // Navigation after loader is complete
        // console.log("fff");
        // socket.emit("notify-joining-room", {
        //   msg: `${CurrentUserFullData.userName} has joined the room recently`,
        //   roomId: window.location.pathname.split("/").pop(),
        // });

        navigate("/home");
      } catch (error) {
        toast.error(error.message);
      }
    };

    joinRoom();
  }, [navigate]);

  return <></>;
};

export default JoinRoom;

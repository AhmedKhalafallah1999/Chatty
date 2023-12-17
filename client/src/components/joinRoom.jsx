import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  return toast.error(result.msg);
};

const JoinRoom = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const joinRoom = async () => {
      try {
        // Wait for the loader to finish
        await loader({
          params: { roomId: window.location.pathname.split("/").pop() },
        });
        // Navigation after loader is complete
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

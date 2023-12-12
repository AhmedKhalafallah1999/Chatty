import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useChattyContext } from "../pages/Home";
import RightDrawer from "./RightDrawer";

const style = {
  position: "absolute",
  top: "0%",
  right: "10%",
  transform: "translate(-50%, -50%)",
  p: 4,
};

export default function BasicModal({ theme }) {
  const { CloseRightModalHandler, ModalRightState } = useChattyContext();
  return (
    <div>
      <Modal
        open={ModalRightState}
        onClose={CloseRightModalHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Box sx={style}>
          <RightDrawer isSmall />
        </Box>
      </Modal>
    </div>
  );
}

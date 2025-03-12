import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { useChattyContext } from "../pages/ChattyContextProvider";

import DrawerSlider from "./Drawer";

const style = {
  position: "absolute",
  top: "0%",
  left: "30%",
  transform: "translate(-50%, -50%)",
  p: 4,
};

export default function BasicModal({ theme }) {
  const { CloseModalHandler, ModalState } = useChattyContext();
  return (
    <div>
      <Modal
        open={ModalState}
        onClose={CloseModalHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Box sx={style}>
          <DrawerSlider isSmall />
        </Box>
      </Modal>
    </div>
  );
}

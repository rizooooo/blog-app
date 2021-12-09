import { useContext } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ModalContext } from "app/context";

export const CustomModal = () => {
  const {
    toggleModal,
    isOpen = false,
    messageHandler,
    titleHandler,
    onYesClick,
    onNoClick,
    resetState,
  } = useContext(ModalContext);

  const [title = "Modal Header"] = titleHandler!;
  const [message] = messageHandler!;
  const [yesHandler] = onYesClick!;

  const [noHandler] = onNoClick!;

  return (
    <Modal onClosed={resetState} isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        {yesHandler && (
          <Button className="me-2" color="primary" onClick={yesHandler}>
            Yes
          </Button>
        )}
        {noHandler && <Button onClick={noHandler}>No</Button>}
      </ModalFooter>
    </Modal>
  );
};

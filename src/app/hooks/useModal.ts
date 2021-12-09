import { ModalContext } from "app/context";
import { useContext, useEffect } from "react";

interface IUseModal {
  onYesPress?: () => void;
  onNoPress?: () => void;
}

export const useModal = ({ onYesPress, onNoPress }: IUseModal = {}) => {
  const {
    toggleModal,
    onNoClick,
    onYesClick,
    closeModal,
    showModal,
  } = useContext(ModalContext);

  const [yesHandler, setYesHandler] = onYesClick!;
  const [noHandler, setNoHandler] = onNoClick!;

  useEffect(() => {
    if (onYesPress && !yesHandler) {
      setYesHandler(() => onYesPress);
    }
  }, [onYesPress, yesHandler, setYesHandler]);

  useEffect(() => {
    if (onNoPress && !noHandler) {
      setNoHandler(() => onNoPress);
    }
  }, [onNoPress, noHandler, setNoHandler]);



  return {
    toggleModal,
    onNoClick: noHandler,
    onYesClick: yesHandler,
    closeModal,
    showModal,
  };
};

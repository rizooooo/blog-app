import { CustomModal } from "app/components";
import { ModalContext } from "app/context";
import React, { FC, useState } from "react";
import { IShowModal } from "./types";

export const ModalProvider: FC = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("Modal Title");
  const [description, setDescription] = useState("Modal Title");

  const [yesClickHandler, setYesClickHandler] = useState<(() => void) | null>(
    null
  );
  const [noClickHandler, setNoClickHandler] = useState<(() => void) | null>(
    null
  );

  const toggleModal = () => setShowModal((prev) => !prev);

  const show = ({ title, message, onYesClick, onNoClick }: IShowModal) => {
    if (title) {
      setTitle(title);
    }

    if (message) {
      setDescription(message);
    }
    if (onYesClick) {
      setYesClickHandler(() => onYesClick);
    }

    if (onNoClick) {
      setNoClickHandler(() => onNoClick);
    }

    setShowModal((prev) => !prev);
  };

  const resetState = () => {
    setYesClickHandler(null);
    setNoClickHandler(null);
    setDescription("");
    setTitle("");
  };

  const close = () => setShowModal(false);
  return (
    <ModalContext.Provider
      value={{
        showModal: show,
        toggleModal: toggleModal,
        isOpen: showModal,
        onYesClick: [yesClickHandler, setYesClickHandler],
        onNoClick: [noClickHandler, setNoClickHandler],
        titleHandler: [title, setTitle],
        messageHandler: [description, setDescription],
        closeModal: close,
        resetState,
      }}
    >
      {children}
      <CustomModal />
    </ModalContext.Provider>
  );
};

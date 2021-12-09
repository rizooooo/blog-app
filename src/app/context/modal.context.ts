import { IShowModal } from "app/providers/ModalProvider/types";
import { createContext } from "react";

interface IModalContext {
  showModal: (params: IShowModal) => void;
  isOpen?: boolean;

  toggleModal: () => void;

  onYesClick?: [
    (() => void) | null,
    React.Dispatch<React.SetStateAction<(() => void) | null>>
  ];
  onNoClick?: [
    (() => void) | null,
    React.Dispatch<React.SetStateAction<(() => void) | null>>
  ];

  titleHandler?: [string, React.Dispatch<React.SetStateAction<string>>];
  messageHandler?: [string, React.Dispatch<React.SetStateAction<string>>];

  closeModal?: () => void;
  resetState: () => void;
}

export const ModalContext = createContext<IModalContext>({
  toggleModal: () => null,
  showModal: () => null,
  resetState: () => null,
});

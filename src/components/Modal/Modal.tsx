import React, { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ModalBody from "./ModalBody";
export interface ModalInterface {
  type?: string;
  title: string;
  isOpen: boolean;
  children: ReactNode;
  handleCloseModal: () => void;
}

const Modal: React.FC<ModalInterface> = ({
  type = "CREATE",
  title,
  isOpen,
  children,
  handleCloseModal,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(
        <ModalBody
          type={type}
          title={title}
          isOpen={isOpen}
          handleCloseModal={handleCloseModal}
        >
          {children}
        </ModalBody>,
        document.querySelector("#modal") as Element
      )
    : null;
};

export default Modal;

import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode } from "react";
import { CgClose } from "react-icons/cg";
import ModalCloseButton from "./styled-component/ModalCloseButton";
import ModalContainer from "./styled-component/ModalContainer";
import ModalFooter from "./styled-component/ModalFooter";
import ModalHeader from "./styled-component/ModalHeader";

export interface ModalInterface {
  type: string;
  title: string;
  isOpen: boolean;
  children: ReactNode;
  handleCloseModal: () => void;
}

const ModalBody: React.FC<ModalInterface> = ({
  type,
  title,
  isOpen,
  children,
  handleCloseModal,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <ModalContainer
          transition={{ ease: "easeInOut", times: { duration: 0.05 } }}
          exit={{
            opacity: 0,
            transition: { duration: 0.05, delay: 0.1, ease: "easeInOut" },
          }}
        >
          <motion.div
            transition={{ ease: "easeInOut", duration: 0.05, delay: 0.05 }}
            exit={{
              opacity: 0,
              scale: 0.6,
              transition: { duration: 0.1, ease: "easeInOut" },
            }}
            className="p-0"
          >
            <ModalHeader>
              <div className="d-flex align-items-center">
                <div>
                <h3 className="fs-4 m-0 text-white fw-semibold">{`${
                  type === "UPDATE" ? "Actualizar" : type === "CREATE" ? "Añadir" : "Detalle"
                } ${title}`}</h3>
                </div>
              </div>
              <div>
                <ModalCloseButton onClick={handleCloseModal}>
                  <CgClose color="#fff" size={22} />
                </ModalCloseButton>
              </div>
            </ModalHeader>
            {children}
            {/* <ModalFooter>
              <h1>Karibe Admin</h1>
            </ModalFooter> */}
          </motion.div>
        </ModalContainer>
      )}
    </AnimatePresence>
  );
};

export default ModalBody;

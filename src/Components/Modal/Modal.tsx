import { useEffect } from "react";
import { useModal } from "../../Store";
import { AnimatePresence, motion } from "framer-motion";

const Modal = () => {
  const { isOpen, closeModal, component } = useModal() as any;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute top-0 left-0 w-full h-full bg-black/50 opacity-50"
          />

          <motion.div
            initial={{ y: 24 }}
            animate={{ y: 0 }}
            exit={{ y: 24 }}
            className="relative z-[60]"
          >
            {component}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

import { motion } from "framer-motion";

const Modal = ({ isOpen, onClose, children, maxWidth }) => {
  if (!isOpen) return null;
  return (
    <div className="h-full w-full fixed flex items-center justify-center top-0 left-0 z-50">
      <div
        onClick={onClose}
        className="bg-black opacity-70 fixed top-0 w-full bottom-0 cursor-pointer"
      ></div>
      <div style={{maxWidth: `${maxWidth}px`}} className={`w-full px-6 mx-auto`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="border border-borderColor rounded-lg bg-white px-6 pt-4 pb-7 shadow-lg relative w-full "
        >
          <div className="">{children}</div>
        </motion.div>
      </div>
    </div>
  );
};

export default Modal;

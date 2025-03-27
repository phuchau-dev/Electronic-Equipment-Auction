import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { MyButton } from "src/common/customs/MyButton";

const TheAuctionContinues: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { isOpen, onOpenChange } = useDisclosure({ defaultOpen: true });

  useEffect(() => {
    const timer = setTimeout(() => {
      onOpenChange();
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onOpenChange, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        radius="sm"
        onOpenChange={() => {
          onOpenChange();
          if (!isOpen) onClose();
        }}
        size="sm"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Thông báo</ModalHeader>
          <ModalBody className="flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              className="text-center text-lg font-medium"
              style={{ color: '#4caf50' }}
            >
              Cảm ơn quý vị đã kiên nhẫn chờ đợi! Buổi đấu giá sẽ tiếp tục ngay bây giờ. Hệ thống đã thêm 5 phút vào thời gian đấu giá.
            </motion.p>
          </ModalBody>
          <ModalFooter>
            <MyButton variant="gradientBlue" size="sm" onPress={() => {
              onOpenChange();
              onClose();
            }}>
              Đã hiểu
            </MyButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </motion.div>
  );
};

export default TheAuctionContinues;

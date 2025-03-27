import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { AuctionWin } from "src/services/AuctionWinsByUser/types/getAuctionWinsByUser";
import { MyButton } from "src/common/customs/MyButton";

interface ModalComponentProps {
  auction: AuctionWin | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onConfirmTemporary: () => void; // Thêm prop onConfirmTemporary
  onCancel: () => void;
  onCancelTemporary: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  auction,
  isOpen,
  onClose,
  onConfirm,
  onConfirmTemporary,
  onCancel,
  onCancelTemporary
}) => {
  if (!auction) return null;

  const productName = auction.auctionPricingRange && auction.auctionPricingRange.product_randBib
    ? auction.auctionPricingRange.product_randBib.product_name
    : "Tên sản phẩm";

  return (
    <Modal isOpen={isOpen} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description" placement="center" size="xl">
      <ModalContent>
        <ModalHeader id="modal-title">Chi tiết đấu giá</ModalHeader>
        <ModalBody>
          <p><strong>Tên sản phẩm:</strong> {productName}</p>
          <p><strong>Giá trúng:</strong> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(auction.bidPrice)}</p>
          <p><strong>Thời gian bắt đầu:</strong> {new Date(auction.startTime).toLocaleString()}</p>
          <p><strong>Thời gian kết thúc:</strong> {new Date(auction.endTime).toLocaleString()}</p>
          <p><strong>Trạng thái xác nhận:</strong> {auction.confirmationStatus}</p>
          <p><strong>Trạng thái đấu giá:</strong> {auction.auctionStatus === "won" ? "Chiến thắng đấu giá" : "Đang trong danh sách hàng chờ"}</p>
        </ModalBody>
        <ModalFooter>
          {auction.auctionStatus === "won" && (
            <MyButton variant="confirmSolid" color="primary" size="sm" onPress={onConfirm}>
              Xác nhận
            </MyButton>
          )}
          {auction.auctionStatus === "temporary" && (
            <MyButton variant="confirmSolidTemporary" color="secondary" size="sm" onPress={onConfirmTemporary}>
              Xác nhận tạm thời
            </MyButton>
          )}
          {auction.auctionStatus === "temporary" ? (
            <MyButton variant="cancelSolidTemporary" size="sm" onPress={onCancelTemporary}>
              Hủy
            </MyButton>
          ) : (
            <MyButton variant="cancelSolid" size="sm" onPress={onCancel}>
              Hủy
            </MyButton>
          )}
          <Button variant="bordered" size="sm" color="default" onPress={onClose}>
            Đóng
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;

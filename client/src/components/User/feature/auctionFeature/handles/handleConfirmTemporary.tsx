import { AppDispatch } from "src/redux/store";
import { confirmAuctionTemporaryThunk, getAuctionWinsByUserThunk, clearAuctionWinById } from "src/redux/sessionAuction/thunk";
import { AuctionWin } from "src/services/AuctionWinsByUser/types/getAuctionWinsByUser";
import { toast } from "react-hot-toast";

export const handleConfirmTemporary = async (
  selectedAuction: AuctionWin | null,
  dispatch: AppDispatch,
  currentPage: number,
  setSelectedAuction: React.Dispatch<React.SetStateAction<AuctionWin | null>>,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (selectedAuction) {
    try {
      const response = await dispatch(confirmAuctionTemporaryThunk({ auctionWinnerId: selectedAuction._id })).unwrap();
      toast.success(response.msg || "Xác nhận tạm thời thành công!");
      setSelectedAuction(null);
      setIsModalOpen(false);
      setTimeout(async () => {
        await dispatch(getAuctionWinsByUserThunk({ page: currentPage }));
        dispatch(clearAuctionWinById(selectedAuction._id));
      }, 1000);
    } catch (error: any) {
      toast.error(error.msg || "Xác nhận tạm thời thất bại!");
      console.error("Xác nhận tạm thời thất bại:", error);
    }
  }
};

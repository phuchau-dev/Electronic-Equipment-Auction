import { AppDispatch } from "src/redux/store";
import Swal, { SweetAlertResult } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { listProductAuctionThunk, softDeleteAuctinonThunk } from "src/redux/product/admin/Thunk";

const MySwal = withReactContent(Swal);

export const handleSoftDeleteProduct = (
  productId: string,
  dispatch: AppDispatch,
  currentPage: number,
  searchTerm: string
) => {

  MySwal.fire({
    title: "Xóa sản phẩm?",
    text: "Bạn có chắc muốn xóa sản phẩm này không!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Có",
    cancelButtonText: "Hủy",
  }).then(async (result: SweetAlertResult) => {
    if (result.isConfirmed) {
      try {
        const action = await dispatch(softDeleteAuctinonThunk(productId));
        if (softDeleteAuctinonThunk.rejected.match(action)) {
          const errorMsg = action.payload?.msg || "Đã xảy ra sự cố khi xóa sản phẩm.";
          notifyError(errorMsg);
        } else {
          const successMsg = action.payload?.msg || "Sản phẩm của bạn đã bị xóa.";
          notify(successMsg);
          dispatch(listProductAuctionThunk({ page: currentPage, search: searchTerm }));
        }
      } catch (error) {
        notifyError("Đã xảy ra sự cố khi xóa sản phẩm.");
      }
    }
  });
};

const notify = (message: string) => {
  MySwal.fire({
    title: "Đã xóa!",
    text: message,
    icon: "success",
    customClass: {
      confirmButton: "bg-blue-500 md:bg-green-500",
    },
  });
};

const notifyError = (message: string) => {
  MySwal.fire({
    title: "Lỗi!",
    text: message,
    icon: "error",
    customClass: {
      confirmButton: "bg-red-600",
    },
  });
};

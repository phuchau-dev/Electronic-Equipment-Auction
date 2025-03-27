import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,  useNavigate} from "react-router-dom";
import { AppDispatch, RootState } from "src/redux/store";
import { getWinnerAuctionDetailsAdmin } from "src/redux/adminCheckAuct/adminCheckAuctThunk";
import { updateChecckAuctStatusThunk } from "src/redux/adminCheckAuct/updateStatusCheck/updateStatusCheckThunk";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
// import withReactContent from "sweetalert2-react-content";
// import Swal from "sweetalert2";
import { Button, Progress } from "@nextui-org/react";
// const MySwal = withReactContent(Swal);
import currencyFormatter from "currency-formatter";
function formatCurrency(value: number) {
  return currencyFormatter.format(value, { code: "VND", symbol: "" });
}
const OrderDetails: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const checkAll = useSelector((state: RootState) => state.checkAuctWinnerAll);


  // const [selectedStatus, setSelectedStatus] = useState<string>("");


  const [progressValue, setProgressValue] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      dispatch(getWinnerAuctionDetailsAdmin(id));
    }
  }, [dispatch, id]);

  const selectedOrder = checkAll.confirmOrder;


  // const selectedOrderStatus = Array.isArray(orders.orders)
  //   ? orders.orders.find((order) => order._id === id)
  //   : orders.orders;
  // console.log('selectedOrderStatus', selectedOrderStatus);

  // useEffect(() => {
  //   if (selectedOrderStatus) {
  //     setSelectedStatus(selectedOrderStatus?.stateOrder || "");
  //   }
  // }, [selectedOrderStatus]);
  useEffect(() => {
    switch (selectedOrder?.state) {
      case "Xử lý duyệt":
        setProgressValue(50);
        break;


      case "Đã duyệt hủy chiến thắng":
        setProgressValue(100);
        break;
      default:
        setProgressValue(0);
    }
  }, [selectedOrder?.state]);
  // const handleStatusChange = async(e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const newStatus = e.target.value;

  //   setSelectedStatus(newStatus);

  // };
  const handleBackToList = () => {
    navigate("/admin/listCheckAuct");
  };

  const idCheck = selectedOrder?.auctionWinnerid


  const handleUpdateStatus = async(newStatus: string) => {


    if (selectedOrder ) {

      await dispatch(updateChecckAuctStatusThunk({
        idWinner:idCheck as string,
        stateCheck: newStatus  })).unwrap()
        toast.success(
    "Cập nhật thành công!"
        );

        await dispatch(
          getWinnerAuctionDetailsAdmin(selectedOrder?.auctionWinnerid as string)
        ).unwrap();


     }

  };


  const renderStatusButton = () => {
    switch (selectedOrder?.state) {
      case "Chờ duyệt":
        return (
          <Button
            onClick={() => {
              // setSelectedStatus("Chờ xử lý");
              handleUpdateStatus("Xử lý duyệt");
            }}
            className="mt-4 bg-green-500 text-white"
          >
           Xử lý duyệt
          </Button>
        );
      case "Xử lý duyệt":
        return (
          <Button
            onClick={() => {
              // setSelectedStatus();
              handleUpdateStatus("Đã duyệt hủy chiến thắng");
            }}
            className="mt-4 bg-red-500 text-white"
          >
            Đã duyệt hủy chiến thắng
          </Button>
        );

      default:
        return null;
    }
  };

  // const formatDate = (dateString: any) => {
  //   if (dateString && dateString.length === 14) {
  //     // Tách chuỗi theo từng phần (yyyy, MM, dd, HH, mm, ss)
  //     const year = dateString.slice(0, 4);
  //     const month = dateString.slice(4, 6);
  //     const day = dateString.slice(6, 8);
  //     const hours = dateString.slice(8, 10);
  //     const minutes = dateString.slice(10, 12);
  //     const seconds = dateString.slice(12, 14);

  //     // Tạo đối tượng Date từ chuỗi đã tách
  //     return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
  //   }
  //   return null; // Trả về null nếu chuỗi không hợp lệ
  // };

  // const formattedDate = formatDate(selectedOrder?.refundPay?.paymentDateVnPay);
  const converNumber = Number(selectedOrder?.winnerPrice)
  const productPrice = Number(selectedOrder?.productDetails?.productPrice)
  const formatCustomId = (id: string): string => {
    if (!id || id.length < 3) {
      throw new Error("ID không hợp lệ. Cần có ít nhất 3 ký tự.");
    }
    const suffix = id.slice(-3); // Lấy 3 ký tự cuối của ID
    return `EBIDWIN-${suffix}`;
  };

  const customeID = String(selectedOrder?.auctionWinnerid)
  const customeFine = formatCustomId(customeID)
  const formatDateVN = (dateString: string) => {
    const date = new Date(dateString); // Chuyển đổi chuỗi thành đối tượng Date
    return date.toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh", // Thiết lập múi giờ
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };
  return (
    <main className="w-full flex-grow p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">

        <h2 className="text-2xl font-semibold mb-4">Chi tiết </h2>
        {selectedOrder ? (

            <div className="mb-6">
                <section className="mb-8 bg-white rounded-lg shadow-lg p-6 hover:shadow-xl
                transition-shadow duration-300">
                   <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Thông tin phiên đấu giá
          </h2>
                  <div className="space-y-2">
                  <p className="text-lg mb-2 text-gray-700">
                <span className="font-medium ">Mã chiến thắng:</span> {" "}
                {customeFine}
              </p>
              <p className="text-lg mb-2 text-blue-700">
                <span className="font-medium ">Trạng thái xử lý:</span>{" "}
                 {selectedOrder?.state}
              </p>

              <p className="text-lg mb-2">
                <span className="font-medium">Ngày chiến thắng:</span>{" "}
                {formatDateVN(selectedOrder?.date)}
              </p>
              <p className="text-lg text-red-600 mb-2">
                <span className="font-medium">Tổng tiền:</span>{" "}
                {formatCurrency(converNumber) } VNĐ
              </p>

              {renderStatusButton()}


           <div className="mt-4">
            <label className="text-lg font-medium mb-2 block">
              Tiến trình xử lý:
            </label>
            <Progress
              aria-label="Order Progress"
              size="lg"
              value={progressValue}
              color="success"
              showValueLabel={true}
              className="max-w-md"
            />
          </div>

                  </div>
                </section>

            <section className="mb-8 bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Thông tin khách hàng
          </h2>
          <div className="space-y-2">
            <p className="text-lg mb-2 text-gray-700">
              <span className="font-medium">Họ tên:</span>{" "}
              {selectedOrder?.userInforWinner?.recipientName}
            </p>
            <p className="text-lg mb-2 text-gray-700">
              <span className="font-medium">Số điện thoại:</span>{" "}
              {selectedOrder.userInforWinner?.phone}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-medium">Email:</span>{" "}
              {selectedOrder.userInforWinner?.email}
            </p>
          </div>
        </section>



        <section className="mb-8 bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
  <h2 className="text-2xl font-bold mb-4 text-gray-800">Sản Phẩm</h2>
  <div className="space-y-4">
    {selectedOrder?.productDetails ? (
      <div
        className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md transition-all duration-200 hover:bg-gray-200"
      >
        <div className="flex items-center space-x-4">
          <img
            src={selectedOrder?.productDetails?.image}
            alt={selectedOrder?.productDetails?.productName}
            className="w-16 h-16 object-cover rounded-md"
          />
          <div>
            <h4 className="font-medium text-lg text-gray-800">
              {selectedOrder?.productDetails?.productName}
            </h4>
            <p className="text-gray-600">Số lượng: {selectedOrder?.productDetails?.quantity}</p>
          </div>
        </div>
        <p className="text-lg text-gray-800">
          {formatCurrency(productPrice)} VNĐ
        </p>
      </div>
    ) : (
      <p className="text-gray-600">Không có thông tin sản phẩm.</p>
    )}
  </div>
</section>


          </div>
        ) : (
          <p>Loading...</p>
        )}


      </div>
<br />

      <button
          onClick={handleBackToList}
               className="w-full bg-blue-600 text-white py-3 rounded-md shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Quay lại danh sách đơn hàng
        </button>
      <ToastContainer />
    </main>
  );
};

export default OrderDetails;

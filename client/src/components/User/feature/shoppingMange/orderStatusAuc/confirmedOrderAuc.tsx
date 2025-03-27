import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/redux/store";
import { fetchOrderDataConfirmThunk } from "src/redux/statusOrderUser/confirmedStatus/confirmedStatusThunk";
// import { softDelThunk } from "../../../../../redux/statusOrderUser/softDelByUser/softDellOrderThunk";
import { OrderProductConfirmed, OrderDataAllConfirmed } from "src/types/iterationOrder/confirmedStatusOrder";

import currencyFormatter from "currency-formatter";
import { useNavigate } from "react-router-dom";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteOrderModal from 'src/components/User/feature/shoppingMange/orderStatusAuc/modalSoftDel/orderSoftDelModal';
function formatCurrency(value: number) {
  return currencyFormatter.format(value, { code: "VND", symbol: "" });
}

const OrderListConfirmedStatus: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const ordersFromStore = useSelector(
    (state: RootState) => state.statusShippingOrder.orderShipping
  );



// const orderIds = ordersFromStore[0].orderId

  const navigate = useNavigate();
  const userId = useSelector(
    (state: RootState) => state.auth.profile.profile?._id
  );
  // const orderId = useSelector(
  //   (state: RootState) => state.orderAuction.orderData?.orderAuctionID
  // );

  // console.log('orderId', orderId);

  const [showAll, setShowAll] = useState(false);
  const [orders, setOrders] = useState<OrderDataAllConfirmed[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<OrderDataAllConfirmed | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [, setLocalOrder] = useState(orders);


  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    // Set orders to ordersFromStore or an empty array if it's null
    if (Array.isArray(ordersFromStore) && ordersFromStore.length > 0) {
      setOrders(ordersFromStore);
    } else {
      setOrders([]);
    }
  }, [ordersFromStore]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchOrderDataConfirmThunk(userId));
    }
  }, [dispatch, userId]);

  const goBack = () => {
    navigate("/auction");
  };

  const handleDeleteClick = (orderId: OrderDataAllConfirmed) => {
    setIsModalOpen(true);

    setSelectedOrderId(orderId);


    setOrders((prevOrders) =>
      prevOrders.filter((o) => o.orderId !== orderId.orderId) // Assuming orderId is a property of order
    );



  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };
  // const handleSoftDelOrder = (orderId: string) => {
  //   if (orderId && userId ) {


  //     // Assuming orderId is an array and you want to delete multiple orders
  //     dispatch(softDelThunk({orderId})).unwrap();
  //     // dispatch(fetchOrderDataShippingThunk(userId));
  //     setOrders((prevCategories) =>
  //       prevCategories.filter((order) => order.orderId !== orderId)
  //     );
  //     toast.success("Xóa đơn hàng thành công");
  //   } else {
  //     toast.error("Không tìm thấy ID đơn hàng để xóa");
  //   }


  // };
  return (
    <div className="mt-6 border border-gray-300 pt-7 rounded-lg shadow-md bg-white">
      {orders
        .filter((order: OrderDataAllConfirmed) => order.stateOrder === "Đã xác nhận") // Filter orders with 'Vận chuyển' state
        .map((order: OrderDataAllConfirmed, index: number) => (
          <div key={index} className="order-item mb-6 px-4 md:px-11">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              <div className="order-info mb-4 md:mb-0">
                <p className="font-semibold text-xl text-gray-800">
                  Tên người nhận:{" "}
                  <span className="font-normal">{order.recipientName}</span>
                </p>
                <p className="font-semibold text-xl text-gray-800 mt-3">
                  Trạng thái:{" "}
                  <span className="font-normal ">{order.stateOrder}</span>
                </p>
                <p className="font-semibold text-xl text-gray-800 mt-3">
                  Email: <span className="font-normal">{order.email}</span>
                </p>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-6">
              {order.products
                .slice(0, showAll ? order.products.length : 2)
                .map((product: OrderProductConfirmed, index: number) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-4 sm:flex-row mb-4 w-full border-b border-gray-200 pb-4"
                  >
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-24 h-24 object-cover sm:w-32 sm:h-32 rounded-md shadow-sm"
                    />
                    <div className="flex-1">
                      <h6 className="font-semibold text-lg sm:text-xl text-gray-800">
                        {product.name}
                      </h6>
                      <p className="font-medium text-md text-gray-600 mt-1">
                        <span className="text-gray-800">Số lượng:</span>{" "}
                        {product.quantity} đơn vị
                      </p>
                      <p className="font-medium text-md text-gray-600 mt-1">
                        <span className="text-gray-800">Phí vận chuyển:</span>{" "}
                        {formatCurrency(product.shippingFee)} đ
                      </p>
                      <p className="font-medium text-md text-gray-600 mt-1">
                        <span className="text-gray-800">
                          Phương thức thanh toán:
                        </span>{" "}
                        {product.paymentMethod}
                      </p>
                      <p className="font-medium text-md text-red-600 mt-1">
                        <span className="text-gray-800">Tổng tiền:</span>{" "}
                        {formatCurrency(product.totalPrice)} đ
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 w-full md:w-auto md:flex-row mt-4 md:mt-0 md:ml-auto justify-center md:justify-end">
                      <button
                     onClick={() => handleDeleteClick(order)} // Truy cập _id từ đối tượng order
                        className="flex items-center justify-center whitespace-nowrap rounded-full px-4 py-3 bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition duration-200 ease-in-out"
                      >
                        Hủy đơn hàng
                      </button>
                      <button
                        onClick={() => goBack()}
                        className="flex items-center justify-center whitespace-nowrap rounded-full px-4 py-3 bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition duration-200 ease-in-out"
                      >
                        Tiếp tục mua sắm
                      </button>
                    </div>
                  </div>
                ))}

              {/* Only show the toggle button if there are more than 2 products */}
              {order.products.length > 2 && (
                <button
                  onClick={toggleShowAll}
                  className="mt-4 text-indigo-600 hover:text-indigo-800"
                >
                  {showAll ? "Ẩn bớt sản phẩm" : "Xem tất cả sản phẩm"}
                </button>
              )}
            </div>
          </div>
        ))}
        <ToastContainer />
        {isModalOpen && selectedOrderId && (
  <DeleteOrderModal
  orderId={selectedOrderId.orderId}
  onClose={handleCloseModal}
  isOpen={isModalOpen}
/>
)}
    </div>
  );
};

export default OrderListConfirmedStatus;

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

const GetListAuction: React.FC = () => {
  const totalListAuction = useSelector((state: RootState) => state.products.LimitProductAuction.total || []);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
      <div className="flex-1 flex items-center space-x-2">
        <h5>
          <span className="text-gray-500">Tổng có: </span>
          <span className="dark:text-white">{totalListAuction}</span>
        </h5>
        <h5 className="text-gray-500 dark:text-gray-400 ml-1">Sản phẩm Đấu giá</h5>
      </div>
    </div>
  );
};

export default GetListAuction;

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListScreenThunk } from "src/redux/attribute/thunk";
import { AppDispatch, RootState } from "src/redux/store";
import SearchFormListScreen from "src/components/Admin/searchform/searchFormListScreen";
import AddProductButton from "src/components/Admin/buttonAdd";
import { handlesoftDeleteScreen } from "src/components/Admin/feature/attribute/handlers/softDeleteScreen";
import { Pagination, Tooltip } from "@nextui-org/react";
import { Screen } from "src/services/attribute/types/screen/listScreen";
import { Link } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import NoDataMessage from "src/components/Admin/feature/attribute/noData/noData";
import { CustomMyButton, MyButton } from "src/common/customs/MyButton";
import { CheckIcon, DeleteIcon, EditDocumentIcon } from "src/common/Icons";
import CustomChip from "src/common/customs/CustomChip";

const getListScreen: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchTerm] = useState("");
  const currentPage = useSelector(
    (state: RootState) => state.attribute.getListScreen.pagination?.currentPage || 1
  );
  const totalPages = useSelector(
    (state: RootState) => state.attribute.getListScreen.pagination?.totalPages || 1
  );
  const screens = useSelector((state: RootState) => state.attribute.getListScreen.screens || []);

  useEffect(() => {
    dispatch(getListScreenThunk({ page: currentPage, search: searchTerm }));
  }, [dispatch, currentPage]); // Chỉ phụ thuộc vào `currentPage`


  const handlePageChange = (page: number) => {
    dispatch(getListScreenThunk({ page, search: searchTerm }));
  };
  const renderCell = useCallback((screens: Screen, columnKey: string) => {
    switch (columnKey) {
      case "name":
        const screenName = screens.name;
        return (
          <Tooltip content={screenName} delay={0}>
            <span>
              {screenName.length > 20 ? `${screenName.substring(0, 20)}...` : screenName}
            </span>
          </Tooltip>
        );
      case "status":
        return (
          <CustomChip
            startContent={<CheckIcon size={18} />}
            color={screens.status === "active" ? "springGreen" : "danger"}
            className="drop-shadow shadow-black text-white"
            variant="flat"
          >
            {screens.status === "active" ? "Hiển thị" : "Đã ẩn"}
          </CustomChip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Xóa">
              <MyButton
                variant="shadow"
                size="sm"
                className="text-[#C20E4D] bg-gray-100 hover:bg-gray-200 drop-shadow shadow-black text-sm cursor-pointer active:opacity-50"
                onClick={() => handlesoftDeleteScreen(screens._id, dispatch, currentPage, searchTerm)}
              >
                <DeleteIcon /> Xóa
              </MyButton>
            </Tooltip>
            <Tooltip content="Cập nhật">
              <div>
                <CustomMyButton
                  as={Link}
                  to={`/admin/edit-screen/${screens._id}`}
                  variant="shadow"
                  size="sm"
                  className="text-success bg-gray-100 hover:bg-gray-200 drop-shadow shadow-black text-sm cursor-pointer active:opacity-50"
                >
                  <EditDocumentIcon /> Cập nhật
                </CustomMyButton>
              </div>
            </Tooltip>
          </div>
        );
      default:
        return null;
    }
  }, [dispatch, currentPage, searchTerm]);

  const columns = [
    { uid: "name", name: "Tên màn hình" },
    { uid: "status", name: "Trạng thái" },
    { uid: "actions", name: "Chức năng" },
  ];


  return (
    <>
      <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
        <SearchFormListScreen />
        <AddProductButton type="addScreen" />
      </div>
      {screens.length === 0 ? (
        <NoDataMessage
          type="screen"
          message={
            searchTerm
              ? "Không tìm thấy kết quả nào phù hợp với từ khóa tìm kiếm."
              : "Không có thông tin màn hình."
          }
        />
      ) : (
        <Table aria-label="Example table with custom cells" className="p-4">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} style={{ minWidth: "200px" }}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={screens}>
            {(screens) => (
              <TableRow key={screens._id}>
                {(columnKey) => (
                  <TableCell>{renderCell(screens, columnKey as string)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>

        </Table>

      )}
      {totalPages > 1 && (
        <div className="flex justify-center my-4">
          <Pagination
            isCompact
            loop
            showControls
            color="primary"
            total={totalPages}
            initialPage={currentPage}
            onChange={(page) => handlePageChange(page)}
          />
        </div>
      )}
    </>
  );
};

export default getListScreen;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListPostThunk } from "src/redux/post/thunk";
import { AppDispatch, RootState } from "src/redux/store";
import SearchPostList from "src/components/Admin/searchform/searchFomPostList";
import AddProductButton from "src/components/Admin/buttonAdd";
import { handlesoftDeletePost } from "src/components/Admin/feature/post/handlers/softDeletePost";
import { Pagination, Tooltip } from "@nextui-org/react";
import { Post} from "src/services/post/admin/types/listPost";
import { Link } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import SearchMessage from "src/components/Admin/feature/productV2/searchMessage";
import NoProductsMessage from "src/components/Admin/feature/productV2/noProduct";
import CustomChip from "src/common/customs/CustomChip";
import { CheckIcon, DeleteIcon, EditDocumentIcon } from "src/common/Icons";
import { CustomMyButton, MyButton } from "src/common/customs/MyButton";

const GetCategoryPostList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchTerm] = useState("");
  const currentPage = useSelector(
    (state: RootState) => state.post.listPost.pagination?.currentPage || 1
  );
  const totalPages = useSelector(
    (state: RootState) => state.post.listPost.pagination?.totalPages || 1
  );
  const post = useSelector((state: RootState) => state.post.listPost.posts || []);

  useEffect(() => {
    dispatch(getListPostThunk({ page: currentPage, search: searchTerm }));
  }, [dispatch, currentPage, searchTerm]);

  const handlePageChange = (page: number) => {
    dispatch(getListPostThunk({ page, search: searchTerm }));
  };
  const renderCell = (post:Post, columnKey: string) => {
    switch (columnKey) {
      case "image":
        return (
          <div className="flex items-center ">
            <img
              src={post.thumbnail[0]}
              className="rounded-lg w-16 md:w-32 max-w-full max-h-full sm:w-24 sm:min-w-[96px] sm:min-h-[96px]"
              alt={post.title}
            />
          </div>
        );
      case "title":
        const postTitle = post.title;
        return (
          <Tooltip content={postTitle} delay={0}>
            <span>
              {postTitle.length > 20 ? `${postTitle.substring(0, 20)}...` : postTitle}
            </span>
          </Tooltip>
        );

        case "status":
          return (
            <CustomChip
              startContent={<CheckIcon size={18} />}
              color={post.status === "active" ? "springGreen" : "danger"}
              className="drop-shadow shadow-black text-white"
              variant="flat"
            >
              {post.status === "active" ? "Hiển thị" : "Đã ẩn"}
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
                  onClick={() => handlesoftDeletePost(post._id, dispatch, currentPage, searchTerm)}
                >
                  <DeleteIcon /> Xóa
                </MyButton>
              </Tooltip>
              <Tooltip content="Cập nhật">
                <div>
                  <CustomMyButton
                    as={Link}
                    to={`/admin/edit-post/${post._id}`}
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
  };
  const columns = [
    { uid: "image", name: "Hình ảnh" },
    { uid: "title", name: "Tiêu đề bài viết" },
    { uid: "status", name: "Trạng thái" },
    { uid: "actions", name: "Chức năng" },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
        <SearchPostList/>
        <AddProductButton type="addPost" />
      </div>
      {post.length === 0 && searchTerm ? (
        <SearchMessage />
      ) : post.length === 0 ? (
        <NoProductsMessage />
      ) : (
        <Table aria-label="Product Variants Table" className="p-4">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "start" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={post}>
        {(post) => (
         <TableRow key={post._id}>
         {(columnKey) => (
           <TableCell>{renderCell(post, columnKey as string)}</TableCell>
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

export default GetCategoryPostList;

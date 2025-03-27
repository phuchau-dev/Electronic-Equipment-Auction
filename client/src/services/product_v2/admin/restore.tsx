import instance from "src/services/axios";
import { RestoreResponse } from "src/services/product_v2/admin/types/product";

export const restoreProduct = async (id: string): Promise<RestoreResponse> => {
  try {
    const response = await instance.patch(`/admin/product/restore/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      err: 1,
      msg: error.response?.data?.msg || "Lỗi khi khôi phục sản phẩm",
      status: error.response?.status || 500,
      data: undefined,
    };
  }
};

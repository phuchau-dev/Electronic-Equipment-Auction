import instance from "src/services/axios";
import { ProductFormat, SelectProductFormatResponse } from "src/services/product_v2/admin/types";

export const selectProductFormat = async (): Promise<ProductFormat[]> => {
  try {
    const response = await instance.get<SelectProductFormatResponse>(
      "/admin/product/selectProductFormat"
    );
    return response.data.productFormats;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách formats sản phẩm:", error);
    throw error;
  }
};

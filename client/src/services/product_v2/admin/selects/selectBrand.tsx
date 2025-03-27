import instance from "src/services/axios";
import { SelectBrandResponse } from "src/services/product_v2/admin/types/select/brand";
export const selectBrand = async (): Promise<SelectBrandResponse> => {
  try {
    const response = await instance.get<SelectBrandResponse>("/admin/product/selectbrand");
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.msg);
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách thương hiệu:", error);
    throw error;
  }
};

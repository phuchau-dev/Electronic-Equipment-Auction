import instance from "src/services/axios";
import { Brand, SelectBrandResponse } from "src/services/product_v2/admin/types/brand";
export const selectBrand = async (): Promise<Brand[]> => {
  try {
    const response = await instance.get<SelectBrandResponse>("/admin/product/selectbrand");
    return response.data.selectbrand;
  } catch (error) {
    console.error("lỗi brands:", error);
    throw error;
  }
};

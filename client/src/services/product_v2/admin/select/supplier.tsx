import instance from "src/services/axios";
import { Supplier, SelectSupplierResponse } from "src/services/product_v2/admin/types/supplier";
export const selectSupplier = async (): Promise<Supplier[]> => {
  try {
    const response = await instance.get<SelectSupplierResponse>("/admin/product/selectsupplier");
    return response.data.suppliers;
  } catch (error) {
    console.error("lỗi supplier:", error);
    throw error;
  }
};

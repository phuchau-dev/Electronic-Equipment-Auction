import instance from "src/services/axios";
import { ListProductResponse } from "src/services/product_v2/admin/types/product";

export const listProduct = async (): Promise<ListProductResponse> => {
  try {
    const response = await instance.get<ListProductResponse>("/admin/product/list");
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      err: 1,
      msg: "lõi",
      status: 500,
      products: [],
      error: error.message,
    };
  }
};

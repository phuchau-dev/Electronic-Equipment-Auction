import instance from "src/services/axios";
import { GetOneResponse } from "src/services/product_v2/admin/types";

export const getOneProduct = async (id: string): Promise<GetOneResponse> => {
  try {
    const response = await instance.get<GetOneResponse>(`/admin/product/getone/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      err: 1,
      msg: "Lỗi",
      status: 500,
      product: undefined,
    };
  }
};

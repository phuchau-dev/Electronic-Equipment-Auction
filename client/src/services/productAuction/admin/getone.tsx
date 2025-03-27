import instance from "src/services/axios";
import { GetOneResponse } from "src/services/productAuction/types/getone";

export const getOneProduct = async (id: string): Promise<GetOneResponse> => {
  try {
    const response = await instance.get<GetOneResponse>(`/admin/productAuction/get-one/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching product:", error);
    return {
      success: false,
      err: 1,
      msg: "Lỗi",
      status: 500,
      product: undefined,
    };
  }
};

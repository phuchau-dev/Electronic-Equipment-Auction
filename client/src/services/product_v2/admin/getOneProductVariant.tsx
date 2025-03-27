import instance from "src/services/axios";
import { ApiResponse } from "src/services/product_v2/admin/types/editVariant";
export const getOneProductVariant = async (variantId: string): Promise<ApiResponse> => {
  try {
    const response = await instance.get<ApiResponse>(`/admin/product/get-one-product-variant/${variantId}`);
    console.log('ket-qua',response);
    return response.data;

  } catch (error: any) {
    return {
      success: false,
      err: 1,
      msg: "Lỗi",
      status: 500,
      variant: undefined,
    };
  }
};

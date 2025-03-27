import instance from "src/services/axios";
import { GetAccessoryVariantsResponse } from "src/services/home/types/getAccessoryByVariants";

export const getAccessoryByVariants = async (
  page: number,
): Promise<GetAccessoryVariantsResponse> => {
  try {
    const queryParams = new URLSearchParams({ page: page.toString() });
    const response = await instance.get<GetAccessoryVariantsResponse>(`client/product/get-accessory/linh-kien?${queryParams.toString()}`);

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.msg);
    }
  } catch (error) {
    console.error("Lỗi:", error);
    throw error;
  }
};
import instance from "src/services/axios";
import { LimitPageProductResponse } from "src/services/product_v2/client/types/listPage";

export const listPage = async (
  page: number,
  search?: string
): Promise<LimitPageProductResponse> => {
  try {
    const queryParams = new URLSearchParams({ page: page.toString() });

    if (search) {
      queryParams.append("search", search);
    }

    const response = await instance.get<LimitPageProductResponse>(
      `/client/product/getLimitProductClient/?${queryParams.toString()}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

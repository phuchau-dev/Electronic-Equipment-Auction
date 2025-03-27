import instance from "src/services/axios";
import { LimitDeletedListResponse } from "src/services/product_v2/admin/types";

export const getDeletedList = async (
  page: number,
  search?: string
): Promise<LimitDeletedListResponse> => {
  try {
    const queryParams = new URLSearchParams({ page: page.toString() });

    if (search) {
      queryParams.append("search", search);
    }

    const response = await instance.get<LimitDeletedListResponse>(
      `/admin/product/deletedlist/?${queryParams.toString()}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching deleted products:", error);
    throw new Error("Failed to fetch deleted products");
  }
};

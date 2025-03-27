// api/categoryPost.tsx
import instance from "src/services/axios";
import { CategoryPostResponse } from "src/services/post/admin/types/listCategoryPost";

export const getCategoryPostList = async (
  page: number,
  search?: string
): Promise<CategoryPostResponse> => {
  try {

    const queryParams = new URLSearchParams({ page: page.toString() });

    if (search) {
      queryParams.append("search", search);
    }

    // Gọi API
    const response = await instance.get<CategoryPostResponse>(
      `/admin/post/list-categories-post?${queryParams.toString()}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching category posts:", error);
    throw new Error("Failed to fetch category posts");
  }
};

import instance from "src/services/axios";
import { GetOnePostResponse } from "src/services/post/admin/types/getOnePost";

export const getOnePost = async (postId: string): Promise<GetOnePostResponse> => {
   try {
      const response = await instance.get<GetOnePostResponse>(`/admin/post/get-one-post/${postId}`);
      return response.data;
   } catch (error: any) {
      return {
         success: false,
         err: 1,
         msg: "Có lỗi xảy ra khi lấy thông tin bài viết",
         status: 500,
         post: undefined,
      };
   }
};

import instance from "src/services/axios";
import { GetOneScreenResponse } from "src/services/attribute/types/screen/getOneScreen";

export const getOneScreen = async (screenId: string): Promise<GetOneScreenResponse> => {
   try {
      const response = await instance.get<GetOneScreenResponse>(`/admin/attributes/get-one-screen/${screenId}`);
      return response.data;
   } catch (error: any) {
      return {
         success: false,
         err: 1,
         msg: "Có lỗi xảy ra khi lấy thông tin màn hình",
         status: 500,
         screen: undefined,
      };
   }
};

import instance from "src/services/axios";
import {
  GetAllBatteryResponse,
  STATUS_OK,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_ERROR,
  createErrorResponse
} from "src/services/product_v2/types/attributes/getAllBattery";

export const getAllBattery = async (): Promise<GetAllBatteryResponse> => {
  try {
    const response = await instance.get<GetAllBatteryResponse>("/attributes/get-all-battery");

    if (response.status !== STATUS_OK) {
      return createErrorResponse("Lỗi không xác định", response.status);
    }
    if (response.data.total === 0) {
      return createErrorResponse("Không tìm thấy pin nào", STATUS_NOT_FOUND);
    }
    return response.data as GetAllBatteryResponse;
  } catch (error) {
    const errorMessage = (error as Error).message || "Lỗi không xác định";
    return createErrorResponse(errorMessage, STATUS_INTERNAL_ERROR);
  }
};

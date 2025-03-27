import instance from "src/services/axios";
import { GetDetailProductResponse } from "src/services/detailProduct/types/getDetailProduct";

export const getProductDetail = async (
  slug: string,
  storage: string | null,
  color: string | null
): Promise<GetDetailProductResponse> => {
  try {
    const queryParams = new URLSearchParams();
    if (storage) {
      queryParams.append('storage', storage);
    }
    if (color) {
      queryParams.append('color', color);
    }

    const response = await instance.get<GetDetailProductResponse>(
      `/client/product-detail/product/${slug}?${queryParams.toString()}`
    );

    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
    return {
      success: false,
      err: -1,
      msg: 'Lỗi khi lấy chi tiết sản phẩm',
      status: 500,
      data: {} as GetDetailProductResponse['data'],
    };
  }
};

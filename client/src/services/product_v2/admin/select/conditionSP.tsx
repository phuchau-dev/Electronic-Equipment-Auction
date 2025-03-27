import instance from "src/services/axios";
import { ConditionShopping, SelectConditionShoppingResponse } from "src/services/product_v2/admin/types";

export const selectConditionShopping = async (): Promise<ConditionShopping[]> => {
  try {
    const response = await instance.get<SelectConditionShoppingResponse>(
      "/admin/product/selectConditionSP"
    );
    return response.data.conditionShoppingList;
  } catch (error) {
    console.error("Lỗi condition shopping:", error);
    throw error;
  }
};

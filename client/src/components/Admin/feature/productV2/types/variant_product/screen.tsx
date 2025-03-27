import { UseFormSetValue } from "react-hook-form";
import { ProductVariant } from "src/services/product_v2/admin/types";
export type SetValueScreen = UseFormSetValue<ProductVariant>;
export interface ScreenOption {
  value: string;
  label: string;
}

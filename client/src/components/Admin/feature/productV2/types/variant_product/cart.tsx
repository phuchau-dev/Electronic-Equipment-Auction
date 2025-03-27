import { UseFormSetValue } from "react-hook-form";
import { ProductVariant } from "src/services/product_v2/admin/types";
export type SetValueCard = UseFormSetValue<ProductVariant>;
export interface CardOption {
  value: string;
  label: string;
}

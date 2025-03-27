

import { UseFormSetValue } from "react-hook-form";
import { ProductVariant } from "src/services/product_v2/admin/types";
export type SetValueRam = UseFormSetValue<ProductVariant>;
export interface RamOption {
  value: string;
  label: string;
}
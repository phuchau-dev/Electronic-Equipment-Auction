import { UseFormSetValue } from "react-hook-form";
import { ProductV2 } from "src/types/ProductV2";
export type SetValueStorage = UseFormSetValue<ProductV2>;
export interface StorageOption {
  value: string;
  label: string;
}

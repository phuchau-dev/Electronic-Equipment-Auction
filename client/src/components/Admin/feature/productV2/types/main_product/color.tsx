import { UseFormSetValue } from "react-hook-form";
import { ProductV2 } from "src/types/ProductV2";
export type SetValueColor = UseFormSetValue<ProductV2>;
export interface ColorOption {
  value: string;
  label: string;
  color: string;
}

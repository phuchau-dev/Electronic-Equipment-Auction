import { UseFormSetValue } from "react-hook-form";
import { ProductV2 } from "src/types/ProductV2";
export type SetValueCard = UseFormSetValue<ProductV2>;
export interface CardOption {
  value: string;
  label: string;
}

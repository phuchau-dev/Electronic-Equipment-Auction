import { UseFormSetValue } from "react-hook-form";
import { ProductV2 } from "src/types/ProductV2";
export type SetValueOs = UseFormSetValue<ProductV2>;
export interface OsOption {
  value: string;
  label: string;
}

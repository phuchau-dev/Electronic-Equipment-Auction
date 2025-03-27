import { UseFormSetValue } from "react-hook-form";
import { ProductV2 } from "src/types/ProductV2";
export type SetValueBattery = UseFormSetValue<ProductV2>;
export interface BatteryOption {
  value: string;
  label: string;
}

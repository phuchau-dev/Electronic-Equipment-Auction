import { SingleValue } from "react-select";
import { UseFormSetValue } from "react-hook-form";
import { ProductVariant, CPU } from "src/services/product_v2/admin/types/addVariant";
export const handleCPUChange = (
  selectedOption: SingleValue<CPU>,
  setSelectedCPU: React.Dispatch<React.SetStateAction<SingleValue<CPU>>>,
  setValue: UseFormSetValue<ProductVariant>
) => {
  setSelectedCPU(selectedOption);

  const cpuData: CPU = selectedOption ? {
    _id: selectedOption._id,
    name: selectedOption.name,
    status: selectedOption.status,
    sku: selectedOption.sku,
    pid: selectedOption.pid,
    createdAt: selectedOption.createdAt,
    updatedAt: selectedOption.updatedAt,
    slug: selectedOption.slug,
  } : {
    _id: '',
    name: '',
    status: '',
    sku: '',
    pid: '',
    createdAt: '',
    updatedAt: '',
    slug: '',
  };
  setValue("cpu", [cpuData]);
};

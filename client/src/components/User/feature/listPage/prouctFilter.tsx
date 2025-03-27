import React from "react";
import FilterByBrand from "src/components/User/feature/listPage/filter/filterbybrand";
import FilterByPrice from "src/components/User/feature/listPage/filter/filterbyPrice";
import FilterByRam from "src/components/User/feature/listPage/filter/filterbyRam";
import FilterByConditionShopping from "src/components/User/feature/listPage/filter/filterbyConditionShopping";
import { FilterState,ProductCondition,ProductBrand,RAM, STORAGE } from "src/services/clientcate/client/types/getProuctbyCategory";
import FilterByStorage from "src/components/User/feature/listPage/filter/filterbyStorage";
interface ProductFiltersProps {
  filters: FilterState;
  onChange?: (newFilters: FilterState) => void;
}
const ProductFilters: React.FC<ProductFiltersProps> = ({ filters, onChange = () => {} }) => {

  const handleBrandChange = (selectedBrands: ProductBrand[]) => {
    const newFilters: FilterState = {
      ...filters,
      brand: selectedBrands.length > 0 ? selectedBrands : undefined,
    };
    onChange(newFilters);
  };
  const handleConditionShoppingChange = (selectedConditions: ProductCondition[]) => {
    const newFilters: FilterState = {
      ...filters,
      conditionShopping: selectedConditions.length > 0 ? selectedConditions : undefined,
    };
    onChange(newFilters);
  };
  const handleStorageChange = (selectedStorages: STORAGE[]) => {
    const newFilters: FilterState = {
      ...filters,
      storage: selectedStorages.length > 0 ? selectedStorages : undefined,
    };
    onChange(newFilters);
  };
  const handleRamChange = (selectedRams: RAM[]) => {
    const newFilters: FilterState = {
      ...filters,
      ram: selectedRams.length > 0 ? selectedRams : undefined,
    };
    onChange(newFilters);
  };

  const handlePriceChange = (minPrice: number | null, maxPrice: number | null) => {
    const newFilters = {
      ...filters,
      minPrice: minPrice !== null ? minPrice : undefined,
      maxPrice: maxPrice !== null ? maxPrice : undefined,
    };
    onChange(newFilters);
  };


  return (
    <div>
      <FilterByPrice onchange={handlePriceChange} />
      <FilterByBrand filters={filters} onchange={handleBrandChange} />
      <FilterByRam filters={filters} onchange={handleRamChange} />
      <FilterByStorage filters={filters} onchange={handleStorageChange} />
      <FilterByConditionShopping filters={filters} onchange={handleConditionShoppingChange} />
    </div>
  );
};

export default ProductFilters;

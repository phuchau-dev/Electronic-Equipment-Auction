import React from "react";
import FilterByBrand from "src/components/User/feature/page-auction/filterAuction/filterbybrand";
import FilterByPrice from "src/components/User/feature/page-auction/filterAuction/filterbyPrice";

import FilterByConditionShopping from "src/components/User/feature/page-auction/filterAuction/filterbyConditionShopping";
import FilterByService from "src/components/User/feature/page-auction/filterAuction/filterbyService";
import { FilterState,ProductCondition,ProductBrand } from "src/services/product_v2/client/types/listPageAuction";
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
  const handlePriceChange = (minPrice: number | null, maxPrice: number | null) => {
    const newFilters = {
      ...filters,
      minPrice: minPrice !== null ? minPrice : undefined,
      maxPrice: maxPrice !== null ? maxPrice : undefined,
    };
    onChange(newFilters);
  };
  const handleServiceChange = (minDiscountPercent: number | null, maxDiscountPercent: number | null) => {
    const newFilters = {
      ...filters,
      minDiscountPercent: minDiscountPercent !== null ? minDiscountPercent : undefined,
      maxDiscountPercent: maxDiscountPercent !== null ? maxDiscountPercent : undefined,
    };
    onChange(newFilters);
  };
  return (
    <div>
      <FilterByPrice onchange={handlePriceChange} />
      <FilterByBrand filters={filters} onchange={handleBrandChange} />
      <FilterByConditionShopping filters={filters} onchange={handleConditionShoppingChange} />
      <FilterByService filters={filters} onchange={handleServiceChange} />
    </div>
  );
};

export default ProductFilters;

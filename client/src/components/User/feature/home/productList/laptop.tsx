
import styles from "../css/section.module.css";
import { ProductVariant } from "src/services/home/types/getLaptopByVariants";
import ProductItem from "src/components/User/feature/home/productItem/laptop";
export interface ProductListLaptopProps {
  productVariant: ProductVariant[];
}
export default function ProductListLaptop({ productVariant }: ProductListLaptopProps) {
  return (
    <div className={styles.gridContainer}>
      {productVariant.map((product, index) => (
        <ProductItem key={index} productVariant={product} index={index} />
      ))}
    </div>
  );
}

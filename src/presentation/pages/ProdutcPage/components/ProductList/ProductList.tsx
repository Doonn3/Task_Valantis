import style from "./style.module.css";
import { Product, ProductType } from "../Product";
import { ProductSkeleton } from "../Product/Product";

interface PropsType {
  products: ProductType[];
  isLoading?: boolean;
}

export function ProductList(props: PropsType) {
  const productsMap = () => {
    if (props.isLoading) {
      return Array.from({ length: 10 }, (_, index) => {
        return <ProductSkeleton key={index} />;
      });
    }

    return props.products.map((product) => {
      return (
        <Product
          key={product.id}
          id={product.id}
          brand={product.brand}
          price={product.price}
          product={product.product}
        />
      );
    });
  };

  return <section className={style.productList}>{productsMap()}</section>;
}

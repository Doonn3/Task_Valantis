import { Card, CardType } from "@/presentation/shared/ui/Card";
import { CardSkeleton } from "@/presentation/shared/ui/CardSkeleton";

import style from "./style.module.css";

interface PropsType {
  products: CardType[];
  isLoading?: boolean;
}

export function ProductList(props: Readonly<PropsType>) {
  const productsMap = () => {
    if (props.isLoading) {
      return Array.from({ length: 20 }, (_, index) => {
        return <CardSkeleton key={index} />;
      });
    }

    return props.products.map((product) => {
      return (
        <Card
          key={product.id}
          id={product.id}
          brand={product.brand ?? "Unknown"}
          price={product.price}
          product={product.product}
        />
      );
    });
  };

  return <section className={style.productList}>{productsMap()}</section>;
}

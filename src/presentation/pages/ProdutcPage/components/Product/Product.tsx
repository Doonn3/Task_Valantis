import style from "./style.module.css";

export type PropsType = {
  id: string;
  product: string;
  price: number;
  brand: string | null;
};

export function Product(props: Readonly<PropsType>) {
  return (
    <div className={style.product}>
      <div className={style.item}>
        <span>ID:</span>
        <span className={style.id}>{props.id}</span>
      </div>

      <div className={style.item}>
        <span>Brand:</span>
        <span>{props.brand}</span>
      </div>

      <div className={style.item}>
        <span>Price:</span>
        <span>{props.price}</span>
      </div>

      <div className={style.item}>
        <span>Name:</span>
        <span>{props.product}</span>
      </div>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className={style.product} style={{ width: 300, height: 158 }}></div>
  );
}

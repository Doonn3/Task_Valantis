import style from "./style.module.css";

export type CardType = {
  id: string;
  brand: string | null;
  price: number;
  product: string;
};

export function Card(props: CardType) {
  return (
    <div className={style.card}>
      <div className={style.card__item}>
        <span className={style.card__blue}>ID:</span>
        <span className={style.card__blue}>{props.id}</span>
      </div>

      <div className={style.card__item}>
        <span className={style.card__yellow}>Brand:</span>
        <span className={style.card__yellow}>{props.brand}</span>
      </div>

      <div className={style.card__item}>
        <span className={style.card__red}>Price:</span>
        <span className={style.card__red}>{props.price}</span>
      </div>

      <div className={style.card__item}>
        <span>Name:</span>
        <span>{props.product}</span>
      </div>
    </div>
  );
}

import { useState } from "react";
import style from "./style.module.css";

type PropsType = {
  amount: number;
  selectItem: number;
  onClickItem: (id: number) => void;
};

export function Item(props: PropsType) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxItems = 3;

  const createItems = () => {
    const items = [];
    for (let i = currentPage; i < currentPage + maxItems; i++) {
      items.push(
        <button
          key={i}
          className={i === props.selectItem ? style.pagination__item : ""}
          onClick={() => {
            props.onClickItem(i);
            setCurrentPage(i);
          }}
        >
          {i}
        </button>
      );
    }
    if (currentPage + maxItems < props.amount) {
      items.push(
        <button key="next" onClick={() => setCurrentPage(currentPage + 1)}>
          ...
        </button>
      );
    }
    return items;
  };

  return <div className={style.pagination__items}>{createItems()}</div>;
}

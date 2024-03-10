import { Button } from "@/presentation/shared/ui/Button";

import style from "./style.module.css";

type PropsType = {
  total: number;
  maxItems: number;
  currPage: number;
  isDisabled?: boolean;
  onClickItem?: (id: number) => void;
};

/*
TODO - решения в лоб пагинация кнопок >> подумать и переделать во что-то более в меняемое
*/
export function ButtonList(props: Readonly<PropsType>) {
  const init = () => {
    const start = props.currPage;
    const end = props.total - props.maxItems + 1;
    const mid = Math.floor(props.maxItems / 2);
    const result: (number | string)[] = [];

    if (props.total <= props.maxItems) {
      for (let i = 1; i <= props.total; i += 1) {
        result.push(i);
      }
    } else {
      for (let i = 0; i < props.maxItems; i += 1) {
        if (i < mid) {
          result.push(start + i);
        } else if (i > mid) {
          result.push(end + i);
        } else {
          result.push("...");
        }
      }
    }

    return buildMarksToButtons(result);
  };

  const buildMarksToButtons = (arr: (number | string)[]) => {
    return arr.map((mark, index) => {
      return (
        <Button
          key={index}
          className={
            mark === String(props.currPage) ? style.pagination__item : ""
          }
          isDisabled={props.isDisabled}
          onClick={() => {
            if (typeof mark === "number") {
              onClick(mark);
            }
          }}
        >
          {mark}
        </Button>
      );
    });
  };

  const onClick = (id: number) => {
    if (props.onClickItem) props.onClickItem(id);
  };

  return <div className={style.pagination__items}>{init()}</div>;
}

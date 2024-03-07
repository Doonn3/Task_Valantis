import style from "./style.module.css";
import { SpinerIcon } from "@/presentation/shared/assets/SpinerIcon";

import { usePagination } from "../../hooks/usePagination";
import { Item } from "./Item";

type PropsType = {
  className?: string;
  min: number;
  max: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
};

export function Pagination(props: Readonly<PropsType>) {
  const { onPageChange, min, max, className, isLoading } = props;

  const pagination = usePagination(min, max);

  const prev = () => {
    const currPage = pagination.prev();
    onPageChange(currPage);
  };

  const next = () => {
    const currPage = pagination.next();
    onPageChange(currPage);
  };

  const onClickItem = (id: number) => {
    const currPage = pagination.setValue(id);
    onPageChange(currPage);
  };

  return (
    <div className={`${style.pagination} ${className}`}>
      <button onClick={prev}>Prev</button>
      {isLoading ? (
        <SpinerIcon className={style.icon} />
      ) : (
        <Item
          amount={max}
          selectItem={pagination.num}
          onClickItem={onClickItem}
        />
      )}

      <button onClick={next}>Next</button>
    </div>
  );
}

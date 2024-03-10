import style from "./style.module.css";
import { SpinerIcon } from "@/presentation/shared/assets/SpinerIcon";

import { usePagination } from "../../hooks/usePagination";
import { Button } from "@/presentation/shared/ui/Button";
import { ButtonList } from "./ButtonList";

type PropsType = {
  className?: string;
  totalItem: number;
  maxShowItem: number;
  isLoading?: boolean;
  goToPage?: (val: number) => void;
};

export function Pagination(props: Readonly<PropsType>) {
  const pagination = usePagination(1, props.totalItem);

  const onPrev = () => {
    const page = pagination.prev();

    if (props.goToPage) props.goToPage(page);
  };

  const onNext = () => {
    const page = pagination.next();

    if (props.goToPage) props.goToPage(page);
  };

  const onClickItem = (val: number) => {
    pagination.setValue(val);
    if (props.goToPage) props.goToPage(val);
  };

  const renderPaginationButtons = () => {
    if (props.isLoading) {
      return <SpinerIcon className={style.icon} />;
    } else {
      return (
        <ButtonList
          total={props.totalItem}
          currPage={pagination.num}
          maxItems={props.maxShowItem}
          onClickItem={onClickItem}
        />
      );
    }
  };

  return (
    <div className={`${style.pagination} ${props.className}`}>
      <Button isDisabled={props.isLoading} onClick={onPrev}>
        Prev
      </Button>
      {renderPaginationButtons()}
      <Button isDisabled={props.isLoading} onClick={onNext}>
        Next
      </Button>
    </div>
  );
}

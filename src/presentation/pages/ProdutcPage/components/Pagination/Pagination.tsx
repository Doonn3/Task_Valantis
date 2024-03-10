import { Button } from "@/presentation/shared/ui/Button";

import { usePagination } from "../../hooks/usePagination";
import { ButtonList } from "./ButtonList";

import style from "./style.module.css";

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

  const firstPageButton = () => {
    const val = pagination.firstValue();
    if (props.goToPage) props.goToPage(val);
  };

  const lastPageButton = () => {
    const val = pagination.lastValue();
    if (props.goToPage) props.goToPage(val);
  };

  const onClickItem = (val: number) => {
    pagination.setValue(val);
    if (props.goToPage) props.goToPage(val);
  };

  const renderPaginationButtons = () => {
    return (
      <ButtonList
        total={props.totalItem}
        currPage={pagination.num}
        maxItems={props.maxShowItem}
        onClickItem={onClickItem}
        isDisabled={props.isLoading}
      />
    );
  };

  return (
    <div className={`${style.pagination} ${props.className}`}>
      <Button isDisabled={props.isLoading} onClick={firstPageButton}>
        &lt;&lt;
      </Button>

      <Button isDisabled={props.isLoading} onClick={onPrev}>
        Prev
      </Button>
      {renderPaginationButtons()}
      <Button isDisabled={props.isLoading} onClick={onNext}>
        Next
      </Button>
      <Button isDisabled={props.isLoading} onClick={lastPageButton}>
        &gt;&gt;
      </Button>
    </div>
  );
}

// &lt;&lt; - <<
// &gt;&gt; - >>

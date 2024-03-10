
import React, { useEffect, useState } from "react";

import style from "./style.module.css";

type PropsType = {
  filterType: string[];

  emit: (type: string, value: string) => void;
  emitClear: () => void;
};

export function Filter(props: Readonly<PropsType>) {
  const [value, setValue] = useState<string>("");
  const [option, setOption] = useState<string>('');

  useEffect(() => {
    if (props.filterType.length > 0) {
      setOption(props.filterType[0]);
    }
  }, [props.filterType]);

  const createOptions = () => {
    return props.filterType.map((value) => {
      return (
        <option value={value} key={value}>
          {value}
        </option>
      );
    });
  };

  const onSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value);
  };

  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setValue(value);

    if (value.length <= 0) {
      props.emitClear();
    }
  };

  const onSearch = () => {
    if (value.trim().length > 1) {
      props.emit(option, value);
    }
    console.log(option);
  };

  return (
    <div className={style.filter}>
      <select onChange={onSelectOption}>{createOptions()}</select>

      <div className={style.filter__blockInput}>
        <input type="text" value={value} onInput={onInput} />

        <button onClick={onSearch}>Search</button>
      </div>
    </div>
  );
}

import style from "./style.module.css";

import React, { useState } from "react";

type PropsType = {
  filterType: string[];

  emit: (type: string, value: string) => void;
};

export function Filter(props: Readonly<PropsType>) {
  const [value, setValue] = useState<string>("");
  const [option, setOption] = useState<string>(props.filterType[0]);

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

  const onSearch = () => {
    if (value.trim().length > 1) {
      props.emit(option, value);
    }
  };

  return (
    <div className={style.filter}>
      <select onChange={onSelectOption}>{createOptions()}</select>

      <div className={style.filter__blockInput}>
        <input
          type="text"
          value={value}
          onInput={(e) => setValue(e.currentTarget.value)}
        />

        <button onClick={onSearch}>Search</button>
      </div>
    </div>
  );
}

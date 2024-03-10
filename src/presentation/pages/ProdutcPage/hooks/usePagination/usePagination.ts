import { useState } from "react";

export function usePagination(min: number, max: number) {
  const [num, setNum] = useState<number>(min);

  const prev = () => {
    let temp = num - 1;
    if (temp < min) temp = min;
    setNum(temp);
    return temp;
  };

  const next = () => {
    let temp = num + 1;
    if (temp > max) temp = max;
    setNum(temp);
    return temp;
  };

  const setValue = (val: number) => {
    let temp = val;
    if (temp < min) temp = min;
    if (temp > max) temp = max;
    setNum(temp);
    return temp;
  };

  const firstValue = () => {
    setNum(min);
    return min;
  };

  const lastValue = () => {
    setNum(max);
    return max;
  };

  return {
    prev,
    next,
    setValue,
    firstValue,
    lastValue,
    num,
  };
}

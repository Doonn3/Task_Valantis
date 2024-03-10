import { IProductType } from "../enities/ProductType";
import { api } from "../api";
import { ResponseError } from "../enities/ResponseError";
import { MAX_ITEMS_FOR_PAGE } from "../config/consts";

export async function apiGetProducts(offset: number) {
  const resIds = await api.get_ids({
    limit: MAX_ITEMS_FOR_PAGE,
    offset: offset * MAX_ITEMS_FOR_PAGE,
  });

  if (resIds instanceof ResponseError) {
    console.error(resIds.status);
    return resIds;
  }

  const resProducts = await api.get_items({ ids: resIds.result });

  if (resProducts instanceof ResponseError) {
    console.error(resProducts.status);
    return resProducts;
  }

  // Добовляем только уникальные id
  interface TempProductType {
    [key: string]: IProductType;
  }

  const uniqObj: TempProductType = {};

  resProducts.result.forEach((product) => {
    uniqObj[product.id] = product;
  });

  const uniq = Object.values(uniqObj);
  //

  return uniq;
}

export async function apiGetProductsByIds(ids: string[]) {
  const resultItems = await api.get_items({ ids: ids });

  if (resultItems instanceof ResponseError) {
    console.error(resultItems.status);

    return resultItems;
  }

  // Добовляем только уникальные id
  interface TempProductType {
    [key: string]: IProductType;
  }

  const uniqObj: TempProductType = {};

  resultItems.result.forEach((product) => {
    uniqObj[product.id] = product;
  });

  const uniq = Object.values(uniqObj);
  //
  return uniq;
}

export async function apiGetFields() {
  const data = await api.get_fields();

  if (data instanceof ResponseError) {
    console.error(data.status, data.errorText);
    return data;
  }

  return data.result;
}

type SearchType = {
  [type: string]: string | number;
};
export async function apiSearchIds(param: SearchType) {
  for (const key in param) {
    if (key === "price") {
      let value = param[key];
      value = Number(value);
      param[key] = value;
    }
  }

  const data = await api.filter({ ...param });

  if (data instanceof ResponseError) {
    console.error(data.status, data.errorText);
    return data;
  }

  const result = [];

  for (let i = 0; i < data.result.length; i += MAX_ITEMS_FOR_PAGE) {
    result.push(data.result.slice(i, i + MAX_ITEMS_FOR_PAGE));
  }

  return result;
}

export async function apiGetAmountPages() {
  const data = await api.get_ids();

  if (data instanceof ResponseError) {
    console.error(data.status);

    return data;
  }

  return Math.floor(data.result.length / MAX_ITEMS_FOR_PAGE);
}

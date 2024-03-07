import { IProductType } from "../enities/ProductType";
import { getIds, getItems, get_fields, filterSearch } from "../api/api";
import { ResponseError } from "../enities/ResponseError";
import { MAX_ITEMS_FOR_PAGE } from "../config/consts";

export async function apiGetProducts(offset: number) {
  const resIds = await getIds({
    action: "get_ids",
    params: { limit: MAX_ITEMS_FOR_PAGE, offset: offset * MAX_ITEMS_FOR_PAGE },
  });

  if (resIds instanceof ResponseError) {
    console.error(resIds.status);
    return resIds;
  }

  const resProducts = await getItems({
    action: "get_items",
    params: { ids: resIds.result },
  });

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
  const resultItems = await getItems({
    action: "get_items",
    params: { ids: ids },
  });

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
  const data = await get_fields({ action: "get_fields" });

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

  const data = await filterSearch({
    action: "filter",
    params: { ...param },
  });

  if (data instanceof ResponseError) {
    console.error(data.status, data.errorText);
    return data;
  }

  return data.result;
}

export async function apiGetAmountPages() {
  const data = await getIds({ action: "get_ids" });

  if (data instanceof ResponseError) {
    console.error(data.status);

    return data;
  }

  return data.result.length;
}

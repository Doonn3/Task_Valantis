import { IProductType } from "../enities/ProductType";
import { getIds, getItems, get_fields, filter } from "../api/api";
import { ResponseError } from "../enities/ResponseError";
import { IResponseResult } from "../enities/ResponseResult";

export async function apiGetProducts(offset: number) {
  const resIds = await getIds({
    action: "get_ids",
    params: { limit: 5, offset: offset * 5 },
  });

  if (resIds instanceof ResponseError) {
    console.error(resIds.status);
    return resIds;
  }

  const dataIds = (await resIds.json()) as IResponseResult<string[]>;

  const resProducts = await getItems({
    action: "get_items",
    params: { ids: dataIds.result },
  });

  if (resProducts instanceof ResponseError) {
    console.error(resProducts.status);
    return resProducts;
  }

  const dataProducts = (await resProducts.json()) as IResponseResult<
    IProductType[]
  >;

  // Добовляем только уникальные id
  interface TempProductType {
    [key: string]: IProductType;
  }

  const uniqObj: TempProductType = {};

  dataProducts.result.forEach((product) => {
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

  const dataItems = (await resultItems.json()) as IResponseResult<
    IProductType[]
  >;

  // Добовляем только уникальные id
  interface TempProductType {
    [key: string]: IProductType;
  }

  const uniqObj: TempProductType = {};

  dataItems.result.forEach((product) => {
    uniqObj[product.id] = product;
  });

  const uniq = Object.values(uniqObj);
  //
  return uniq;
}

export async function apiGetFields() {
  const result = await get_fields({ action: "get_fields" });

  if (result instanceof ResponseError) {
    console.error(result.status, result.errorText);
    return result;
  }

  const data = (await result.json()) as IResponseResult<string[]>;
  return data.result;
}

type SearchType = {
  [type: string]: string | number;
};
export async function apiSearchProductsByIds(param: SearchType) {
  for (const key in param) {
    if (key === "price") {
      let value = param[key];
      value = Number(value);
    }
  }

  const result = await filter({
    action: "filter",
    params: { ...param },
  });

  if (result instanceof ResponseError) {
    console.error(result.status, result.errorText);
    return result;
  }

  const data = (await result.json()) as IResponseResult<string[]>;
  return data.result;
}

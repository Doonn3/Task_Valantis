import { IProductType, IResponseResult } from "..";
import { cfg } from "../config/config";
import { IRequestData } from "../enities/RequestData";
import { ResponseError } from "../enities/ResponseError";
import {
  ActionType,
  IFilter,
  IGetFields,
  IGetIds,
  IGetItems,
} from "../types/types";

async function postRequest<A extends string, P, R>(
  data: IRequestData<A, P>,
  attempt = 0
): Promise<IResponseResult<R> | ResponseError> {
  try {
    const res = await fetch(cfg.root, {
      method: "POST",
      headers: {
        "X-Auth": cfg.auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.error("<<Идентификатор Ошибки>>", res.status);
      if (attempt < 5) {
        return postRequest(data, attempt + 1);
      }
      throw new ResponseError(res.status, res.statusText);
    }

    const resultData = await res.json();

    return resultData as IResponseResult<R>;
  } catch (error) {
    return error as ResponseError;
  }
}

/**
 * Function to get IDs.
 * @param data - Надо передать action type и параметры.
 * @returns - Возвращает массив:string id
 */

export async function get_ids(data?: IGetIds) {
  return await postRequest<ActionType, IGetIds, string[]>({ action: 'get_ids', params: data});
}

/**
 * Function to get items.
 * @param data - Надо передать action type и параметры.
 * @returns - Возвращает массив:продуктов
 */
export async function get_items(data: IGetItems) {
  return await postRequest<ActionType, IGetItems, IProductType[]>({action: 'get_items', params: data});
}

/**
 * Function to get fields.
 * @param data - Надо передать action type и параметры.
 * @returns - Возвращает поля [brand, price, product]
 */
export async function get_fields(data?: IGetFields) {
  return await postRequest<ActionType, IGetFields, string[]>({action: 'get_fields', params: data});
}

/**
 * Function to get search.
 * @param data - Надо передать action type и параметры.
 * @returns - Возвращает массив:string ids - продуктов
 */
export async function filter(data: IFilter) {
  return await postRequest<ActionType, IFilter, string[]>({action: 'filter', params: data});
}

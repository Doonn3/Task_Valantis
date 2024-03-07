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

async function postRequest<A extends string, P>(data: IRequestData<A, P>) {
  try {
    const res = await fetch(cfg.root, {
      method: "POST",
      headers: {
        "X-Auth": cfg.auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new ResponseError(res.status, res.statusText);
    return res;
  } catch (error) {
    return error as ResponseError;
  }
}

export async function getIds(data: IRequestData<ActionType, IGetIds>) {
  return await postRequest(data);
}

export async function getItems(data: IRequestData<ActionType, IGetItems>) {
  return await postRequest(data);
}

export async function get_fields(data: IRequestData<ActionType, IGetFields>) {
  return await postRequest(data);
}

export async function filter(data: IRequestData<ActionType, IFilter>) {
  return await postRequest(data);
}

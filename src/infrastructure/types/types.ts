export type ActionType = "get_ids" | "get_items" | "get_fields" | "filter";

export interface IGetIds {
  offset: number;
  limit: number;
}

export interface IGetItems {
  ids: string[];
}

export interface IGetFields {
  field: string;
  offset: number;
  limit: number;
}

export interface IFilter {
  [key: string]: string | number;
}

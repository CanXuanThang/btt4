export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";
export const UPDATE_LIST_ITEM = "UPDATE_LIST_ITEM";
export const OLD_VALUE_ITEM = "OLD_VALUE_ITEM";

export interface Photo {
  albumId?: number;
  id: number;
  title: string;
  url?: string;
  thumbnailUrl: string;
  value: string | null;
}

export type UpdateTodoPayload = {
  id: number;
  newValue: string;
};

export type ValueOldTodoPayload = {
  id: number;
  oldValue: string;
};

export type UpdateTodoAction = {
  type: "UPDATE_LIST_ITEM";
  payload: UpdateTodoPayload;
};

export type ValueOldTodoAction = {
  type: "OLD_VALUE_ITEM";
  payload: ValueOldTodoPayload;
};

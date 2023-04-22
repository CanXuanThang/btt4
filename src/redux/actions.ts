import { Dispatch } from "redux";
import axios from "axios";

import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  Photo,
  UpdateTodoAction,
  ValueOldTodoAction,
} from "./types";

export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
});

export const fetchDataSuccess = (data: Photo) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const fetchDataFailure = (error: any) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

export const updateTodo = (id: number, newValue: string): UpdateTodoAction => ({
  type: "UPDATE_LIST_ITEM",
  payload: {
    id,
    newValue,
  },
});

export const valueOldTodo = (
  id: number,
  oldValue: string
): ValueOldTodoAction => ({
  type: "OLD_VALUE_ITEM",
  payload: {
    id,
    oldValue,
  },
});

export const fetchData = (numberLoading: number) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchDataRequest());
    axios
      .get(
        `https://jsonplaceholder.typicode.com/photos?&_start=1&_end=${numberLoading}`
      )
      .then((response) => {
        const data = response.data;
        dispatch(fetchDataSuccess(data));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(fetchDataFailure(errorMessage));
      });
  };
};

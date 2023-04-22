import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  UPDATE_LIST_ITEM,
  Photo,
  OLD_VALUE_ITEM,
} from "./types";

interface DataState {
  data: any;
  loading: boolean;
  error: any;
}

const initialState: DataState = {
  data: null,
  loading: false,
  error: null,
};

const dataReducer = (state = initialState, action: any) => {
  console.log(state, action);

  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case OLD_VALUE_ITEM:
      const oldValueData = state.data.map((item: Photo) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            value: action.payload.oldValue,
          };
        }
        return item;
      });
      return {
        ...state,
        data: oldValueData,
      };
    case UPDATE_LIST_ITEM:
      const updatedData = state.data.map((item: Photo) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            title: action.payload.newValue,
          };
        }
        return item;
      });
      return {
        ...state,
        data: updatedData,
      };
    default:
      return state;
  }
};

export default dataReducer;

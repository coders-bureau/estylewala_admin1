import * as types from "./ActionTypes";

const initialState = {
  Products: [],
  isLoading: false,
  isError: false,
  totalPages:0,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // isLoading state...................

    case types.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    // ...............................

    // Success state..................

    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        Products: payload,
        isLoading: false,
      };
      case types.GET_PRODUCTS_SUCCESS1:
      return {
        ...state,
        Products: payload.data,
        isLoading: false,
        totalPages:payload.headers["x-total-count"],
      };

    // ...............................

    // Failed state..................

    case types.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    // ...............................

    // default case

    default:
      return state;
  }

  // ................................
};

export { reducer };

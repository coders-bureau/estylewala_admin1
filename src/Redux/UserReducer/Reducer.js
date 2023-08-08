import * as types from "./ActionTypes";

const initialState = {
  MobileNumber: "",
};

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    // isLoading state...................

    case types.USER_REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    // ...............................

    // Success state..................

    case types.USER_REGISTER_SUCCESS:
      return {
        userinfo: payload,
        isLoading: false,
      };
    // ...............................

    // Failed state..................

    case types.USER_REGISTER_FAIL:
      return {
        isLoading: false,
        isError: payload,
      };

    // ...............................

    case types.USER_DETAILS_SUCCESS:
      return { isLoading: false, user: payload };
    case types.USER_DETAILS_FAIL:
      return { isLoading: false, isError: payload };
    case types.USER_UPDATE_PROFILE_SUCCESS:
      return { isLoading: false, success: true, userinfo: payload };
    case types.USER_UPDATE_PROFILE_FAIL:
      return { isLoading: false, isError: payload };
    // default case

    default:
      return state;
  }

  // ................................
};

export { reducer };

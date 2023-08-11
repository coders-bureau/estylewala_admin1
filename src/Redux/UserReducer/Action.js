import * as types from "./ActionTypes.js";
import axios from "axios";

// ...............isLoading state

export const userRegistering = () => {
  return {
    type: types.USER_REGISTER_REQUEST,
  };
};

// .................................

// ...................Success state

export const userRegisterSuccess = (payload) => {
  return {
    type: types.USER_REGISTER_SUCCESS,
    payload: payload,
  };
};

// .................................

// .................isError state

export const userRegisterFailure = (payload) => {
  return {
    type: types.USER_REGISTER_FAIL,
    payload: payload
  };
};
// .......................

// api call....Success/error/loading...........

export const userRegister = (mobileNumber) => async (dispatch) => {
  dispatch(userRegistering());
  try {
    const config = { headers: { "Contnet-Type": "application/json" } };

    const msg = await axios.post(
      "http://localhost:5000/user/signup",
      { mobileNumber },
      config
    );
    // console.log(r.data);
    dispatch(userRegisterSuccess(msg.data));
  } catch (error) {
    console.log(error.response.data.error)
    dispatch(
      userRegisterFailure(
        error.response && error.response.data.error
          ? error.response.data.error
          : error.message
      )
    );
  }
};

export const getUserDetails = (mobileNumber) => async (dispatch) => {
  try {

    const { data }  = await axios.get(`http://localhost:5000/user/profile/details`);
    console.log(data.user);
    dispatch({
      type: types.USER_DETAILS_SUCCESS,
      payload: data.user,
    });
    // localStorage.setItem("userInfo", JSON.stringify(data.user));

  } catch (error) {
    dispatch({
      type: types.USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const updateUserProfile = (user) => async (dispatch) => {
  try {
    const { data }  = await axios.put(`https://estylewalabackend.onrender.com/user/profile`,user);
    console.log(data);
    dispatch({
      type: types.USER_UPDATE_PROFILE_SUCCESS,
      payload: data.user,
    });
    // localStorage.setItem("userInfo", JSON.stringify(data.user));

  } catch (error) {
    dispatch({
      type: types.USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
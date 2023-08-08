import * as types from "./ActionTypes.js";
import axios from "axios";

// ...............isLoading state

export const getProductsLoading = () => {
  return {
    type: types.GET_PRODUCTS_REQUEST,
  };
};

// .................................

// ...................Success state

export const getProductsSuccess = (payload) => {
  return {
    type: types.GET_PRODUCTS_SUCCESS,
    payload: payload,
  };
};
export const getProductsSuccess1 = (payload) => {
  return {
    type: types.GET_PRODUCTS_SUCCESS1,
    payload: payload,
  };
};
// .................................

// .................isError state

export const getProductsFailure = () => {
  return {
    type: types.GET_PRODUCTS_FAILURE,
  };
};
// .......................

// api call....Success/error/loading...........

export const getProducts = (params) => async (dispatch) => {
  dispatch(getProductsLoading());
  try {
    const r = await axios.get(
      `${process.env.REACT_APP_MYNTRA_API}/Products`,
      params
    );
    console.log(r.data);
    dispatch(getProductsSuccess(r.data));
  } catch (err) {
    dispatch(getProductsFailure());
  }
};
// .......................


export const getProductsPage = (params,page) => async (dispatch) => {
  dispatch(getProductsLoading());
  try {
    console.log(page);
    console.log(params);
    const r = await axios.get(
      `${process.env.REACT_APP_MYNTRA_API}/Products?_limit=12&_page=${page}`,params);
    console.log(r.data);
    dispatch(getProductsSuccess1(r));
  } catch (err) {
    dispatch(getProductsFailure());
  }
};

let baseURL = `${process.env.REACT_APP_MYNTRA_API}/Products?_limit=12`;
const getProductsSorting = async (val, page,params) => {
  if (val === "PriceLTH") {
      let res = await axios.get(`${process.env.REACT_APP_MYNTRA_API}/Products?_limit=12&_page=${page}&_sort=price&_order=asc`,params)
      return res
  }
  if (val === "PriceHTL") {
      let res = await axios.get(`${process.env.REACT_APP_MYNTRA_API}/Products?_limit=12&_page=${page}&_sort=price&_order=desc`,params)
      return res
  }
  if (val === "discount") {
      let res = await axios.get(`${process.env.REACT_APP_MYNTRA_API}/Products?_limit=12&_page=${page}&_sort=${val}&_order=desc`,params)
      return res
  }
  if (val === "rating") {
      let res = await axios.get(`${process.env.REACT_APP_MYNTRA_API}/Products?_limit=12&_page=${page}&_sort=${val}&_order=desc`,params)
      return res
  } else {
      let res = await axios.get(`${baseURL}&_page=${page}`,params)
      return res
  }
}

export const getProductsSorted = (val, page, params) => async (dispatch) => {

  dispatch(getProductsLoading());

  try {
     let r = await getProductsSorting(val, page,params)

     //console.log("data:", data)
     dispatch(getProductsSuccess1(r));
  } catch (err) {
     dispatch(getProductsFailure());
  }
}

export const getProductsData = (params) => async (dispatch) => {
  dispatch(getProductsLoading());
  try {
    // const r = await axios.get(
    //   `${process.env.REACT_APP_MYNTRA_API}/Products`,
    //   params
    
    // );
    const all = process.env.BASE_API;
    console.log(all+"123");
    const r = await axios.get(
      `https://estylewalabackend.onrender.com/Products`,
      params
    );
    console.log(r.data);
    dispatch(getProductsSuccess(r.data));
  } catch (err) {
    dispatch(getProductsFailure());
  }
};

export const getAllProductsData = (params) => async (dispatch) => {
  dispatch(getProductsLoading());
  try {
    const all = process.env.BASE_API;
    console.log(all);
    const r = await axios.get(
      `https://estylewalabackend.onrender.com/allproducts`,
      params
    );
    console.log(r.data);
    dispatch(getProductsSuccess(r.data));
  } catch (err) {
    console.log(err);
    dispatch(getProductsFailure());
  }
};


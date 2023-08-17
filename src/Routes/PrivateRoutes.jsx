import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { login } from "../Redux/AuthReducer/Action";

export const PrivateRoute = ({ children }) => {
  //   const [isAuth, setisAuth] = useState(false);
  const dispatch = useDispatch();

  // const auth_token = Cookies.get("auth_token");
  // axios.defaults.headers.common["auth_token"] = `${auth_token}`;
  // axios
  //   .get("${process.env.REACT_APP_BASE_API}/admin/adminloginstatus")
  //   .then((response) => {
  //     // setisAuth(true);
  //     dispatch(login());
  //     // console.log("hii")
  //     // console.log(response);
  //   })
  //   .catch((error) => {
  //     // setisAuth(false);
  //     console.error("Error: ", error);
  //   });

  const auth_token = localStorage.getItem("authToken");
  const config = {
    headers: {
      auth_token: `${auth_token}`,
      // Other headers can be added here
    },
  };
  if (auth_token) {
    axios.defaults.headers.common["auth_token"] = `${auth_token}`;
    axios
      .get(`${process.env.REACT_APP_BASE_API}/admin/adminloginstatus`)
      .then((response) => {
        // setisAuth(true);
        dispatch(login());
        console.log(response);
      })
      .catch((error) => {
        // setisAuth(false);
        console.error("Error: ", error);
        dispatch(login("logout"));
        localStorage.clear();
      });
  }
  // console.log(isAuth);
  // const location = useLocation();
  const isAuth = useSelector((store) => store.AuthReducer.isAuth);

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

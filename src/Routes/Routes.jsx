import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "../Admin/AdminDashboard";
import AddProductsPage from "../Admin/AddProductsPage";
import ProductListPage from "../Admin/ProductListPage";
import EditProduct from "../Admin/EditProduct";
import OrdersPage from "../Admin/OrdersPage";
import UsersPage from "../Admin/UsersPage";
import CategoriesPage from "../Admin/CategoriesPage";
import Signin from "../Pages/Signin";
import SizeOptionsPage from "../Admin/SizeOptionsPage";
import { PrivateRoute } from "./PrivateRoutes";
import AdminPage from "../Admin/AdminPage";
import ReviewsPage from "../Admin/ReviewsPage";

// import AddProductsPage from '../Admin/AddProductsPage';
// import UsersPage from "../Admin/UsersPage";
// import AdminProfilePage from "../Admin/AdminProfilePage";

export const MainRoutes = () => {
  const isAuthTokenPresent = () => {
    const authToken = localStorage.getItem("authToken");
    return authToken !== null;
  };
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route
          path="/login"
          element={isAuthTokenPresent() ? <Navigate to="/" /> : <Signin />}
        />
        <Route
          path="/size"
          element={
            <PrivateRoute>
              <SizeOptionsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-products"
          element={
            <PrivateRoute>
              <AddProductsPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/product-list"
          element={
            <PrivateRoute>
              <ProductListPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/edit-product/:id"
          element={
            <PrivateRoute>
              <EditProduct />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/orders-list"
          element={
            <PrivateRoute>
              <OrdersPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/categories-list"
          element={
            <PrivateRoute>
              <CategoriesPage />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/users-list" element={<PrivateRoute><UsersPage /></PrivateRoute>}></Route>
        <Route path="/admin-list" element={<PrivateRoute><AdminPage /></PrivateRoute>}></Route>
        <Route path="/reviews-list" element={<PrivateRoute><ReviewsPage /></PrivateRoute>}></Route>



        {/* <Route path="/add-products" element={<AddProductsPage />}></Route>
             <Route path="/admin-men" element={<MensPage />}></Route>
             <Route path="/admin-women" element={<WomensPage />}></Route>
             <Route path="/admin-kids" element={<KidsPage />}></Route>
             <Route path="/admin-users" element={<UsersPage />}></Route>
             <Route path="/admin-profile" element={<AdminProfilePage />}></Route> */}
      </Routes>
    </>
  );
};

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
import ProductsPage from "../Admin/ProductsPage";
import OrderBarChart from "../Admin/OrderBarChart";
import ReportsPage from "../Admin/ReportsPage";
import OfferPage from "../Admin/OfferPage";
import AccountPage from "../Admin/AccountPage";
import AdminNavbar from "../Admin/AdminNavbar";
import SliderPage from "../Admin/SliderPage";
import Barg from "../Pages/Barg";
import NewOrderPage from "../Admin/NewOrderPage";

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
      {/* <AdminNavbar /> */}
      <Routes>
        <Route path="/chart" element={<OrderBarChart />} />
        <Route path="/bar" element={<Barg />} />

        <Route path="/login" element={<Signin />} />
        <Route
          path="/slider"
          element={
            <PrivateRoute>
              <SliderPage />
            </PrivateRoute>
          }
        ></Route>
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
              <ProductsPage />
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
              {/* <NewOrderPage /> */}
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
        <Route
          path="/users-list"
          element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin-list"
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/reviews-list"
          element={
            <PrivateRoute>
              <ReviewsPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <ReportsPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/offers"
          element={
            <PrivateRoute>
              <OfferPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/admin-profile"
          element={
            <PrivateRoute>
              <AccountPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/report"
          element={
            <PrivateRoute>
              <ReportsPage />
            </PrivateRoute>
          }
        ></Route>

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

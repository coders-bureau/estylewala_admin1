import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../Admin/AdminDashboard";
import AddProductsPage from "../Admin/AddProductsPage";
import ProductListPage from "../Admin/ProductListPage";
import EditProduct from "../Admin/EditProduct";
import OrdersPage from "../Admin/OrdersPage";
import UsersPage from "../Admin/UsersPage";
import CategoriesPage from "../Admin/CategoriesPage";
import Signin from "../Pages/Signin";
import SizeOptionsPage from "../Admin/SizeOptionsPage";

// import AddProductsPage from '../Admin/AddProductsPage';
// import UsersPage from "../Admin/UsersPage";
// import AdminProfilePage from "../Admin/AdminProfilePage";

export const MainRoutes = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/size" element={<SizeOptionsPage />} />
        <Route path="/" element={<AdminDashboard />} />
        {/* <Route path='/signup' element={<Signup/>} />
             <Route path='/login' element={<Signin/>} />
             <Route path='/otp' element={<RealOtp/>} />
             <Route path='/profilefill' element={<AddProfileData/>} />
             <Route path="/store" element={<Store/>} />
             <Route path='/single_product/:id' element={<SingleProduct/>} />
             <Route path='/wishlist' element={<PrivateRoute><Wishlist/></PrivateRoute>} />
             <Route path='/cart' element={<PrivateRoute><Cart/></PrivateRoute>}/>
             <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
             <Route path='/address' element={<PrivateRoute><Address/></PrivateRoute>}/>
             <Route path="/payment" element={<PrivateRoute><Payment/></PrivateRoute> }></Route>
             <Route path="/success" element={<PrivateRoute><Success /></PrivateRoute>} ></Route>
             <Route path="/privacypolicy" element={<PrivacyPolicy />} />
             <Route path="/faqs" element={<FAQ />} />
             <Route path="/tac" element={<TermsAndConditions />} />
             <Route path="/termsofuse" element={<TermsOfUse />} />
             <Route path="/shipping" element={<Shipping />} />
             <Route path="/return" element={<Return />} />
             <Route path="/cancellation" element={<Cancellation />} /> */}
        {/* <Route path="/admin-dashboard" element={<AdminDashboard />}></Route> */}
        {/* <Route path="/p" element={<ProductList />}></Route> */}
        <Route path="/add-products" element={<AddProductsPage />}></Route>
        <Route path="/product-list" element={<ProductListPage />}></Route>
        <Route path="/edit-product/:id" element={<EditProduct />}></Route>
        <Route path="/orders-list" element={<OrdersPage />}></Route>
        <Route path="/users-list" element={<UsersPage />}></Route>
        <Route path="/categories-list" element={<CategoriesPage />}></Route>

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

import React from "react";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateUser from "./components/CreateUser";
import Login from "./components/Login";
import Forgot from "./components/Forgot";
import Navi from "./components/Navi";
import AddToCart from "./components/AddToCart";
import Address from "./components/Address";
import Admin from "./components/Admin";
import Payment from "./components/Payment";
import Orders from "./components/Orders";
import EditProduct from "./components/EditProduct";
import ResetPassword from "./components/ResetPassword";
import Otp from "./components/Otp";
export const url = "https://royal-vintages.onrender.com/index";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="navi" element={<Navi />} />
          <Route path="MyCart" element={<AddToCart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="/checkout/:id" element={<Address />} />
          <Route path=":id/order-summary" element={<Payment />} />
          <Route path="sign-up" element={<CreateUser />} />
          <Route path="login" element={<Login />} />
          <Route path="Admin" element={<Admin />} />
          <Route path="verify-email" element={<Forgot />} />
          <Route path="password-reset/:id" element={<ResetPassword />} />
          <Route path="verify-otp/email/:id" element={<Otp />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="*" element={<Navigate to="/Dashboard" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;

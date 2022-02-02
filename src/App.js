import "./App.css";
import "./Supports/Stylesheets/main.css";
import "./Supports/Stylesheets/util.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";
import "../src/Supports/Assets/vendor/bootstrap/css/bootstrap.min.css";

// Import pages
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Verification from "./Pages/Verification/Verification";
import ForgetPassword from "./Pages/Change Password/ForgetPassword";
import VerifyForgetPassword from "./Pages/Change Password/VerifyForgetPassword";
import ChangePassword from "./Pages/Change Password/ChangePassword";
import UserProfile from "./Pages/User Profile/UserProfile";
import Cart from "./Pages/Cart/Cart";
import Payment from "./Pages/Payment/Payment";
import Home from "./Pages/Landing Page/Home";
import ProductDetail from "./Pages/Product Detail/ProductDetail";
import ProductList from "./Pages/Product List/ProductList";
import HistoryTransaction from "./Pages/History Transaction/HistoryTransaction";
import PaymentVerification from "./Pages/Verify Payment/PaymentVerification";
import ManageProduct from "./Pages/Manage Product/ManageProduct";
import EditProduct from "./Pages/Manage Product/EditProduct";
import AddProduct from "./Pages/Manage Product/AddProduct";

// Import components
import NavHeader from "./Components/NavHeader";
import Footer from "./Components/Footer";

// Import action
import { userKeepLogin } from "./Redux/Actions/user";
import { getCartData } from "./Redux/Actions/cart";
import { getUserAddress } from "./Redux/Actions/address";

function App() {
  const token = localStorage.getItem("userToken");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userKeepLogin(token));
    dispatch(getCartData(token));
    dispatch(getUserAddress(token));
  }, []);

  return (
    <BrowserRouter>
      <NavHeader />
      <Switch>
        <Route component={ProductDetail} path="/product-detail/:id" />
        <Route component={ProductList} path="/products" />
        <Route component={Login} path="/login" />
        <Route component={Register} path="/register" />
        <Route component={Verification} path="/verification/:token" />
        <Route component={ForgetPassword} path="/forget-password" />
        <Route
          component={VerifyForgetPassword}
          path="/verify-forget-password/:token"
        />
        <Route component={ChangePassword} path="/change-password" />
        <Route component={UserProfile} path="/user-profile" />
        <Route component={Cart} path="/cart" />
        <Route component={Payment} path="/payment/:transaction_id" />
        <Route component={HistoryTransaction} path="/history-transaction" />
        <Route component={PaymentVerification} path="/verify-payment" />
        <Route component={EditProduct} path="/manage-products/:id" />
        <Route component={ManageProduct} path="/manage-products" />
        <Route component={AddProduct} path="/add-product" />
        <Route component={Home} path="/" />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

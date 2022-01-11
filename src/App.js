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

// Import components
import NavHeader from "./Components/NavHeader";
import Footer from "./Components/Footer";

// Import action
import { userKeepLogin } from "./Redux/Actions/user";
import { getCartData } from "./Redux/Actions/cart";

function App() {
  const token = localStorage.getItem("userToken");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userKeepLogin(token));
    dispatch(getCartData(token));
  }, []);

  return (
    <BrowserRouter>
      <NavHeader />
      <Switch>
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
        <Route component={Payment} path="/payment" />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

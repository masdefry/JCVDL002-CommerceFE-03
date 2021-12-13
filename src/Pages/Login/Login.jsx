import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../../Redux/Actions/user";
import { Link, Redirect } from "react-router-dom";
import bg01 from "../../Supports/Images/bg-01.jpg";
import Footer from "../../Components/Footer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dataLogin = useSelector((state) => {
    return state.auth;
  });

  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log("dispatch");
    dispatch(loginUser(username, password));
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("userToken");
  //   console.log(token);
  //   if (token) {
  //     return <Redirect to="/" />;
  //   }
  // }, []);

  return (
    <>
      <section
        class="bg-img1 txt-center p-lr-15 p-tb-92"
        style={{
          backgroundImage: `url(${bg01})`,
        }}
      >
        <h2 class="ltext-105 cl0 txt-center">Login</h2>
      </section>
      <div className="container m-tb-80">
        <div className="flex-w flex-tr">
          <div className="size-210 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
            <h4 className="mtext-105 cl2 txt-center p-b-30">Login</h4>

            <div className="bor8 m-b-20 how-pos4-parent">
              <input
                className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                type="text"
                name="username"
                placeholder="Your Username"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <span className="how-pos4 pointer-none">
                <FontAwesomeIcon icon={faUser} />
              </span>
            </div>

            <div className="input-group bor8 m-b-30">
              <input
                className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                type="password"
                name="password"
                placeholder="Your Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <span className="how-pos4 pointer-none">
                <FontAwesomeIcon icon={faUnlock} />
              </span>
            </div>

            <p className="stext-115 cl6 size-213">
              <Link to="/"></Link>
              Forgot password?
            </p>

            <button
              onClick={handleSubmit}
              className="
                  flex-c-m
                  stext-101
                  cl0
                  size-121
                  bg3
                  bor1
                  hov-btn3
                  p-lr-15
                  m-tb-28
                  trans-04
                  pointer
                "
            >
              Login
            </button>

            <p className="stext-115 cl6 size-213 ">
              <Link to="/register">Don't have an account? Sign up</Link>
            </p>
          </div>

          <div
            className="
              size-210
              flex-w flex-col-m
              w-full-md
            "
          >
            <img
              src="https://images.unsplash.com/photo-1634151223530-6ad602d66e86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt=""
              className="img-fluid"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;

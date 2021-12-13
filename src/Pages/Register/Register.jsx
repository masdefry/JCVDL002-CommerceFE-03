import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { registerUser } from "../../Redux/Actions/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUnlock,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import bg01 from "../../Supports/Images/bg-01.jpg";
import Footer from "../../Components/Footer";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();

  const dataRegister = useSelector((state) => {
    return state.auth;
  });
  const dispatch = useDispatch();

  if (dataRegister.username) {
    return <Redirect to="/login" />;
  }

  const handleSubmit = () => {
    dispatch(registerUser(username, password, email, phone));
  };

  return (
    <>
      <section
        class="bg-img1 txt-center p-lr-15 p-tb-92"
        style={{
          backgroundImage: `url(${bg01})`,
        }}
      >
        <h2 class="ltext-105 cl0 txt-center">Register</h2>
      </section>
      <div className="container m-t-80">
        <div className="flex-w flex-tr">
          <div className="size-210 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
            <h4 className="mtext-105 cl2 txt-center p-b-30">Register</h4>

            <div className="input-group bor8 m-b-30">
              <input
                className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                type="text"
                name="email"
                placeholder="Your Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <span className="how-pos4 pointer-none">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
            </div>

            <div className="input-group bor8 m-b-30">
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

            <div className="bor8 m-b-20 how-pos4-parent">
              <input
                className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                type="text"
                name="phone"
                placeholder="Your Phone Number"
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
              />
              <span className="how-pos4 pointer-none">
                <FontAwesomeIcon icon={faPhone} />
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

            <button
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
                  pointer"
              onClick={handleSubmit}
            >
              Register
            </button>

            <p className="stext-115 cl6 size-213 ">
              <Link to="/login">Have an account? Sign in</Link>
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
              src="https://images.unsplash.com/photo-1618225721493-a3485a6188e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
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

export default Register;

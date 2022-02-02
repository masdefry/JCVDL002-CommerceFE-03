import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
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
import { Modal, ModalBody } from "reactstrap";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().min(4, "Must be at least 4 characters").required(),
  email: yup.string().email("Please input a valid email"),
  password: yup
    .string()
    .min(6, "Must be at least 6 characters")
    .max(32)
    .required(),
  phone: yup
    .number()
    .min(6, "Must be at least 6 characters")
    .typeError("Please input a valid phone number")
    .required(),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const dataRegister = useSelector((state) => {
    return state.auth;
  });
  const dispatch = useDispatch();

  const registerBtn = ({ username, password, email, phone }) => {
    dispatch(registerUser(username, password, email, phone));
    console.log(dataRegister);
    setModal(true);
    reset();
  };

  // Cek jika sudah ada user token di local storage, tidak perlu register
  const userToken = localStorage.getItem("userToken");
  if (userToken) {
    return <Redirect to="/" />;
  }

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

      <div className="container m-tb-80">
        <div className="flex-w flex-tr">
          <div className="size-210 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
            <h4 className="mtext-105 cl2 txt-center p-b-30">Register</h4>

            {modal && (
              <Modal
                isOpen={modal}
                toggle={toggle}
                modalTransition={{ timeout: 100 }}
                centered={true}
              >
                <ModalBody>
                  <p className="stext-104 cl2">
                    {dataRegister.error && dataRegister.error}
                    {dataRegister.message && dataRegister.message}
                  </p>
                </ModalBody>
              </Modal>
            )}

            <form onSubmit={handleSubmit(registerBtn)}>
              <div className="input-group bor8">
                <input
                  className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                  type="text"
                  name="email"
                  placeholder="Your Email"
                  {...register("email")}
                  required
                />
                <span className="how-pos4 pointer-none">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </div>
              <p className="m-b-30 text-danger">{errors.email?.message}</p>

              <div className="input-group bor8">
                <input
                  className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                  type="text"
                  name="username"
                  placeholder="Your Username"
                  {...register("username")}
                  required
                />
                <span className="how-pos4 pointer-none">
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </div>
              <p className="m-b-30 text-danger">{errors.username?.message}</p>

              <div className="bor8 how-pos4-parent">
                <input
                  className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                  type="text"
                  name="phone"
                  placeholder="Your Phone Number"
                  {...register("phone")}
                  required
                />
                <span className="how-pos4 pointer-none">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
              </div>
              <p className="m-b-30 text-danger">{errors.phone?.message}</p>

              <div className="input-group bor8 ">
                <input
                  className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  {...register("password")}
                  required
                />
                <span className="how-pos4 pointer-none">
                  <FontAwesomeIcon icon={faUnlock} />
                </span>
              </div>
              <p className="m-b-30 text-danger">{errors.password?.message}</p>

              <button
                type="submit"
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
              >
                Register
              </button>
            </form>

            <p className="stext-115 cl6 size-213 ">
              <Link to="/login" style={{ color: "#888" }}>
                Have an account? Sign in
              </Link>
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
    </>
  );
};

export default Register;

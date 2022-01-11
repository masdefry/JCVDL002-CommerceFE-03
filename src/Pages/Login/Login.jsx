import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../../Redux/Actions/user";
import { Link, Redirect } from "react-router-dom";
import bg01 from "../../Supports/Images/bg-01.jpg";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup
    .string()
    .min(6, "Must be at least 6 characters")
    .max(32)
    .required(),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dataLogin = useSelector((state) => {
    return state.auth;
  });

  const dispatch = useDispatch();

  const loginBtn = ({ username, password }) => {
    dispatch(loginUser(username, password));
    reset();
  };

  // Cek jika sudah ada user token di local storage, tidak perlu register
  const userToken = localStorage.getItem("userToken");
  if (userToken) {
    return <Redirect to="/" />;
  }

  return (
    <div>
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

            {dataLogin.error && (
              <div class="alert alert-danger" role="alert">
                {dataLogin.error}
              </div>
            )}

            <form onSubmit={handleSubmit(loginBtn)}>
              <p style={{ color: "Red" }}>{errors.username?.message}</p>
              <div className="bor8 m-b-20 how-pos4-parent">
                <input
                  className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                  type="text"
                  name="username"
                  placeholder="Your Username"
                  required
                  {...register("username")}
                />

                <span className="how-pos4 pointer-none">
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </div>

              <p style={{ color: "Red" }}>{errors.password?.message}</p>
              <div className="input-group bor8 m-b-30">
                <input
                  className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  required
                  {...register("password")}
                />

                <span className="how-pos4 pointer-none">
                  <FontAwesomeIcon icon={faUnlock} />
                </span>
              </div>

              <p className="stext-115 cl6 txt-right">
                <Link to="/forget-password" style={{ color: "#888" }}>
                  Forgot password?
                </Link>
              </p>

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
                  pointer
                "
              >
                Login
              </button>
            </form>

            <p className="stext-115 cl6 size-213 ">
              <Link to="/register" style={{ color: "#888" }}>
                Don't have an account? Sign up
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
              src="https://images.unsplash.com/photo-1634151223530-6ad602d66e86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt=""
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

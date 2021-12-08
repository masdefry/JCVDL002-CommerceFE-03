import { useState } from "react";
import { useSelector, useDispatch, Connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../../Redux/Actions/user";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dataLogin = useSelector((state) => {
    return state.auth;
  });
  const dispatch = useDispatch();

  return (
    <div className="row d-flex justify-content-center align-items-center m-5">
      <div className="col-12 d-flex align-items-center justify-content-between px-3">
        <div className="col-4 shadow-lg p-3 bg-body rounded">
          <p className="fs-2 fw-bold">Login</p>
          <p className="fs-5 mb-4">Log in now and start shopping</p>

          <div class="input-group mb-3">
            <span class="input-group-text" id="username">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text" id="username">
              <FontAwesomeIcon icon={faUnlock} />
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>

          <p className="text-end">Forgot Password?</p>
          <button
            className="btn btn-dark btn-lg px-5 mt-2 rounded-pill shadow"
            onClick={() => {
              dispatch(loginUser(username, password));
            }}
          >
            Login
          </button>
          <p className="mt-4">
            <Link to="/register">Don't have an account? Create one here</Link>
          </p>
        </div>
        <div className="col-8 ms-5 px-3">
          <img
            src="https://images.unsplash.com/photo-1634151223530-6ad602d66e86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

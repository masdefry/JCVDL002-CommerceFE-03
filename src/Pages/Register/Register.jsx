import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUnlock,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  //   const dataLogin = useSelector((state) => {
  //     return state.auth;
  //   });
  //   const dispatch = useDispatch();

  return (
    <div className="row d-flex justify-content-center align-items-center m-5">
      <div className="col-12 d-flex align-items-center justify-content-between px-3">
        <div className="col-4 offset-1 shadow-lg p-3 bg-body rounded">
          <p className="fs-2 fw-bold">Register</p>
          <p className="fs-5 mb-4">Register now to start shopping</p>

          <div class="input-group mb-3">
            <span class="input-group-text">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">
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
            <span class="input-group-text">
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
          <button className="btn btn-dark btn-lg px-5 mt-2 rounded-pill shadow">
            Login
          </button>
          <p className="mt-4">
            <Link to="/login">Already have an account? Sign in</Link>
          </p>
        </div>

        <div className="col-6 ms-5 px-3">
          <img
            src="https://images.unsplash.com/photo-1618225721493-a3485a6188e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfFM0TUtMQXNCQjc0fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;

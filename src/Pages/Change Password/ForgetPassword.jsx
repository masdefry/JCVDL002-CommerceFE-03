import axios from "axios";
import urlAPI from "../../Supports/Constants/UrlAPI";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../Components/Footer";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitBtn = (email) => {
    axios
      .patch(`${urlAPI}/users/forget-password`, { email })
      .then((result) => {
        console.dir(result);
        setMessage(result.data.detail);
      })
      .catch((err) => {
        console.dir(err);
        setMessage(err.response.data.detail);
      });
  };

  return (
    <div>
      <div className="p-tb-92 justify-content-center col-md-4 offset-md-4 ">
        <h2 className="m-b-20 txt-center">Forget your password?</h2>
        <p className="m-b-40 txt-center">
          Please input your email so we could send you the link to reset your
          password
        </p>

        {message ? (
          <div class="alert alert-secondary" role="alert">
            {message}
          </div>
        ) : null}

        <div className="bor8 m-b-40 how-pos4-parent">
          <input
            className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
            type="text"
            name="username"
            placeholder="Your Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <span className="how-pos4 pointer-none">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
        </div>

        <button
          onClick={() => {
            submitBtn(email);
          }}
          className="
                  flex-c-m
                  stext-101
                  cl0
                  size-121
                  bg3
                  bor1
                  hov-btn3
                  p-lr-15
                  m-t-40
                  trans-04
                  pointer
                  
                "
        >
          Submit
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ForgetPassword;

import axios from "axios";
import urlAPI from "../../Supports/Constants/UrlAPI";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlock } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../Components/Footer";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const params = useParams();

  const submitBtn = (password) => {
    const token = params.token;

    if (password === confirmPass) {
      axios
        .patch(
          `${urlAPI}/users/change-password`,
          { password },
          {
            headers: {
              authorization: `${token}`,
            },
          }
        )
        .then((result) => {
          setMessage(result.data.message);
          setPassword("");
          setConfirmPass("");
        })
        .catch((err) => {
          console.log(err.respose.data.detail);
        });
    } else {
      setErrMessage("Your password does not match");
    }
  };

  return (
    <div>
      <div className="justify-content-center col-md-4 offset-md-4 p-tb-92">
        <h2 className="mtext-105 cl2 txt-center m-b-20 txt-center">
          Change Password
        </h2>
        {message ? <div className="alert alert-success">{message}</div> : null}
        {errMessage ? (
          <div className="alert alert-danger">{errMessage}</div>
        ) : null}

        <div className="bor8 m-b-20 m-t-40 how-pos4-parent ">
          <input
            className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
            type="password"
            name="password"
            placeholder="Your New Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <span className="how-pos4 pointer-none">
            <FontAwesomeIcon icon={faUnlock} />
          </span>
        </div>

        <div className="bor8 m-b-40 how-pos4-parent ">
          <input
            className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
            type="password"
            name="password"
            placeholder="Confirm Your New Password"
            value={confirmPass}
            onChange={(event) => {
              setConfirmPass(event.target.value);
            }}
          />
          <span className="how-pos4 pointer-none">
            <FontAwesomeIcon icon={faUnlock} />
          </span>
        </div>

        <button
          onClick={() => {
            submitBtn(password);
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

export default ChangePassword;

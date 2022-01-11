import axios from "axios";
import urlAPI from "../../Supports/Constants/UrlAPI";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(6, "Must be at least 6 characters")
    .max(32)
    .required(),
  newPassword: yup
    .string()
    .min(6, "Must be at least 6 characters")
    .max(32)
    .required(),
  confirmPassword: yup
    .string()
    .min(6, "Must be at least 6 characters")
    .max(32)
    .required(),
});

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const submitBtn = ({ oldPassword, newPassword, confirmPassword }) => {
    const token = localStorage.getItem("userToken");

    if (newPassword === confirmPassword) {
      axios
        .patch(
          `${urlAPI}/users/change-password`,
          { oldPassword, newPassword },
          {
            headers: {
              authorization: `${token}`,
            },
          }
        )
        .then((result) => {
          setMessage(result.data.message);
          setErrMessage("");
        })
        .catch((err) => {
          setErrMessage(err.response.data.detail);
        });
    } else {
      setErrMessage("Your password does not match");
    }
    reset();
  };

  return (
    <div>
      <div className="justify-content-center col-md-4 offset-md-4 p-tb-92">
        <h2 className="mtext-105 cl2 txt-center m-b-40 txt-center">
          Change Password
        </h2>

        {message && <div className="alert alert-success">{message}</div>}
        {errMessage && <div className="alert alert-danger">{errMessage}</div>}

        <form onSubmit={handleSubmit(submitBtn)}>
          <div className="bor8 how-pos4-parent ">
            <input
              className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
              type="password"
              name="oldPassword"
              placeholder="Your Old Password"
              required
              {...register("oldPassword")}
            />
            <span className="how-pos4 pointer-none">
              <FontAwesomeIcon icon={faUnlock} />
            </span>
          </div>
          <p className="m-b-20 text-danger">{errors.oldPassword?.message}</p>

          <div className="bor8 how-pos4-parent ">
            <input
              className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
              type="password"
              name="newPassword"
              placeholder="Your New Password"
              required
              {...register("newPassword")}
            />
            <span className="how-pos4 pointer-none">
              <FontAwesomeIcon icon={faUnlock} />
            </span>
          </div>
          <p className=" m-b-20 text-danger">{errors.newPassword?.message}</p>

          <div className="bor8  how-pos4-parent ">
            <input
              className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
              type="password"
              name="password"
              placeholder="Confirm Your New Password"
              required
              {...register("confirmPassword")}
            />
            <span className="how-pos4 pointer-none">
              <FontAwesomeIcon icon={faUnlock} />
            </span>
          </div>
          <p className=" m-b-40 text-danger">
            {errors.confirmPassword?.message}
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
                  m-t-40
                  trans-04
                  pointer
                "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

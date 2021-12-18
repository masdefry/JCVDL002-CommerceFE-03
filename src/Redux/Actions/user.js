import urlAPI from "./../../Supports/Constants/UrlAPI";
import Axios from "axios";

export const loginUser = (username, password) => {
  return (dispatch) => {
    Axios.post(`${urlAPI}/users/login`, {
      username,
      password,
    })
      .then((result) => {
        if (result.data) {
          console.log(result.data);
          localStorage.setItem("userToken", result.data.data.token);

          dispatch({
            type: "USER_LOGIN",
            payload: result.data.data,
          });
        }
      })
      .catch((err) => {
        console.dir(err);
        dispatch({
          type: "USER_LOGIN_ERROR",
          payload: err.response.data.detail,
        });
      });
  };
};

export const registerUser = (username, password, email, phone) => {
  return (dispatch) => {
    Axios.post(`${urlAPI}/users/register`, {
      username,
      email,
      password,
      phone,
    })
      .then((result) => {
        console.dir(result);
        localStorage.setItem("userToken", result.data.data.token);
        dispatch({
          type: "USER_REGISTER",
          payload: result.data.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "USER_REGISTER_ERROR",
          payload: err.response.data.detail,
        });
      });
  };
};

export const logoutUser = () => {
  localStorage.clear();
  return {
    type: "USER_LOGOUT",
  };
};

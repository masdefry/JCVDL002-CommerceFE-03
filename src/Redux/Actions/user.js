import urlAPI from "./../../Supports/Constants/UrlAPI";
import Axios from "axios";

export const loginUser = (username, password) => {
  return (dispatch) => {
    Axios.post(`${urlAPI}/users/login`, {
      username,
      password,
    })
      .then((result) => {
        localStorage.setItem("userToken", result.data.data.token);
        dispatch({
          type: "USER_LOGIN",
          payload: result.data.data,
        });
      })
      .catch((err) => {
        console.dir(err.response);
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
        dispatch({
          type: "USER_REGISTER",
          payload: result.data.detail,
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

export const logoutUser = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: "USER_LOGOUT" });
};

export const userKeepLogin = (token) => {
  return (dispatch) => {
    Axios.get(`${urlAPI}/users`, {
      headers: {
        authorization: `${token}`,
      },
    })
      .then((result) => {
        dispatch({
          type: "USER_LOGIN",
          payload: result.data.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: "USER_LOGIN_ERROR",
          payload: err.respose,
        });
      });
  };
};

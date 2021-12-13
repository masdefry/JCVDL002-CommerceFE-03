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
          localStorage.setItem(
            "userToken",
            JSON.stringify(result.data.data.token)
          );

          dispatch({
            type: "USER_LOGIN",
            payload: result.data.data,
          });
        }
      })
      .catch((err) => {
        console.dir(err);
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
        localStorage.setItem(
          "userToken",
          JSON.stringify(result.data.data.token)
        );
        dispatch({
          type: "USER_REGISTER",
          payload: result.data.data,
        });
      })
      .catch((err) => {
        console.dir(err);
      });
  };
};

export const logoutUser = () => {
  localStorage.removeItem("userData");
  return {
    type: "USER_LOGOUT",
  };
};

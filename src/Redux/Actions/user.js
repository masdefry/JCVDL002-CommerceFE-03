import urlAPI from "./../../Supports/Constants/UrlAPI";
import Axios from "axios";

export const loginUser = (username, password) => {
  return (dispatch) => {
    Axios.post(`${urlAPI}/users/login`, {
      username,
      password,
    })
      .then((result) => {
        if (result.data.length) {
          localStorage.setItem("userToken", result.data.token);
          dispatch({
            type: "USER_LOGIN",
            payload: result.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

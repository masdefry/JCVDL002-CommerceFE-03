import urlAPI from "./../../Supports/Constants/UrlAPI";
import Axios from "axios";

export const getUserAddress = (userToken) => {
  return (dispatch) => {
    Axios.get(`${urlAPI}/users/address`, {
      headers: {
        authorization: `${userToken}`,
      },
    })
      .then((result) => {
        dispatch({
          type: "USER_ADDRESS",
          payload: result.data.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "ERROR_ADDRESS",
          payload: "There was an error when getting the data",
        });
      });
  };
};

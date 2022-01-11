import urlAPI from "./../../Supports/Constants/UrlAPI";
import Axios from "axios";

export const getCartData = (userToken) => {
  return (dispatch) => {
    Axios.get(`${urlAPI}/carts`, {
      headers: {
        authorization: `${userToken}`,
      },
    })
      .then((result) => {
        dispatch({
          type: "FILL_CART",
          payload: result.data.cartData,
        });
      })
      .catch((err) => {
        dispatch({
          type: "ERROR_CART",
          payload: "There was an error when getting the cart data",
        });
      });
  };
};

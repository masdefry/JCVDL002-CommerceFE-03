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
        let subtotal = 0;
        for (let i = 0; i < result.data.cartData.length; i++) {
          console.log("result.data.cartData", result.data.cartData[i]);
          subtotal +=
            result.data.cartData[i].product_price * result.data.cartData[i].qty;
        }
        console.log("subtotal", subtotal);
        console.log("result.data", result.data);
        dispatch({
          type: "FILL_CART",
          payload: result.data.cartData,
        });
        dispatch({
          type: "CART_TOTAL",
          payload: subtotal,
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

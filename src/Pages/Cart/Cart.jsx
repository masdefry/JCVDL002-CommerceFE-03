import Axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from "react-router-dom";
import urlAPI from "../../Supports/Constants/UrlAPI";
import { getCartData } from "../../Redux/Actions/cart";

const Cart = () => {
  const [addressList, setAddressList] = useState([]);
  const [addressId, setAddressId] = useState([]);

  const token = localStorage.getItem("userToken");
  const dispatch = useDispatch();

  const cartList = useSelector((state) => {
    return state.cart.cartList;
  });

  useEffect(() => {
    // Ambil user address data
    Axios.get(`${urlAPI}/users/address`, {
      headers: {
        authorization: `${token}`,
      },
    })
      .then((result) => {
        setAddressList(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addCartHandler = (id, qty) => {
    Axios.patch(`${urlAPI}/carts/${id}`, { qty: qty + 1 })
      .then((result) => {
        dispatch(getCartData(token));
        console.dir(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCartHandler = (id, qty) => {
    if (qty > 1) {
      Axios.patch(`${urlAPI}/carts/${id}`, { qty: qty - 1 })
        .then((result) => {
          dispatch(getCartData(token));
          console.dir(result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Axios.delete(`${urlAPI}/carts/${id}`)
        .then((result) => {
          dispatch(getCartData(token));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const renderCart = () => {
    return cartList.map((data) => {
      return (
        <tr className="table_row">
          <td className="column-1">
            <div className="how-itemcart1">
              <img src={urlAPI + "/Images/Products/" + data.image} alt="IMG" />
            </div>
          </td>
          <td className="column-2">{data.product_name}</td>
          <td className="column-3">Rp {data.product_price}</td>
          <td className="column-4">
            <div className="wrap-num-product flex-w m-l-auto m-r-0">
              <div className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                <span
                  className="fs-24"
                  onClick={() => {
                    deleteCartHandler(data.id, data.qty);
                  }}
                >
                  -
                </span>
              </div>

              <input
                className="mtext-104 cl3 txt-center num-product"
                type="number"
                value={data.qty}
              />

              <div className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                <span
                  className="fs-24"
                  onClick={() => {
                    addCartHandler(data.id, data.qty);
                  }}
                >
                  +
                </span>
              </div>
            </div>
          </td>
          <td className="column-5">Rp {data.qty * data.product_price}</td>
        </tr>
      );
    });
  };

  const renderSubtotalPrice = () => {
    let subtotal = 0;
    for (let i = 0; i < cartList.length; i++) {
      subtotal += cartList[i].product_price * cartList[i].qty;
    }
    return subtotal;
  };

  const renderAddress = () => {
    return addressList.map((data) => {
      return (
        <FormGroup check>
          <Label check>
            <Input
              type="radio"
              name="address"
              value={data.id}
              onChange={(event) => {
                setAddressId(event.target.value);
                console.log("setAddressId", addressId);
              }}
            />{" "}
            {data.address + ", " + data.postal_code}
          </Label>
        </FormGroup>
      );
    });
  };

  const checkoutBtn = () => {
    Axios.post(
      `${urlAPI}/transaction`,
      {
        cart: cartList,
        totalProductPrice: renderSubtotalPrice(),
        shipping: 10000,
        totalPrice: renderSubtotalPrice() + 10000,
        addressId,
        warehouseId: 1,
      },
      {
        headers: {
          authorization: `${token}`,
        },
      }
    )
      .then((result) => {
        return <Redirect to={`/payment/${result.data.transaction_id}`} />;
      })
      .catch((err) => {
        console.dir(err);
      });
  };

  if (!token) {
    return <Redirect to="/login" />;
  }

  return (
    <form className="bg0 p-tb-110" onSubmit={checkoutBtn}>
      <div className="row">
        <div className="col-lg-10 col-xl-7 m-b-50">
          <div className="m-l-25 m-r--38 m-lr-0-xl">
            <div className="wrap-table-shopping-cart">
              <table className="table-shopping-cart">
                <tr className="table_head">
                  <th className="column-1">Product</th>
                  <th className="column-2"></th>
                  <th className="column-3">Price</th>
                  <th className="column-4">Quantity</th>
                  <th className="column-5">Total</th>
                </tr>

                {renderCart()}
              </table>
            </div>
          </div>
        </div>

        <div className="col-sm-10 col-lg-7 col-xl-5 m-b-50">
          <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
            <h4 className="mtext-109 cl2 p-b-30">Cart Totals</h4>

            <div className="flex-w flex-t bor12 p-b-13">
              <div className="size-208">
                <span className="stext-110 cl2">Subtotal:</span>
              </div>

              <div className="size-209">
                <span className="mtext-110 cl2">
                  Rp {renderSubtotalPrice()}
                </span>
              </div>
            </div>

            <div className="flex-w flex-t bor12 p-t-15 p-b-30">
              <div className="size-208 w-full-ssm">
                <span className="stext-110 cl2">Shipping:</span>
              </div>

              <div className="size-209 p-r-18 p-r-0-sm w-full-ssm">
                <div className="p-t-15">
                  <Form>{renderAddress()}</Form>
                </div>
              </div>
            </div>

            <div className="flex-w flex-t p-t-27 p-b-33">
              <div className="size-208">
                <span className="mtext-101 cl2">Total:</span>
              </div>

              <div className="size-209 p-t-1">
                <span className="mtext-110 cl2">
                  Rp {renderSubtotalPrice()}
                </span>
              </div>
            </div>

            <button
              className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer"
              type="submit"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Cart;

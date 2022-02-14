import Axios from "axios";
import { useState, useEffect } from "react";
import urlAPI from "../../Supports/Constants/UrlAPI";

const HistoryTransaction = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [ongoingTrans, setOngoingTrans] = useState([]);
  const [transactionDetails, setTransactionDetails] = useState([]);

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    Axios.get(`${urlAPI}/transaction`, {
      headers: {
        authorization: `${token}`,
      },
    })
      .then((result) => {
        setTransactionList(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    Axios.get(`${urlAPI}/transaction/ongoing/user`, {
      headers: {
        authorization: `${token}`,
      },
    })
      .then((result) => {
        setOngoingTrans(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderOngoingTransaction = () => {
    return ongoingTrans.map((data) => {
      console.log(data);
      return data.transaction_detail.map((product) => {
        return (
          <tr className="">
            <td className="p-l-40 p-tb-30">
              {data.transaction_date.slice(0, 10)}
            </td>
            <td className="text-center">{product.product_name}</td>
            <td className="text-center">{product.price}</td>
            <td className="text-center">{product.product_qty}</td>
            <td className="text-center">
              {product.price * product.product_qty}
            </td>
            <td className="text-center">Waiting for payment verification</td>
          </tr>
        );
      });
    });
  };

  const renderTransactionList = () => {
    return transactionList.map((data) => {
      return (
        <tr className="table_row">
          <td className="column-2 p-l-40">
            {data.transaction_date.slice(0, 10)}{" "}
          </td>
          <td className="column-3">{data.transaction_detail.length}</td>
          <td className="column-3">Rp {data.total_price.toLocaleString()}</td>
          <td className="column-3">
            <button
              className="stext-107 cl0 bg3 size-301 bor7 p-lr-15 hov-btn3 trans-04 m-r-5 m-b-5 "
              onClick={() => {
                setTransactionDetails(data.transaction_detail);
              }}
            >
              Detail
            </button>
          </td>
        </tr>
      );
    });
  };

  const renderTransactionDetails = () => {
    return transactionDetails.map((data) => {
      return (
        <tr className="table_row">
          <td className="column-4">{data.product_name}</td>
          <td className="column-5">{data.price}</td>
          <td className="column-5">{data.product_qty}</td>
          <td className="column-5">{data.price * data.product_qty}</td>
        </tr>
      );
    });
  };

  return (
    <div className="container m-tb-80">
      <div className="row">
        {ongoingTrans.length ? (
          <div className="m-b-50 m-t-100">
            <div className="bor10 p-lr-40 p-t-30 m-lr-0-xl p-lr-15-sm">
              <h4 className="mtext-109 cl2 p-b-30">Ongoing Transaction</h4>
            </div>
            <table className="table-shopping-cart bor10 ">
              <tr className="table_head">
                <th className="p-l-40">Date</th>
                <th className="text-center">Product</th>
                <th className="text-center">Price</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Total</th>
                <th className="text-center">Status</th>
              </tr>
              {renderOngoingTransaction()}
            </table>
          </div>
        ) : null}
        <div className="col-sm-10 col-lg-7 col-xl-5 m-b-50 m-t-100">
          <div className="bor10 p-lr-40 p-t-30 m-lr-0-xl p-lr-15-sm">
            <h4 className="mtext-109 cl2 p-b-30">Transaction History</h4>
          </div>
          <table className="table-shopping-cart bor10 ">
            <tr className="table_head">
              <th className="column-3 p-l-40">Date</th>
              <th className="column-3">Items</th>
              <th className="column-3">Price</th>
              <th className="column-3">Status</th>
            </tr>
            {renderTransactionList()}
          </table>
        </div>

        <div className="col-lg-10 col-xl-7 m-b-50">
          {transactionDetails.length ? (
            <div className="m-lr-0-xl bor10 ">
              <h4 className="mtext-109 cl2 p-lr-40 p-t-30 p-b-30 ">
                Transaction Detail
              </h4>
              <div className="wrap-table-shopping-cart">
                <table className="table-shopping-cart">
                  <tr className="table_head">
                    <th className="column-5 ">Product</th>

                    <th className="column-5">Price</th>
                    <th className="column-5">Quantity</th>
                    <th className="column-5">Total</th>
                  </tr>
                  {renderTransactionDetails()}
                </table>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HistoryTransaction;

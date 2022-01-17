import Axios from "axios";
import { useState } from "react";

const HistoryTransaction = () => {
  return (
    <div className="container m-tb-80">
      <div className="row">
        <div className="col-sm-10 col-lg-7 col-xl-4 m-b-50 m-t-100">
          <div className="bor10 p-lr-40 p-t-30 p-b-40 m-lr-0-xl p-lr-15-sm">
            <h4 className="mtext-109 cl2 p-b-30">Transaction History</h4>

            <div className="flex-w flex-t bor12 p-b-13">
              <div className="size-208">
                <span className="stext-110 cl2">Subtotal:</span>
              </div>

              <div className="size-209">
                <span className="mtext-110 cl2">Rp </span>
              </div>
            </div>

            <div className="flex-w flex-t bor12 p-t-15 p-b-30">
              <span className="stext-110 cl2 m-b-25">Shipping:</span>
            </div>

            <div className="flex-w flex-t p-t-27 p-b-33">
              <div className="size-208">
                <span className="mtext-101 cl2">Total:</span>
              </div>

              <div className="size-209 p-t-1">
                <span className="mtext-110 cl2">Rp </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-10 col-xl-8 m-b-50">
          <div className="m-l-25 m-lr-0-xl bor10 ">
            <h4 className="mtext-109 cl2 p-lr-40 p-t-30 p-b-30">
              Transaction Detail
            </h4>
            <div className="wrap-table-shopping-cart">
              <table className="table-shopping-cart">
                <tr className="table_head">
                  <th className="column-5">Product</th>
                  <th className="column-5"></th>
                  <th className="column-5">Price</th>
                  <th className="column-5">Quantity</th>
                  <th className="column-5">Total</th>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryTransaction;

import Axios from "axios";
import { useState, useEffect } from "react";
import urlAPI from "../../Supports/Constants/UrlAPI";
import { Modal, ModalBody } from "reactstrap";

const PaymentVerification = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [deleteTransaction, setDeleteTransaction] = useState();

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    Axios.get(`${urlAPI}/transaction/ongoing`).then((result) => {
      setTransactionList(result.data.data);
    });
  }, [transactionList]);

  const actionPaymentBtn = (data, type) => {
    if (type === "accept") {
      Axios.post(`${urlAPI}/transaction/verify`, {
        transaction_id: data.transaction_id,
        status_id: 3,
        id: data.id,
      }).catch((err) => {
        console.log(err);
      });
    }
    if (type === "decline") {
      Axios.post(`${urlAPI}/transaction/verify`, {
        transaction_id: data.transaction_id,
        status_id: 6,
        id: data.id,
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  const renderTransactionList = () => {
    return transactionList.map((data) => {
      return (
        <tr className="table_row">
          <td className="column-1">
            <div className="how-itemcart1">
              <img
                src={urlAPI + "/Images/Bukti Pembayaran/" + data.proof}
                alt="IMG"
              />
            </div>
          </td>
          <td className="column-3">Rp {data.total_price.toLocaleString()}</td>
          <td className="column-2">{data.transaction_date.slice(0, 10)}</td>
          <td className="column-2 ">
            <button
              className="stext-107 cl0 bg3 size-301 bor7 p-lr-15 hov-btn3 trans-04 m-r-5 m-b-5 "
              onClick={() => {
                actionPaymentBtn(data, "accept");
              }}
            >
              Accept
            </button>
            <button
              className="stext-107 cl3 bg0 size-301 bor7 p-lr-15 hov-btn3 trans-04 m-r-5 m-b-5"
              onClick={() => {
                setModal(true);
                setDeleteTransaction(data);
              }}
            >
              Decline
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="container m-tb-80">
      {modal && (
        <Modal
          isOpen={modal}
          toggle={toggle}
          modalTransition={{ timeout: 100 }}
          centered={true}
        >
          <ModalBody>
            <p className="stext-104 cl2">
              Are you sure you want to decline this transaction?
            </p>
            <div className="flex-w flex-r">
              <button
                className="stext-107 cl0 bg3 size-301 bor7 p-lr-23 p-tb-3 hov-btn3 trans-04 m-lr-5"
                onClick={() => {
                  actionPaymentBtn(deleteTransaction, "decline");
                  setModal(false);
                }}
              >
                Decline
              </button>
              <button
                className="stext-107 cl3 bg0 size-301 bor7 p-lr-23 p-tb-3 hov-btn3 trans-04 m-lr-5"
                onClick={() => {
                  setModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </ModalBody>
        </Modal>
      )}
      {transactionList.length ? (
        <div className="row">
          <div className="col-lg-10 col-xl-7 m-b-50 m-t-100 m-auto">
            <div className="bor10 p-lr-40 p-t-30 m-lr-0-xl p-lr-15-sm">
              <h4 className="mtext-109 cl2 p-b-30">Ongoing Transaction</h4>
            </div>
            <table className="table-shopping-cart bor10 ">
              <tr className="table_head ">
                <th className="column-3 p-l-40">Proof</th>
                <th className="column-3">Total Price</th>
                <th className="column-3">Date</th>
                <th className="column-3"></th>
              </tr>
              {renderTransactionList()}
            </table>
          </div>
        </div>
      ) : (
        <div className="alert alert-secondary w-50 m-auto">
          Currently there are no ongoing transaction
        </div>
      )}
    </div>
  );
};

export default PaymentVerification;

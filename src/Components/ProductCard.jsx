import Axios from "axios";
import urlAPI from "../Supports/Constants/UrlAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Modal, ModalBody } from "reactstrap";

const ProductCard = ({ id, name, price, image }) => {
  const token = localStorage.getItem("userToken");

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const addToCartBtn = () => {
    if (!token) {
      setModal(true);
      console.log("setModal : ", modal);
    } else {
      Axios.post(
        `${urlAPI}/carts`,
        { qty: 1, product_id: id },
        {
          headers: {
            authorization: `${token}`,
          },
        }
      )
        .then((result) => {
          alert("Product has been added to cart");
        })
        .catch((err) => {
          setModal(true);
        });
    }
  };

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
      {modal && (
        <Modal
          isOpen={modal}
          toggle={toggle}
          modalTransition={{ timeout: 100 }}
          centered={true}
        >
          <ModalBody>
            <p className="stext-104 cl2">
              You need to be logged in first to start shopping
            </p>
            <p className="stext-104 cl2">
              Click here to
              <a href="/login"> log in </a>
              to your account
            </p>
            <p>
              If you don't have one, click here to{" "}
              <a href="/register"> register </a> new account
            </p>
          </ModalBody>
        </Modal>
      )}
      <div className="block2">
        <div className="block2-pic hov-img0">
          <img src={urlAPI + "/Images/Products/" + image} alt="IMG"></img>

          <a
            href={`/product-detail/${id}`}
            className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
          >
            View Detail
          </a>
        </div>

        <div className="block2-txt flex-w flex-t p-t-14">
          <div className="block2-txt-child1 flex-col-l ">
            <a
              href={"/product-detail/" + id}
              className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
            >
              {name}
            </a>

            <span className="stext-105 cl3">Rp {price.toLocaleString()}</span>
          </div>

          <div className="block2-txt-child2 flex-r p-t-3">
            <span className="btn-addwish-b2 dis-block pos-relative pointer js-addwish-b2">
              <FontAwesomeIcon
                className="icon-heart1 dis-block trans-04 cl4 fs-25"
                icon={faCartPlus}
              />
              <FontAwesomeIcon
                className="icon-heart2 dis-block trans-04 ab-t-l fs-25"
                icon={faCartPlus}
                onClick={addToCartBtn}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

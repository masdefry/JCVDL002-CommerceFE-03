import Axios from "axios";
import urlAPI from "../../Supports/Constants/UrlAPI";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal, ModalBody } from "reactstrap";
import ImageCarousel from "../../Components/ImageCarousel";

const ProductDetail = () => {
  const [qty, setQty] = useState(1);
  const [productData, setProductData] = useState({});
  const [image, setImage] = useState([]);
  const [productNotFound, setProductNotFound] = useState(false);

  const token = localStorage.getItem("userToken");
  const params = useParams();

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    Axios.get(`${urlAPI}/products/${params.id}`)
      .then((result) => {
        if (result.data.data.length) {
          setProductData(result.data.data[0]);
          setImage(result.data.image);
        } else {
          setProductNotFound(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const qtyBtnHandler = (type) => {
    if (qty === productData.stock) {
      alert("Sorry, the quantity you requested exceed our current stock");
      setQty(1);
    } else if (type === "increment") {
      setQty(qty + 1);
    } else if (type === "decrement" && qty > 1) {
      setQty(qty - 1);
    }
  };

  const addToCartBtn = () => {
    if (!token) {
      setModal(true);
    }

    Axios.post(
      `${urlAPI}/carts`,
      { qty, product_id: params.id },
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
        console.log(err.data);
      });
  };

  return (
    <section className="sec-product-detail bg0 p-t-65 p-b-60">
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
      <div className="container">
        {productNotFound ? (
          <div className="alert alert-danger">
            Sorry, we can not find the product you're looking for
          </div>
        ) : (
          <div className="row">
            <div className="col-md-6 col-lg-7 p-b-30">
              <div className="p-l-25 p-r-30 p-lr-0-lg">
                <div className="wrap-slick3 flex-sb flex-w">
                  <div className="wrap-slick3-dots"></div>
                  <div className="wrap-slick3-arrows flex-sb-m flex-w"></div>

                  <div className="slick3 gallery-lb">
                    {image && <ImageCarousel items={image} />}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-5 p-b-30 align-self-center">
              <div className="p-r-50 p-t-5 p-lr-0-lg">
                <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                  {productData.product_name}
                </h4>

                <span className="mtext-106 cl2">
                  Rp {productData.product_price}
                </span>

                <p className="stext-102 cl3 p-t-23">
                  {productData.detail_product}
                </p>

                <div className="p-t-33">
                  <div className="flex-w flex-r-m p-b-10">
                    <div className="size-204 flex-w flex-m respon6-next">
                      <div className="wrap-num-product flex-w m-r-20 ">
                        <div
                          className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m fs-24"
                          onClick={() => {
                            qtyBtnHandler("decrement");
                          }}
                        >
                          -
                        </div>

                        <span className="mtext-104 cl3 txt-center flex-c-m num-product">
                          {qty}
                        </span>

                        <div
                          className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m fs-24"
                          onClick={() => {
                            qtyBtnHandler("increment");
                          }}
                        >
                          +
                        </div>
                      </div>

                      {productData.stock > 0 ? (
                        <button
                          className="flex-c-m stext-101 cl0 size-101 bor1 hov-btn3 bg3 p-lr-15 trans-04 m-t-50 js-addcart-detail"
                          onClick={addToCartBtn}
                        >
                          Add to cart
                        </button>
                      ) : (
                        <button
                          className="flex-c-m stext-101 size-101 bg2 bor1 p-lr-15 trans-04 m-t-50 "
                          disabled
                        >
                          Product out of stock
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;

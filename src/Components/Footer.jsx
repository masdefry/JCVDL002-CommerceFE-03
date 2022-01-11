import React from "react";
import pay1 from "../Supports/Images/icons/icon-pay-01.png";
import pay2 from "../Supports/Images/icons/icon-pay-02.png";
import pay3 from "../Supports/Images/icons/icon-pay-03.png";
import pay4 from "../Supports/Images/icons/icon-pay-04.png";
import pay5 from "../Supports/Images/icons/icon-pay-05.png";

const Footer = () => {
  return (
    <div className="bg3 p-t-75 p-b-32">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-lg-3 p-b-10">
            <h4 className="stext-301 cl0 p-b-30">Categories</h4>

            <p className="p-b-5 stext-107 cl7 hov-cl1 trans-04 pointer">
              Women
            </p>
            <p className="p-b-5 stext-107 cl7 hov-cl1 trans-04 pointer">Men</p>
            <p className="p-b-5 stext-107 cl7 hov-cl1 trans-04 pointer">
              Shoes
            </p>
            <p className="p-b-5 stext-107 cl7 hov-cl1 trans-04 pointer">
              Watches
            </p>
          </div>

          <div className="col-sm-6 col-lg-3 p-b-50">
            <h4 className="stext-301 cl0 p-b-30">Help</h4>

            <p className="p-b-5 stext-107 cl7 hov-cl1 trans-04 pointer">
              Tract Order
            </p>
            <p className="p-b-5 stext-107 cl7 hov-cl1 trans-04 pointer">
              Returns
            </p>
            <p className="p-b-5 stext-107 cl7 hov-cl1 trans-04 pointer">
              Shipping
            </p>
            <p className="p-b-5 stext-107 cl7 hov-cl1 trans-04 pointer">FAQs</p>
          </div>

          <div className="col-sm-6 col-lg-3 p-b-50">
            <h4 className="stext-301 cl0 p-b-30">GET IN TOUCH</h4>

            <p className="stext-107 cl7 size-201">
              Any questions? Let us know in store at 8th floor, 379 Hudson St,
              New York, NY 10018 or call us on (+1) 96 716 6879
            </p>
          </div>

          <div className="col-sm-6 col-lg-3 p-b-50">
            <h4 className="stext-301 cl0 p-b-30">Newsletter</h4>

            <form>
              <div className="wrap-input1 w-full p-b-4">
                <input
                  className="input1 bg-none plh1 stext-107 cl7"
                  type="text"
                  name="email"
                  placeholder="email@example.com"
                />
                <div className="focus-input1 trans-04"></div>
              </div>

              <div className="p-t-18">
                <button className="flex-c-m stext-101 cl0 size-103 bg1 bor1 hov-btn2 p-lr-15 trans-04">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <div>
          <div className="flex-c-m flex-w p-b-18">
            <a href="#" className="m-all-1">
              <img src={pay1} alt="ICON-PAY" />
            </a>

            <a href="#" className="m-all-1">
              <img src={pay2} alt="ICON-PAY" />
            </a>

            <a href="#" className="m-all-1">
              <img src={pay3} alt="ICON-PAY" />
            </a>

            <a href="#" className="m-all-1">
              <img src={pay4} alt="ICON-PAY" />
            </a>

            <a href="#" className="m-all-1">
              <img src={pay5} alt="ICON-PAY" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

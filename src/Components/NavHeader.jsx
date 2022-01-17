import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "../Redux/Actions/user";
import logo1 from "../Supports/Images/icons/logo-01.png";

const NavHeader = () => {
  const dataUser = useSelector((state) => {
    return state.auth;
  });

  const dispatch = useDispatch();

  const logOutBtn = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="container-menu-desktop header-v4 how-shadow1">
      <div className="limiter-menu-desktop container">
        <a href="/" className="logo">
          <img src={logo1} alt="IMG-LOGO" />
        </a>

        <div className="menu-desktop ">
          <ul className="main-menu ">
            <li>
              <a href="/" className="m-r-18">
                Home
              </a>
            </li>

            <li>
              <a href="/products" className="m-r-18">
                Shop
              </a>
            </li>

            <li>
              <a href="/history-transaction" className="m-r-18">
                History
              </a>
            </li>

            {dataUser.user_role_id === 3 ? null : (
              <li>
                <a href="/" className="m-r-18">
                  Admin
                </a>
              </li>
            )}

            <li>
              <a href="a/" className="m-r-18">
                About
              </a>
            </li>

            <li>
              <a href="/" className="m-r-18">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="wrap-icon-header flex-w flex-r-m menu-desktop">
          {dataUser.username ? (
            <div
              className="icon-header-item cl2 trans-04 fs-20"
              style={{ fontFamily: "Poppins-Medium" }}
            >
              <ul className="main-menu ">
                <li className="m-r-28">
                  <a href="index.html">{dataUser.username}</a>
                  <ul className="sub-menu">
                    <li>
                      <a href="/user-profile">User Profile</a>
                    </li>
                    <li>
                      <a href={`/change-password`}>Change Password</a>
                    </li>
                    <li>
                      <a href="/" onClick={logOutBtn}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a
                    href="/cart"
                    className="m-l-30"
                    style={{ fontSize: "18px" }}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} />{" "}
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div
              className="cl2 flex-r-m trans-04 p-l-22 p-r-11 "
              style={{ fontFamily: "Poppins-Medium" }}
            >
              <span className="p-l-18 pointer hov-cl1">
                <Link to="/login" style={{ color: "#333" }}>
                  Login
                </Link>
              </span>
              <span className="p-l-18 pointer hov-cl1">
                <Link to="/register" style={{ color: "#333" }}>
                  Register
                </Link>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavHeader;

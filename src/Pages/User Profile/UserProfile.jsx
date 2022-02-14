import Axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import urlAPI from "../../Supports/Constants/UrlAPI";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { getUserAddress } from "../../Redux/Actions/address";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({
    username: "",
    email: "",
    phone: "",
    verification: 0,
    fisrtName: "",
    lastName: "",
    birthdate: "",
    gender: 0,
    userRole: 3,
    editToggle: 0,
  });

  const [addAddress, setAddAddress] = useState({
    toggle: false,
    address: "",
    postal_code: 0,
    status: 0,
  });

  const token = localStorage.getItem("userToken");
  const dispatch = useDispatch();

  const addressList = useSelector((state) => {
    return state.address.addressList;
  });

  useEffect(() => {
    Axios.get(`${urlAPI}/users/user-profile`, {
      headers: {
        authorization: `${token}`,
      },
    })
      .then((result) => {
        let data = result.data.data;
        setUserProfile({
          username: data.username,
          email: data.email,
          phone: data.phone,
          verification: data.verification_status,
          fisrtName: data.first_name,
          lastName: data.last_name,
          birthdate: data.birthdate,
          gender: data.gender,
          userRole: data.user_role_id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderAddress = () => {
    return addressList.map((data) => {
      return (
        <p className="stext-111 cl8">
          {data.address + ", " + data.postal_code}
        </p>
      );
    });
  };

  const addAddressBtn = () => {
    Axios.post(
      `${urlAPI}/users/address`,
      {
        address: addAddress.address,
        postal_code: addAddress.postal_code,
        status: 0,
      },
      {
        headers: {
          authorization: `${token}`,
        },
      }
    ).then((result) => {
      dispatch(getUserAddress(token));
      setAddAddress({ ...addAddress, toggle: false });
    });
  };

  const renderAddAddress = () => {
    if (addAddress.toggle) {
      return (
        <div>
          <div className="input-group bor8 m-tb-20">
            <textarea
              class="stext-111 cl2 plh3 size-110 p-t-10 p-l-10 p-r-30"
              placeholder="Your Address"
              required
              onChange={(event) => {
                setAddAddress({
                  ...addAddress,
                  address: event.target.value,
                });
              }}
            ></textarea>
          </div>
          <div className="input-group bor8 ">
            <input
              className="stext-111 cl2 plh3 size-117 p-l-10 p-r-30"
              type="text"
              name="password"
              placeholder="Your Postal Code"
              required
              onChange={(event) => {
                setAddAddress({
                  ...addAddress,
                  postal_code: event.target.value,
                });
              }}
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container m-t-70">
      <div className="row ">
        <div className="col-sm-9 col-xl-5 m-tb-70">
          <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-lr-0-xl p-lr-15-sm">
            <h4 className="mtext-109 cl2 p-b-30">User Profile</h4>

            <div className="flex-w flex-t p-b-15">
              <div className="size-208">
                <span className="stext-110 cl2">Email</span>
              </div>

              <div className="size-209">
                <span className="stext-111 cl8">{userProfile.email}</span>
              </div>
            </div>

            <div className="flex-w flex-t p-b-15">
              <div className="size-208">
                <span className="stext-110 cl2">Username</span>
              </div>

              <div className="size-209">
                <span className="stext-111 cl8">{userProfile.username}</span>
              </div>
            </div>

            <div className="flex-w flex-t p-b-15">
              <div className="size-208">
                <span className="stext-110 cl2">Phone</span>
              </div>

              <div className="size-209">
                <span className="stext-111 cl8">{userProfile.phone}</span>
              </div>
            </div>

            <div className="flex-w flex-t bor12 p-b-15">
              <div className="size-208">
                <span className="stext-110 cl2">Status</span>
              </div>

              <div className="size-209">
                <span className="stext-111 cl8">
                  {userProfile.verification ? "Verified" : "Not Verified"}
                </span>
              </div>
            </div>

            <div className="flex-w flex-t p-tb-15">
              <div className="size-208">
                <span className="stext-110 cl2">First Name</span>
              </div>

              <div className="size-209">
                <span className="stext-111 cl8">{userProfile.fisrtName}</span>
              </div>
            </div>

            <div className="flex-w flex-t p-b-15">
              <div className="size-208">
                <span className="stext-110 cl2">Last Name</span>
              </div>

              <div className="size-209">
                <span className="stext-111 cl8">{userProfile.lastName}</span>
              </div>
            </div>

            <div className="flex-w flex-t p-b-15">
              <div className="size-208">
                <span className="stext-110 cl2">Birthdate</span>
              </div>

              <div className="size-209">
                <span className="stext-111 cl8">{userProfile.birthdate}</span>
              </div>
            </div>

            <div className="flex-w flex-t p-b-15">
              <div className="size-208">
                <span className="stext-110 cl2">Gender</span>
              </div>

              <div className="size-209">
                <span className="stext-111 cl8">
                  {userProfile.gender === 1 && userProfile.gender
                    ? "Male"
                    : null}{" "}
                  {userProfile.gender === 2 && userProfile.gender
                    ? "Female"
                    : null}
                </span>
              </div>
            </div>

            <div className="flex-w flex-t bor12 p-b-13">
              <div className="size-208">
                <span className="stext-110 cl2">Email</span>
              </div>

              <div className="size-209">
                <span className="stext-111 cl8">{userProfile.email}</span>
              </div>
            </div>

            <button className="stext-101 cl2 size-115 bg8 bor13 hov-btn3 p-lr-15 m-tb-33 trans-04 pointer">
              Edit Profile
            </button>
          </div>
        </div>

        <div className="col-sm-10 col-xl-6 m-tb-70">
          <div className="bor10 p-lr-40 p-t-30 p-b-40 m-r-40 m-lr-0-xl p-lr-15-sm">
            <h4 className="mtext-109 cl2 p-b-30">User Address</h4>

            <div className="flex-w flex-t p-b-15">
              <div className="size-208">
                <span className="stext-110 cl2">Address</span>
              </div>

              <div className="size-209">
                <span className="stext-111 cl8">{renderAddress()}</span>
                <span
                  className="stext-111 cl1 pointer m-l-190"
                  onClick={(e) => {
                    setAddAddress({ ...addAddress, toggle: true });
                  }}
                >
                  Add address
                </span>

                {renderAddAddress()}
                {addAddress.toggle && (
                  <button
                    className="stext-101 cl2 size-115 bg8 bor13 hov-btn3 m-tb-33 trans-04 pointer"
                    onClick={addAddressBtn}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

import Axios from "axios";
import { useEffect, useState } from "react";
import urlAPI from "../../Supports/Constants/UrlAPI";

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [verification, setVerification] = useState();
  const [fisrtName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState();
  const [userRole, setUserRole] = useState();

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    Axios.get(`${urlAPI}/users/user-profile`, {
      headers: {
        authorization: `${token}`,
      },
    })
      .then((result) => {
        let data = result.data.data;
        setUsername(data.username);
        setEmail(data.email);
        setPhone(data.phone);
        setVerification(data.verification_status);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setUserRole(data.user_role_id);
        setBirthdate(data.birthdate);
        setGender(data.gender);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="col-sm-10 col-xl-7 m-lr-auto m-tb-70">
      <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
        <h4 className="mtext-109 cl2 p-b-30">User Profile</h4>

        <div className="flex-w flex-t p-b-15">
          <div className="size-208">
            <span className="stext-110 cl2">Email</span>
          </div>

          <div className="size-209">
            <span className="stext-111 cl8">{email}</span>
          </div>
        </div>

        <div className="flex-w flex-t p-b-15">
          <div className="size-208">
            <span className="stext-110 cl2">Username</span>
          </div>

          <div className="size-209">
            <span className="stext-111 cl8">{username}</span>
          </div>
        </div>

        <div className="flex-w flex-t p-b-15">
          <div className="size-208">
            <span className="stext-110 cl2">Phone</span>
          </div>

          <div className="size-209">
            <span className="stext-111 cl8">{phone}</span>
          </div>
        </div>

        <div className="flex-w flex-t bor12 p-b-15">
          <div className="size-208">
            <span className="stext-110 cl2">Status</span>
          </div>

          <div className="size-209">
            <span className="stext-111 cl8">
              {verification ? "Verified" : "Not Verified"}
            </span>
          </div>
        </div>

        <div className="flex-w flex-t p-tb-15">
          <div className="size-208">
            <span className="stext-110 cl2">First Name</span>
          </div>

          <div className="size-209">
            <span className="stext-111 cl8">{fisrtName}</span>
          </div>
        </div>

        <div className="flex-w flex-t p-b-15">
          <div className="size-208">
            <span className="stext-110 cl2">Last Name</span>
          </div>

          <div className="size-209">
            <span className="stext-111 cl8">{lastName}</span>
          </div>
        </div>

        <div className="flex-w flex-t p-b-15">
          <div className="size-208">
            <span className="stext-110 cl2">Birthdate</span>
          </div>

          <div className="size-209">
            <span className="stext-111 cl8">{birthdate}</span>
          </div>
        </div>

        <div className="flex-w flex-t p-b-15">
          <div className="size-208">
            <span className="stext-110 cl2">Gender</span>
          </div>

          <div className="size-209">
            <span className="stext-111 cl8">{gender}</span>
          </div>
        </div>

        <div className="flex-w flex-t bor12 p-b-13">
          <div className="size-208">
            <span className="stext-110 cl2">Email</span>
          </div>

          <div className="size-209">
            <span className="stext-111 cl8">{email}</span>
          </div>
        </div>

        <button className="stext-101 cl2 size-115 bg8 bor13 hov-btn3 p-lr-15 m-tb-33 trans-04 pointer">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;

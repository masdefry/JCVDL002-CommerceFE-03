import Axios from "axios";
import urlAPI from "../../Supports/Constants/UrlAPI";
import { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";

const Payment = () => {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState();

  const token = localStorage.getItem("userToken");

  const fileUploadHandler = (e) => {
    if (e.target.files[0]) {
      setFileName(`${new Date()}`);
      setFile(e.target.files[0]);
      let preview = document.getElementById("imgpreview");
      preview.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  const fileUploadBtn = () => {
    if (file) {
      let formData = new FormData();

      let obj = {
        proof: fileName,
        transactionId: 7,
      };

      formData.append("data", JSON.stringify(obj));
      formData.append("file", file);

      Axios.post(`${urlAPI}/upload`, formData)
        .then((result) => {
          alert("File has been uploaded");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="justify-content-center col-md-4 offset-md-4 p-tb-92">
      <h2 className="mtext-105 cl2 txt-center m-b-20 txt-center">
        Proceed to Payment
      </h2>
      <p className="m-b-40 txt-center">
        Please upload your payment proof so we could proceed with your order
      </p>
      <input
        type="file"
        className="form-control"
        onChange={fileUploadHandler}
      ></input>
      <img id="imgpreview" width="50%" className="m-t-20" alt=""></img>
      <button
        onClick={fileUploadBtn}
        className="
                  flex-c-m
                  stext-101
                  cl0
                  size-121
                  bg3
                  bor1
                  hov-btn3
                  p-lr-15
                  m-tb-40
                  trans-04
                  pointer
                "
      >
        Upload File
      </button>
    </div>
  );
};

export default Payment;

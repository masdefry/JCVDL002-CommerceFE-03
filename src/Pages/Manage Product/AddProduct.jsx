import Axios from "axios";
import { useState, useEffect } from "react";
import urlAPI from "../../Supports/Constants/UrlAPI";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  product_name: yup.string().required(),
  product_price: yup.number().required(),
  category_id: yup.number().required(),
  gender_id: yup.number().required(),
  stock: yup.number().required(),
  detail_product: yup.string().required(),
});

const AddProduct = () => {
  const [file, setFile] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fileUploadHandler = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);

      let preview = document.getElementById("imgpreview");
      preview.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  const addProductBtn = ({
    product_name,
    product_price,
    category_id,
    gender_id,
    stock,
    detail_product,
  }) => {
    Axios.post(`${urlAPI}/products`, {
      product_name,
      product_price,
      category_id,
      gender_id,
      stock,
      detail_product,
    })
      .then((result) => {
        if (file) {
          let formData = new FormData();

          let obj = {
            id_product: result.data.id_product,
          };

          formData.append("data", JSON.stringify(obj));
          formData.append("file", file);

          Axios.post(`${urlAPI}/upload/product`, formData)
            .then((result) => {
              alert("Product has been successfully added");
            })
            .catch((err) => {
              console.log(err);
            });
        }
        reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container m-t-70 ">
      <div className="row justify-content-center">
        <div className="col-9 m-tb-70">
          <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-lr-0-xl p-lr-15-sm">
            <h4 className="mtext-109 cl2 p-b-30">Add New Product</h4>

            <form onSubmit={handleSubmit(addProductBtn)}>
              <div className="flex-w flex-t p-b-15">
                <div className="size-208">
                  <span className="stext-110 cl2">Product Name</span>
                </div>

                <div className="size-209">
                  <div className="input-group bor8 ">
                    <input
                      className="stext-111 cl2 plh3 size-121 p-l-10 p-r-30"
                      type="text"
                      placeholder="Product Name"
                      name="product_name"
                      {...register("product_name")}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex-w flex-t p-b-15">
                <div className="size-208">
                  <span className="stext-110 cl2">Price</span>
                </div>

                <div className="size-209">
                  <div className="input-group bor8 ">
                    <input
                      className="stext-111 cl2 plh3 size-121 p-l-10 p-r-30"
                      type="number"
                      placeholder="Product Price"
                      name="product_price"
                      {...register("product_price")}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex-w flex-t p-b-15">
                <div className="size-208">
                  <span className="stext-110 cl2">Product Detail</span>
                </div>

                <div className="size-209">
                  <div className="input-group bor8 ">
                    <textarea
                      class="stext-111 cl2 plh3 size-110 p-t-10 p-l-10 p-r-30"
                      placeholder="Product Detail"
                      name="detail_product"
                      {...register("detail_product")}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="flex-w flex-t p-b-15">
                <div className="size-208">
                  <span className="stext-110 cl2">Category</span>
                </div>

                <div className="size-209">
                  <select
                    className="stext-111 cl2 plh3 size-121 p-t-10 p-l-10 p-r-30 input-group bor8"
                    name="category_id"
                    {...register("category_id")}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value={1}>Top</option>
                    <option value={2}>Bottom</option>
                    <option value={3}>Accessories</option>
                    <option value={4}>Shoes</option>
                  </select>
                </div>
              </div>

              <div className="flex-w flex-t p-b-15">
                <div className="size-208">
                  <span className="stext-110 cl2">Gender</span>
                </div>

                <div className="size-209">
                  <select
                    className="stext-111 cl2 plh3 size-121 p-t-10 p-l-10 p-r-30 input-group bor8"
                    name="gender_id"
                    {...register("gender_id")}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value={1}>Male</option>
                    <option value={2}>Female</option>
                  </select>
                </div>
              </div>

              <div className="flex-w flex-t p-b-15">
                <div className="size-208">
                  <span className="stext-110 cl2">Stock</span>
                </div>

                <div className="size-209">
                  <div className="input-group bor8">
                    <input
                      className="stext-111 cl2 plh3 size-121 p-l-10 p-r-30"
                      type="number"
                      placeholder="Product Stock"
                      name="stock"
                      {...register("stock")}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex-w flex-t p-b-15">
                <div className="size-208">
                  <span className="stext-110 cl2">Images</span>
                </div>

                <div className="size-209">
                  <div className="input-group">
                    <input
                      type="file"
                      className="form-control"
                      onChange={fileUploadHandler}
                      required
                    />
                  </div>
                  <img
                    id="imgpreview"
                    width="50%"
                    className="m-t-20"
                    alt=""
                  ></img>
                </div>
              </div>

              <div className="flex-w flex-r m-t-20">
                <button
                  className="flex-c-m stext-101 cl0 size-209 bg3 bor1 hov-btn3 p-tb-10 trans-04"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddProduct;

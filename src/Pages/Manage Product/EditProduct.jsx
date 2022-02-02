import Axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import urlAPI from "../../Supports/Constants/UrlAPI";

const EditProduct = () => {
  const [productData, setProductData] = useState({
    product_name: "",
    product_price: "",
    category_id: 0,
    gender_id: 0,
    stock: 0,
    detail_product: "",
  });
  const [image, setImage] = useState([]);
  const [file, setFile] = useState();

  const params = useParams();

  useEffect(() => {
    Axios.get(`${urlAPI}/products/${params.id}`)
      .then((result) => {
        setProductData(result.data.data[0]);
        setImage(result.data.image);
        console.log(productData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const inputHandler = (event) => {
    const { name, value } = event.target;

    setProductData({ ...productData, [name]: value });
  };

  const fileUploadHandler = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);

      let preview = document.getElementById("imgpreview");
      preview.src = URL.createObjectURL(e.target.files[0]);
    }
  };

  const editProductBtn = () => {
    Axios.patch(`${urlAPI}/products/${params.id}`, {
      product_name: productData.product_name,
      product_price: productData.product_price,
      category_id: productData.category_id,
      gender_id: productData.gender_id,
      stock: productData.stock,
      detail_product: productData.detail_product,
    })
      .then((result) => {
        if (file) {
          let formData = new FormData();

          let obj = {
            id_product: params.id,
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
            <h4 className="mtext-109 cl2 p-b-30">Edit Product</h4>

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
                    value={productData.product_name}
                    onChange={inputHandler}
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
                    value={productData.product_price}
                    onChange={inputHandler}
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
                    value={productData.detail_product}
                    onChange={inputHandler}
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
                  className="cl2 plh3 stext-111 size-121 p-t-10 p-l-10 p-r-30 input-group bor8"
                  name="category_id"
                  value={productData.category_id}
                  onChange={inputHandler}
                >
                  <option value={0}>Select Category</option>
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
                  className="cl2 plh3 stext-111 size-121 p-t-10 p-l-10 p-r-30 input-group bor8"
                  name="gender_id"
                  value={productData.gender_id}
                  onChange={inputHandler}
                >
                  <option value={0}>Select Gender</option>
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
                    value={productData.stock}
                    name="stock"
                    placeholder="Product Stock"
                    onChange={inputHandler}
                  />
                </div>
              </div>
            </div>

            <div className="flex-w flex-t p-b-15">
              <div className="size-208">
                <span className="stext-110 cl2">Images</span>
              </div>

              <div className="size-209">
                <div className="input-group m-b-15">
                  {image.map((image) => {
                    return (
                      <div className="how-itemcart1">
                        <img
                          src={urlAPI + "/Images/Products/" + image.image}
                          alt="IMG"
                        />
                      </div>
                    );
                  })}
                </div>
                <input
                  type="file"
                  className="form-control"
                  onChange={fileUploadHandler}
                />
                <img
                  id="imgpreview"
                  width="50%"
                  className="m-t-20"
                  alt=""
                ></img>
              </div>
            </div>
            <div className="flex-w flex-r m-t-40">
              <button
                className="flex-c-m stext-101 cl0 size-209 bg3 bor1 hov-btn3 p-tb-10 trans-04"
                onClick={editProductBtn}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditProduct;

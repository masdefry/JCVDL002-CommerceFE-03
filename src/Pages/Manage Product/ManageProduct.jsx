import Axios from "axios";
import { useState, useEffect } from "react";
import urlAPI from "../../Supports/Constants/UrlAPI";
import { FormGroup, Label, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody } from "reactstrap";

const ManageProduct = () => {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const [deleteId, setDeleteId] = useState();

  const [searchProductName, setSeacrhProductName] = useState("");
  const [filter, setFilter] = useState({
    category: "",
    gender: "",
    sortBy: "",
  });

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  let userRole = localStorage.getItem("userRole");

  const fetchProduct = () => {
    Axios.get(
      `${urlAPI}/products?page=${page}&category=${filter.category}&gender=${filter.gender}&sortBy=${filter.sortBy}&searchName=${searchProductName}`
    )
      .then((result) => {
        setProductList(result.data.data);
        setMaxPage(result.data.maxPage);
      })
      .catch((err) => {
        console.dir(err);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, [page]);

  const deleteProductBtn = (id) => {
    Axios.delete(`${urlAPI}/products/${id}`)
      .then((result) => {
        fetchProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderProductList = () => {
    return productList.map((product) => {
      return (
        <tr className="table_row">
          <td className="column-1">
            <div className="how-itemcart1">
              <img
                src={urlAPI + "/Images/Products/" + product.image}
                alt="IMG"
              />
            </div>
          </td>
          <td className="p-lr-10">{product.product_name}</td>
          <td className="p-lr-10">{product.detail_product}</td>
          <td className="p-lr-10">{product.stock}</td>
          <td className="p-lr-10">{product.product_price}</td>
          <td className="p-lr-10">
            <a
              className="stext-107 cl3 bg0 size-301 bor7 p-lr-23 p-tb-3 hov-btn3 trans-04 m-b-5"
              href={`/manage-products/${product.id}`}
            >
              Edit
            </a>
            <button
              className="stext-107 cl0 bg3 size-301 bor7 p-lr-15 hov-btn3 trans-04 m-t-5"
              onClick={() => {
                setModal(true);
                setDeleteId(product.id);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  const pageBtnHandler = (type) => {
    if (type === "previous" && page > 1) {
      setPage(page - 1);
    }
    if (type === "next" && page < maxPage) {
      setPage(page + 1);
    }
  };

  const sortList = [
    { name: "Default", value: "" },
    { name: "A to Z", value: "AtoZ" },
    { name: "Z to A", value: "ZtoA" },
    { name: "Price: Low to High", value: "lowPrice" },
    { name: "Price: High to Low", value: "highPrice" },
  ];

  const categoryList = [
    { name: "All Category", value: null },
    { name: "Top", value: 1 },
    { name: "Bottom", value: 2 },
    { name: "Accessories", value: 3 },
    { name: "Shoes", value: 4 },
  ];

  const genderList = [
    { name: "All Gender", value: null },
    { name: "Male", value: 1 },
    { name: "Female", value: 2 },
  ];

  const renderFilter = (filterName, items) => {
    return items.map((item) => {
      return (
        <FormGroup check>
          <Label
            check
            className="stext-106 cl4 trans-04 pointer"
            style={{ marginLeft: "-16px" }}
          >
            <Input
              type="radio"
              name={filterName}
              value={item.value}
              onChange={(event) => {
                setFilter({ ...filter, [filterName]: event.target.value });
              }}
            />{" "}
            {item.name}
          </Label>
        </FormGroup>
      );
    });
  };

  const searchProductBtn = () => {
    Axios.get(
      `${urlAPI}/products?page=${page}&category=${filter.category}&gender=${filter.gender}&sortBy=${filter.sortBy}&searchName=${searchProductName}`
    )
      .then((result) => {
        console.log(result.data.data);
        setPage(1);
        setProductList(result.data.data);
        setMaxPage(result.data.maxPage);
      })
      .catch((err) => {
        console.dir(err);
      });
  };

  return (
    <div className="container m-tb-80">
      <div className="row">
        {modal && (
          <Modal
            isOpen={modal}
            toggle={toggle}
            modalTransition={{ timeout: 100 }}
            centered={true}
          >
            <ModalBody>
              <p className="stext-104 cl2">
                Are you sure you want to delete this product ?
              </p>
              <div className="flex-w flex-r">
                <button
                  className="stext-107 cl0 bg3 size-301 bor7 p-lr-23 p-tb-3 hov-btn3 trans-04 m-lr-5"
                  onClick={() => {
                    deleteProductBtn(deleteId);
                    setModal(false);
                  }}
                >
                  Delete
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
        {userRole == 3 || !userRole ? (
          <div className="alert alert-danger w-50 m-auto">
            Sorry, you do not have permission to access this page
          </div>
        ) : (
          <>
            <div>
              <div className="flex-w flex-sb-m p-b-52">
                <div className="panel-filter w-full p-t-10">
                  <div className="wrap-filter flex-w bg6 w-full p-lr-40 p-t-27 p-lr-15-sm">
                    <div className="panel-search w-full p-t-10 p-b-15 m-b-20">
                      <div className="bor8 dis-flex p-l-15 ">
                        <button className="size-113 flex-c-m fs-20 cl2 m-r-10">
                          <FontAwesomeIcon icon={faSearch} />
                        </button>

                        <input
                          className="mtext-107 cl2 size-114 plh2 p-lr-20"
                          type="text"
                          placeholder="Search"
                          onChange={(e) => {
                            setSeacrhProductName(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="filter-col1 p-r-15 p-b-27">
                      <div className="mtext-102 cl2 p-b-15">Sort By</div>
                      <FormGroup type="fieldset">
                        {renderFilter("sortBy", sortList)}
                      </FormGroup>
                    </div>

                    <div className="filter-col1 p-r-15 p-b-27">
                      <div className="mtext-102 cl2 p-b-15">Category</div>
                      <FormGroup type="fieldset">
                        {renderFilter("category", categoryList)}
                      </FormGroup>
                    </div>

                    <div className="filter-col1 p-r-15 p-b-27">
                      <div className="mtext-102 cl2 p-b-15">Gender</div>
                      <FormGroup type="fieldset">
                        {renderFilter("gender", genderList)}
                      </FormGroup>
                    </div>
                    <button
                      className="flex-c-m stext-101 cl0 size-103 bg3 bor1 hov-btn3 p-lr-15 trans-04"
                      onClick={searchProductBtn}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <div className="m-b-50">
                <div className="m-lr-0-xl bor10">
                  <div className="d-flex justify-content-between">
                    <h4 className="mtext-109 cl2 p-lr-40 p-tb-30">
                      Manage Products
                    </h4>
                    <a
                      href="/add-product"
                      className="flex-c-m stext-101 cl0 size-103 m-tb-20 m-r-40 bg3 bor1 hov-btn3 trans-04"
                    >
                      Add New Product
                    </a>
                  </div>

                  <div className="wrap-table-shopping-cart">
                    <table className="table-shopping-cart">
                      <tr className="table_head">
                        <th className="text-center ">Image</th>

                        <th className="text-center ">Product Name</th>
                        <th className="text-center ">Description</th>
                        <th className="text-center ">Stock</th>
                        <th className="text-center ">Price</th>
                        <th className="text-center ">Action</th>
                      </tr>
                      {renderProductList()}
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex-c-m flex-w flex-w w-full p-t-10 m-lr-7">
              <button
                className="flex-c-m how-pagination1 trans-04 m-all-30 bg2 bor1 hov-btn1 active-pagination1"
                onClick={() => {
                  pageBtnHandler("previous");
                }}
              >
                {"<"}
              </button>
              <span className="stext-101 cl5">
                Page {page} of {maxPage}
              </span>
              <button
                className="flex-c-m how-pagination1 trans-04 m-all-30 bg2 bor1 hov-btn1 active-pagination1"
                onClick={() => {
                  pageBtnHandler("next");
                }}
              >
                {">"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageProduct;

import Axios from "axios";
import urlAPI from "../../Supports/Constants/UrlAPI";
import { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "../../Components/ProductCard";

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const [searchProductName, setSeacrhProductName] = useState("");
  const [filter, setFilter] = useState({
    category: "",
    gender: "",
    sortBy: "",
  });

  useEffect(() => {
    Axios.get(
      `${urlAPI}/products?page=${page}&category=${filter.category}&gender=${filter.gender}&sortBy=${filter.sortBy}&searchName=${searchProductName}`
    )
      .then((result) => {
        console.log(result.data.data);
        setProductList(result.data.data);
        setMaxPage(result.data.maxPage);
      })
      .catch((err) => {
        console.dir(err);
      });
  }, [page, filter, searchProductName]);

  const renderProductList = () => {
    if (productList) {
      return productList.map((data) => {
        return (
          <ProductCard
            id={data.id}
            name={data.product_name}
            price={data.product_price}
            image={data.image}
          />
        );
      });
    }
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

  return (
    <div className="bg0 m-t-23 p-b-140">
      <div className="container">
        <div className="flex-w flex-sb-m p-b-52">
          <div className="panel-filter w-full p-t-10">
            <Form>
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
              </div>
            </Form>
          </div>
        </div>

        <div className="row isotope-grid">{renderProductList()}</div>

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
      </div>
    </div>
  );
};

export default ProductList;

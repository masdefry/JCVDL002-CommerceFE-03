import Axios from "axios";
import urlAPI from "../../Supports/Constants/UrlAPI";
import { useState, useEffect } from "react";
import img1 from "../../Supports/Images/slide-01.jpg";
import img2 from "../../Supports/Images/banner-01.jpg";
import img3 from "../../Supports/Images/banner-02.jpg";
import img4 from "../../Supports/Images/banner-03.jpg";
import ProductCard from "../../Components/ProductCard";

const Home = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    Axios.get(`${urlAPI}/products?page=1&category=&gender=&sortBy=&searchName=`)
      .then((result) => {
        setProductList(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  return (
    <div>
      <section className="section-slide">
        <div className="wrap-slick1">
          <div className="slick1">
            <div
              className="item-slick1"
              style={{ backgroundImage: `url(${img1})` }}
            >
              <div className="container h-full">
                <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                  <div className="layer-slick1">
                    <span className="ltext-101 cl2 respon2">
                      Women Collection
                    </span>
                  </div>

                  <div className="layer-slick1">
                    <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                      NEW SEASON
                    </h2>
                  </div>

                  <div className="layer-slick1">
                    <a
                      href="/products"
                      className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sec-banner bg0 p-t-80 p-b-50">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              <div className="block1 wrap-pic-w">
                <img src={img2} alt="IMG-BANNER" />

                <p
                  href="/"
                  className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3 pointer"
                >
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8">
                      Women
                    </span>

                    <span className="block1-info stext-102 trans-04">
                      Spring
                    </span>
                  </div>

                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      Shop Now
                    </div>
                  </div>
                </p>
              </div>
            </div>

            <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              <div className="block1 wrap-pic-w">
                <img src={img3} alt="IMG-BANNER" />

                <p
                  href="/"
                  className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3 pointer"
                >
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8">
                      Men
                    </span>

                    <span className="block1-info stext-102 trans-04">
                      Spring
                    </span>
                  </div>

                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      Shop Now
                    </div>
                  </div>
                </p>
              </div>
            </div>

            <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              <div className="block1 wrap-pic-w">
                <img src={img4} alt="IMG-BANNER" />

                <p
                  href="/"
                  className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3 pointer"
                >
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8">
                      Accessories
                    </span>

                    <span className="block1-info stext-102 trans-04">
                      New Trend
                    </span>
                  </div>

                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      Shop Now
                    </div>
                  </div>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="bg0 p-t-23 p-b-140">
        <div className="container">
          <div className="p-b-62">
            <h3 className="ltext-103 cl5">Product Overview</h3>
          </div>

          <div className="row isotope-grid ">{renderProductList()}</div>
        </div>
        <div class="flex-c-m flex-w w-full p-t-45">
          <a
            href="/products"
            class="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04"
          >
            Show More
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import TablePagination from "@mui/material/TablePagination";
import { BsCardList, BsCartFill, BsFillBarChartFill } from "react-icons/bs";
import axios from "axios";
import { IMAGE_URL } from "../Data/DataList";
import ShowImageCart from "./ShowImageCart";
import swal from "sweetalert";
import AddProductsL3 from "./AddProductsL3";
import UpperHeader from "../../Components/UpperHeader";
import Loader from "../../Components/Loader";
import { INDENT_HOST_URL } from "../../HostManager/UrlManager";
import Modal from "../Common/Modal";

const CategoryTypeL3 = () => {
  const storeCode = sessionStorage.getItem("store_code");
  const YourCart = sessionStorage.getItem("your-cart");
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [page, setPage] = useState(0);
  const [singleProductsDetails, setSingleProductsDetails] = useState({});
  const [searchItemCode, setSearchItemCode] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const categoryType = sessionStorage.getItem("categoryType");
  const category = sessionStorage.getItem("category");

  useEffect(() => {
    const productDataBySearch = productsData.filter(
      (data) => data.itemcode === searchItemCode
    );
    setProductsData(productDataBySearch);
  }, [searchItemCode]);

  const GetDataByCategoryType = () => {
    setLoading(true);
    axios
      .get(
        `${INDENT_HOST_URL}/INDENT/express/category/list/homepage/${storeCode}/${categoryType}/${category}`
      )
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setProductsData(response.data.value);
        } else if (response.data.code === "1001") {
          alert("Sorry Data Not Found");
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (categoryType && category) {
      GetDataByCategoryType();
    }
  }, [storeCode, categoryType, category]);

  const GetCateogyWiseProducts = () => {
    setLoading(true);
    axios
      .get(
        `${INDENT_HOST_URL}/INDENT/express/category/list/homepage/${storeCode}/${categoryType}/${category}`
      )
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setProductsData(response.data.value);
        } else if (response.data.code === "1001") {
          alert("Sorry Data Not Found", "danger");
        }
        setLoading(false);
      })
      .catch((error) => setLoading(false));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const GetProductsDetails = (Details) => {
    const GetProductsDetails = {
      storeCode: storeCode,
      collection: "ALL",
      consumerBase: "ALL",
      group: "ALL",
      category: "ALL",
      itemCode: Details.itemCode,
    };
    axios
      .post(
        `${INDENT_HOST_URL}/INDENT/express/get/product/details`,
        GetProductsDetails
      )
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setSingleProductsDetails(response.data.value);
        } else if (response.data.code === "1001") {
          alert(response.data.value);
        } else if (response.data.code === "1003") {
          swal({
            title: "Warning!",
            text: "Sorry! Already Indented",
            icon: "warning",
            buttons: "OK",
          });
        }
      })
      .catch((error) => {});
  };

  return (
    <div>
      {loading === true && <Loader />}
      <UpperHeader />
      <div className="ComponentL3LowerHeader">
        <div className="d-flex">
          <Link to="/NpimPortal/Indent-express/L3/digital/home">
            <button type="button" className="btn btn-dark btn-sm">
              BACK
            </button>
          </Link>
          <Tippy content="Status Report">
            <Link to="/NpimPortal/Indent-express/L3/status/reports">
              <BsFillBarChartFill size={28} className="mx-2 text-dark" />
            </Link>
          </Tippy>
        </div>
        <div className="d-flex">
          <Tippy content="Cancel Item List">
            <Link to="/NpimPortal/Indent-express/L3/cancel/item/list">
              <BsCardList size={25} className="mt-2 mx-2 text-dark" />
            </Link>
          </Tippy>
          <Link
            to="/NpimPortal/Indent-express/L3/your/cart/reports"
            className="notification"
          >
            <BsCartFill size={25} className="mt-2 mx-2 text-dark" />
            <span className="badge">{YourCart}</span>
          </Link>
        </div>
      </div>

      <div className="row g-2 mx-2 mt-4 text-center">
        <div className="col-md-4">
          <input
            type="text"
            className="GInput"
            placeholder="Search by Item Code"
            onChange={(e) => setSearchItemCode(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <b className="mx-2 text-danger">
            {productsData.length <= 0 ? "DATA NOT FOUND" : ""}
          </b>
        </div>
        <div className="col-md-6 text-center">
          <b>{categoryType.toUpperCase()}-</b>
          <b className="mx-2">{category}</b>
        </div>
      </div>

      {/* <---------------CART DATA DETAILS =----------------------->*/}
      {productsData.length > 0 && (
        <div className="row mx-0">
          {productsData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((productsDetails, i) => {
              const { itemCode } = productsDetails;
              const imageCode = !itemCode ? "" : itemCode.substring(2, 9);
              const imageURL = `${IMAGE_URL}${imageCode}`;
              return (
                <div key={i} className="col-md-3 mt-5">
                  <div className="cardStyle">
                    <ShowImageCart imageURL={imageURL} />
                    <div className="cardBodyStyle">
                      <div className="innerBodyStyle">
                        <b>{itemCode}</b>
                        <BsCartFill
                          size={20}
                          onClick={() => {
                            GetProductsDetails(productsDetails);
                            setOpenModal(true);
                          }}
                          className="trolleyStyle"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          <div className="d-flex justify-content-end my-2 w-100">
            <TablePagination
              rowsPerPageOptions={[12, 24, 36, productsData.length]}
              component="div"
              count={productsData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      )}
      <div className="my-4 mx-3">
        {productsData.length <= 0 && (
          <button onClick={GetCateogyWiseProducts} className="SButton">
            HOME
          </button>
        )}
      </div>
      {openModal && (
        <Modal
          close={() => setOpenModal(false)}
          open={() => setOpenModal(true)}
          singleProductsDetails={singleProductsDetails}
          CatTypeData={GetDataByCategoryType}
        />
      )}
    </div>
  );
};

export default CategoryTypeL3;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import TablePagination from "@mui/material/TablePagination";
import Tippy from "@tippyjs/react";
import "../Style/ComponentL3.css";
import { BsCardList, BsCartFill, BsFillBarChartFill, BsFillHouseDoorFill } from "react-icons/bs";
import ShowImageCart from "./ShowImageCart";
import { Link, useNavigate } from "react-router-dom";
import { IMAGE_URL, ItemWiseReportsDropdown } from "../Data/DataList";
import { Select } from "antd";
import UpperHeader from "../../Components/UpperHeader";
import { INDENT_HOST_URL } from "../../HostManager/UrlManager";
import Loader from "../../Components/Loader";
import Modal from "../Common/Modal";

const DigitalL3 = () => {
  const navigate = useNavigate();
  const storeCode = sessionStorage.getItem("store_code");
  const YourCart = sessionStorage.getItem("your-cart");
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [singleProductsDetails, setSingleProductsDetails] = useState({});
  const [searchItemCode, setSearchItemCode] = useState("");
  const [CategoryDropwond, setCategoryDropwond] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const productDataBySearch = productsData.filter((data) => data.itemcode === searchItemCode);
    setProductsData(productDataBySearch);
  }, [searchItemCode]);

  const GetCateogyDropdown = (categoryType) => {
    sessionStorage.setItem("categoryType", categoryType);
    setLoading(true);
    axios.get(`${INDENT_HOST_URL}/INDENT/express/store/category/list/${storeCode}/${categoryType}`)
      .then((res) => res).then((response) => {
        if (response.data.code === "1000") {
          setCategoryDropwond(response.data.value);
        } else if (response.data.code === "1001") {
          setCategoryDropwond([]);
        }
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
      });
  };

  const GetCateogyWiseData = (category) => {
    sessionStorage.setItem("category", category);
    navigate(`/NpimPortal/Indent-express/L3/digital/${category}`);
  };

  const GetItemCodeList = () => {
    setLoading(true);
    axios.get(`${INDENT_HOST_URL}/INDENT/express/get/itemcode/list`)
      .then((res) => res).then((response) => {
        if (response.data.code === "1000") {
          setProductsData(response.data.value);
        } else if (response.data.code === "1001") {
          alert("Sorry Data Not Found");
        }
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
      });
  }
  useEffect(() => {
    GetItemCodeList();
  }, [storeCode]);

  const SearchProductByItemCode = () => {
    setLoading(true);
    axios.get(`${INDENT_HOST_URL}/INDENT/express/get/itemcode/list`)
      .then((res) => res).then((response) => {
        if (response.data.code === "1000") {
          setProductsData(response.data.value);
        } else if (response.data.code === "1001") {
          alert("Sorry Data Not Found");
        }
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
    axios.post(`${INDENT_HOST_URL}/INDENT/express/get/product/details`, GetProductsDetails)
      .then((res) => res).then((response) => {
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
      }).catch((error) => { });
  };

  return (
    <React.Fragment>
      {loading === true && <Loader />}
      <UpperHeader />
      <div className="ComponentL3LowerHeader">
        <div className="d-flex">
          <Tippy content="Home">
            <Link to="/NpimPortal/Indent-express/direction/home">
              <BsFillHouseDoorFill size={25} className="mt-2 text-dark" />
            </Link>
          </Tippy>
          <Tippy content="Status Report">
            <Link to="/NpimPortal/Indent-express/L3/status/reports">
              <BsFillBarChartFill size={25} className="mt-2 mx-2 text-dark" />
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
      <div className="row g-2 mx-2 mt-4">
        <div className="col-md-3">
          <input
            type="text"
            className="GInput"
            placeholder="Search by Item Code"
            onChange={(e) => setSearchItemCode(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <b className="mx-2 text-danger">
            {productsData.length < 0 && "DATA NOT FOUND"}
          </b>
        </div>
        <div className="col-md-3">
          <Select
            className="w-100"
            placeholder="Select Parameter Type"
            onChange={GetCateogyDropdown}
          >
            {ItemWiseReportsDropdown.map((item, i) => {
              return (
                <Select.Option key={i} value={item.value}>
                  {item.label}
                </Select.Option>
              );
            })}
          </Select>
        </div>
        <div className="col-md-3">
          <Select
            className="w-100"
            placeholder="Select Value"
            onChange={GetCateogyWiseData}
          >
            {CategoryDropwond.map((item, i) => {
              return (
                <Select.Option key={i} value={item}>
                  {item}
                </Select.Option>
              );
            })}
          </Select>
        </div>
      </div>
      {productsData.length > 0 && (
        <div className="row mx-0">
          {productsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                            GetProductsDetails(productsDetails)
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
          <button onClick={SearchProductByItemCode} className="SButton">
            HOME
          </button>
        )}
      </div>
      {openModal && <Modal close={() => setOpenModal(false)} open={() => setOpenModal(true)}
        singleProductsDetails={singleProductsDetails}
        CatTypeData={GetItemCodeList}
      />}
    </React.Fragment>
  );
};

export default DigitalL3;

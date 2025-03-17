import React, { useEffect, useState } from "react";
import UpperHeader from "./UpperHeader";
import DropdownFieldDigital from "./DropdownFieldDigital";
import { AppBar, Drawer, Toolbar } from "@material-ui/core";
import "../Style/CssStyle/ScalePagination.css";
import { useStyles } from "../Style/LowerHeader";
import { BsCardList, BsCart3 } from "react-icons/bs";
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineBarChart } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import StatusTabular from "./StatusTabular";
import { imageUrl } from "../DataCenter/DataList";
import deImgUrl from "../images/Loading_icon.gif";
import Loader from "./Loader";
import {
  APIGetCollCatListL3,
  APIGetDropdownCategory,
  APIGetDropdownList,
  APIGetStatuL3,
} from "../HostManager/CommonApiCallL3";
import { toast } from "react-toastify";

export const ProductCartL3 = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { storeCode, rsoName } = useParams();
  const [imgLoad, setImgLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const loginData = JSON.parse(sessionStorage.getItem("loginData"));
  const [currentPage, setCurrentPage] = useState(1);
  const collval = sessionStorage.getItem("collal");
  const catVal = sessionStorage.getItem("catVal");
  const [statusData, setStatusData] = useState({
    col: [],
    row: [],
  });
  const [statusCloserOpener, setStatusCloserOpener] = useState(false);
  const [collectionList, setCollectionList] = useState([]);
  const [cateogryList, setCateogryList] = useState([]);
  const [collectionValue, setCollectionValue] = useState(
    sessionStorage.getItem("collVal") || "ALL"
  );
  const [categoryValue, setCategoryValue] = useState(
    sessionStorage.getItem("catVal") || "ALL"
  );
  const [cartDataList, setCartDataList] = useState([]);
  const GetStatusReport = (storeCode) => {
    setLoading(true);
    APIGetStatuL3(`/NPIML3/npim/get/status/L3/${storeCode}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setStatusData({
            col: response.data.coloum,
            row: response.data.value,
          });
        }
        setLoading(false);
      })
      .catch((error) => setLoading(false));
  };

  useEffect(() => {
    GetStatusReport(storeCode);
  }, [storeCode]);

  const ReportsRouting = () => {
    if (loginData.role === "L1" || loginData.role === "L2") {
      navigate(`/NpimPortal/reportL1andL2/${storeCode}/${rsoName}`);
    } else if (loginData.role === "L3") {
      navigate(`/NpimPortal/reportL3/${storeCode}/${rsoName}`);
    }
  };

  useEffect(() => {
    setLoading(true);
    APIGetDropdownList(`/NPIM/base/npim/dropdown/ALL/ALL/ALL/ALL`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setCollectionList(response.data.value);
        }
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  }, []);

  useEffect(() => {
    if (collectionValue || collval) {
      const collectionVal = collectionValue ? collectionValue : collval;
      setLoading(true);
      APIGetDropdownCategory(
        `/NPIM/base/npim/dropdown/${collectionVal}/1/1/ALL`
      )
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setCateogryList(response.data.value);
          }
          setLoading(false);
        })
        .catch((err) => setLoading(false));
    }
  }, [collectionValue, collval]);

  const GetCartDetails = (storeCode) => {
    setLoading(true);
    APIGetCollCatListL3(
      `/NPIML3/item/list/dnpim/?storecode=${storeCode}&collection=${collectionValue}&category=${categoryValue}`
    )
      .then((res) => res)
      .then((response) => {
        if (response.data.Code === "1000") {
          setCartDataList(response.data.value);
        } else if (response.data.Code === "1001") {
          setCartDataList([]);
        }
        setLoading(false);
      })
      .catch((error) => setLoading(false));
  };

  useEffect(() => {
    if ((collectionValue || collval) && (categoryValue || catVal)) {
      GetCartDetails(storeCode);
    }
  }, [collectionValue, categoryValue, catVal, collval]);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(cartDataList.length / itemsPerPage);
  // Get current page data
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = cartDataList.slice(startIdx, startIdx + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <React.Fragment>
      {loading === true && <Loader />}
      <UpperHeader />
      <Drawer
        anchor="top"
        open={statusCloserOpener}
        onClick={() => setStatusCloserOpener(!statusCloserOpener)}
      >
        <StatusTabular statusData={statusData} />
      </Drawer>
      <AppBar
        position="static"
        color="transparent"
        className={classes.lowerHeader}
      >
        <Toolbar>
          <div className="d-flex justify-content-between w-100">
            <div className="dropDownStyle">
              <div className="row">
                <div className="col">
                  <DropdownFieldDigital
                    name="collection"
                    value={collectionValue ? collectionValue : collval}
                    labelName="Collection"
                    bigSmall={true}
                    dropList={collectionList}
                    myChangeHandler={(e) => {
                      setCollectionValue(e.target.value);
                      sessionStorage.setItem("collVal", e.target.value);
                      setImgLoad(true);
                    }}
                  />
                </div>
                <div className="col">
                  <DropdownFieldDigital
                    name="consumerBase"
                    value={categoryValue ? categoryValue : catVal}
                    labelName="Category"
                    bigSmall={true}
                    dropList={cateogryList}
                    myChangeHandler={(e) => {
                      setCategoryValue(e.target.value);
                      sessionStorage.setItem("catVal", e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex">
              {loginData.role === "L3" && (
                <div
                  className="IconsStyle"
                  onClick={() =>
                    navigate(
                      `/NpimPortal/added/cart/products/${loginData.userID}/${rsoName}`
                    )
                  }
                >
                  <BsCart3 size={23} />
                  <b>Cart</b>
                </div>
              )}
              {loginData.role === "L3" && (
                <div
                  className="IconsStyle"
                  onClick={() =>
                    navigate(
                      `/NpimPortal/get/products/home/${storeCode}/${rsoName}`
                    )
                  }
                >
                  <BiHomeAlt size={23} />
                  <b>Home</b>
                </div>
              )}
              <div
                className="IconsStyle"
                onClick={() => setStatusCloserOpener(!statusCloserOpener)}
              >
                <AiOutlineBarChart size={23} />
                <b>Status</b>
              </div>
              {loginData.role === "L3" && (
                <div
                  className="IconsStyle"
                  onClick={() =>
                    navigate(`/NpimPortal/wishlist/${storeCode}/${rsoName}`)
                  }
                >
                  <AiOutlineHeart size={23} />
                  <b>Wishlist</b>
                </div>
              )}
              <div className="IconsStyle" onClick={ReportsRouting}>
                <BsCardList size={23} />
                <b>Reports</b>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {cartDataList.length > 0 ? (
        <div className="row g-4 mx-3 my-4">
          {currentData.map((item, i) => {
            const imageCode = item.substring(2, 9);
            const imgUrl = `${imageUrl}${imageCode}.jpg`;
            return (
              <div key={i} className="col-md-3">
                <div className="card" style={{ border: "1.8px solid gray" }}>
                  <img
                    src={imgLoad === true ? deImgUrl : imgUrl}
                    onLoad={() => setImgLoad(false)}
                    alt={item}
                    height="240"
                  />
                  <div
                    className="d-flex justify-content-between p-3"
                    style={{ backgroundColor: "#832729", color: "#fff" }}
                  >
                    <b>{item}</b>
                    <b
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        sessionStorage.setItem("CartItemCode", item);
                        navigate(
                          `/NpimPortal/indentL3Digital/${storeCode}/${rsoName}`
                        );
                      }}
                    >
                      View More
                    </b>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="paginationContainer">
            <button
              className="navButton"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Pre
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pageButton ${page === currentPage ? "active" : ""}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="navButton"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p />
      )}
    </React.Fragment>
  );
};

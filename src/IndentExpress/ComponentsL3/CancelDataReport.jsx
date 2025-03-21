import React, { useState, useEffect } from "react";
import { BsCartFill, BsCardList, BsFillBarChartFill, BsFillHouseDoorFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import Tippy from "@tippyjs/react";
import "../Style/YourCard.css";
import CancelTableList from "./CancelTableList";
import { INDENT_HOST_URL } from "../../HostManager/UrlManager";
import UpperHeader from "../../Components/UpperHeader";
import Loader from "../../Components/Loader";

const CancelDataReport = () => {
  const storeCode = sessionStorage.getItem("store_code");
  const YourCart = sessionStorage.getItem("your-cart");
  const [cols, setCol] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${INDENT_HOST_URL}/INDENTL3/express/get/item/cancel/list/${storeCode}`)
      .then((res) => res).then((response) => {
        if (response.data.code === "1000") {
          setCol(response.data.coloum);
          setRows(response.data.value);
        }
        setLoading(false);
      }).catch((error) => setLoading(false));
  }, [storeCode]);

  return (
    <React.Fragment>
      {loading === true && <Loader />}
      <UpperHeader />
      <div className="ComponentL3LowerHeader">
        <div className="d-flex mx-2 w-100">
          <Tippy content="Home">
            <Link to="/NpimPortal/Indent-express/direction/home">
              <BsFillHouseDoorFill size={25} className="mt-2 text-dark" />
            </Link>
          </Tippy>
          <Tippy content="Status Report">
            <Link to="/NpimPortal/Indent-express/L3/status/reports">
              <BsFillBarChartFill size={25} className="mt-2 mx-3 text-dark" />
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
      {rows.length > 0 && (
        <div className="mx-2 my-3">
          <CancelTableList col={cols} rows={rows} />
        </div>
      )}
    </React.Fragment>
  );
};

export default CancelDataReport;

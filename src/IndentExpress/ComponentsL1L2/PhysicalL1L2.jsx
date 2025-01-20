import React, { useState } from "react";
import "../Style/FeedbackFormL1L2.css";
import { Link } from "react-router-dom";
import {
  BsSearch,
  BsFillHouseDoorFill,
  BsFillBarChartFill,
  BsFillFileEarmarkPostFill,
} from "react-icons/bs";
import axios from "axios";
import Tippy from "@tippyjs/react";
import swal from "sweetalert";
import { Select } from "antd";
import LoadingGif from "../../images/Loading_icon.gif";
import { FormControlLabel, Switch } from "@material-ui/core";
import { IMAGE_URL, NoReasonOption } from "../Data/DataList";
import UpperHeader from "../../Components/UpperHeader";
import { INDENT_HOST_URL } from "../../HostManager/UrlManager";
import Loader from "../../Components/Loader";

const PhysicalL1L2 = () => {
  const storeCode = sessionStorage.getItem("store_code");
  const [searchItemCode, setSearchItemCode] = useState("");
  const [productsDetails, setProductsDetails] = useState({});
  const [switchData, setSwitchData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [quality_Reasons, setQuality_Reasons] = useState([]);

  const GetProductsDetails = () => {
    setLoading(true);
    if (searchItemCode) {
      setLoading(true);
      const SearchByItemCoe = {
        storeCode: storeCode,
        collection: "ALL",
        consumerBase: "ALL",
        group: "ALL",
        category: "ALL",
        itemCode: searchItemCode,
      };
      axios.post(`${INDENT_HOST_URL}/INDENT/express/get/product/details`, SearchByItemCoe)
        .then((res) => res).then((response) => {
          if (response.data.code === "1000") {
            setProductsDetails(response.data.value);
          } else if (response.data.code === "1001") {
            swal({
              title: "Data Not Found",
              text: response.data.value,
              icon: "error",
              buttons: "OK",
            });
          }
          if (response.data.code === "1003") {
            swal({
              title: "Already Indented",
              text: response.data.value,
              icon: "warning",
              buttons: "OK",
            });
          }
          setSearchItemCode("");
          setLoading(false);
        }).catch((error) => setLoading(false));
    } else {
      alert("Please Enter Item Code");
    }
  };

  const imageCode = !productsDetails.itemCode ? "" : productsDetails.itemCode.substring(2, 9);
  const imageURL = `${IMAGE_URL}${imageCode}.jpg`;

  const getTrueFalse = () => {
    if (switchData) {
      setSwitchData(false);
    } else {
      setSwitchData(true);
    }
  };

  const SubmitProductDetails = () => {
    if (!switchData && quality_Reasons.length === 0) {
      swal("Please Select For No Reason");
    } else {
      setLoadingSubmit(true);
      const getProductInputData = {
        id: productsDetails.id,
        strCode: storeCode,
        consumerBase: productsDetails.consumerBase,
        collection: productsDetails.collection,
        itGroup: productsDetails.itGroup,
        category: productsDetails.category,
        itemCode: productsDetails.itemCode,
        catPB: productsDetails.catPB,
        stdWt: productsDetails.stdWt,
        stdUCP: productsDetails.stdUCP,
        activity: productsDetails.activity,
        complexity: productsDetails.complexity,
        si2Gh: productsDetails.si2Gh,
        vsGh: productsDetails.vsGh,
        vvs1: productsDetails.vvs1,
        i2Gh: productsDetails.i2Gh,
        si2Ij: productsDetails.si2Ij,
        shape: productsDetails.shape,
        gender: productsDetails.gender,
        videoLink: productsDetails.videoLink,
        childNodesN: productsDetails.childNodesN,
        childNodesE: productsDetails.childNodesE,
        region: productsDetails.region,
        diamondWt: productsDetails.diamondWt,
        colourWt: productsDetails.colourWt,
        metalWt: productsDetails.metalWt,
        findings: productsDetails.findings,
        metalColor: productsDetails.metalColor,
        parentItemCode: productsDetails.parentItemCode,
        itemLevelType: productsDetails.itemLevelType,
        childNodeV: productsDetails.childNodeV,
        childNodeK: productsDetails.childNodeK,
        childNodeH: productsDetails.childNodeH,
        karatageRange: productsDetails.karatageRange,
        childNodeF: productsDetails.childNodeF,
        childNodeO: productsDetails.childNodeO,
        npimEventNo: productsDetails.npimEventNo,
        rsoName: productsDetails.rsoName,
        doe: productsDetails.doe,
        saleable: switchData ? "YES" : "NO",
        size: productsDetails.size,
        uom: productsDetails.uom,
        reasons: quality_Reasons.toString(),
        indQty: productsDetails.indQty,
        indCategory: productsDetails.indCategory,
        submitStatus: productsDetails.submitStatus,
        set2Type: productsDetails.set2Type,
        stoneQuality: productsDetails.stoneQuality,
        stoneQualityVal: productsDetails.stoneQualityVal,
        scannedCount: productsDetails.scannedCount,
        unscannedCount: productsDetails.unscannedCount,
        adVariant: productsDetails.adVariant,
        stdWtN: productsDetails.stdWtN,
        stdUcpN: productsDetails.stdUcpN,
        stdWtE: productsDetails.stdWtE,
        stdUcpE: productsDetails.stdUcpE,
        stdWtV: productsDetails.stdWtV,
        stdUcpV: productsDetails.stdUcpV,
        stdWtK: productsDetails.stdWtK,
        stdUcpK: productsDetails.stdUcpK,
        stdWtH: productsDetails.stdWtH,
        stdUcpH: productsDetails.stdUcpH,
        stdWtO: productsDetails.stdWtO,
        stdUcpO: productsDetails.stdUcpO,
        stdWtF: productsDetails.stdWtF,
        stdUcpF: productsDetails.stdUcpF,
        btqCount: productsDetails.btqCount,
        quality_Rating: productsDetails.quality_Rating,
        quality_Reasons: productsDetails.quality_Reasons,
        indentLevelType: productsDetails.indentLevelType,
      };

      axios.post(`${INDENT_HOST_URL}/INDENT/express/insert/responses`, getProductInputData)
        .then((res) => res).then((response) => {
          if (response.data.code === "1000") {
            setQuality_Reasons([]);
            swal({
              title: "Success",
              text: "Your Data Has been Saved Successfully",
              icon: "success",
              buttons: "OK",
            });
            if (switchData === false) {
              setSwitchData(true);
            } else {
              setSwitchData(true);
            }
            setProductsDetails("");
          }
          if (response.data.code === "1001") {
            alert("Your Data Has been Saved Successfully");
            swal({
              title: "Warning",
              text: "Selected Category Data Not Found",
              icon: "warning",
              buttons: "OK",
            });
            setProductsDetails("");
          }
          setLoadingSubmit(false);
        })
        .catch((error) => {
          setQuality_Reasons([]);
          setLoadingSubmit(false);
        });
    }
  };
  return (
    <React.Fragment>
      <UpperHeader />
      {loading === true && <Loader />}
      <div className="DropDownFormStyle">
        <div className="row mx-2 w-100">
          <div className="d-flex">
            <Tippy content="Home">
              <Link to="/NpimPortal/Indent-express/direction/home">
                <BsFillHouseDoorFill size={25} className="my-2 text-dark" />
              </Link>
            </Tippy>
            <Tippy content="Report">
              <Link to="/NpimPortal/Indent-express/L1/L2/products/reports">
                <BsFillFileEarmarkPostFill
                  size={25}
                  className="my-2 text-dark mx-3"
                />
              </Link>
            </Tippy>
            <Tippy content="Status Report">
              <Link to="/NpimPortal/Indent-express/L1/L2/status/reports">
                <BsFillBarChartFill size={25} className="my-2 text-dark" />
              </Link>
            </Tippy>
            <div className="d-flex mx-3">
              <input
                type="text"
                value={searchItemCode}
                className="SearchInput"
                placeholder="Search by Item Code"
                onChange={(e) => setSearchItemCode(e.target.value)}
              />
              <BsSearch
                size={23}
                className="my-2 mx-3"
                style={{ cursor: "pointer" }}
                onClick={GetProductsDetails}
              />
            </div>
          </div>
        </div>
      </div>
      {/* PHYSICAL PAGE */}
      {productsDetails.itemCode ? (
        <div className="row row-cols-1 row-cols-md-2 mx-0 my-3">
          <div className="col">
            {imageCode === "" ? (
              <img
                src={LoadingGif}
                className="w-100 img-thumbnail catalogImage"
                alt="No_Image"
              />
            ) : (
              <img
                src={imageURL}
                className="w-100 img-thumbnail catalogImage"
                alt="No_Image"
              />
            )}
          </div>
          <div className="col">
            <div className="card-body">
              <h5
                className="text-center p-1 itemCodeText"
                style={{ backgroundColor: "#832729" }}
              >
                {productsDetails.itemCode}
              </h5>
              <div className="row my-3">
                <div className="col-md-7">
                  <div>
                    <h6 className="text-center my-2">
                      <b>PRODUCT DETAILS</b>
                    </h6>
                    <br />
                    <table className="w-100">
                      <tbody className="productsDetailsStyle">
                        <tr>
                          <th>COLLECTION</th>
                          <td>- &nbsp;&nbsp;</td>
                          <td>{productsDetails.collection}</td>
                        </tr>
                        <tr>
                          <th>NEED STATE</th>
                          <td>-</td>
                          <td>{productsDetails.consumerBase}</td>
                        </tr>
                        <tr>
                          <th>GROUP</th>
                          <td>-</td>
                          <td>{productsDetails.itGroup}</td>
                        </tr>
                        <tr>
                          <th>CATEGORY</th>
                          <td>-</td>
                          <td>{productsDetails.category}</td>
                        </tr>
                        <tr>
                          <th>GENDER</th>
                          <td>-</td>
                          <td>{productsDetails.gender}</td>
                        </tr>
                        <tr>
                          <th>COMPLEXITY</th>
                          <td>-</td>
                          <td>{productsDetails.complexity}</td>
                        </tr>
                        <tr>
                          <th>STD WT</th>
                          <td>-</td>
                          <td>{productsDetails.stdWt}</td>
                        </tr>
                        <tr>
                          <th>STD UCP</th>
                          <td>-</td>
                          <td>{productsDetails.stdUCP}</td>
                        </tr>
                        <tr>
                          <th>METAL COLOR</th>
                          <td>-</td>
                          <td>{productsDetails.metalColor}</td>
                        </tr>
                        <tr>
                          <th>FINDING</th>
                          <td>-</td>
                          <td>{productsDetails.findings}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-md-5">
                  <h6 className="text-center my-2 feedBackText">
                    <b>FEEDBACK</b>
                  </h6>
                  <br />
                  <div className="d-flex justify-content-center">
                    <FormControlLabel
                      control={
                        <Switch checked={switchData} onChange={getTrueFalse} />
                      }
                      label={
                        switchData ? <label>YES</label> : <label>NO</label>
                      }
                    />
                  </div>
                  {switchData === false ? (
                    <div className="my-3">
                      <label>Choose Reason For NO</label>
                      <Select
                        className="NoReasonSelect"
                        mode="multiple"
                        value={quality_Reasons}
                        placeholder="Please select"
                        options={NoReasonOption}
                        onChange={setQuality_Reasons}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <br />
              <br />
              <div className="d-flex justify-content-center mx-0">
                <button className="mx-2 CButton" onClick={SubmitProductDetails}>
                  {loadingSubmit ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <span>SUBMIT</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default PhysicalL1L2;

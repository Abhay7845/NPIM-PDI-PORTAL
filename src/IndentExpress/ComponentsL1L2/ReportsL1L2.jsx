/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Tippy from "@tippyjs/react";
import "../Style/FeedbackFormL1L2.css";
import { IMAGE_URL, L1L2HeadingData, NoReasonOption } from "../Data/DataList";
import * as Icon from "react-bootstrap-icons";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import { Select } from "antd";
import swal from "sweetalert";
import { FormControlLabel, Switch } from "@material-ui/core";
import {
  BsFillBarChartFill,
  BsFillFileEarmarkPostFill,
  BsFillHouseDoorFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { INDENT_HOST_URL } from "../../HostManager/UrlManager";
import UpperHeader from "../../Components/UpperHeader";
import Loader from "../../Components/Loader";

const ReportsL1L2 = () => {
  const [switchData, setSwitchData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [submitted, setSubmitted] = useState("scanned");
  const [reports, setReports] = useState({});
  const [reportsTable, setReportsTable] = useState([]);
  const [quality_Reasons, setQuality_Reasons] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const storeCode = sessionStorage.getItem("store_code");

  const getTrueFalse = () => {
    if (switchData) {
      setSwitchData(false);
    } else {
      setSwitchData(true);
    }
  };
  const EditReport = (reportData) => {
    setReports(reportData);
    window.scrollTo({ top: "0", behavior: "smooth" });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${INDENT_HOST_URL}/INDENT/express/${submitted}/report/L1/${storeCode}`
      )
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setReportsTable(response.data.value);
        } else if (response.data.code === "1001") {
          setReports({});
          setReportsTable([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [submitted, storeCode, reports.id]);

  const UpdateGetProductsDetails = () => {
    if (!switchData && quality_Reasons.length === 0) {
      swal("Please Select For No Reason");
    } else {
      setLoadingSubmit(true);
      const getProductInputData = {
        id: reports.id,
        strCode: storeCode,
        consumerBase: reports.consumerBase,
        collection: reports.collection,
        itGroup: reports.itGroup,
        category: reports.category,
        itemCode: reports.itemCode,
        catPB: reports.catPB,
        stdWt: reports.stdWt,
        stdUCP: reports.stdUCP,
        activity: reports.activity,
        complexity: reports.complexity,
        si2Gh: reports.si2Gh,
        vsGh: reports.vsGh,
        vvs1: reports.vvs1,
        i2Gh: reports.i2Gh,
        si2Ij: reports.si2Ij,
        shape: reports.shape,
        gender: reports.gender,
        videoLink: reports.videoLink,
        childNodesN: reports.childNodesN,
        childNodesE: reports.childNodesE,
        region: reports.region,
        diamondWt: reports.diamondWt,
        colourWt: reports.colourWt,
        metalWt: reports.metalWt,
        findings: reports.findings,
        metalColor: reports.metalColor,
        parentItemCode: reports.parentItemCode,
        itemLevelType: reports.itemLevelType,
        childNodeV: reports.childNodeV,
        childNodeK: reports.childNodeK,
        childNodeH: reports.childNodeH,
        karatageRange: reports.karatageRange,
        childNodeF: reports.childNodeF,
        childNodeO: reports.childNodeO,
        npimEventNo: reports.npimEventNo,
        rsoName: reports.rsoName,
        doe: reports.doe,
        saleable: switchData ? "YES" : "NO",
        size: reports.size,
        uom: reports.uom,
        reasons: quality_Reasons.toString(),
        indQty: reports.indQty,
        indCategory: reports.indCategory,
        submitStatus: "report",
        set2Type: reports.set2Type,
        stoneQuality: reports.stoneQuality,
        stoneQualityVal: reports.stoneQualityVal,
        scannedCount: reports.scannedCount,
        unscannedCount: reports.unscannedCount,
        adVariant: reports.adVariant,
        stdWtN: reports.stdWtN,
        stdUcpN: reports.stdUcpN,
        stdWtE: reports.stdWtE,
        stdUcpE: reports.stdUcpE,
        stdWtV: reports.stdWtV,
        stdUcpV: reports.stdUcpV,
        stdWtK: reports.stdWtK,
        stdUcpK: reports.stdUcpK,
        stdWtH: reports.stdWtH,
        stdUcpH: reports.stdUcpH,
        stdWtO: reports.stdWtO,
        stdUcpO: reports.stdUcpO,
        stdWtF: reports.stdWtF,
        stdUcpF: reports.stdUcpF,
        btqCount: reports.btqCount,
        quality_Rating: reports.quality_Rating,
        quality_Reasons: reports.quality_Reasons,
        indentLevelType: reports.indentLevelType,
      };
      console.log("getProductInputData==>", getProductInputData);
      axios
        .post(
          `${INDENT_HOST_URL}/INDENTL3/express/update/responses`,
          getProductInputData
        )
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setSwitchData(true);
            setQuality_Reasons([]);
            setReports({});
            swal({
              title: "Success!",
              text: "Your Data Has been Updated Successfully",
              icon: "success",
              buttons: "OK",
            });
          }
          if (response.data.code === "1001") {
            swal({
              title: "Sorry!",
              text: "Data Not Updated",
              icon: "error",
              buttons: "OK",
            });
          }
          setLoadingSubmit(false);
        })
        .catch((error) => {
          setQuality_Reasons([]);
          setLoadingSubmit(false);
        });
    }
  };
  const imageCode = !reports.itemCode ? "" : reports.itemCode.substring(2, 9);
  const imageURL = `${IMAGE_URL}${imageCode}.jpg`;

  return (
    <React.Fragment>
      <UpperHeader />
      {loading === true && <Loader />}
      <div className="DropDownFormStyle">
        <div className="mx-3 d-flex justify-content-between w-100">
          <div>
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
          </div>
          <div className="col-md-3">
            <select
              className="SSelect"
              onChange={(e) => setSubmitted(e.target.value)}
            >
              <option value="scanned">SUBMITTED</option>
              <option value="unscanned">YET TO SUBMIT</option>
            </select>
          </div>
        </div>
      </div>
      {/* REPORTS FORM */}
      {reports.id === undefined ? (
        ""
      ) : (
        <div className="row row-cols-1 row-cols-md-2 mx-1 my-3">
          <div className="col">
            <img
              src={imageURL}
              className="w-100 img-thumbnail ReportCatalogImage"
              alt="Image_Unavailable"
            />
          </div>
          <div className="col">
            <div className="card-body">
              <h5
                className="text-center p-1 itemCodeText"
                style={{ backgroundColor: "#832729" }}
              >
                {reports.itemCode}
              </h5>
              <div className="row my-3">
                <div className="col-md-6">
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
                          <td>{reports.collection}</td>
                        </tr>
                        <tr>
                          <th>NEED STATE</th>
                          <td>-</td>
                          <td>{reports.consumerBase}</td>
                        </tr>
                        <tr>
                          <th>GROUP</th>
                          <td>-</td>
                          <td>{reports.itGroup}</td>
                        </tr>
                        <tr>
                          <th>CATEGORY</th>
                          <td>-</td>
                          <td>{reports.category}</td>
                        </tr>
                        <tr>
                          <th>GENDER</th>
                          <td>-</td>
                          <td>{reports.gender}</td>
                        </tr>
                        <tr>
                          <th>COMPLEXITY</th>
                          <td>-</td>
                          <td>{reports.complexity}</td>
                        </tr>
                        <tr>
                          <th>STD WT</th>
                          <td>-</td>
                          <td>{reports.stdWt}</td>
                        </tr>
                        <tr>
                          <th>STD UCP</th>
                          <td>-</td>
                          <td>{reports.stdUCP}</td>
                        </tr>
                        <tr>
                          <th>METAL COLOR</th>
                          <td>-</td>
                          <td>{reports.metalColor}</td>
                        </tr>
                        <tr>
                          <th>FINDING</th>
                          <td>-</td>
                          <td>{reports.findings}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-md-6">
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
              <div className="mt-5">
                <button className="CButton" onClick={UpdateGetProductsDetails}>
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
      )}
      <br />
      {reportsTable.length > 0 && (
        <div className="table-responsive mx-2">
          <b className="mx-1 my-3 text-secondary">
            {submitted === "scanned" ? "SUBMITTED" : "YET TO SUBMIT"}
          </b>
          <table
            className="table table-hover table-bordered"
            style={{ marginTop: "0px", marginLeft: "0px" }}
          >
            <thead>
              <tr>
                {L1L2HeadingData.map((item, i) => {
                  return (
                    <th key={i} className="tableHeading">
                      {item.label}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {reportsTable
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, i) => {
                  const { itemCode } = item;
                  const imageCode = !itemCode ? "" : itemCode.substring(2, 9);
                  const imageURL = `${IMAGE_URL}${imageCode}.jpg`;
                  return (
                    <tr key={i} className="tableRowData">
                      <td>{item.id}</td>
                      <td className="text-center">
                        <img
                          src={imageURL}
                          width="70"
                          height="70"
                          className="img-thumbnail"
                          alt="No_Image"
                        />
                      </td>
                      <td>{item.itemCode}</td>
                      <td>{item.collection}</td>
                      <td>{item.consumerBase}</td>
                      <td>{item.itGroup}</td>
                      <td>{item.category}</td>
                      <td>{item.stdWt}</td>
                      <td>{item.stdUCP}</td>
                      <td>{item.saleable}</td>
                      <td>{item.reasons}</td>
                      <td className="text-center">
                        <Icon.PencilSquare
                          size={18}
                          cursor="pointer"
                          onClick={() => EditReport(item)}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="d-flex justify-content-end my-2 w-100">
            <TablePagination
              rowsPerPageOptions={[50, 100, 150, reportsTable.length]}
              component="div"
              count={reportsTable.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ReportsL1L2;

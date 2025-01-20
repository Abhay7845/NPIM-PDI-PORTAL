import { Grid, makeStyles, AppBar, Drawer, FormControlLabel, Switch, Toolbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DropdownField from "../Components/DropdownField";
import TableComponent from "../Components/TableComponent";
import UpperHeader from "../Components/UpperHeader";
import { useNavigate, useParams } from "react-router-dom";
import ProductInfo from "../Components/ProductInfo";
import NpimDataDisplay from "../Components/NpimDataDisplay";
import StatusTabular from "../Components/StatusTabular";
import Loading from "../Components/Loading";
import { L1L2ReportHeaders, feedbackl1l2Navigate } from "../DataCenter/DataList";
import { BsCardList } from "react-icons/bs";
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineBarChart } from "react-icons/ai";
import Loader from "../Components/Loader";
import { APIDeleteUpdate, APIGetL1L2Reports, APIGetStatusReports, APIInsertDataL1L2 } from "../HostManager/CommonApiCallL3";
import StatusTabularL1L2 from "../Components/StatusTabularL1L2";

const useStyles = makeStyles({
  hidden: {
    display: "none",
  },
  show: {
    display: "block",
  },
});

const ReportL1AndL2 = () => {
  const classes = useStyles();
  const { storeCode, rsoName } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState([]);
  const [collectionRtp, setCollectionRtp] = useState([]);
  const [editState, setEditState] = useState(false);
  const [productInfo, setProductInfo] = useState(NpimDataDisplay);
  const [selectReport, setSelectReport] = useState("submitted");
  const [collectionOpt, setCollectionOpt] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [switchEnable, setSwitchEnable] = useState(true);
  const [statusData, setStatusData] = useState({
    col: [],
    row: [],
  });
  const [statusCloserOpener, setStatusCloserOpener] = useState(false);
  const selectReportList = ["yet to submit", "submitted"];
  const loginData = JSON.parse(sessionStorage.getItem("loginData"));
  const collType = report.map(item => item.collection.split(/\s+/).join(''));
  const collectionFilter = ["", ...new Set(collType)];

  const GetL1l2ReportsData = () => {
    let reportUrl = "/npim/unscanned/report/L1/";
    switch (selectReport) {
      case "yet to submit":
        reportUrl = "/npim/unscanned/report/L1/";
        break;
      case "submitted":
        reportUrl = "/npim/scanned/report/L1/";
        break;
      case "groupwise":
        reportUrl = "/npim/groupwise/report/L1/";
        break;
      case "consumerbase":
        reportUrl = "/npim/consumerbase/report/L1/";
        break;
      case "collection":
        reportUrl = "/npim/collection/report/L1/";
        break;
      case "category":
        reportUrl = "/npim/category/report/L1/";
        break;
      default:
        reportUrl = "/npim/unscanned/report/L1/";
        break;
    }
    setLoading(true);
    APIGetL1L2Reports(`${reportUrl}${storeCode}`)
      .then(res => res).then(response => {
        if (response.data.code === "1000") {
          setReport(response.data.value);
          setCollectionRtp([]);
          setCollectionOpt("");
        } else {
          setReport([]);
          setCollectionRtp([]);
          setCollectionOpt("");
        }
        setLoading(false);
      }).catch((error) => setLoading(false));
    setShowInfo(false);
  }

  useEffect(() => {
    GetL1l2ReportsData();
  }, [selectReport, editState, storeCode]);

  useEffect(() => {
    const CollFilter = report.filter(item => item.collection.split(/\s+/).join('').trim() === collectionOpt);
    setCollectionRtp(CollFilter);
  }, [collectionOpt])

  useEffect(() => {
    APIGetStatusReports(`/api/NPIM/l1l2/get/feedback/status?strCode=${storeCode}`)
      .then(res => res).then((response) => {
        if (response.data.code === "1000") {
          setStatusData({
            // col: response.data.coloum,
            col: ["ID", "NEEDSTATE", "TOTALSKU", "GIVENFEEDBACK", "REMAININGSKUCOUNT"],
            row: response.data.value,
          });
        }
      }).catch((error) => setLoading(false));
  }, [storeCode]);

  const getProductData = (data) => {
    setProductInfo(data);
    setShowInfo(true);
    setSwitchEnable(false);
    window.scrollTo({ top: "0", behavior: "smooth" });
  };

  const statusOpener = (event) => {
    setStatusCloserOpener(!statusCloserOpener);
  };

  const getSubmitFormChild = (input) => {
    setLoading(true);
    if (input.qualityRating === 0) {
      alert("Please Select Quality Rating");
      setLoading(false);
      return;
    }
    if (input.feedValue === 0) {
      alert("Please Select Reason for No");
      setLoading(false);
      return;
    }
    if (
      input.qualityRating > 0 &&
      input.qualityRating <= 4 &&
      input.multiSelectQtyFeed.toString().length === 0
    ) {
      alert("Please Select Reason For Low Quality Rating");
      setLoading(false);
      return;
    }
    if (
      input.feedValue > 0 &&
      input.feedValue <= 4 &&
      input.multiSelectDrop.toString().length === 0
    ) {
      alert("Please select Reason for no");
      setLoading(false);
      return;
    }
    const InsertInput = {
      activity: productInfo.activity,
      adVariant: productInfo.adVariant,
      btqCount: productInfo.btqCount,
      catPB: productInfo.catPB,
      category: productInfo.category,
      childNodeF: productInfo.childNodeF,
      childNodeH: productInfo.childNodeH,
      childNodeK: productInfo.childNodeK,
      childNodeO: productInfo.childNodeO,
      childNodeV: productInfo.childNodeV,
      childNodesE: productInfo.childNodesE,
      childNodesN: productInfo.childNodesN,
      collection: productInfo.collection,
      colourWt: productInfo.colourWt,
      complexity: productInfo.complexity,
      consumerBase: productInfo.consumerBase,
      diamondWt: productInfo.diamondWt,
      doe: productInfo.doe,
      findings: productInfo.findings,
      gender: productInfo.gender,
      i2Gh: productInfo.i2Gh,
      id: productInfo.id,
      indCategory: productInfo.indCategory,
      indQty: productInfo.indQty,
      indentLevelType: productInfo.indentLevelType,
      itGroup: productInfo.itGroup,
      itemCode: productInfo.itemCode,
      itemLevelType: productInfo.itemLevelType,
      karatageRange: productInfo.karatageRange,
      metalColor: productInfo.metalColor,
      metalWt: productInfo.metalWt,
      npimEventNo: productInfo.npimEventNo,
      parentItemCode: productInfo.parentItemCode,
      quality_Rating: input.qualityRating,
      quality_Reasons: input.multiSelectQtyFeed.toString(),
      reasons: input.multiSelectDrop.toString(),
      region: productInfo.region,
      rsoName: rsoName,
      saleable: input.feedValue,
      scannedCount: productInfo.scannedCount,
      set2Type: productInfo.set2Type,
      shape: productInfo.shape,
      si2Gh: productInfo.si2Gh,
      si2Ij: productInfo.si2Ij,
      size: productInfo.size,
      stdUCP: productInfo.stdUCP,
      stdUcpE: productInfo.stdUCP,
      stdUcpF: productInfo.stdUcpF,
      stdUcpH: productInfo.stdUcpH,
      stdUcpK: productInfo.stdUcpK,
      stdUcpN: productInfo.stdUcpN,
      stdUcpO: productInfo.stdUcpO,
      stdUcpV: productInfo.stdUcpV,
      stdWt: productInfo.stdWt,
      stdWtE: productInfo.stdWtE,
      stdWtF: productInfo.stdWtF,
      stdWtH: productInfo.stdWtH,
      stdWtK: productInfo.stdWtK,
      stdWtN: productInfo.stdWtN,
      stdWtO: productInfo.stdWtO,
      stdWtV: productInfo.stdWtV,
      stoneQuality: productInfo.stoneQuality,
      stoneQualityVal: productInfo.stoneQualityVal,
      strCode: storeCode,
      submitStatus: productInfo.submitStatus,
      unscannedCount: productInfo.unscannedCount,
      uom: productInfo.uom,
      videoLink: productInfo.videoLink,
      vsGh: productInfo.vsGh,
      vvs1: productInfo.vvs1,
    };
    APIInsertDataL1L2(`/npim/insert/responses`, InsertInput)
      .then(res => res).then((response) => {
        if (response.data.code === "1000") {
          alert("Data Has Been Inserted Successfully");
          setLoading(false);
        }
      }).catch((error) => setLoading(false));
    setSelectReport(selectReport);
    setEditState(!editState);
  };

  const getUpdateFormChild = (input) => {
    setLoading(true);
    if (input.qualityRating === 0) {
      alert("Please Select Quality Rating");
      setLoading(false);
      return;
    }
    if (input.feedValue === 0) {
      alert("Please Select Reason for No");
      setLoading(false);
      return;
    }
    if (
      input.qualityRating > 0 &&
      input.qualityRating <= 4 &&
      input.multiSelectQtyFeed.toString().length === 0
    ) {
      alert("Please Select Reason For Low Quality Rating");
      setLoading(false);
      return;
    }
    if (
      input.feedValue > 0 &&
      input.feedValue <= 4 &&
      input.multiSelectDrop.toString().length === 0
    ) {
      alert("Please select Reason for no");
      setLoading(false);
      return;
    }
    const UpdateInput = {
      id: productInfo.id,
      strCode: storeCode,
      consumerBase: productInfo.consumerBase,
      collection: productInfo.collection,
      itGroup: productInfo.itGroup,
      category: productInfo.category,
      itemCode: productInfo.itemCode,
      catPB: productInfo.catPB,
      stdWt: productInfo.stdWt,
      stdUCP: productInfo.stdUCP,
      activity: productInfo.activity,
      complexity: productInfo.complexity,
      si2Gh: productInfo.si2Gh,
      vsGh: productInfo.vsGh,
      vvs1: productInfo.vvs1,
      i2Gh: productInfo.i2Gh,
      si2Ij: productInfo.si2Ij,
      shape: productInfo.shape,
      gender: productInfo.gender,
      videoLink: productInfo.videoLink,
      childNodesN: productInfo.childNodesN,
      childNodesE: productInfo.childNodesE,
      region: productInfo.region,
      diamondWt: productInfo.diamondWt,
      colourWt: productInfo.colourWt,
      metalWt: productInfo.metalWt,
      findings: productInfo.findings,
      metalColor: productInfo.metalColor,
      parentItemCode: productInfo.parentItemCode,
      itemLevelType: productInfo.itemLevelType,
      childNodeV: productInfo.childNodeV,
      childNodeK: productInfo.childNodeK,
      childNodeH: productInfo.childNodeH,
      karatageRange: productInfo.karatageRange,
      childNodeF: productInfo.childNodeF,
      childNodeO: productInfo.childNodeO,
      npimEventNo: productInfo.npimEventNo,
      rsoName: rsoName,
      doe: productInfo.doe,
      saleable: input.feedValue,
      size: productInfo.size,
      uom: productInfo.uom,
      indQty: productInfo.indQty,
      indCategory: productInfo.indCategory,
      submitStatus: "report",
      set2Type: productInfo.set2Type,
      stoneQuality: !productInfo.stoneQuality ? "" : productInfo.stoneQuality,
      stoneQualityVal: !productInfo.stoneQualityVal ? "" : productInfo.stoneQualityVal,
      scannedCount: productInfo.scannedCount,
      unscannedCount: productInfo.unscannedCount,
      adVariant: productInfo.adVariant,
      stdWtN: productInfo.stdWtN,
      stdUcpN: productInfo.stdUcpN,
      stdWtE: productInfo.stdWtE,
      stdUcpE: productInfo.stdUcpE,
      stdWtV: productInfo.stdWtV,
      stdUcpV: productInfo.stdUcpV,
      stdWtK: productInfo.stdWtK,
      stdUcpK: productInfo.stdUcpK,
      stdWtH: productInfo.stdWtH,
      stdUcpH: productInfo.stdUcpH,
      stdWtO: productInfo.stdWtO,
      stdUcpO: productInfo.stdUcpO,
      stdWtF: productInfo.stdWtF,
      stdUcpF: productInfo.stdUcpF,
      btqCount: productInfo.btqCount,
      qualityRating: input.qualityRating,
      qualityReasons: input.multiSelectQtyFeed.toString(),
      reasons: input.multiSelectDrop.toString(),
      indentLevelType: "L1L2",
    };
    APIDeleteUpdate(`/NPIML3/npim/update/responses`, UpdateInput)
      .then(res => res).then((response) => {
        if (response.data.code === "1000") {
          alert("Data Updated Successfully");
          GetL1l2ReportsData();
        }
        setLoading(false);
      }).catch((error) => setLoading(false));
    setSelectReport(selectReport);
    setEditState(!editState);
  };

  const ReportsRouting = () => {
    if (loginData.role === "L1" || loginData.role === "L2") {
      navigate(`/NpimPortal/reportL1andL2/${storeCode}/${rsoName}`);
    } else if (loginData.role === "L3") {
      navigate(`/NpimPortal/reportL3/${storeCode}/${rsoName}`);
    }
  }




  return (
    <React.Fragment>
      {loading === true && <Loader />}
      <Drawer anchor="top" open={statusCloserOpener} onClick={statusOpener}>
        {loginData.role === "L3" ? <StatusTabular statusData={statusData} /> : <StatusTabularL1L2 statusData={statusData} />}
      </Drawer>
      <Grid item xs={12}>
        <UpperHeader storeCode={storeCode} />
        <Loading flag={loading} />
        <AppBar position="static" color="inherit">
          <Toolbar>
            <div className="d-flex justify-content-between w-100">
              <div className="d-flex w-100">
                <DropdownField
                  name="Select Report Type"
                  value={selectReport}
                  labelName="Select Type"
                  dropList={selectReportList}
                  myChangeHandler={(e) => setSelectReport(e.target.value)}
                />
                {collectionFilter.length > 2 && <DropdownField
                  name="Select Report Type"
                  labelName="Collection"
                  dropList={collectionFilter}
                  value={collectionOpt}
                  myChangeHandler={(e) => setCollectionOpt(e.target.value.split(/\s+/).join(' ').trim())}
                />}
                <FormControlLabel
                  control={
                    <Switch
                      checked={showInfo}
                      onChange={() => setShowInfo(!showInfo)}
                      name="feedbackSwitch"
                      color="secondary"
                      disabled={switchEnable}
                    />
                  }
                  label="Product Description"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="d-flex">
                <div className="IconsStyle" onClick={() => {
                  if (loginData.role === "L3") {
                    navigate(`/NpimPortal/get/products/home/${storeCode}/${rsoName}`);
                  } else {
                    navigate(`/${feedbackl1l2Navigate}/${storeCode}/${rsoName}`);
                  }
                }}>
                  <BiHomeAlt size={23} />
                  <b>Home</b>
                </div>
                <div className="IconsStyle" onClick={statusOpener}>
                  <AiOutlineBarChart size={23} />
                  <b>Status</b>
                </div>
                {loginData.role === "L3" && <div className="IconsStyle" onClick={() => navigate(`/NpimPortal/wishlist/${storeCode}/${rsoName}`)}>
                  <AiOutlineHeart size={23} />
                  <b>Wishlist</b>
                </div>}
                <div className="IconsStyle" onClick={ReportsRouting}>
                  <BsCardList size={23} />
                  <b>Reports</b>
                </div>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item xs={12} className={showInfo ? classes.show : classes.hidden}>
        {productInfo.id && (
          <ProductInfo
            productInfo={productInfo}
            getSubmitFormChild={getSubmitFormChild}
            getUpdateFormChild={getUpdateFormChild}
            showInfo={showInfo}
            SelectReport={selectReport}
          />
        )}
      </Grid>
      <Grid item xs={12} className="p-3">
        {report.length > 0 ? (
          <TableComponent
            report={collectionRtp.length > 0 ? collectionRtp : report}
            coloum={L1L2ReportHeaders}
            reportType={selectReport}
            getProductData={getProductData}
            reportName={selectReport}
          />
        ) : <div className="text-center">Data Not Available</div>}
      </Grid>
    </React.Fragment>
  );
};
export default ReportL1AndL2;

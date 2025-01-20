import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/CssStyle/FeedbackL1AndL2.css";
import UpperHeader from "../Components/UpperHeader";
import LowerHeader from "../Components/LowerHeader";
import LowerHeaderDigital from "../Components/LowerHeaderDigital";
import Rating from "@mui/material/Rating";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import StarIcon from "@material-ui/icons/Star";
import { imageUrl, feedbackl1l2Navigate } from "../DataCenter/DataList";
import { MuliSelectDropdownFieldQualityFeedback, MuliSelectDropdownField } from "../Components/MuliSelectDropdownField";
import NpimDataDisplay from "../Components/NpimDataDisplay";
import { Grid, Button, Typography, CssBaseline } from "@material-ui/core";
import { useParams } from "react-router";
import Loading from "../Components/Loading";
import StaticTabularInformation from "../Components/StaticTabularInformation";
import WarningPopup from "../Components/WarningPopup";
import ImgShow from "../Components/ImgShow";
import AlertPopup from "../Components/AlertPopup";
import { useStyles } from "../Style/FeedbackL1AndL2ForPhysical";
import Loader from "../Components/Loader";
import { APIDNPIMProductData, APIGetPreNextProductData, APIGetStatusReports, APIInsertDataL1L2, APIPNPIMProductData } from "../HostManager/CommonApiCallL3";

const FeedbackL1AndL2 = () => {
  const classes = useStyles();
  const { storeCode, rsoName } = useParams();
  const [feedShowState, setFeedShowState] = useState(NpimDataDisplay);
  const [multiSelectQltyfeed, setMultiSelectQualityFeedback] = useState([]);
  const [multiSelectDrop, setMultiSelectDrop] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resetDrop, SetResetDrop] = useState(true);
  const [statusData, setStatusData] = useState({
    col: [],
    row: [],
  });
  const [value, setValue] = useState(0);
  const [feedValue, setFeedValue] = useState(0);
  const [alertPopupStatus, setAlertPopupStatus] = useState({
    status: false,
    main: "",
    contain: "",
    mode: false,
  });
  const [productDetails, setProductDetails] = useState({
    storeCode: storeCode,
    collection: "ALL",
    consumerBase: "ALL",
    group: "ALL",
    category: "ALL",
    itemCode: "",
    setDropState: "",
  });

  const [productDetailsDigital, setProductDetailsDigital] = useState({
    storeCode: storeCode,
    collection: "ALL",
    consumerBase: "ALL",
    group: "ALL",
    category: "ALL",
  });
  const warningPopupState = false;
  const navBarList = [
    {
      id: 1,
      name: "Home",
      link: `/${feedbackl1l2Navigate}/${storeCode}/${rsoName}`,
      icon: "HomeIcon",
    },
    {
      id: 3,
      name: "Report",
      link: `/NpimPortal/reportL1andL2/${storeCode}/${rsoName}`,
      icon: "ReportIcon",
    },
  ];

  // FOR DNPIM LOGIN TYPE
  const GetProductDetailsDnpim = (productDetails) => {
    setLoading(true);
    APIDNPIMProductData(`/NPIM/base/dnpim/get/product/details/`, productDetails)
      .then(res => res).then((response) => {
        if (response.data.code === "1001") {
          document.getElementById("result").style.visibility = "hidden";
          setAlertPopupStatus({
            status: true,
            main: "No more data available for the selected Category",
            contain: "",
            mode: true,
          });
          productDetails.setDropState("");
        } else if (response.data.code === "1003") {
          setProductDetails({});
          setAlertPopupStatus({
            status: true,
            main: response.data.value,
            contain: "",
            mode: true,
          });
          productDetails.setDropState("");
        } else {
          document.getElementById("result").style.visibility = "visible";
          setFeedShowState(response.data.value);
        }
        setLoading(false);
      }).catch((error) => setLoading(false));
  }

  // FOR PNPIM LOGIN TYPE 
  const GetProductDetailsPnpim = (productDetails) => {
    setLoading(true);
    APIPNPIMProductData(`/NPIM/base/npim/get/product/details`, productDetails)
      .then((response) => {
        if (response.data.code === "1001") {
          document.getElementById("result").style.visibility = "hidden";
          setAlertPopupStatus({
            status: true,
            main: "Data has already been Submitted for this Product",
            contain: "",
            mode: true,
          });
          productDetails.setDropState("");
        } else if (response.data.code === "1003") {
          setProductDetails({});
          setAlertPopupStatus({
            status: true,
            main: "Feedback already given for this Product",
            contain: "",
            mode: true,
          });
          productDetails.setDropState("");
        } else {
          document.getElementById("result").style.visibility = "visible";
          setFeedShowState(response.data.value);
        }
        setLoading(false);
      }).catch((error) => setLoading(false));
  }

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
      }).catch(error => setLoading(false));
  }, [storeCode]);

  useEffect(() => {
    if (sessionStorage.getItem("Npim-type") === "DNPIM") {
      GetProductDetailsDnpim(productDetailsDigital);
    }
  }, [productDetailsDigital]);

  useEffect(() => {
    if (sessionStorage.getItem("Npim-type") === "PNPIM" && productDetails.itemCode !== "") {
      GetProductDetailsPnpim(productDetails);
    }
  }, [productDetails]);

  const onClickNextPreBtnHandler = (direction) => {
    setLoading(true);
    const Input = {
      storeCode: storeCode,
      collection: productDetails.collection,
      consumerBase: productDetails.consumerBase,
      group: productDetails.group,
      category: productDetails.category,
      itemCode: feedShowState.itemCode,
      direction: direction,
    };
    APIGetPreNextProductData(`/NPIM/base/npim/get/product/details/PreNex`, Input)
      .then(res => res).then((response) => {
        let mailSms = "";
        if (response.data.code === "1001") {
          mailSms = "No more data available for the selected category.";
          setAlertPopupStatus({
            status: true,
            main: mailSms,
            contain: "",
            mode: true,
          });
        } else if (response.data.code === "1003") {
          document.getElementById("result").style.visibility = "hidden";
          setAlertPopupStatus({
            status: true,
            main: response.data.value,
            contain: "",
            mode: true,
          });
        } else if (response.data.code === "1000") {
          setFeedShowState(response.data.value);
          setValue(0);
          setFeedValue(0);
          setMultiSelectDrop([]);
          setMultiSelectQualityFeedback([]);
        }
        setLoading(false);
      }).catch((error) => setLoading(false));
  };

  const onSearchClick = (dropState, setDropState) => {
    if (sessionStorage.getItem("Npim-type") === "PNPIM") {
      setProductDetails({
        storeCode: storeCode,
        collection: "",
        consumerBase: "",
        group: "",
        category: "",
        itemCode: dropState,
        setDropState: setDropState,
      });
    }
    if (sessionStorage.getItem("Npim-type") === "DNPIM") {
      setProductDetailsDigital({
        storeCode: storeCode,
        collection: dropState.collection,
        consumerBase: dropState.consumerBase,
        group: dropState.groupData,
        category: dropState.category,
      });
    }
  };

  function closeHandler() {
    setAlertPopupStatus({
      status: false,
      main: "",
      contain: "",
      mode: false,
    });
    setLoading(false);
  }

  function closeHandlerForRest() {
    setAlertPopupStatus({
      status: false,
      main: "",
      contain: "",
      mode: false,
    });

    SetResetDrop(!resetDrop);
    setProductDetails({
      storeCode: storeCode,
      collection: "ALL",
      consumerBase: "ALL",
      group: "ALL",
      category: "ALL",
      itemCode: "",
    });
    setLoading(false);
    SetResetDrop(true);
  }

  const onClickSubmitBtnHandler = () => {
    setLoading(true);
    if (value === 0) {
      alert("Please Select Quality Rating");
      setLoading(false);
      return;
    }
    if (feedValue === 0) {
      alert("Please Select Reason for No");
      setLoading(false);
      return;
    }
    if (value > 0 && value <= 4 && multiSelectQltyfeed.toString().length === 0) {
      alert("Please select Reason For Low Quality Rating");
      setLoading(false);
      return;
    }
    if (feedValue > 0 && feedValue <= 4 && multiSelectDrop.toString().length === 0) {
      alert("Please select Reason for no");
      setLoading(false);
      return;
    }
    const insertDataFeedBack = {
      activity: feedShowState.activity,
      adVariant: feedShowState.adVariant,
      btqCount: feedShowState.btqCount,
      catPB: feedShowState.catPB,
      category: feedShowState.category,
      childNodeF: feedShowState.childNodeF,
      childNodeH: feedShowState.childNodeH,
      childNodeK: feedShowState.childNodeK,
      childNodeO: feedShowState.childNodeO,
      childNodeV: feedShowState.childNodeV,
      childNodesE: feedShowState.childNodesE,
      childNodesN: feedShowState.childNodesN,
      collection: feedShowState.collection,
      colourWt: feedShowState.colourWt,
      complexity: feedShowState.complexity,
      consumerBase: feedShowState.consumerBase,
      diamondWt: feedShowState.diamondWt,
      doe: feedShowState.doe,
      findings: feedShowState.findings,
      gender: feedShowState.gender,
      id: feedShowState.id,
      indCategory: feedShowState.indCategory,
      indQty: feedShowState.indQty,
      indentLevelType: "L1L2",
      itGroup: feedShowState.itGroup,
      itemCode: feedShowState.itemCode,
      itemLevelType: feedShowState.itemLevelType,
      karatageRange: feedShowState.karatageRange,
      metalColor: feedShowState.metalColor,
      metalWt: feedShowState.metalWt,
      npimEventNo: feedShowState.npimEventNo,
      parentItemCode: feedShowState.parentItemCode,
      quality_Rating: value.toString(),
      quality_Reasons: multiSelectQltyfeed.toString(),
      reasons: multiSelectDrop.toString(),
      region: feedShowState.reasons,
      rsoName: rsoName,
      saleable: feedValue,
      scannedCount: feedShowState.scannedCount,
      set2Type: feedShowState.set2Type,
      shape: feedShowState.shape,
      si2Gh: feedShowState.si2Gh,
      si2Ij: feedShowState.si2Ij,
      size: feedShowState.size,
      i2Gh: feedShowState.i2Gh,
      stdUCP: feedShowState.stdUCP,
      stdUcpE: feedShowState.stdUcpE,
      stdUcpF: feedShowState.stdUcpF,
      stdUcpH: feedShowState.stdUcpH,
      stdUcpK: feedShowState.stdUcpK,
      stdUcpN: feedShowState.stdUcpN,
      stdUcpO: feedShowState.stdUcpO,
      stdUcpV: feedShowState.stdUcpV,
      stdWt: feedShowState.stdWt,
      stdWtE: feedShowState.stdWtE,
      stdWtF: feedShowState.stdWtF,
      stdWtH: feedShowState.stdWtH,
      stdWtK: feedShowState.stdWtK,
      stdWtN: feedShowState.stdWtN,
      stdWtO: feedShowState.stdWtO,
      stdWtV: feedShowState.stdWtV,
      stoneQuality: feedShowState.stoneQuality,
      stoneQualityVal: feedShowState.stoneQualityVal,
      strCode: feedShowState.strCode,
      submitStatus: "feedback",
      unscannedCount: feedShowState.unscannedCount,
      uom: feedShowState.uom,
      videoLink: feedShowState.videoLink,
      vsGh: feedShowState.vsGh,
      vvs1: feedShowState.vvs1
    }
    APIInsertDataL1L2(`/npim/insert/responses`, insertDataFeedBack)
      .then(res => res).then((response) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const PortalType = sessionStorage.getItem("Npim-type");
        if (response.data.code === "1001") {
          document.getElementById("result").style.visibility = "hidden";
          setMultiSelectDrop([]);
          setMultiSelectQualityFeedback([]);
          setValue(0);
          setFeedValue(0);
          setAlertPopupStatus({
            status: true,
            main: "Data Saved Successfully",
            contain: "",
            mode: true,
          });
          productDetails.setDropState("");
        } else if (response.data.code === "1000") {
          if (PortalType === "DNPIM") {
            setFeedShowState(response.data.value);
          } else {
            document.getElementById("result").style.visibility = "hidden";
          }
          setAlertPopupStatus({
            status: true,
            main: "Data Saved Successfully",
            contain: "",
            mode: true,
          });
          if (sessionStorage.getItem("Npim-type") === "PNPIM") {
            productDetails.setDropState("");
          }
          setValue(0);
          setFeedValue(0);
          setMultiSelectDrop([]);
          setMultiSelectQualityFeedback([]);
        }
        setLoading(false);
      }).catch((error) => {
        setMultiSelectDrop([]);
        setMultiSelectQualityFeedback([]);
        setValue(0);
        setFeedValue(0);
        setLoading(false);
      });
    setMultiSelectDrop([]);
  };

  const onMultiSelect = (multiSelectData) => {
    setMultiSelectDrop(multiSelectData);
  };

  const onMultiSelectQtyFeedback = (multiSelectQlty) => {
    setMultiSelectQualityFeedback(multiSelectQlty);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <WarningPopup
        flag={warningPopupState}
        headerSms="No more data available for the selected category"
        subSms="Please click on Agree...!"
        reportLink={`/reportL1andL2/${storeCode}/${rsoName}`}
      />
      <AlertPopup
        status={alertPopupStatus.status}
        mainLable={alertPopupStatus.main}
        containLable={alertPopupStatus.contain}
        procideHandler=""
        discardHandler=""
        closeHandler={() => alertPopupStatus.mode ? closeHandlerForRest() : closeHandler()}
      />
      <Grid item xs={12}>
        <UpperHeader
          itemCode={feedShowState.itemCode}
          storeCode={feedShowState.strCode}
        />
        <Loading flag={loading} />
        {loading === true && <Loader />}
        {sessionStorage.getItem("Npim-type") === "DNPIM" ?
          resetDrop ? (
            <LowerHeaderDigital
              onSear={onSearchClick}
              navBarList={navBarList}
              statusData={statusData}
              L3={false}
            />
          ) : "" : ""}
        {sessionStorage.getItem("Npim-type") === "PNPIM" ?
          resetDrop ? (
            <LowerHeader
              onSear={onSearchClick}
              navBarList={navBarList}
              statusData={statusData}
              L3={false}
            />
          ) : "" : ""}
      </Grid>
      <Grid item xs={12} className="my-4">
        <div id="result" className="container-fluid" style={{ marginTop: "1%", visibility: "hidden" }}>
          <div className="row mx-0">
            <div className="col-md-5">
              <div className="img_info_show ">
                {feedShowState.itemCode !== "" ? (
                  <ImgShow
                    className="img_show"
                    itemCode={feedShowState.itemCode}
                    imgLink={imageUrl}
                    videoLink={feedShowState.videoLink}
                  />
                ) : (
                  "Loading Images... "
                )}
              </div>
            </div>
            <div
              className="col-md-7 border"
              style={{ margin: "0%", padding: "0%" }}
            >
              <Typography className={classes.headingColor} align="center">
                {feedShowState.itemCode}
              </Typography>
              <div className="row my-3">
                <div
                  className="col-md-6"
                  style={{ margin: "0%", padding: "0%" }}
                >
                  <div className="pro_info">
                    <h5 className="text-center my-1">
                      <b>PRODUCT DETAILS</b>
                    </h5>
                    <table
                      style={{
                        width: "100%",
                        fontWeight: 900,
                      }}
                    >
                      <tbody>
                        <tr>
                          <th className={classes.hadding}>COLLECTION</th>
                          <td>-</td>
                          <td className={classes.rowData}>
                            {feedShowState.collection}
                          </td>
                        </tr>
                        <tr>
                          <th className={classes.hadding}>CONSUMER BASE</th>
                          <td>-</td>
                          <td className={classes.rowData}>
                            {feedShowState.consumerBase}
                          </td>
                        </tr>
                        <tr>
                          <th className={classes.hadding}>GROUP</th>
                          <td>-</td>
                          <td className={classes.rowData}>
                            {feedShowState.itGroup}
                          </td>
                        </tr>
                        <tr>
                          <th className={classes.hadding}>CATEGORY</th>
                          <td>-</td>
                          <td className={classes.rowData}>
                            {feedShowState.category}
                          </td>
                        </tr>
                        <tr>
                          <th className={classes.hadding}>GENDER</th>
                          <td>-</td>
                          <td className={classes.rowData}>
                            {feedShowState.gender}
                          </td>
                        </tr>
                        <tr>
                          <th className={classes.hadding}>COMPLEXCITY</th>
                          <td>-</td>
                          <td className={classes.rowData}>
                            {feedShowState.complexity}
                          </td>
                        </tr>
                        <tr>
                          <th className={classes.hadding}>STD WT.</th>
                          <td>-</td>
                          <td className={classes.rowData}>
                            {feedShowState.stdWt}
                          </td>
                        </tr>
                        <tr>
                          <th className={classes.hadding}>STD UCP</th>
                          <td>-</td>
                          <td className={classes.rowData}>
                            {feedShowState.stdUCP}
                          </td>
                        </tr>
                        <tr>
                          <th className={classes.hadding}>METAL COLOR</th>
                          <td>-</td>
                          <td className={classes.rowData}>
                            {feedShowState.metalColor}
                          </td>
                        </tr>
                        <tr>
                          <th className={classes.hadding}>{feedShowState.category === "CHAINS" ? "HOOK TYPE" : "FINDING"}</th>
                          <td>-</td>
                          <td className={classes.rowData}>
                            {feedShowState.findings}
                          </td>
                        </tr>
                        <tr>
                          <th className={classes.hadding}>CATPB</th>
                          <td>-</td>
                          <td className={classes.rowData}>{feedShowState.catPB}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="d-flex justify-content-center col-md-5">
                  <div className="text-lg-center">
                    <h5 className="text-center my-1">
                      <b>FEEDBACK</b>
                    </h5>
                    <div className="border p-3">
                      <h6 className="text-center my-1">
                        <b>Product Feedback</b>
                      </h6>
                      <Rating
                        name="simple-controlled"
                        value={feedValue}
                        onChange={(event, newValue) => setFeedValue(newValue)}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
                      />
                      {feedValue > 0 && feedValue <= 4 && (
                        <div className="mutli_select_drop">
                          <MuliSelectDropdownField
                            onMultiSelect={onMultiSelect}
                            value={multiSelectDrop}
                            feedShowState={feedShowState}
                          />
                        </div>
                      )}
                    </div>
                    <br />
                    <div className="p-3 border">
                      <h6 className="text-center my-1">
                        <b>Quality Feedback</b>
                      </h6>
                      <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => setValue(newValue)}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
                      />
                      <br />
                      {value > 0 && value <= 4 && (
                        <div className="mutli_select_drop">
                          <MuliSelectDropdownFieldQualityFeedback
                            onMultiSelectQlty={onMultiSelectQtyFeedback}
                            value={multiSelectQltyfeed}
                            feedShowState={feedShowState}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {feedShowState.si2Gh || feedShowState.vsGh || feedShowState.vvs1 || feedShowState.i2Gh || feedShowState.si2Ij ? (
                <StaticTabularInformation
                  si2Gh={feedShowState.si2Gh}
                  vsGh={feedShowState.vsGh}
                  vvs1={feedShowState.vvs1}
                  i2Gh={feedShowState.i2Gh}
                  si2Ij={feedShowState.si2Ij}
                />
              ) : null}
              <div className="d-flex mt-2 justify-contetn-between with-100">
                {(sessionStorage.getItem("Npim-type") === "DNPIM") &&
                  <Button
                    className={classes.btn}
                    onClick={() => onClickNextPreBtnHandler("pre")}
                    startIcon={<ArrowBackIosIcon />}
                    variant="outlined"
                  >
                    Previous
                  </Button>
                }
                <Button
                  className={classes.btnSub}
                  onClick={onClickSubmitBtnHandler}
                >
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm text-light"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <span>Submit</span>
                  )}
                </Button>
                {(sessionStorage.getItem("Npim-type") === "DNPIM") &&
                  <Button
                    className={classes.btn}
                    onClick={() => onClickNextPreBtnHandler("next")}
                    endIcon={<ArrowForwardIosIcon />}
                    variant="outlined"
                  >
                    Next
                  </Button>}
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </React.Fragment>
  );
};
export default FeedbackL1AndL2;

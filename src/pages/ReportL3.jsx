import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, CssBaseline, Drawer, Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import AlertPopup from "../Components/AlertPopup";
import { ProductDetailsTabularL3 } from "../Components/ComponentForL3";
import DisplayValidationComponent from "../Components/DisplayValidationForL3";
import ImgShow from "../Components/ImgShow";
import LazyLoadindDataGrid from "../Components/LazyLoadindDataGrid";
import Loading from "../Components/Loading";
import ReportsAppBar from "../Components/ReportsAppBar";
import StatusTabular from "../Components/StatusTabular";
import UpperHeader from "../Components/UpperHeader";
import useStyle from "../Style/ReportL3";
import { imageUrl } from "../DataCenter/DataList";
import Loader from "../Components/Loader";
import { APIDeleteUpdate, APIGetAllDropdownList, APIGetCatList, APIGetItemWiseRptL3, APIGetStatuL3, APIInsLimit, APIMoveToWishList, APISetCatCode, APIUpdateFormL3, APIYesItemWiseRtp } from "../HostManager/CommonApiCallL3";
import { toast } from "react-toastify";

const ReportL3 = () => {
  const { storeCode, rsoName } = useParams();
  const classes = useStyle();
  const [col, setCol] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [barOpener, setBarOpener] = useState(false);
  const [statusCloserOpener, setStatusCloserOpener] = useState(false);
  const [statusData, setStatusData] = useState({
    col: [],
    row: [],
  });
  const catPbRpt = sessionStorage.getItem("CatPBReport");
  const [reportLabel, setReportLabel] = useState(catPbRpt ? catPbRpt : "NeedState");
  const [dataRowInformation, setDataRowInformation] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const [digit, setDigit] = useState("");
  const [modification, setModification] = useState(true);
  const [switchEnable, setSwitchEnable] = useState(false);
  const [setSelectState, setSetSelectState] = useState([]);
  const [alertPopupStatus, setAlertPopupStatus] = useState({
    status: false,
    main: "",
    contain: "",
  });
  const [allDataFromValidation, setAllDataFromValidation] = useState({
    sizeUomQuantityRes: [],
    sizeQuantityRes: [],
    stoneQualityRes: "",
    tegQuantityRes: [],
    typeSet2Res: "",
    quantityRes: "",
    findingsRes: "",
  });

  const [popupOpen, setPopupOpen] = useState(false);
  const [isConfirmed, setsConfirmed] = useState(false);
  const handelOpen = () => setPopupOpen(true);
  const handelClose = () => setPopupOpen(false);

  const handelYes = () => {
    APIYesItemWiseRtp(`/NPIML3/npim/item/wise/rpt/edr/L3/${storeCode}`, rows)
      .then(res => res).then(response => {
        if (response.data.code === "1000") {
          setPopupOpen(false);
          setsConfirmed(true);
        }
      }).then(error => setLoading(false));
  };


  const GetCatByReports = (storeCode) => {
    setLoading(true);
    let urlReport;
    switch (reportLabel) {
      case "NeedState":
        urlReport = `/NPIML3/npim/summary/report/L3/${storeCode}/NeedState`;
        break;
      case "Collection":
        urlReport = `/NPIML3/npim/summary/report/L3/${storeCode}/Collection`;
        break;
      case "ItGroup":
        urlReport = `/NPIML3/npim/summary/report/L3/${storeCode}/ItGroup`;
        break;
      case "Category":
        urlReport = `/NPIML3/npim/summary/report/L3/${storeCode}/Category`;
        break;
      case "Cancel_Item_List":
        urlReport = `/NPIML3/npim/get/item/cancel/list/${storeCode}`;
        break;
      default:
        urlReport = `/NPIML3/npim/item/wise/rpt/L3/${storeCode}`;
        break;
    }
    APIGetAllDropdownList(urlReport).then(res => res).then((response) => {
      if (response.data.code === "1000") {
        setCol(response.data.coloum);
        setRows(response.data.value);
      } else if (response.data.code === "1001") {
        setCol([]);
        setRows([]);
      }
      setSwitchEnable(true);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      setCol([]);
      setRows([]);
    });
  }

  const GetStatuaDetials = (storeCode) => {
    setLoading(true);
    APIGetStatuL3(`/NPIML3/npim/get/status/L3/${storeCode}`)
      .then(res => res).then((response) => {
        if (response.data.code === "1000") {
          setStatusData({
            col: response.data.coloum,
            row: response.data.value,
          });
        }
        setLoading(false);
      }).catch((error) => setLoading(false));
  }


  const GetCatPBRepots = (storeCode) => {
    APIGetAllDropdownList(`/NPIML3/get/catPB/reports/${storeCode}`).then(res => res)
      .then((response) => {
        console.log("response==>", response.data);
        if (response.data.code === "1000") {
          setCol(response.data.coloum);
          setRows(response.data.value);
        } else {
          setCol([]);
          setRows([]);
        }
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        setCol([]);
        setRows([]);
      });
  }

  const InsertIntoLimitCatPb = (storeCode) => {
    setLoading(true);
    APIInsLimit(`/NPIML3/ins/limit/table/${storeCode}/""`)
      .then(res => res).then((response) => {
        console.log("response==>", response.data);
        if (response.data.Code === "1000") {
          if (response.data.value.toUpperCase() === "SUCCESS") {
            GetCatPBRepots(storeCode);
          }
        }
        setLoading(false);
      }).catch(err => {
        setLoading(false);
        setCol([]);
        setRows([]);
      });
  }

  useEffect(() => {
    if (reportLabel === "CatPB_Report") {
      InsertIntoLimitCatPb(storeCode);
    } else {
      GetCatByReports(storeCode);
    }
    GetStatuaDetials(storeCode);
  }, [statusCloserOpener, reportLabel, modification, popupOpen, storeCode]);


  const reportDropHandler = (input) => {
    if (input === "CatPB_Report") {
      sessionStorage.setItem("CatPBReport", input);
    } else {
      sessionStorage.removeItem("CatPBReport")
    }
    setLoading(true);
    setShowInfo(false);
    DisplayValidationRunner();
    setReportLabel(input);
    setLoading(false);
  };


  const LoadDataOnWishListing = () => {
    APIGetItemWiseRptL3(`/NPIML3/npim/item/wise/rpt/L3/${storeCode}`)
      .then((response) => {
        if (response.data.code === "1000") {
          setCol(response.data.coloum);
          setRows(response.data.value);
        } else if (response.data.code === "1001") {
          setCol([]);
          setRows([]);
        }
        setSwitchEnable(true);
        setLoading(false);
      }).catch((error) => setLoading(false));
  }

  function closeHandler(params) {
    setAlertPopupStatus({
      status: false,
      main: "",
      contain: "",
    });
    setLoading(false);
  }
  const barHandler = () => {
    setBarOpener(!barOpener);
  };
  const statusOpener = () => {
    setStatusCloserOpener(!statusCloserOpener);
  };

  const rowDataHandler = (input) => {
    setDataRowInformation(input);
    setDigit(input.itemCode[6]);
    setShowInfo(true);
    setSwitchEnable(false);
    DisplayValidationRunner();
    window.scrollTo({ top: "0", behavior: "smooth" });
  };

  const DeleteRowData = (event) => {
    setLoading(true);
    DisplayValidationRunner();
    const inputFiled = {
      itemCode: event.itemCode,
      strCode: storeCode,
      saleable: "",
      size: "0",
      uom: "0",
      reasons: "",
      findings: "",
      indQty: "0",
      indCategory: "0",
      submitStatus: "report",
      set2Type: "",
      stoneQuality: "0",
      stoneQualityVal: "0",
      rsoName: rsoName,
      npimEventNo: "",
      IndentLevelType: "",
      exSize: event.size,
      exUOM: event.uom,
      exIndCategory: event.indCategory,
      exStonequality: event.stoneQuality,
    };
    APIDeleteUpdate(`/NPIML3/npim/update/responses`, inputFiled)
      .then((response) => {
        if (response.data.code === "1000") {
          setAlertPopupStatus({
            status: true,
            main: 'Item Deleted Successfully',
            contain: "",
          });
        }
        setShowInfo(false);
        setModification(!modification);
        setLoading(false);
      }).catch((error) => setLoading(false));
    reportDropHandler(reportLabel);
  };

  const MoveToWishlist = (event) => {
    setLoading(true);
    const itemCode = event.itemCode;
    APIMoveToWishList(`/NPIML3/npim/move/item/wishlist/to/indent/${itemCode}/${storeCode}/Wishlist`)
      .then(res => res).then((response) => {
        if (response.data.Code === "1000") {
          setAlertPopupStatus({
            status: true,
            main: 'Item wishListing Successfully',
            contain: "",
          });
          LoadDataOnWishListing();
        }
        setLoading(false);
      }).catch((error) => setLoading(false));
  }

  function sizeUomQuantityResHandler(sizeUomQuantityData) {
    setAllDataFromValidation({
      sizeUomQuantityRes: sizeUomQuantityData,
      sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
      stoneQualityRes: allDataFromValidation.stoneQualityRes,
      tegQuantityRes: allDataFromValidation.tegQuantityRes,
      typeSet2Res: allDataFromValidation.typeSet2Res,
      quantityRes: allDataFromValidation.quantityRes,
      findingsRes: allDataFromValidation.findingsRes,
    });
  }

  function sizeQuantityResHandler(sizeQuantityData) {
    setAllDataFromValidation({
      sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
      sizeQuantityRes: sizeQuantityData,
      stoneQualityRes: allDataFromValidation.stoneQualityRes,
      tegQuantityRes: allDataFromValidation.tegQuantityRes,
      typeSet2Res: allDataFromValidation.typeSet2Res,
      quantityRes: allDataFromValidation.quantityRes,
      findingsRes: allDataFromValidation.findingsRes,
    });
  }

  function stoneQualityResHandler(stoneQualityData) {
    setAllDataFromValidation({
      sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
      sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
      stoneQualityRes: stoneQualityData,
      tegQuantityRes: allDataFromValidation.tegQuantityRes,
      typeSet2Res: allDataFromValidation.typeSet2Res,
      quantityRes: allDataFromValidation.quantityRes,
      findingsRes: allDataFromValidation.findingsRes,
    });
  }

  function tegQuantityResHandler(tegQuantityData) {
    setAllDataFromValidation({
      sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
      sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
      stoneQualityRes: allDataFromValidation.stoneQualityRes,
      tegQuantityRes: tegQuantityData,
      typeSet2Res: allDataFromValidation.typeSet2Res,
      quantityRes: allDataFromValidation.quantityRes,
      findingsRes: allDataFromValidation.findingsRes,
    });
  }

  function typeSet2ResHandler(typeSet2Data) {
    setAllDataFromValidation({
      sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
      sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
      stoneQualityRes: allDataFromValidation.stoneQualityRes,
      tegQuantityRes: allDataFromValidation.tegQuantityRes,
      typeSet2Res: typeSet2Data,
      quantityRes: allDataFromValidation.quantityRes,
      findingsRes: allDataFromValidation.findingsRes,
    });
  }

  function quantityResHandler(quantityData) {
    setAllDataFromValidation({
      sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
      sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
      stoneQualityRes: allDataFromValidation.stoneQualityRes,
      tegQuantityRes: allDataFromValidation.tegQuantityRes,
      typeSet2Res: allDataFromValidation.typeSet2Res,
      quantityRes: quantityData,
      findingsRes: allDataFromValidation.findingsRes,
    });
  }

  function findingsResHandler(findingsData) {
    setAllDataFromValidation({
      sizeUomQuantityRes: allDataFromValidation.sizeUomQuantityRes,
      sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
      stoneQualityRes: allDataFromValidation.stoneQualityRes,
      tegQuantityRes: allDataFromValidation.tegQuantityRes,
      typeSet2Res: allDataFromValidation.typeSet2Res,
      quantityRes: allDataFromValidation.quantityRes,
      findingsRes: findingsData,
    });
  }

  function tegSelectionResHandler(tegSelectionData) {
    if (tegSelectionData === "Separate") {
      APIGetCatList(`/npim/get/set/category/list/${dataRowInformation.itemCode}`)
        .then((response) => {
          if (response.data.code === "1000") {
            setSetSelectState(response.data.value.map((element) => element.category));
          }
        }).catch(error => setLoading(false));
    } else if (tegSelectionData === "Set") {
      APISetCatCode(`/npim/item/set/category/code/${dataRowInformation.itemCode}`).then((response) => {
        if (response.data.code === "1000") {
          setSetSelectState(response.data.value);
        }
      }).catch((error) => setLoading(false));
    }
  }

  function DisplayValidationRunner() {
    setAllDataFromValidation({
      sizeUomQuantityRes: [],
      sizeQuantityRes: [],
      stoneQualityRes: "",
      tegQuantityRes: [],
      typeSet2Res: "",
      quantityRes: "",
      findingsRes: "",
    });
  }

  function showInformationHandler() {
    setShowInfo(!showInfo);
  }

  const reportOption = [
    "NeedState",
    "Collection",
    "ItGroup",
    "Category",
    "Cancel_Item_List",
    "CatPB_Report"
  ];

  const UpdateReportsPdtDetails = () => {
    const itemsToExclude = ['Only_MANGALSUTRA', 'Only_BANGLE', 'Only_FINGERRING'];
    const filteredTags = allDataFromValidation.tegQuantityRes.filter(item => !itemsToExclude.includes(item.size));
    const updatePdtPayload = {
      itemCode: dataRowInformation.itemCode,
      strCode: storeCode,
      saleable: "",
      reasons: "",
      childNodesE: dataRowInformation.childNodesE,
      childNodesN: dataRowInformation.childNodesN,
      childNodeF: dataRowInformation.childNodeF,
      childNodeH: dataRowInformation.childNodeH,
      childNodeK: dataRowInformation.childNodeK,
      childNodeV: dataRowInformation.childNodeV,
      childNodeO: dataRowInformation.childNodeO,
      findings: allDataFromValidation.findingsRes,
      indQty: allDataFromValidation.quantityRes,
      indCategory: dataRowInformation.category,
      submitStatus: "report",
      set2Type: allDataFromValidation.typeSet2Res,
      stoneQuality: allDataFromValidation.stoneQualityRes,
      stoneQualityVal: dataRowInformation.stoneQualityVal,
      rsoName: rsoName,
      npimEventNo: "1",
      indentLevelType: "L3",
      collection: "",
      consumerbase: dataRowInformation.needState,
      itgroup: dataRowInformation.itGroup,
      category: dataRowInformation.category,
      exSize: dataRowInformation.size,
      exUOM: dataRowInformation.uom,
      exIndCategory: dataRowInformation.indCategory,
      exStonequality: dataRowInformation.stoneQuality,
      sizeUomQuantitys: allDataFromValidation.sizeUomQuantityRes,
      sizeQuantitys: allDataFromValidation.sizeQuantityRes,
      tagQuantitys: filteredTags,
    };
    console.log("updatePdtPayload==>", updatePdtPayload);
    setLoading(true);
    APIUpdateFormL3(`/NPIML3/npim/update/responses/from/L3`, updatePdtPayload)
      .then(res => res).then((response) => {
        if (response.data.code === "1000") {
          toast.success("Updated Successfully", { theme: "colored" })
        }
        setDigit("");
        setLoading(false);
      }).catch((error) => setLoading(false));
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AlertPopup
        status={alertPopupStatus.status}
        mainLable={alertPopupStatus.main}
        containLable={alertPopupStatus.contain}
        procideHandler=""
        discardHandler=""
        closeHandler={closeHandler}
      />
      <Drawer
        anchor="left"
        open={barOpener}
        onClick={() => setBarOpener(false)}
      >
      </Drawer>
      <Drawer anchor="top" open={statusCloserOpener} onClick={statusOpener}>
        <StatusTabular statusData={statusData} />
      </Drawer>
      <Container className={classes.root} maxWidth="xl">
        <Grid item xs={12}>
          <UpperHeader storeCode={storeCode} />
          <Loading flag={loading} />
          {loading === true && <Loader />}
          <ReportsAppBar
            reportDropHandler={reportDropHandler}
            reportOptions={reportOption}
            barHandler={barHandler}
            showInformationHandler={showInformationHandler}
            showInfo={showInfo}
            switchEnable={switchEnable}
            statusOpener={statusOpener}
            droptype="REPORTS"
          />
        </Grid>
        {digit && showInfo ? (
          <div className="row g-3 mt-2 mx-2">
            <div className="col-md-5">
              <ImgShow
                itemCode={dataRowInformation && dataRowInformation.itemCode}
                imgLink={imageUrl}
              />
            </div>
            <div className="col-md-7">
              <Typography
                className={classes.headingColor}
                align="center"
              >
                {dataRowInformation.itemCode}
              </Typography>
              <div className="row mt-3">
                <div className="col-md-7">
                  <ProductDetailsTabularL3 information={dataRowInformation} />
                </div>
                <div className="col-md-5">
                  <h6 className="text-center"><b>INDENT DETAILS</b></h6>
                  {dataRowInformation.itemCode[6] && digit && (
                    <DisplayValidationComponent
                      digit={dataRowInformation.itemCode[6]}
                      itemCode={dataRowInformation.itemCode}
                      setType2option={["Chain", "Dori"]}
                      setSelectOptions={setSelectState}
                      sizeUomQuantityResHandler={sizeUomQuantityResHandler}
                      sizeQuantityResHandler={sizeQuantityResHandler}
                      stoneQualityResHandler={stoneQualityResHandler}
                      tegQuantityResHandler={tegQuantityResHandler}
                      typeSet2ResHandler={typeSet2ResHandler}
                      quantityResHandler={quantityResHandler}
                      findingsResHandler={findingsResHandler}
                      tegSelectionResHandler={tegSelectionResHandler}
                      setSelectResHandler={tegQuantityResHandler}
                      allDataFromValidation={allDataFromValidation}
                      feedShowState={dataRowInformation}
                    />)}
                </div>
                <Button
                  className={classes.btnSub}
                  onClick={UpdateReportsPdtDetails}
                >
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm text-light"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : <span>Update</span>}
                </Button>
              </div>
            </div>
          </div>
        ) : null}
        <Grid item xs={12} className="my-3">
          {rows.length > 0 && col.length > 0 ? (
            <LazyLoadindDataGrid
              col={col}
              rows={rows}
              autoHeight={true}
              autoPageSize={true}
              reportLabel={reportLabel}
              rowDataHandler={rowDataHandler}
              handelOpen={handelOpen}
              handelClose={handelClose}
              handelYes={handelYes}
              popupOpen={popupOpen}
              isConfirmed={isConfirmed}
              dataRowInformation={dataRowInformation}
              allDataFromValidation={allDataFromValidation}
              DeleteRowData={DeleteRowData}
              MoveToWishlist={MoveToWishlist}
            />
          ) : (
            <Typography className="mt-2" align="center" variant="h6" color="secondary">
              DATA NOT AVAILABLE
            </Typography>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
};
export default ReportL3;

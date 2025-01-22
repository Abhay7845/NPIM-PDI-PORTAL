import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, CssBaseline, Drawer } from "@material-ui/core";
import { useParams } from "react-router-dom";
import AlertPopup from "../Components/AlertPopup";
import LazyLoadingDataGridForWishlist from "../Components/LazyLoadingDataGridForWishlist";
import Loading from "../Components/Loading";
import ReportsAppBar from "../Components/ReportsAppBar";
import StatusTabular from "../Components/StatusTabular";
import UpperHeader from "../Components/UpperHeader";
import useStyle from "../Style/ReportL3";
import { WislistLeHeaders } from "../DataCenter/DataList";
import Loader from "./Loader";
import { toast } from 'react-toastify';
import { APIDeleteUpdate, APIGetCatPBStoreWise, APIGetItemWiseRptL3, APIGetStatuL3, APIGetWishlistData, APIInsLimit, APIInsWishList, APIMoveToIndent, APIPNPIMProductData } from "../HostManager/CommonApiCallL3";

const WishListedItems = () => {
  const classes = useStyle();
  const { storeCode, rsoName } = useParams();
  const getCatPbRow = JSON.parse(sessionStorage.getItem("catPbRow"));
  const [col, setCol] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [barOpener, setBarOpener] = useState(false);
  const [statusCloserOpener, setStatusCloserOpener] = useState(false);
  const [statusData, setStatusData] = useState({
    col: [],
    row: [],
  });

  const [reportLabel, setReportLabel] = useState("Item_Wise_Report");
  const [dataRowInformation, setDataRowInformation] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const [modification, setModification] = useState(true);
  const [switchEnable, setSwitchEnable] = useState(false);
  const [rowsData, setRowsData] = useState([]);
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

  const [isConfirmed, setsConfirmed] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const handelOpen = () => setPopupOpen(true);
  const handelClose = () => setPopupOpen(false);

  const handelYes = () => {
    APIInsWishList(`/NPIML3/get/wishlisted/listdata/${storeCode}`, rows)
      .then(res => res).then(response => {
        if (response.data.code === "1000") {
          setPopupOpen(false);
          setsConfirmed(true);
        }
      });
  };

  const GetWhishlistData = (storeCode) => {
    setLoading(true);
    APIGetWishlistData(`/NPIML3/get/wishlisted/listdata/${storeCode}`)
      .then(res => res).then((response) => {
        console.log("response==>", response.data);
        if (response.data.Code === "1000") {
          setCol(WislistLeHeaders);
          setRows(response.data.value);
        } else {
          setRows([]);
        }
        setSwitchEnable(true);
        setLoading(false);
      }).catch((error) => setLoading(false));
  }

  const GetItemWiseReports = (storeCode) => {
    setLoading(true);
    APIGetItemWiseRptL3(`/NPIML3/npim/item/wise/rpt/L3/${storeCode}`)
      .then(res => res).then(response => {
        if (response.data.code === "1000") {
          setRowsData(response.data.value);
        } else if (response.data.code === "1001") {
          setRowsData([]);
        }
        setLoading(false);
      }).catch(error => setLoading(false));
  }

  useEffect(() => {
    GetWhishlistData(storeCode);
    GetItemWiseReports(storeCode);
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
  }, [statusCloserOpener, reportLabel, modification, popupOpen, storeCode]);

  const LoadDataOnWishListing = (storeCode) => {
    APIGetWishlistData(`/NPIML3/get/wishlisted/listdata/${storeCode}`)
      .then((response) => {
        if (response.data.Code === "1000") {
          setCol(response.data.coloum);
          setRows(response.data.value);
        }
        setSwitchEnable(true);
        setLoading(false);
      }).catch((error) => setLoading(false));
  }

  const WishListToEndent = (itemCode, setWishListRowData) => {
    setLoading(true);
    APIMoveToIndent(`/NPIML3/npim/move/item/wishlist/to/indent/${itemCode}/${storeCode}/Indent`)
      .then(res => res).then((response) => {
        if (response.data.Code === "1000") {
          setAlertPopupStatus({
            status: true,
            main: 'Item Indented Successfully',
            contain: "",
          });
          LoadDataOnWishListing(storeCode);
          setWishListRowData({});
          setLoading(false);
        }
        GetWhishlistData(storeCode);
      }).catch((error) => setLoading(false));
  }

  // function IndentToProduct(limit, itemCode, setWishListRowData, inputData) {
  //   console.log("limit==>", limit);
  //   console.log("inputData==>", inputData);
  //   const LimitPercent = limit + (limit * 0.1);
  //   const LimitPercent_Ve = limit - (limit * 0.1);
  //   console.log("LimitPercent==>", LimitPercent);
  //   console.log("LimitPercent_Ve==>", LimitPercent_Ve);
  //   if (inputData > LimitPercent) {
  //     console.log("1==>");
  //     if (inputData > LimitPercent && inputData > limit) {
  //       console.log("2==>");
  //       const alertMessage = 'The Indent Limit has been crossed for this CatPB, Click on "OK" if you still wish to proceed for Indenting this Product. Instead you can also Wishlist this Product!';
  //       const isConfirmed = window.confirm(alertMessage);
  //       if (isConfirmed === true) {
  //         WishListToEndent(itemCode, setWishListRowData);
  //       }
  //       setLoading(false);
  //     } else if (inputData > LimitPercent_Ve) {
  //       console.log("3==>");
  //       const alertMessage = 'You are reaching the max limit For CatPB Click Ok to Proceed';
  //       const isConfirmed = window.confirm(alertMessage);
  //       if (isConfirmed === true) {
  //         WishListToEndent(itemCode, setWishListRowData);
  //       }
  //       setLoading(false);
  //     } else if (inputData > LimitPercent) {
  //       console.log("5==>");
  //       const alertMessage = 'The Indent Limit has been crossed for this CatPB, Click on "OK" if you still wish to proceed for Indenting this Product. Instead you can also Wishlist this Product!';
  //       alert(alertMessage);
  //       setLoading(false);
  //     }
  //     setLoading(false);
  //   } else if (limit === 0) {
  //     console.log("6==>");
  //     const alertMessage = `There is no Limit Available for this "CatPB" Do you still wish to Indent this Product. Click "OK" to continue or click on "Cancel" to wishlist this Product!`;
  //     const isConfirmed = window.confirm(alertMessage);
  //     if (isConfirmed === true) {
  //       WishListToEndent(itemCode, setWishListRowData);
  //     }
  //     setLoading(false);
  //   } else {
  //     console.log("7==>");
  //     WishListToEndent(itemCode, setWishListRowData);
  //   }
  // }

  // function GetCatPBLimit(event, setWishListRowData, inputData) {
  //   const encodedCatPB = encodeURIComponent(event.catPB);
  //   console.log("encodedCatPB==>", encodedCatPB);
  //   setLoading(true);
  //   APIGetCatPBStoreWise(`/NPIML3/check/limit/catpb/excel?strCode=${storeCode}&catPB=${encodedCatPB}`)
  //     .then(res => res).then(response => {
  //       if (response.data.code === "1000") {
  //         IndentToProduct(Number(response.data.value[3]), event.itemCode, setWishListRowData, inputData);
  //       } else if (response.data.code === "1001") {
  //         IndentToProduct(Number(response.data.value[3]) || 0, event.itemCode, setWishListRowData, inputData);
  //       }
  //     }).catch(error => {
  //       setLoading(false);
  //       toast.error("CatPB Is Not Available Hence Data Can't Be Saved!", { theme: "colored" });
  //     });
  // }

  const MoveToWishlist = (event, setWishListRowData) => {
    console.log("event==>", event);
    // WishListToEndent(event.itemCode, setWishListRowData);

    // const isCatPB = rowsData.filter(item => item.catPB);
    // const catPbDataUpper = isCatPB.filter(item => item.catPB.toUpperCase() === event.catPB.toUpperCase());
    // const catPbWiseData = catPbDataUpper.filter(item => item.catPB.replace(/\s+/g, '').trim() == event.catPB.replace(/\s+/g, '').trim());
    // const tolCostVal = catPbWiseData.map(item => Number(item.tolCost));
    // const tolSum = tolCostVal.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    // console.log("tolSum==>", tolSum);

    // let inputData = 0;
    // const bangle11Digit = (event.category === "BANGLE" || event.category === "BANGLES") && event.itemCode.charAt(10);
    // if (event.category.toUpperCase() === "BANGLE" || event.category === "BANGLES") {
    //   const singleBanglePrice = Number(event.stdUCP) / Number(bangle11Digit) || 1;
    //   inputData = singleBanglePrice * Number(event.uom) * Number(event.itemQty);
    // } else {
    //   inputData = Number(event.itemQty) * Number(event.stdUCP);
    // }
    // console.log("inputData==>", inputData);
    // console.log("inputData + tolSum==>", inputData + tolSum);
    // GetCatPBLimit(event, setWishListRowData, inputData + tolSum);
  }

  const reportDropHandler = (input) => {
    setLoading(true);
    setShowInfo(false);
    DisplayValidationRunner();
    setReportLabel(input);
    setLoading(false);
  };

  function scrollTop() {
    window.scrollTo({ top: "0", behavior: "smooth" });
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
    setLoading(true);
    setDataRowInformation(input);
    setShowInfo(true);
    setSwitchEnable(false);
    DisplayValidationRunner();
    scrollTop();
    setLoading(false);
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
      submitStatus: "Wishlist",
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
            main: 'Deleted Successfully',
            contain: "",
          });
        }
        GetWhishlistData(storeCode);
        setShowInfo(false);
        setModification(!modification);
        setLoading(true);
        reportDropHandler(reportLabel);
      }).catch((error) => setLoading(false));
  };

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

  const showInformationHandler = () => setShowInfo(!showInfo);

  const reportOption = [
    "Item_Wise_Report",
    "NeedState",
    "Collection",
    "ItGroup",
    "Category",
    "Cancel_Item_List",
  ];

  return (<React.Fragment>
    <CssBaseline />
    <AlertPopup
      status={alertPopupStatus.status}
      mainLable={alertPopupStatus.main}
      containLable={alertPopupStatus.contain}
      procideHandler=""
      discardHandler=""
      closeHandler={closeHandler}
    />
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
          droptype="Wishlist"
          statusOpener={statusOpener}
        />
      </Grid>
      <Grid item xs={12}>
        {rows.length > 0 ? (
          <LazyLoadingDataGridForWishlist
            col={col}
            rows={rows}
            autoHeight={true}
            autoPageSize={true}
            reportLabel="Wishlist"
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
            getCatPbRow={getCatPbRow}
            showInfo={setShowInfo}
            switchEnable={setSwitchEnable}
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
export default WishListedItems;

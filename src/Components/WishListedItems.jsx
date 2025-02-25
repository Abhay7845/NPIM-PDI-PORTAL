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
import { APIDeleteUpdate, APIGetCatPBStoreWise, APIGetItemWiseRptL3, APIGetLimitCatPBWise, APIGetStatuL3, APIGetWishlistData, APIInsLimit, APIInsWishList, APIMoveToIndent, APIPNPIMProductData } from "../HostManager/CommonApiCallL3";

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


  useEffect(() => {
    GetWhishlistData(storeCode);
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

  const WishListToEndent = (event, setWishListRowData) => {
    setLoading(true);
    APIMoveToIndent(`/NPIML3/npim/move/item/wishlist/to/indent/${event.itemCode}/${storeCode}/Indent`)
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

  const InseartCatPBLimit = (event, TotalCalLimit, TotalStdWt) => {
    const encodedCatPB = encodeURIComponent(event.catPB)
    const InsLimitPayload = {
      activity: event.activity,
      totWeight: TotalStdWt,
      totQty: Number(event.itemQty),
      totCost: TotalCalLimit,
      catPB: encodedCatPB,
      storeCode: storeCode,
    }
    console.log("InsLimitPayload==>", InsLimitPayload);
    APIInsLimit('/NPIML3/new/limit/table/ins', InsLimitPayload).then(res => res)
      .then(response => console.log("response==>", response.data))
      .catch(err => console.log(err));
  }

  const ValiDateLimit = (event, setWishListRowData, TotalCalLimit, limit, TotalStdWt) => {
    console.log("limit==>", limit);
    const LimitPercent = limit + (limit * 0.1);
    const LimitPercent_Ve = limit - (limit * 0.1);
    console.log("LimitPercent==>", LimitPercent);
    console.log("LimitPercent_Ve==>", LimitPercent_Ve);
    if (TotalCalLimit > LimitPercent) {
      if (TotalCalLimit > LimitPercent && TotalCalLimit > limit) {
        const alertMessage = 'The Indent Limit has been crossed for this CatPB, Click on "OK" if you still wish to proceed for Indenting this Product. Instead you can also Wishlist this Product!';
        const isConfirmed = window.confirm(alertMessage);
        if (isConfirmed === true) {
          WishListToEndent(event, setWishListRowData);
          InseartCatPBLimit(event, TotalCalLimit, TotalStdWt);
        }
        setLoading(false);
      } else if (TotalCalLimit > LimitPercent_Ve) {
        const alertMessage = 'You are reaching the max limit For CatPB Click Ok to Proceed';
        const isConfirmed = window.confirm(alertMessage);
        if (isConfirmed === true) {
          WishListToEndent(event, setWishListRowData);
          InseartCatPBLimit(event, TotalCalLimit, TotalStdWt);
        }
        setLoading(false);
      } else if (TotalCalLimit > LimitPercent) {
        const alertMessage = 'The Indent Limit has been crossed for this CatPB, Click on "OK" if you still wish to proceed for Indenting this Product. Instead you can also Wishlist this Product!';
        alert(alertMessage);
        setLoading(false);
      }
      setLoading(false);
    } else if (limit === 0) {
      const alertMessage = `There is no Limit Available for this "CatPB" Do you still wish to Indent this Product. Click "OK" to continue or click on "Cancel" to wishlist this Product!`;
      const isConfirmed = window.confirm(alertMessage);
      if (isConfirmed === true) {
        WishListToEndent(event, setWishListRowData);
        InseartCatPBLimit(event, TotalCalLimit, TotalStdWt);
      }
      setLoading(false);
    } else {
      WishListToEndent(event, setWishListRowData);
      InseartCatPBLimit(event, TotalCalLimit, TotalStdWt);
    }
  }

  const GetCatPBLimit = (event, setWishListRowData, TotalCalLimit, TotalStdWt) => {
    setLoading(true);
    const encodedCatPB = encodeURIComponent(event.catPB);
    APIGetLimitCatPBWise(`/NPIML3/limit/against/total?storeCode=${storeCode}&catPB=${encodedCatPB}`)
      .then(res => res).then((response) => {
        if (response.data.code === "1000") {
          console.log("response==>", response.data);
          const getLimit = response.data.limitResp.length > 0 ? response.data.limitResp.map(item => item.limit)[0] : 0;
          const sumTotCost = response.data.sumTableResp.length > 0 ? response.data.sumTableResp.map(item => item.sumTotCost)[0] : 0;
          console.log("sumTotCost==>", sumTotCost);
          console.log("getLimit==>", TotalCalLimit + getLimit);
          ValiDateLimit(event, setWishListRowData, TotalCalLimit + sumTotCost, getLimit, TotalStdWt);
        }
      }).catch(error => {
        console.log("error==>", error);
        setLoading(false);
        toast.error("CatPB Is Not Available Hence Data Can't Be Saved!", { theme: "colored" });
      });
  }

  const MoveToWishlist = async (event, setWishListRowData) => {
    // WishListToEndent(event.itemCode, setWishListRowData);
    console.log("event==>", event);
    const GetItemWiseReports = async (storeCode) => {
      try {
        setLoading(true);
        const response = await APIGetItemWiseRptL3(`/NPIML3/npim/item/wise/rpt/L3/${storeCode}`);
        setLoading(false);
        if (response.data.code === "1000") {
          const isCatPB = response.data.value.filter(item => item.catPB);
          const catPbDataUpper = isCatPB.filter(item_1 => item_1.catPB.toUpperCase() === event.catPB.toUpperCase());
          const catPbWiseData = catPbDataUpper.filter(item_2 => item_2.catPB.replace(/\s+/g, '').trim() == event.catPB.replace(/\s+/g, '').trim());
          const tolCostVal = catPbWiseData.map(item_3 => Number(item_3.tolCost));
          return tolCostVal.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        } else {
          return 0
        }
      } catch (error) {
        return setLoading(false);
      }
    }

    const tolSum = await GetItemWiseReports(storeCode);
    console.log("tolSum==>", tolSum);

    // <------------------------------------ UMO UCP LIMIT CALUCATION-------------------------------->
    let TotalCalLimit = 0;
    const bangle11Digit = (event.category === "BANGLE" || event.category === "BANGLES") && event.itemCode.charAt(10);
    if (event.category.toUpperCase() === "BANGLE" || event.category === "BANGLES") {
      const singleBanglePrice = Number(event.stdUCP) / Number(bangle11Digit) || 1;
      TotalCalLimit = singleBanglePrice * Number(event.uom) * Number(event.itemQty);
    } else {
      TotalCalLimit = Number(event.itemQty) * Number(event.stdUCP);
    }
    console.log("TotalCalLimit + tolSum==>", TotalCalLimit + tolSum);

    // <------------------------------------ UMO STD WT CALUCATION-------------------------------->
    let TotalStdWt = 0;
    if (event.category.toUpperCase() === "BANGLE" || event.category === "BANGLES") {
      const singleBanglePrice = Number(event.stdWt) / Number(bangle11Digit) || 1;
      TotalStdWt = singleBanglePrice * Number(event.uom) * Number(event.itemQty);
    } else {
      TotalStdWt = Number(event.itemQty) * Number(event.stdWt);
    }
    console.log("TotalStdWt==>", TotalStdWt);
    GetCatPBLimit(event, setWishListRowData, TotalCalLimit + tolSum, TotalStdWt);
  }

  const reportDropHandler = (input) => {
    setLoading(true);
    setShowInfo(false);
    DisplayValidationRunner();
    setReportLabel(input);
    setLoading(false);
  };

  function closeHandler() {
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
    window.scrollTo({ top: "0", behavior: "smooth" });
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

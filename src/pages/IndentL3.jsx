/*eslint no-restricted-globals: ["error", "event", "fdescribe"]*/
import { Container, Grid, Typography, CssBaseline } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ImgShow from "../Components/ImgShow";
import { toast } from 'react-toastify';
import LowerHeader from "../Components/LowerHeader";
import ProductDetailsTabular from "../Components/ProductDetailsTabular";
import UpperHeader from "../Components/UpperHeader";
import { Button } from "@material-ui/core";
import StaticTabularInformation from "../Components/StaticTabularInformation";
import NpimDataDisplay from "../Components/NpimDataDisplay";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import DisplayValidationComponent from "../Components/DisplayValidationForL3";
import AlertPopup from "../Components/AlertPopup";
import { BlinkingComponent, SmallDataTable } from "../Components/ComponentForL3";
import { useStyles } from "../Style/IndentL3";
import { imageUrl } from "../DataCenter/DataList";
import { APIGetCatList, APIGetCatPBStoreWise, APIGetStatuL3, APIInsLimit, APIPNPIMProductData, APISaveFormDataL3, APISetCatCode } from "../HostManager/CommonApiCallL3";
import CoupleBandStoneTable from "../Components/NewComponents/CoupleBandStoneTable";

const IndentL3 = () => {
  const { storeCode, rsoName } = useParams();
  const classes = useStyles();
  const [feedShowState, setFeedShowState] = useState({
    ...NpimDataDisplay,
    strCode: storeCode,
  });
  const [loading, setLoading] = useState(false);
  const [resetDrop, SetResetDrop] = useState(true);
  const [alertPopupStatus, setAlertPopupStatus] = useState({
    status: false,
    main: "",
    contain: "",
    mode: false,
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

  const [productDetails, setProductDetails] = useState({
    collection: "ALL",
    consumerBase: "ALL",
    group: "ALL",
    category: "ALL",
    itemCode: "",
    setDropState: "",
  });

  const [statusData, setStatusData] = useState({
    col: [],
    row: [],
  });
  const [digit, setDigit] = useState();
  const [setSelectState, setSetSelectState] = useState([]);

  const GetProductDetailsBySearch = (productDetails) => {
    setLoading(true);
    setDigit();
    if (productDetails.itemCode !== "") {
      APIPNPIMProductData(`/NPIM/base/npim/get/product/details`, productDetails)
        .then((response) => {
          if (response.data.code === "1001") {
            document.getElementById("result").style.visibility = "hidden";
            setAlertPopupStatus({
              status: true,
              main: "ItemCode not in Master",
              contain: "",
              mode: true,
            });
            productDetails.setDropState("");
          } else if (response.data.code === "1003") {
            document.getElementById("result").style.visibility = "hidden";
            setAlertPopupStatus({
              status: true,
              main: response.data.value,
              contain: "",
              mode: true,
            });
            productDetails.setDropState("");
          } else if (response.data.code === "1000") {
            if (productDetails.itemCode === "") {
              document.getElementById("result").style.visibility = "hidden";
            } else if (productDetails.itemCode !== "") {
              document.getElementById("result").style.visibility = "visible";
            }
            setFeedShowState(response.data.value);
            setDigit(response.data.value.itemCode[6]);
          }
          setLoading(false);
        }).catch((error) => setLoading(false));
    }
  }

  const GetStatusReport = (storeCode) => {
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

  useEffect(async () => {
    GetProductDetailsBySearch(productDetails);
    GetStatusReport(storeCode);
  }, [productDetails]);

  const navBarList = [
    {
      id: 1,
      name: "Home",
      link: `/NpimPortal/indentL3/${storeCode}/${rsoName}`,
      icon: "HomeIcon",
    },
    {
      id: 3,
      name: "Report",
      link: `/NpimPortal/reportL3/${storeCode}/${rsoName}`,
      icon: "ReportIcon",
    },
    {
      id: 4,
      name: "Wishlist",
      link: `/NpimPortal/wishlist/${storeCode}/${rsoName}`,
      icon: "CheckList",
    },
  ];

  const onSearchClick = (dropState, setDropState) => {
    setProductDetails({
      storeCode: storeCode,
      collection: "ALL",
      consumerBase: "ALL",
      group: "ALL",
      category: "ALL",
      itemCode: dropState,
      setDropState: setDropState,
    });
  };

  const WishlistYourProducts = (Wishlist) => {
    const inputData = {
      category: productDetails.category,
      childNodesE: feedShowState.childNodesE,
      childNodesN: feedShowState.childNodesN,
      childNodeF: feedShowState.childNodeF,
      childNodeO: feedShowState.childNodeO,
      childNodeV: feedShowState.childNodeV,
      childNodeK: feedShowState.childNodeK,
      childNodeH: feedShowState.childNodeH,
      collection: productDetails.collection,
      karatageRange: feedShowState.karatageRange,
      consumerbase: productDetails.consumerBase,
      findings: allDataFromValidation.findingsRes,
      indCategory: feedShowState.category,
      indQty: "1",
      indentLevelType: feedShowState.itemLevelType,
      itemCode: feedShowState.itemCode,
      itgroup: productDetails.group,
      npimEventNo: feedShowState.npimEventNo,
      reasons: "",
      rsoName: rsoName,
      saleable: "",
      set2Type: allDataFromValidation.typeSet2Res,
      sizeQuantitys: allDataFromValidation.sizeQuantityRes,
      sizeUomQuantitys: allDataFromValidation.sizeUomQuantityRes,
      stoneQuality: allDataFromValidation.stoneQualityRes,
      stoneQualityVal: feedShowState.stoneQualityVal,
      strCode: storeCode,
      submitStatus: Wishlist,
      tagQuantitys: allDataFromValidation.tegQuantityRes,
    };
    setLoading(true);
    APISaveFormDataL3(`/NPIML3/npim/insert/responses/from/L3`, inputData)
      .then((response) => {
        if (response.data.code === "1001") {
          setAlertPopupStatus({
            status: true,
            main: "Sorry Data Not Saved",
            contain: "",
            mode: true,
          });
        } else if (response.data.code === "1000") {
          document.getElementById("result").style.visibility = "hidden";
          setAlertPopupStatus({
            status: true,
            main: "Data has been saved Successfully",
            contain: "",
            mode: true,
          });
          setFeedShowState(response.data.value);
          setAllDataFromValidation({
            sizeUomQuantityRes: [],
            sizeQuantityRes: [],
            stoneQualityRes: "",
            tegQuantityRes: [],
            typeSet2Res: "",
            quantityRes: "",
            findingsRes: "",
          });
          setLoading(false);
          productDetails.setDropState("");
        } else if (response.data.code === "1005") {
          setAlertPopupStatus({
            status: true,
            main: response.data.value,
            contain: "",
            mode: true,
          });
        }
        setLoading(false);
      }).catch((error) => setLoading(false));
  }

  const IndentYourProduct = (Indent) => {
    const inputData = {
      category: productDetails.category,
      childNodesE: feedShowState.childNodesE,
      childNodesN: feedShowState.childNodesN,
      childNodeF: feedShowState.childNodeF,
      childNodeO: feedShowState.childNodeO,
      childNodeV: feedShowState.childNodeV,
      childNodeK: feedShowState.childNodeK,
      childNodeH: feedShowState.childNodeH,
      collection: productDetails.collection,
      karatageRange: feedShowState.karatageRange,
      consumerbase: productDetails.consumerBase,
      findings: allDataFromValidation.findingsRes,
      indCategory: feedShowState.category,
      indQty: allDataFromValidation.quantityRes,
      indentLevelType: feedShowState.itemLevelType,
      itemCode: feedShowState.itemCode,
      itgroup: productDetails.group,
      npimEventNo: feedShowState.npimEventNo,
      reasons: "",
      rsoName: rsoName,
      saleable: "",
      set2Type: allDataFromValidation.typeSet2Res,
      sizeQuantitys: allDataFromValidation.sizeQuantityRes,
      sizeUomQuantitys: allDataFromValidation.sizeUomQuantityRes,
      stoneQuality: allDataFromValidation.stoneQualityRes,
      stoneQualityVal: feedShowState.stoneQualityVal,
      strCode: storeCode,
      submitStatus: Indent,
      tagQuantitys: allDataFromValidation.tegQuantityRes,
    };
    setLoading(true);
    APISaveFormDataL3(`/NPIML3/npim/insert/responses/from/L3`, inputData)
      .then(res => res).then((response) => {
        if (response.data.code === "1001") {
          setAlertPopupStatus({
            status: true,
            main: "Sorry Data Not Saved",
            contain: "",
            mode: true,
          });
        } else if (response.data.code === "1000") {
          document.getElementById("result").style.visibility = "hidden";
          setAlertPopupStatus({
            status: true,
            main: "Data has been saved Successfully",
            contain: "",
            mode: true,
          });
          setFeedShowState(response.data.value);
          setAllDataFromValidation({
            sizeUomQuantityRes: [],
            sizeQuantityRes: [],
            stoneQualityRes: "",
            tegQuantityRes: [],
            typeSet2Res: "",
            quantityRes: "",
            findingsRes: "",
          });
          setLoading(false);
          productDetails.setDropState("");
        } else if (response.data.code === "1005") {
          setAlertPopupStatus({
            status: true,
            main: response.data.value,
            contain: "",
            mode: true,
          });
        }
        setLoading(false);
      }).catch((error) => setLoading(false));
  }


  const FinalSubmit = (inputData, data) => {
    // IndentYourProduct("Indent");
    const { limit, totalIndentAgainstCatPB } = data;
    if (limit >= totalIndentAgainstCatPB) {
      if (inputData.indQty * Number(feedShowState.stdUCP) < limit) {
        const alertMessage = 'The Indent Limit has been crossed for this CatPB, Click on "OK" if you still wish to proceed for Indenting this Product. Instead you can also Wishlist this Product!';
        const isConfirmed = window.confirm(alertMessage);
        if (isConfirmed === true) {
          IndentYourProduct("Indent");
        }
      } else {
        IndentYourProduct("Indent");
      }
    } else if (limit === 0) {
      const alertMessage = `There is no Limit Available for this "CatPB" Do you still wish to Indent this Product. Click "OK" to continue or click on "Cancel" to wishlist this Product!`;
      const isConfirmed = window.confirm(alertMessage);
      if (isConfirmed === true) {
        IndentYourProduct("Indent");
      }
    } else {
      IndentYourProduct("Indent");
    }
  }

  const GetCatPBLimit = (inputData) => {
    APIGetCatPBStoreWise(`/NPIM/base/get/catPB/limit/storewise/${storeCode}/${feedShowState.catPB}`)
      .then((response) => {
        if (response.data.code === "1000") {
          FinalSubmit(inputData, response.data.value);
        } else {
          FinalSubmit(inputData, response.data.value);
        }
      }).catch(error => {
        setLoading(false);
        toast.error("CatPB Is Not Available Hence Data Can't Be Saved!", { theme: "colored" });
      });
  }

  const onClickSubmitBtnHandler = (value) => {
    const inputDataPayload = {
      category: productDetails.category,
      childNodesE: feedShowState.childNodesE,
      childNodesN: feedShowState.childNodesN,
      childNodeF: feedShowState.childNodeF,
      childNodeO: feedShowState.childNodeO,
      childNodeV: feedShowState.childNodeV,
      childNodeK: feedShowState.childNodeK,
      childNodeH: feedShowState.childNodeH,
      collection: productDetails.collection,
      karatageRange: feedShowState.karatageRange,
      consumerbase: productDetails.consumerBase,
      findings: allDataFromValidation.findingsRes,
      indCategory: feedShowState.category,
      indQty: allDataFromValidation.quantityRes,
      indentLevelType: feedShowState.itemLevelType,
      itemCode: feedShowState.itemCode,
      itgroup: productDetails.group,
      npimEventNo: feedShowState.npimEventNo,
      reasons: "",
      rsoName: rsoName,
      saleable: "",
      set2Type: allDataFromValidation.typeSet2Res,
      sizeQuantitys: allDataFromValidation.sizeQuantityRes,
      sizeUomQuantitys: allDataFromValidation.sizeUomQuantityRes,
      stoneQuality: allDataFromValidation.stoneQualityRes,
      stoneQualityVal: feedShowState.stoneQualityVal,
      strCode: storeCode,
      submitStatus: value,
      tagQuantitys: allDataFromValidation.tegQuantityRes,
    };
    if (value === "Wishlist") {
      WishlistYourProducts("Wishlist");
    } else if (value === "Indent") {
      GetCatPBLimit(inputDataPayload);
    }
    window.scrollTo({ top: "0", behavior: "smooth" });
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
    setLoading(false);
    SetResetDrop(true);
  }

  function allDataChangeHandler(allValidationInput) {
    setAllDataFromValidation(allValidationInput);
  }

  function sizeUomQuantityResHandler(sizeUomQuantityData) {
    setAllDataFromValidation({
      sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
      stoneQualityRes: allDataFromValidation.stoneQualityRes,
      tegQuantityRes: allDataFromValidation.tegQuantityRes,
      typeSet2Res: allDataFromValidation.typeSet2Res,
      quantityRes: allDataFromValidation.quantityRes,
      findingsRes: allDataFromValidation.findingsRes,
      sizeUomQuantityRes: sizeUomQuantityData,
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
      stoneQualityRes: stoneQualityData.target.value,
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
      typeSet2Res: typeSet2Data.target.value,
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
      findingsRes: findingsData.target.value,
    });
  }

  function tegSelectionResHandler(tegSelectionData) {
    if (tegSelectionData.target.value === "Separate") {
      APIGetCatList(`/npim/get/set/category/list/${feedShowState.itemCode}`)
        .then((response) => {
          if (response.data.code === 1000) {
            setSetSelectState(response.data.value.map((element) => element.category));
          }
        }).catch((error) => setLoading(false));
    } else if (tegSelectionData.target.value === "Set") {
      APISetCatCode(`/npim/item/set/category/code/${feedShowState.itemCode}`)
        .then((response) => {
          if (response.data.code === 1000) {
            setSetSelectState(response.data.value);
          }
        }).catch((error) => setLoading(false));
    }
  }


  return (
    <div>
      <CssBaseline />
      <Container maxWidth="xl" className={classes.root}>
        <AlertPopup
          status={alertPopupStatus.status}
          mainLable={alertPopupStatus.main}
          containLable={alertPopupStatus.contain}
          procideHandler=""
          discardHandler=""
          closeHandler={() => alertPopupStatus.mode ? closeHandlerForRest() : closeHandler()}
        />
        <Grid container className={classes.main}>
          <Grid item xs={12}>
            <UpperHeader
              itemCode={feedShowState.itemCode}
              storeCode={storeCode}
            />
            <Loading flag={loading} />
            {resetDrop ? (
              <LowerHeader
                onSear={onSearchClick}
                navBarList={navBarList}
                statusData={statusData}
                setAllDataFromValidation={setAllDataFromValidation}
                L3={true}
              />
            ) : (
              "Loading...!"
            )}
          </Grid>
          <div
            id="result"
            style={{ visibility: "hidden" }}
            className="w-100"
          >
            <Grid direction="row" container>
              <Grid item xs={12} md={5} style={{ paddingTop: "0.4%" }}>
                <div className={classes.imgShow}>
                  {feedShowState.itemCode ? (
                    <ImgShow
                      itemCode={feedShowState.itemCode}
                      videoLink={feedShowState.videoLink || ""}
                      imgLink={imageUrl}
                    />
                  ) : null}
                </div>
              </Grid>
              <Grid item xs={12} md={7} style={{ paddingTop: "0.4%" }}>
                <div className={classes.productInfo}>
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        className={classes.headingColor}
                        align="center"
                      >
                        {feedShowState.itemCode}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <h5 className="text-center my-1">
                        <b>Product Specification</b>
                      </h5>
                      {feedShowState.adVariant ? (
                        <BlinkingComponent
                          color="red"
                          text="AD-Variant"
                          fontSize={15}
                        />
                      ) : null}
                      <ProductDetailsTabular information={feedShowState} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <div>
                        <h5 className="text-center my-1">
                          <b>Indent Details</b>
                        </h5>
                        {feedShowState.btqCount ? (
                          <BlinkingComponent
                            color="red"
                            text={` ${feedShowState.btqCount}  Btqs Indented `}
                            fontSize={15}
                          />
                        ) : null}
                        <br />
                        <Grid container spacing={1}>
                          {digit &&
                            <DisplayValidationComponent
                              digit={feedShowState.itemCode[6]}
                              itemCode={feedShowState.itemCode}
                              setType2option={["Chain", "Dori"]}
                              setSelectOptions={setSelectState}
                              allDataChangeHandler={allDataChangeHandler}
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
                              feedShowState={feedShowState}
                            />
                          }
                        </Grid>
                        {SmallDataTable(feedShowState)}
                      </div>
                      <div>
                        {feedShowState.consumerBase ===
                          "solitarie".toUpperCase() && (
                            <a
                              href="https://tanishqsolitaires.titanjew.in/SolitairePortal/Home/Login"
                              target="iframe_a"
                            >
                              <Button
                                variant="contained"
                                color="primary"
                                className="mt-3"
                              >
                                Book Now
                              </Button>
                            </a>
                          )}
                      </div>
                    </Grid>
                    {feedShowState.si2Gh || feedShowState.vsGh || feedShowState.vvs1 || feedShowState.i2Gh || feedShowState.si2Ij ? (
                      <StaticTabularInformation
                        si2Gh={feedShowState.si2Gh}
                        vsGh={feedShowState.vsGh}
                        vvs1={feedShowState.vvs1}
                        i2Gh={feedShowState.i2Gh}
                        si2Ij={feedShowState.si2Ij}
                      />
                    ) : null}
                    {feedShowState.category === "COUPLE BAND" && (
                      <CoupleBandStoneTable />
                    )}
                  </Grid>
                  <div className="mx-2 my-5">
                    <Button
                      className={classes.btnSub}
                      onClick={() => onClickSubmitBtnHandler("Indent")}
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
                    <Button
                      className={classes.btnSub}
                      onClick={() => onClickSubmitBtnHandler("Wishlist")}
                    >
                      {loading ? (
                        <span
                          className="spinner-border spinner-border-sm text-light"
                          role="status"
                          aria-hidden="true"
                        />
                      ) : (
                        <span>Wishlist</span>
                      )}
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Container>
    </div>
  );
};
export default IndentL3;

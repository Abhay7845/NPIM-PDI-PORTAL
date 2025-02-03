import React, { useEffect, useState } from "react";
import 'setimmediate';
import Blink from "react-blink-text";
import { Container, Grid, Typography, CssBaseline } from "@material-ui/core";
import ImgShow from "../Components/ImgShow";
import LowerHeader from "../Components/LowerHeader";
import LowerHeaderDigital from "../Components/LowerHeaderDigital";
import ProductDetailsTabular from "../Components/ProductDetailsTabular";
import UpperHeader from "../Components/UpperHeader";
import Heart from "react-heart"
import { Button } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import StaticTabularInformation from "../Components/StaticTabularInformation";
import NpimDataDisplay from "../Components/NpimDataDisplay";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import DisplayValidationComponent from "../Components/DisplayValidationForL3";
import AlertPopup from "../Components/AlertPopup";
import { BlinkingComponent, SmallDataTable } from "../Components/ComponentForL3";
import { useStyles } from "../Style/IndentL3";
import { imageUrl } from "../DataCenter/DataList";
import Loader from "../Components/Loader";
import { APICheckItemCode, APIGetCatList, APIGetCatPBStoreWise, APIGetItemWiseRptL3, APIGetPreNextProductData, APIGetStatuL3, APIInsLimit, APIPNPIMProductData, APISaveFormDataL3, APISetCatCode } from "../HostManager/CommonApiCallL3";
import CoupleBandStoneTable from "../Components/NewComponents/CoupleBandStoneTable";
import { toast } from "react-toastify";
import { sizeUCPToKey } from "../DataCenter/DataList";

const IndentL3Digital = () => {
    const { storeCode, rsoName } = useParams();
    const [isClick, setClick] = useState(false);
    const navigate = useNavigate();
    const classes = useStyles();
    const getItemByCard = JSON.parse(sessionStorage.getItem("CardItemCode"));
    const getCartItemCode = sessionStorage.getItem("CartItemCode");
    const roleType = sessionStorage.getItem("store_value");
    const loginData = JSON.parse(sessionStorage.getItem("loginData"));
    const [feedShowState, setFeedShowState] = useState({ ...NpimDataDisplay, strCode: storeCode, });
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

    const [statusData, setStatusData] = useState({
        col: [],
        row: [],
    });

    const [digit, setDigit] = useState("");

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
        setProductDetailsDigital({
            storeCode: storeCode,
            collection: dropState.collection,
            consumerBase: dropState.consumerBase,
            group: dropState.groupData,
            category: dropState.category,
        });
    };

    const onClickNextPreBtnHandler = (direction) => {
        setLoading(true);
        allDataFromValidation.quantityRes = "";
        const NextProductPayload = {
            storeCode: storeCode,
            collection: productDetails.collection,
            consumerBase: productDetails.consumerBase,
            group: productDetails.group,
            category: productDetails.category,
            itemCode: feedShowState.itemCode,
            direction: direction,
        };
        APIGetPreNextProductData(`/NPIM/base/npim/get/product/details/PreNex`, NextProductPayload)
            .then(res => res).then((response) => {
                if (response.data.code === "1001") {
                    setAlertPopupStatus({
                        status: true,
                        main: "No more data available for the selected category",
                        contain: "",
                        mode: true,
                    });
                } else if (response.data.code === "1003") {
                    document.getElementById("result").style.visibility = "hidden";
                } else if (response.data.code === "1000") {
                    document.getElementById("result").style.visibility = "visible";
                    setFeedShowState(response.data.value);
                    setDigit(response.data.value.itemCode[6]);
                }
                setLoading(false);
            }).catch((error) => setLoading(false));
    };

    const GetProductDetailsBySearchPnpim = (productDetails) => {
        setLoading(true);
        APIPNPIMProductData(`/NPIM/base/npim/get/product/details`, productDetails)
            .then(res => res).then((response) => {
                console.log("response==>", response.data);
                sessionStorage.removeItem("CardItemCode");
                if (response.data.code === "1001") {
                    setAlertPopupStatus({
                        status: true,
                        main: "No more data available for the selected category",
                        contain: "",
                        mode: true,
                    });
                    productDetails.setDropState("");
                } else if (response.data.value.itemCode === "Already Indented") {
                    document.getElementById("result").style.visibility = "hidden";
                    setAlertPopupStatus({
                        status: true,
                        main: "Already Indented",
                        contain: "",
                        mode: true,
                    });
                    productDetails.setDropState("");
                    setProductDetails({
                        storeCode: storeCode,
                        collection: "ALL",
                        consumerBase: "ALL",
                        group: "ALL",
                        category: "ALL",
                        itemCode: "",
                        setDropState: "",
                    });
                } else if (response.data.code === "1003") {
                    document.getElementById("result").style.visibility = "hidden";
                    if ((sessionStorage.getItem("Npim-type") === "DNPIM")) {
                        const isIndented = window.confirm(response.data.value);
                        if (isIndented) {
                            navigate(`/NpimPortal/get/products/home/${storeCode}/${rsoName}`)
                        }
                    } else {
                        setAlertPopupStatus({
                            status: true,
                            main: response.data.value,
                            contain: "",
                            mode: true,
                        });
                        setProductDetails({
                            storeCode: storeCode,
                            collection: "ALL",
                            consumerBase: "ALL",
                            group: "ALL",
                            category: "ALL",
                            itemCode: "",
                            setDropState: "",
                        });
                    }
                    productDetails.setDropState("");
                } else if (response.data.code === "1000") {
                    setFeedShowState(response.data.value);
                    setDigit(response.data.value.itemCode[6]);
                    if (productDetails.itemCode === "") {
                        document.getElementById("result").style.visibility = "hidden";
                    } else if (productDetails.itemCode) {
                        document.getElementById("result").style.visibility = "visible";
                    }
                }
                setLoading(false);
            }).catch((error) => setLoading(false));
    }

    const CheckItemCode = (itemCode) => {
        setLoading(true);
        APICheckItemCode(`/api/NPIM/l1l2/get/check/itemCode?itemcode=${itemCode}`)
            .then(res => res).then(response => {
                if (response.data.code === "1000") {
                    GetProductDetailsBySearchPnpim(productDetails);
                } else {
                    setAlertPopupStatus({
                        status: true,
                        main: "ItemCode Not In Master",
                        contain: "",
                        mode: true,
                    });
                    setLoading(false);
                    productDetails.setDropState("");
                }
            }).then(err => setLoading(false));
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

    useEffect(() => {
        if (sessionStorage.getItem("Npim-type") === "PNPIM") {
            if (getItemByCard) {
                const getItemByCardDataNpim = {
                    storeCode: storeCode,
                    collection: "ALL",
                    consumerBase: "ALL",
                    group: "ALL",
                    category: "ALL",
                    itemCode: getItemByCard.itemCode,
                }
                GetProductDetailsBySearchPnpim(getItemByCardDataNpim);
            }
        } else if (sessionStorage.getItem("Npim-type") === "DNPIM") {
            if (getItemByCard) {
                const getItemByCardData = {
                    storeCode: storeCode,
                    collection: "ALL",
                    consumerBase: "ALL",
                    group: "ALL",
                    category: "ALL",
                    itemCode: getItemByCard.itemCode,
                }
                GetProductDetailsBySearchPnpim(getItemByCardData);
            } else if (getCartItemCode) {
                const getItemByCardDataNpim = {
                    storeCode: storeCode,
                    collection: "ALL",
                    consumerBase: "ALL",
                    group: "ALL",
                    category: "ALL",
                    itemCode: getCartItemCode,
                }
                GetProductDetailsBySearchPnpim(getItemByCardDataNpim);
            }
        }
        GetStatusReport(storeCode);
    }, [productDetails, productDetailsDigital, getItemByCard]);

    useEffect(() => {
        if (productDetails.itemCode) {
            CheckItemCode(productDetails.itemCode);
        }
        // GetItemWiseReports(storeCode);
    }, [productDetails.itemCode]);

    const navBarList = [
        {
            id: 1,
            name: "Home",
            link: `/NpimPortal/IndentL3Digital/${storeCode}/${rsoName}`,
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

    const ResetAllFiledDetails = () => {
        setAllDataFromValidation({
            sizeUomQuantityRes: [],
            sizeQuantityRes: [],
            stoneQualityRes: "",
            tegQuantityRes: [],
            typeSet2Res: "",
            quantityRes: "",
            findingsRes: "",
        });
        productDetails.setDropState("");
        setProductDetails({
            storeCode: storeCode,
            collection: "ALL",
            consumerBase: "ALL",
            group: "ALL",
            category: "ALL",
            itemCode: "",
            setDropState: "",
        });
    }
    const IndentYourProduct = (value) => {
        const itemsToExclude = ['Only_MANGALSUTRA', 'ONLY_BANGLE', 'Only_FINGERRING'];
        const filteredTags = allDataFromValidation.tegQuantityRes.filter(item => !itemsToExclude.includes(item.size));

        const IndentPdtPayload = {
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
            stoneQualityVal: null,
            strCode: storeCode,
            submitStatus: value,
            tagQuantitys: filteredTags,
        };
        console.log("IndentPdtPayload==>", IndentPdtPayload);
        setLoading(true);
        APISaveFormDataL3(`/NPIML3/npim/insert/responses/from/L3`, IndentPdtPayload)
            .then(res => res).then((response) => {
                console.log("response==>", response.data);
                if (response.data.code === "1001") {
                    setAlertPopupStatus({
                        status: true,
                        main: "Childnode Details Not Found Hence Data No Saved",
                        contain: "",
                        mode: true,
                    });
                } else if (response.data.code === "1000") {
                    document.getElementById("result").style.visibility = "hidden";
                    if (sessionStorage.getItem("Npim-type") === "DNPIM") {
                        if (roleType === "L3" && getCartItemCode) {
                            setAlertPopupStatus({
                                status: true,
                                main: "Data has been saved Successfully",
                                contain: "",
                                mode: true,
                            });
                            setTimeout(() => {
                                navigate(`/NpimPortal/cart/product/L3/${storeCode}/${rsoName}`);
                            }, 2000);
                        }
                        sessionStorage.removeItem("CartItemCode");
                    }
                    setAlertPopupStatus({
                        status: true,
                        main: "Data has been saved Successfully",
                        contain: "",
                        mode: true,
                    });
                    setFeedShowState(response.data.value);
                    ResetAllFiledDetails();
                } else if (response.data.code === "1005") {
                    if (sessionStorage.getItem("Npim-type") === "PNPIM") {
                        setAlertPopupStatus({
                            status: true,
                            main: response.data.value,
                            contain: "",
                            mode: true,
                        });
                    } else {
                        setAlertPopupStatus({
                            status: true,
                            main: "All Products has been Indented Successfully",
                            contain: "",
                            mode: true,
                        });
                    }
                }
                sessionStorage.removeItem("CardItemCode");
                setLoading(false);
                setClick(false);
            }).catch((error) => setLoading(false));
    }

    // const FinalSubmit = (inputData, limit, value) => {
    //     console.log("limit==>", limit);
    //     console.log("inputData==>", inputData);
    //     const LimitPercent = limit + (limit * 0.1);
    //     const LimitPercent_Ve = limit - (limit * 0.1);
    //     console.log("LimitPercent==>", LimitPercent);
    //     console.log("LimitPercent_Ve==>", LimitPercent_Ve);
    //     if (inputData > LimitPercent) {
    //         console.log("1==>");
    //         if (inputData > LimitPercent && inputData > limit) {
    //             console.log("2==>");
    //             const alertMessage = 'The Indent Limit has been crossed for this CatPB, Click on "OK" if you still wish to proceed for Indenting this Product. Instead you can also Wishlist this Product!';
    //             const isConfirmed = window.confirm(alertMessage);
    //             if (isConfirmed === true) {
    //                 IndentYourProduct(value);
    //             }
    //             setLoading(false);
    //         } else if (inputData > LimitPercent_Ve) {
    //             console.log("3==>");
    //             const alertMessage = 'You are reaching the max limit For CatPB Click Ok to Proceed';
    //             const isConfirmed = window.confirm(alertMessage);
    //             if (isConfirmed === true) {
    //                 IndentYourProduct(value);
    //             }
    //             setLoading(false);
    //         } else if (inputData > LimitPercent) {
    //             console.log("5==>");
    //             const alertMessage = 'The Indent Limit has been crossed for this CatPB, Click on "OK" if you still wish to proceed for Indenting this Product. Instead you can also Wishlist this Product!';
    //             alert(alertMessage);
    //             setLoading(false);
    //         }
    //         setLoading(false);
    //     } else if (limit === 0) {
    //         console.log("6==>");
    //         const alertMessage = `There is no Limit Available for this "CatPB" Do you still wish to Indent this Product. Click "OK" to continue or click on "Cancel" to wishlist this Product!`;
    //         const isConfirmed = window.confirm(alertMessage);
    //         if (isConfirmed === true) {
    //             IndentYourProduct(value);
    //         }
    //         setLoading(false);
    //     } else {
    //         console.log("7==>");
    //         IndentYourProduct(value);
    //     }
    // }

    // const GetCatPBLimit = (inputData, value) => {
    //     const encodedCatPB = encodeURIComponent(feedShowState.catPB);
    //     console.log("encodedCatPB==>", encodedCatPB);
    //     setLoading(true);
    //     APIGetCatPBStoreWise(`/NPIML3/check/limit/catpb/excel?strCode=${storeCode}&catPB=${encodedCatPB}`)
    //         .then(res => res).then((response) => {
    //             console.log("response==>", response.data);
    //             if (response.data.code === "1000") {
    //                 FinalSubmit(inputData, Number(response.data.value[3]), value);
    //             } else {
    //                 FinalSubmit(inputData, Number(response.data.value[3]) || 0, value);
    //             }
    //         }).catch(error => {
    //             setLoading(false);
    //             toast.error("CatPB Is Not Available Hence Data Can't Be Saved!", { theme: "colored" });
    //         });
    // }

    const onClickSubmitBtnHandler = async (value) => {
        // IndentYourProduct(value);
        // window.scrollTo({ top: "0", behavior: "smooth" });

        const GetItemWiseReports = async (storeCode) => {
            try {
                setLoading(true);
                const response = await APIGetItemWiseRptL3(`/NPIML3/npim/item/wise/rpt/L3/${storeCode}`);
                setLoading(false);
                if (response.data.code === "1000") {
                    const isCatPB = response.data.value.filter(item => item.catPB);
                    const catPbDataUpper = isCatPB.filter(item_1 => item_1.catPB.toUpperCase() === feedShowState.catPB.toUpperCase());
                    const catPbWiseData = catPbDataUpper.filter(item_2 => item_2.catPB.replace(/\s+/g, '').trim() == feedShowState.catPB.replace(/\s+/g, '').trim());
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

        // const itemsToExclude = ['Only_MANGALSUTRA', 'ONLY_BANGLE', 'Only_FINGERRING'];
        // const filteredTags = allDataFromValidation.tegQuantityRes.filter(item => !itemsToExclude.includes(item.size));
        // const SizableTag = allDataFromValidation.tegQuantityRes.map(tag => tag.size)
        // const stdUcpVal = allDataFromValidation.stoneQualityRes.split("-");

        // const QuantitySum = (data) => {
        //     let totalSum = 0;
        //     data.forEach(item => {
        //         Object.values(item).forEach(value => {
        //             const number = parseFloat(value);
        //             if (!isNaN(number)) {
        //                 totalSum += number;
        //             }
        //         });
        //     });
        //     return totalSum;
        // }

        // /// for SET TAG 
        // const TagQunatityData = filteredTags.map(item => {
        //     const costKey = sizeUCPToKey[item.size];
        //     const unitCost = stdUcpVal[1] ? Number(stdUcpVal[1]) : Number(feedShowState[costKey]);
        //     const quantity = Number(item.quantity);
        //     const set2TagUnitCost = item.size === "Set2Tag" && stdUcpVal[1] ? Number(stdUcpVal[1]) : Number(feedShowState.stdUcpN) + stdUcpVal[1] ? Number(stdUcpVal[1]) : Number(feedShowState.stdUcpE);
        //     const set2Tag_HUnitCost = item.size === "Set2Tag_H" && stdUcpVal[1] ? Number(stdUcpVal[1]) : Number(feedShowState.stdUcpH) + stdUcpVal[1] ? Number(stdUcpVal[1]) : Number(feedShowState.stdUcpE);
        //     return {
        //         size: item.size,
        //         quantity: (item.size === "Set2Tag" && set2TagUnitCost * quantity) || (item.size === "Set2Tag_H" && set2Tag_HUnitCost * quantity) || unitCost * quantity,
        //     };
        // });

        // // FOR BANGLE 
        // let UmoSizeLimit = 0;
        // const bangle11Digit = feedShowState.category === "BANGLE" || feedShowState.category === "BANGLES" ? feedShowState.itemCode.charAt(10) : feedShowState.childNodeV.charAt(10);
        // if (SizableTag.includes("Only_BANGLE")) {
        //     const singleBanglePrice = Number(parseFloat(stdUcpVal[1] ? stdUcpVal[1] : feedShowState.stdUcpV).toFixed(1)) / Number(bangle11Digit) || 1;
        //     const sizeUomQuantityPrise = allDataFromValidation.sizeUomQuantityRes.map(item => {
        //         const updatedItem = { size: item.size };
        //         for (const key in item) {
        //             if (key.startsWith('uom') && item[key] !== "") {
        //                 const uomVal = Number(key.substring(3));
        //                 updatedItem[key] = Number(item[key]) * singleBanglePrice * uomVal;
        //             } else if (key !== "size") {
        //                 updatedItem[key] = item[key];
        //             }
        //         }
        //         return updatedItem;
        //     });
        //     UmoSizeLimit = QuantitySum(sizeUomQuantityPrise);
        // } else {
        //     const singleBanglePrice = Number(parseFloat(stdUcpVal[1] ? stdUcpVal[1] : feedShowState.stdUCP).toFixed(1)) / Number(bangle11Digit) || 1;
        //     const sizeUomQuantityPrise = allDataFromValidation.sizeUomQuantityRes.map(item => {
        //         const updatedItem = { size: item.size };
        //         for (const key in item) {
        //             if (key.startsWith('uom') && item[key] !== "") {
        //                 const uomVal = Number(key.substring(3));
        //                 updatedItem[key] = Number(item[key]) * singleBanglePrice * uomVal;
        //             } else if (key !== "size") {
        //                 updatedItem[key] = item[key];
        //             }
        //         }
        //         return updatedItem;
        //     });
        //     UmoSizeLimit = QuantitySum(sizeUomQuantityPrise)
        // }

        // const tagSizeLimit = QuantitySum(TagQunatityData);
        // console.log("tagSizeLimit==>", tagSizeLimit);
        // const SizeQuntyTotal = QuantitySum(allDataFromValidation.sizeQuantityRes);
        // console.log("SizeQuntyTotal==>", SizeQuntyTotal);

        // let sizeLimit = 0;
        // if (SizableTag.includes("Only_FINGERRING")) {
        //     sizeLimit = SizeQuntyTotal * parseFloat(Number(stdUcpVal[1] ? stdUcpVal[1] : feedShowState.stdUcpF).toFixed(2));
        // } else if (SizableTag.includes("Only_MANGALSUTRA")) {
        //     sizeLimit = SizeQuntyTotal * parseFloat(Number(stdUcpVal[1] ? stdUcpVal[1] : feedShowState.stdUcpN).toFixed(2));
        // } else {
        //     sizeLimit = SizeQuntyTotal * parseFloat(Number(stdUcpVal[1] ? stdUcpVal[1] : feedShowState.stdUCP).toFixed(2));
        // }
        // const indQuntyLimit = Number(allDataFromValidation.quantityRes) * Number(stdUcpVal[1] ? stdUcpVal[1] : feedShowState.stdUCP);
        // const TotalLimit = tagSizeLimit + sizeLimit + UmoSizeLimit + indQuntyLimit + tolSum;
        // console.log("sizeLimit==>", sizeLimit);
        // console.log("TotalLimit==>", TotalLimit);
        // if (value === "Wishlist") {
        //     IndentYourProduct(value);
        // } else if (value === "Indent") {
        //     GetCatPBLimit(TotalLimit, value);
        // }
        // window.scrollTo({ top: "0", behavior: "smooth" });
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


    function sizeUomQuantityResHandler(sizeUomQuantityData) {
        setImmediate(() => {
            setAllDataFromValidation({
                sizeQuantityRes: allDataFromValidation.sizeQuantityRes,
                stoneQualityRes: allDataFromValidation.stoneQualityRes,
                tegQuantityRes: allDataFromValidation.tegQuantityRes,
                typeSet2Res: allDataFromValidation.typeSet2Res,
                quantityRes: allDataFromValidation.quantityRes,
                findingsRes: allDataFromValidation.findingsRes,
                sizeUomQuantityRes: sizeUomQuantityData,
            });
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

    return (
        <React.Fragment>
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
                        {loading === true && < Loader />}
                        {sessionStorage.getItem("Npim-type") === "DNPIM" ?
                            resetDrop ? (
                                <LowerHeaderDigital
                                    onSear={onSearchClick}
                                    navBarList={navBarList}
                                    statusData={statusData}
                                    setAllDataFromValidation={setAllDataFromValidation}
                                    L3={true}
                                />
                            ) : "Loading...!" : ""
                        }
                        {sessionStorage.getItem("Npim-type") === "PNPIM" ?
                            resetDrop ? (
                                <LowerHeader
                                    onSear={onSearchClick}
                                    navBarList={navBarList}
                                    statusData={statusData}
                                    setAllDataFromValidation={setAllDataFromValidation}
                                    L3={true}
                                />
                            ) : "Loading...!" : ""
                        }
                    </Grid>
                    <div
                        id="result"
                        style={{ visibility: "hidden" }}
                        className="w-100"
                    >
                        <Grid direction="row" container>
                            <Grid item xs={12} md={5} style={{ marginTop: "3%" }}>
                                {feedShowState.itemCode && (
                                    <ImgShow
                                        itemCode={feedShowState.itemCode}
                                        videoLink={feedShowState.videoLink || ""}
                                        imgLink={imageUrl}
                                    />
                                )}
                            </Grid>
                            <Grid item xs={12} md={7} style={{ marginTop: "1%" }}>
                                <div className={classes.productInfo}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={12} sm={12}>
                                            <Typography className={classes.headingColor} align="center">{feedShowState.itemCode}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <h5 className="text-center my-1"><b>Product Specification</b></h5>
                                            {feedShowState.adVariant && (
                                                <BlinkingComponent text="AD-Variant"
                                                />
                                            )}
                                            <ProductDetailsTabular information={feedShowState} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <div className="mx-2">
                                                <h5 className="text-center my-1"><b>Indent Details</b></h5>
                                                {feedShowState.btqCount && (
                                                    <div className="d-flex justify-content-between mt-2">
                                                        <BlinkingComponent
                                                            text={`${feedShowState.btqCount} Btqs Indented`}
                                                        />
                                                        <b style={{ marginLeft: "34%", color: "red" }} >Wishlist</b>
                                                        <Heart isActive={isClick} onClick={() => {
                                                            setClick(true);
                                                            onClickSubmitBtnHandler("Wishlist");
                                                        }}
                                                            style={{ width: "22px", marginRight: "30px" }}
                                                        />
                                                    </div>)}
                                                <br />
                                                {digit && (
                                                    <Grid>
                                                        <DisplayValidationComponent
                                                            digit={feedShowState.itemCode[6]}
                                                            itemCode={feedShowState.itemCode}
                                                            setType2option={["Chain", "Dori"]}
                                                            sizeUomQuantityResHandler={sizeUomQuantityResHandler}
                                                            sizeQuantityResHandler={sizeQuantityResHandler}
                                                            stoneQualityResHandler={stoneQualityResHandler}
                                                            tegQuantityResHandler={tegQuantityResHandler}
                                                            typeSet2ResHandler={typeSet2ResHandler}
                                                            quantityResHandler={quantityResHandler}
                                                            findingsResHandler={findingsResHandler}
                                                            allDataFromValidation={allDataFromValidation}
                                                            feedShowState={feedShowState}
                                                        />
                                                    </Grid>
                                                )}
                                                {SmallDataTable(feedShowState)}
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
                                    <div className="d-flex mt-5 mb-2">
                                        {loginData.role === "L1" && <Button
                                            className={classes.btn}
                                            onClick={() => onClickNextPreBtnHandler("pre")}
                                            startIcon={<ArrowBackIosIcon />}
                                            variant="outlined"
                                        >
                                            Previous
                                        </Button>}
                                        <Button
                                            className={classes.btnSub}
                                            onClick={() => onClickSubmitBtnHandler("Indent")}
                                        >
                                            Submit
                                        </Button>
                                        {loginData.role === "L1" && <Button
                                            className={classes.btn}
                                            onClick={() => onClickNextPreBtnHandler("next")}
                                            endIcon={<ArrowForwardIosIcon />}
                                            variant="outlined"
                                        >
                                            Next
                                        </Button>}
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Container>
        </React.Fragment>
    );
};
export default IndentL3Digital;

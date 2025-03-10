/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import ImgShow from "./ImgShow";
import { imageUrl, sizeSTDWTToKey, sizeUCPToKey } from "../DataCenter/DataList";
import { Button, Typography } from "@material-ui/core";
import { ProductDetailsTabularL3 } from "./ComponentForL3";
import StaticTabularInformation from "./StaticTabularInformation";
import DisplayValidationComponent from "./DisplayValidationForL3";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { APIDeleteUpdate, APIGetCatList, APIGetCatPBStoreWise, APIGetItemWiseRptL3, APIGetLimitCatPBWise, APIInsLimit, APISetCatCode, APIUpdateFormL3 } from "../HostManager/CommonApiCallL3";
import { toast } from "react-toastify";

const EditItemWiseProducts = ({ itemWiseData, rows, productsData, AlertPopupStatus, ItemWiseReport, editProductsData }) => {
    const { storeCode, rsoName } = useParams();
    const [loading, setLoading] = useState(false);
    const [allDataFromValidation, setAllDataFromValidation] = useState({
        sizeUomQuantityRes: [],
        sizeQuantityRes: [],
        stoneQualityRes: "",
        tegQuantityRes: [],
        typeSet2Res: "",
        quantityRes: "",
        findingsRes: "",
    });

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

    useEffect(() => {
        setAllDataFromValidation({
            sizeUomQuantityRes: [],
            sizeQuantityRes: [],
            stoneQualityRes: "",
            tegQuantityRes: [],
            typeSet2Res: "",
            quantityRes: "",
            findingsRes: "",
        });
    }, [productsData.itemCode, productsData.id]);


    const UpdateIndentedProduct = (report) => {
        const itemsToExclude = ['Only_MANGALSUTRA', 'Only_BANGLE', 'Only_FINGERRING'];
        const filteredTags = allDataFromValidation.tegQuantityRes.filter(item => !itemsToExclude.includes(item.size));
        const updatePdtPayload = {
            itemCode: productsData.itemCode,
            strCode: storeCode,
            saleable: "",
            reasons: "",
            childNodesE: productsData.childNodesE,
            childNodesN: productsData.childNodesN,
            childNodeF: productsData.childNodeF,
            childNodeH: productsData.childNodeH,
            childNodeK: productsData.childNodeK,
            childNodeV: productsData.childNodeV,
            childNodeO: productsData.childNodeO,
            findings: allDataFromValidation.findingsRes,
            indQty: allDataFromValidation.quantityRes,
            indCategory: productsData.category,
            submitStatus: report,
            set2Type: allDataFromValidation.typeSet2Res,
            stoneQuality: allDataFromValidation.stoneQualityRes,
            stoneQualityVal: productsData.stoneQualityVal,
            rsoName: rsoName,
            npimEventNo: "1",
            indentLevelType: "L3",
            collection: "",
            consumerbase: productsData.needState,
            itgroup: productsData.itGroup,
            category: productsData.category,
            exSize: productsData.size,
            exUOM: productsData.uom,
            exIndCategory: productsData.indCategory,
            exStonequality: productsData.stoneQuality,
            sizeUomQuantitys: allDataFromValidation.sizeUomQuantityRes,
            sizeQuantitys: allDataFromValidation.sizeQuantityRes,
            tagQuantitys: filteredTags,
        };
        console.log("updatePdtPayload==>", updatePdtPayload);
        setLoading(true);
        APIUpdateFormL3(`/NPIML3/npim/update/responses/from/L3/`, updatePdtPayload)
            .then(res => res).then((response) => {
                if (response.data.code === "1000") {
                    AlertPopupStatus({
                        status: true,
                        main: 'Updated Successfully',
                        contain: "",
                    });
                }
                ItemWiseReport(storeCode);
                editProductsData({});
                setLoading(false);
            }).catch((error) => setLoading(false));
    }

    const InseartCatPBLimit = (TotalCost, TotalStdWt, TolQInpQnty) => {
        const InsLimitPayload = {
            uniqueId: `${storeCode}${productsData.itemCode}`,
            activity: productsData.activity,
            totWeight: TotalStdWt,
            totQty: TolQInpQnty,
            totCost: TotalCost,
            catPB: productsData.catPB,
            storeCode: storeCode,
        }
        console.log("InsLimitPayload==>", InsLimitPayload);
        APIInsLimit('/NPIML3/new/limit/table/ins', InsLimitPayload).then(res => res)
            .then(response => console.log("response==>", response.data))
            .catch(err => console.log(err));
    }

    const ValiDateLimit = (TotalCalLimit, limit, TotalStdWt, TolQInpQnty, TotalCost) => {
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
                    UpdateIndentedProduct("report");
                    InseartCatPBLimit(TotalCost, TotalStdWt, TolQInpQnty);
                }
                setLoading(false);
            } else if (TotalCalLimit > LimitPercent_Ve) {
                const alertMessage = 'You are reaching the max limit For CatPB Click Ok to Proceed';
                const isConfirmed = window.confirm(alertMessage);
                if (isConfirmed === true) {
                    UpdateIndentedProduct("report");
                    InseartCatPBLimit(TotalCost, TotalStdWt, TolQInpQnty);
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
                UpdateIndentedProduct("report");
                InseartCatPBLimit(TotalCost, TotalStdWt, TolQInpQnty);
            }
            setLoading(false);
        } else {
            UpdateIndentedProduct("report");
            InseartCatPBLimit(TotalCost, TotalStdWt, TolQInpQnty);
        }
    }

    const GetCatPBLimit = (TotalCalLimit, TotalStdWt, TolQInpQnty, TotalCost) => {
        setLoading(true);
        const encodedCatPB = encodeURIComponent(productsData.catPB);
        APIGetLimitCatPBWise(`/NPIML3/limit/against/total?storeCode=${storeCode}&catPB=${encodedCatPB}`)
            .then(res => res).then((response) => {
                if (response.data.code === "1000") {
                    console.log("response==>", response.data);
                    const getLimit = response.data.limitResp.length > 0 ? response.data.limitResp.map(item => item.limit)[0] : 0;
                    const limit = parseFloat(getLimit).toFixed(2);
                    console.log("limit==>", Number(limit));
                    ValiDateLimit(TotalCalLimit, Number(limit), TotalStdWt, TolQInpQnty, TotalCost);
                }
            }).catch(error => {
                console.log(error);
                setLoading(false);
                toast.error("CatPB Is Not Available Hence Data Can't Be Saved!", { theme: "colored" });
            });
    }
    console.log("productsData==>", productsData);

    const UpdateReportsPdtDetails = async () => {
        // UpdateIndentedProduct("report");

        const GetItemWiseReports = async (storeCode) => {
            try {
                setLoading(true);
                const response = await APIGetItemWiseRptL3(`/NPIML3/npim/item/wise/rpt/L3/${storeCode}`);
                setLoading(false);
                if (response.data.code === "1000") {
                    const isCatPB = response.data.value.filter(item => item.catPB);
                    const catPbDataUpper = isCatPB.filter(item_1 => item_1.catPB.toUpperCase() === productsData.catPB.toUpperCase());
                    const catPbWiseData = catPbDataUpper.filter(item_2 => item_2.catPB.replace(/\s+/g, '').trim() == productsData.catPB.replace(/\s+/g, '').trim());
                    const tolCostVal = catPbWiseData.map(item_3 => Number(item_3.tolCost));
                    return tolCostVal.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                } else {
                    return 0;
                }
            } catch (error) {
                return setLoading(false);
            }
        }
        const tolIndentedLimit = await GetItemWiseReports(storeCode);
        console.log("tolIndentedLimit==>", tolIndentedLimit);
        const rowTolLimit = tolIndentedLimit - Number(productsData.tolCost);
        console.log("rowTolLimit==>", rowTolLimit);

        const itemsToExclude = ['Only_MANGALSUTRA', 'ONLY_BANGLE', 'Only_FINGERRING'];
        const filteredTags = allDataFromValidation.tegQuantityRes.filter(item => !itemsToExclude.includes(item.size));
        const SizableTag = allDataFromValidation.tegQuantityRes.map(tag => tag.size);
        const stdUcpVal = allDataFromValidation.stoneQualityRes.split("-");

        const QuantitySum = (data) => {
            let totalSum = 0;
            data.forEach(item => {
                Object.values(item).forEach(value => {
                    const number = parseFloat(value);
                    if (!isNaN(number)) {
                        totalSum += number;
                    }
                });
            });
            return totalSum;
        }

        // < ----------------------------TOTAL QUANTITY CALCULATION---------------------------->
        const TagQnty = QuantitySum(filteredTags);
        console.log("totalTagQnty==>", TagQnty);
        const BangleQnty = QuantitySum(allDataFromValidation.sizeUomQuantityRes);
        console.log("totalBangleQnty==>", BangleQnty);
        const SizeQnty = QuantitySum(allDataFromValidation.sizeQuantityRes);
        console.log("totalSizeQnty==>", SizeQnty);
        const TolQInpQnty = TagQnty + BangleQnty + SizeQnty + Number(allDataFromValidation.quantityRes);
        console.log("TolQInpQnty==>", TolQInpQnty);


        // -------------------------> STDUCP for SET TAG---------------------->
        const TagQunatityUCPData = filteredTags.map(item => {
            const costKey = sizeUCPToKey[item.size];
            const unitCost = stdUcpVal[1] ? Number(stdUcpVal[1]) : Number(productsData[costKey]);
            const quantity = Number(item.quantity);
            const set2TagUnitCost = item.size === "Set2Tag" && stdUcpVal[1] ? Number(stdUcpVal[1]) : Number(productsData.stdUcpN) + stdUcpVal[1] ? Number(stdUcpVal[1]) : Number(productsData.stdUcpE);
            const set2Tag_HUnitCost = item.size === "Set2Tag_H" && stdUcpVal[1] ? Number(stdUcpVal[1]) : Number(productsData.stdUcpH) + stdUcpVal[1] ? Number(stdUcpVal[1]) : Number(productsData.stdUcpE);
            return {
                size: item.size,
                quantity: (item.size === "Set2Tag" && set2TagUnitCost * quantity) || (item.size === "Set2Tag_H" && set2Tag_HUnitCost * quantity) || (unitCost * quantity),
            };
        });
        console.log("TagQunatityUCPData==>", TagQunatityUCPData);

        // -------------------------> STDWT for SET TAG---------------------->
        const TagQunatityStdWtData = filteredTags.map(item => {
            const costKey = sizeSTDWTToKey[item.size];
            const unitCost = Number(productsData[costKey]);
            console.log("unitCost==>", unitCost);
            const quantity = Number(item.quantity);
            const set2TagUnitCost = item.size === "Set2Tag" && Number(productsData.stdWtE) + Number(productsData.stdWtN);
            const set2Tag_HUnitCost = item.size === "Set2Tag_H" && Number(productsData.stdWtE) + Number(productsData.stdWtH);
            return {
                size: item.size,
                quantity: (item.size === "Set2Tag" && set2TagUnitCost * quantity) || (item.size === "Set2Tag_H" && set2Tag_HUnitCost * quantity) || (unitCost * quantity),
            };
        });
        console.log("TagQunatityStdWtData==>", TagQunatityStdWtData);
        const TolTagSdtWeith = QuantitySum(TagQunatityStdWtData);
        console.log("TolTagSdtWeith==>", TolTagSdtWeith);


        // < --------------------------------------- FOR BANGLE STDUCP--------------------------------------->
        let UmoSizeLimit = 0;
        const bangle11Digit = productsData.category === "BANGLE" || productsData.category === "BANGLES" ? productsData.itemCode.charAt(10) : productsData.childNodeV.charAt(10);
        if (SizableTag.includes("Only_BANGLE")) {
            const singleBanglePrice = Number(parseFloat(stdUcpVal[1] ? stdUcpVal[1] : productsData.stdUcpV).toFixed(1)) / Number(bangle11Digit) || 1;
            const sizeUomQuantityPrise = allDataFromValidation.sizeUomQuantityRes.map(item => {
                const updatedItem = { size: item.size };
                for (const key in item) {
                    if (key.startsWith('uom') && item[key] !== "") {
                        const uomVal = Number(key.substring(3));
                        updatedItem[key] = Number(item[key]) * singleBanglePrice * uomVal;
                    } else if (key !== "size") {
                        updatedItem[key] = item[key];
                    }
                }
                return updatedItem;
            });
            UmoSizeLimit = QuantitySum(sizeUomQuantityPrise);
        } else {
            const singleBanglePrice = Number(parseFloat(stdUcpVal[1] ? stdUcpVal[1] : productsData.stdUCP).toFixed(1)) / Number(bangle11Digit) || 1;
            const sizeUomQuantityPrise = allDataFromValidation.sizeUomQuantityRes.map(item => {
                const updatedItem = { size: item.size };
                for (const key in item) {
                    if (key.startsWith('uom') && item[key] !== "") {
                        const uomVal = Number(key.substring(3));
                        updatedItem[key] = Number(item[key]) * singleBanglePrice * uomVal;
                    } else if (key !== "size") {
                        updatedItem[key] = item[key];
                    }
                }
                return updatedItem;
            });
            UmoSizeLimit = QuantitySum(sizeUomQuantityPrise)
        }


        // < --------------------------------------- FOR BANGLE STD WT--------------------------------------->
        let UmoSizeStdWt = 0;
        if (SizableTag.includes("Only_BANGLE")) {
            const singleBanglePrice = Number(productsData.stdWtV) / Number(bangle11Digit) || 1;
            const sizeUomQuantityPrise = allDataFromValidation.sizeUomQuantityRes.map(item => {
                const updatedItem = { size: item.size };
                for (const key in item) {
                    if (key.startsWith('uom') && item[key] !== "") {
                        const uomVal = Number(key.substring(3));
                        updatedItem[key] = Number(item[key]) * singleBanglePrice * uomVal;
                    } else if (key !== "size") {
                        updatedItem[key] = item[key];
                    }
                }
                return updatedItem;
            });
            UmoSizeStdWt = QuantitySum(sizeUomQuantityPrise);
        } else {
            const singleBanglePrice = Number(productsData.stdWt) / Number(bangle11Digit) || 1;
            const sizeUomQuantityPrise = allDataFromValidation.sizeUomQuantityRes.map(item => {
                const updatedItem = { size: item.size };
                for (const key in item) {
                    if (key.startsWith('uom') && item[key] !== "") {
                        const uomVal = Number(key.substring(3));
                        updatedItem[key] = Number(item[key]) * singleBanglePrice * uomVal;
                    } else if (key !== "size") {
                        updatedItem[key] = item[key];
                    }
                }
                return updatedItem;
            });
            console.log("sizeUomQuantityPrise==>", sizeUomQuantityPrise);
            UmoSizeStdWt = QuantitySum(sizeUomQuantityPrise);
        }
        console.log("UmoSizeStdWt==>", UmoSizeStdWt);


        const tagSizeLimit = QuantitySum(TagQunatityUCPData);
        console.log("tagSizeLimit==>", tagSizeLimit);
        const SizeQuntyTotal = QuantitySum(allDataFromValidation.sizeQuantityRes);
        console.log("SizeQuntyTotal==>", SizeQuntyTotal);

        // < --------------------------------------- SIZABLE CALCULATION FOR UCP--------------------------------------->
        let sizeUCPLimit = 0;
        if (SizableTag.includes("Only_FINGERRING")) {
            sizeUCPLimit = SizeQuntyTotal * parseFloat(Number(stdUcpVal[1] ? stdUcpVal[1] : productsData.stdUcpF).toFixed(2));
        } else if (SizableTag.includes("Only_MANGALSUTRA")) {
            sizeUCPLimit = SizeQuntyTotal * parseFloat(Number(stdUcpVal[1] ? stdUcpVal[1] : productsData.stdUcpN).toFixed(2));
        } else {
            sizeUCPLimit = SizeQuntyTotal * parseFloat(Number(stdUcpVal[1] ? stdUcpVal[1] : productsData.stdUCP).toFixed(2));
        }
        console.log("sizeUCPLimit==>", sizeUCPLimit);

        // < --------------------------------------- SIZABLE CALCULATION FOR STD WT--------------------------------------->
        let TotalsizeStdWt = 0;
        if (SizableTag.includes("Only_FINGERRING")) {
            TotalsizeStdWt = SizeQuntyTotal * parseFloat(Number(productsData.stdWtF).toFixed(2));
        } else if (SizableTag.includes("Only_MANGALSUTRA")) {
            TotalsizeStdWt = SizeQuntyTotal * parseFloat(Number(productsData.stdWtN).toFixed(2));
        } else {
            TotalsizeStdWt = SizeQuntyTotal * parseFloat(Number(productsData.stdWt).toFixed(2));
        }
        console.log("TotalsizeStdWt==>", TotalsizeStdWt);


        // <------------- INPUT CALCULATION FOR UCP ------------------------------->
        const indQuntyLimit = Number(allDataFromValidation.quantityRes) * Number(stdUcpVal[1] ? stdUcpVal[1] : productsData.stdUCP);

        // <------------- INPUT CALCULATION FOR STD ------------------------------->
        const InputStdWt = Number(allDataFromValidation.quantityRes) * Number(productsData.stdWt);
        console.log("InputStdWt==>", InputStdWt);

        const TotalCalLimit = tagSizeLimit + sizeUCPLimit + Number(parseFloat(UmoSizeLimit).toFixed(3)) + indQuntyLimit + rowTolLimit;
        console.log("TotalCalLimit==>", TotalCalLimit);
        const TotalCost = tagSizeLimit + sizeUCPLimit + Number(parseFloat(UmoSizeLimit).toFixed(3)) + indQuntyLimit;
        console.log("TotalCost==>", TotalCost);
        const TotalStdWt = TolTagSdtWeith + TotalsizeStdWt + Number(parseFloat(UmoSizeStdWt).toFixed(3)) + InputStdWt;
        console.log("TotalStdWt==>", TotalStdWt);
        GetCatPBLimit(TotalCalLimit, TotalStdWt, TolQInpQnty, TotalCost);
    }

    const onClickCancelBtnHandler = () => {
        setLoading(true);
        const CancelIndentPayload = {
            itemCode: productsData.itemCode,
            strCode: storeCode,
            saleable: "",
            size: "0",
            uom: "0",
            reasons: "",
            findings: allDataFromValidation.findingsRes,
            indQty: "0",
            indCategory: "0",
            submitStatus: "report",
            set2Type: allDataFromValidation.typeSet2Res,
            stoneQuality: "0",
            stoneQualityVal: "0",
            rsoName: rsoName,
            npimEventNo: "1",
            IndentLevelType: "L3",
            exSize: productsData.size,
            exUOM: productsData.uom,
            exIndCategory: productsData.indCategory,
            exStonequality: productsData.stoneQuality,
        };
        APIDeleteUpdate(`/NPIML3/npim/update/responses`, CancelIndentPayload)
            .then(res => res).then((response) => {
                if (response.data.code === "1000") {
                    AlertPopupStatus({
                        status: true,
                        main: "Cancel Indent Successfully",
                        contain: "",
                    });
                }
                ItemWiseReport(storeCode);
                editProductsData({});
                setLoading(false);
            }).catch((error) => setLoading(false));
    };

    return (
        <div className="my-4">
            {loading === true && <Loader />}
            <div className="row g-3">
                <div className="col-md-5">
                    <ImgShow
                        itemCode={productsData.itemCode}
                        videoLink=""
                        imgLink={imageUrl}
                    />
                </div>
                <div className="col-md-7">
                    <Typography style={{ backgroundColor: "#832729", color: "#ffff", fontWeight: "bold", textAlign: "center", padding: "2px", marginBottom: "2%" }}>
                        {productsData.itemCode}
                    </Typography>
                    <div className="row g-3">
                        <div className="col-md-7">
                            <ProductDetailsTabularL3 information={productsData} />
                        </div>
                        <div className="col-md-5">
                            <h6 className="text-center my-1"><b>INDENT DETAILS</b></h6>
                            <DisplayValidationComponent
                                digit={productsData.itemCode[6]}
                                itemCode={productsData.itemCode}
                                setType2option={["Chain", "Dori"]}
                                sizeUomQuantityResHandler={sizeUomQuantityResHandler}
                                sizeQuantityResHandler={sizeQuantityResHandler}
                                stoneQualityResHandler={stoneQualityResHandler}
                                tegQuantityResHandler={tegQuantityResHandler}
                                typeSet2ResHandler={typeSet2ResHandler}
                                quantityResHandler={quantityResHandler}
                                findingsResHandler={findingsResHandler}
                                allDataFromValidation={allDataFromValidation}
                                feedShowState={productsData}
                            />
                        </div>
                    </div>
                    {productsData.si2Gh || productsData.vsGh || productsData.vvs1 || productsData.i2Gh ? (
                        <StaticTabularInformation
                            si2Gh={productsData.si2Gh}
                            vsGh={productsData.vsGh}
                            vvs1={productsData.vvs1}
                            i2Gh={productsData.i2Gh}
                            si2Ij={productsData.si2Ij}
                        />
                    ) : null}
                    <div className="row my-2">
                        <div className="col">
                            <Button
                                variant="outlined"
                                color="primary"
                                fullWidth
                                onClick={onClickCancelBtnHandler}
                            >CANCEL INDENT</Button>
                        </div>
                        <div className="col">
                            <Button
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                style={{
                                    backgroundColor: "#832729",
                                    color: "#ffff",
                                }}
                                onClick={UpdateReportsPdtDetails}
                            >UPDATE</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}
export default EditItemWiseProducts;
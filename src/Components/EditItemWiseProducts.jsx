/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import ImgShow from "./ImgShow";
import { imageUrl, sizeUCPToKey } from "../DataCenter/DataList";
import { Button, Typography } from "@material-ui/core";
import { ProductDetailsTabularL3 } from "./ComponentForL3";
import StaticTabularInformation from "./StaticTabularInformation";
import DisplayValidationComponent from "./DisplayValidationForL3";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { APIDeleteUpdate, APIGetCatList, APIGetCatPBStoreWise, APIInsLimit, APISetCatCode, APIUpdateFormL3 } from "../HostManager/CommonApiCallL3";
import { toast } from "react-toastify";

const EditItemWiseProducts = ({ itemWiseData, rows, productsData, AlertPopupStatus, ItemWiseReport, editProductsData }) => {
    const { storeCode, rsoName } = useParams();
    const [loading, setLoading] = useState(false);
    const [setSelectState, setSetSelectState] = useState([]);
    const [allDataFromValidation, setAllDataFromValidation] = useState({
        sizeUomQuantityRes: [],
        sizeQuantityRes: [],
        stoneQualityRes: "",
        tegQuantityRes: [],
        typeSet2Res: "",
        quantityRes: "",
        findingsRes: "",
    });
    function tegSelectionResHandler(tegSelectionData) {
        if (tegSelectionData === "Separate") {
            APIGetCatList(`/npim/get/set/category/list/${productsData.itemCode}`)
                .then(res => res).then((response) => {
                    if (response.data.code === "1000") {
                        setSetSelectState(response.data.value.map((element) => element.category));
                    }
                }).catch(error => setLoading(false));
        } else if (tegSelectionData === "Set") {
            APISetCatCode(`/npim/item/set/category/code/${productsData.itemCode}`).then((response) => {
                if (response.data.code === "1000") {
                    setSetSelectState(response.data.value);
                }
            }).catch((error) => setLoading(false));
        }
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

    const isCatPB = rows.filter(item => item.catPB);
    const catPbDataUpper = isCatPB.filter(item => item.catPB.toUpperCase() === productsData.catPB.toUpperCase());
    const catPbWiseData = catPbDataUpper.filter(item => item.catPB.replace(/\s+/g, '').trim() === productsData.catPB.replace(/\s+/g, '').trim());
    const tolCostVal = catPbWiseData.map(item => Number(item.tolCost));
    const tolSum = tolCostVal.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

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

    // const FinalSubmit = (inputData, limit) => {
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
    //                 UpdateIndentedProduct("report");
    //             }
    //             setLoading(false);
    //         } else if (inputData > LimitPercent_Ve) {
    //             console.log("3==>");
    //             const alertMessage = 'You are reaching the max limit For CatPB Click Ok to Proceed';
    //             const isConfirmed = window.confirm(alertMessage);
    //             if (isConfirmed === true) {
    //                 UpdateIndentedProduct("report");
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
    //             UpdateIndentedProduct("report");
    //         }
    //         setLoading(false);
    //     } else {
    //         console.log("7==>");
    //         UpdateIndentedProduct("report");
    //     }
    // }

    // const GetCatPBLimit = (inputData) => {
    //     const encodedCatPB = encodeURIComponent(productsData.catPB);
    //     console.log("encodedCatPB==>", encodedCatPB);
    //     setLoading(true);
    //     APIGetCatPBStoreWise(`/NPIML3/check/limit/catpb/excel?strCode=${storeCode}&catPB=${encodedCatPB}`)
    //         .then(res => res).then((response) => {
    //             if (response.data.code === "1000") {
    //                 FinalSubmit(inputData, Number(response.data.value[3]));
    //             } else {
    //                 FinalSubmit(inputData, Number(response.data.value[3]) || 0);
    //             }
    //         }).catch(error => {
    //             setLoading(false);
    //             toast.error("CatPB Is Not Available Hence Data Can't Be Saved!", { theme: "colored" });
    //         });
    // }

    const UpdateReportsPdtDetails = () => {
        UpdateIndentedProduct("report");

        // console.log("productsData==>", productsData);
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
        //     const unitCost = stdUcpVal[1] ? Number(stdUcpVal[1]) : Number(productsData[costKey]);
        //     const quantity = Number(item.quantity);
        //     const set2TagUnitCost = item.size === "Set2Tag" && stdUcpVal[1] ? Number(stdUcpVal[1]) : Number(productsData.stdUcpN) + stdUcpVal[1] ? Number(stdUcpVal[1]) : Number(productsData.stdUcpE);
        //     const set2Tag_HUnitCost = item.size === "Set2Tag_H" && stdUcpVal[1] ? Number(stdUcpVal[1]) : Number(productsData.stdUcpH) + stdUcpVal[1] ? Number(stdUcpVal[1]) : Number(productsData.stdUcpE);
        //     return {
        //         size: item.size,
        //         quantity: (item.size === "Set2Tag" && set2TagUnitCost * quantity) || (item.size === "Set2Tag_H" && set2Tag_HUnitCost * quantity) || unitCost * quantity,
        //     };
        // });

        // // FOR BANGLE 
        // let UmoSizeLimit = 0;
        // const bangle11Digit = productsData.category === "BANGLE" || productsData.category === "BANGLES" ? productsData.itemCode.charAt(10) : productsData.childNodeV.charAt(10);
        // if (SizableTag.includes("Only_BANGLE")) {
        //     const singleBanglePrice = Number(parseFloat(stdUcpVal[1] ? stdUcpVal[1] : productsData.stdUcpV).toFixed(1)) / Number(bangle11Digit) || 1;
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
        //     const singleBanglePrice = Number(parseFloat(stdUcpVal[1] ? stdUcpVal[1] : productsData.stdUCP).toFixed(1)) / Number(bangle11Digit) || 1;
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
        // console.log("tolSum==>", tolSum);
        // const EditPdtTolCost = tolSum - Number(productsData.tolCost);
        // console.log("EditPdtTolCost==>", EditPdtTolCost);

        // const tagSizeLimit = QuantitySum(TagQunatityData);
        // console.log("tagSizeLimit==>", tagSizeLimit);
        // const SizeQuntyTotal = QuantitySum(allDataFromValidation.sizeQuantityRes);
        // console.log("SizeQuntyTotal==>", SizeQuntyTotal);

        // let sizeLimit = 0;
        // if (SizableTag.includes("Only_FINGERRING")) {
        //     sizeLimit = SizeQuntyTotal * parseFloat(Number(stdUcpVal[1] ? stdUcpVal[1] : productsData.stdUcpF).toFixed(2));
        // } else if (SizableTag.includes("Only_MANGALSUTRA")) {
        //     sizeLimit = SizeQuntyTotal * parseFloat(Number(stdUcpVal[1] ? stdUcpVal[1] : productsData.stdUcpN).toFixed(2));
        // } else {
        //     sizeLimit = SizeQuntyTotal * parseFloat(Number(stdUcpVal[1] ? stdUcpVal[1] : productsData.stdUCP).toFixed(2));
        // }
        // console.log("sizeLimit==>", sizeLimit);
        // const indQuntyLimit = Number(allDataFromValidation.quantityRes) * Number(stdUcpVal[1] ? stdUcpVal[1] : productsData.stdUCP);
        // const TotalLimit = tagSizeLimit + sizeLimit + UmoSizeLimit + indQuntyLimit + EditPdtTolCost;
        // console.log("TotalLimit==>", TotalLimit);
        // GetCatPBLimit(TotalLimit);
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
                                setSelectOptions={setSelectState}
                                sizeUomQuantityResHandler={sizeUomQuantityResHandler}
                                sizeQuantityResHandler={sizeQuantityResHandler}
                                stoneQualityResHandler={stoneQualityResHandler}
                                tegQuantityResHandler={tegQuantityResHandler}
                                typeSet2ResHandler={typeSet2ResHandler}
                                quantityResHandler={quantityResHandler}
                                findingsResHandler={findingsResHandler}
                                tegSelectionResHandler={tegSelectionResHandler}
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
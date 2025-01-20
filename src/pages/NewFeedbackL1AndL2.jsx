import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/CssStyle/FeedbackL1AndL2.css";
import UpperHeader from "../Components/UpperHeader";
import LowerHeader from "../Components/LowerHeader";
import Rating from "@mui/material/Rating";
import StarIcon from "@material-ui/icons/Star";
import LowerHeaderDigital from "../Components/LowerHeaderDigital";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { imageUrl, feedbackl1l2Navigate } from "../DataCenter/DataList";
import NpimDataDisplay from "../Components/NpimDataDisplay";
import { Grid, Button, Typography, CssBaseline } from "@material-ui/core";
import { useParams } from "react-router";
import Loading from "../Components/Loading";
import StaticTabularInformation from "../Components/StaticTabularInformation";
import ImgShow from "../Components/ImgShow";
import AlertPopup from "../Components/AlertPopup";
import { useStyles } from "../Style/FeedbackL1AndL2ForPhysical";
import Loader from "../Components/Loader";
import { APICheckItemCode, APIDNPIMProductData, APIGetPreNextProductData, APIGetStatusReports, APIInsertRatingL1L2Feedback, APIPNPIMProductData } from "../HostManager/CommonApiCallL3";
import { L1L2ProductsInfo } from "../Components/NewComponents/L1L2ProductsInfo";
import { toast } from "react-toastify";
import { MuliSelectDropdownField } from "../Components/MuliSelectDropdownField";

const NewFeedbackL1AndL2 = () => {
    const classes = useStyles();
    const { storeCode, rsoName } = useParams();
    const [feedShowState, setFeedShowState] = useState(NpimDataDisplay);
    const [loading, setLoading] = useState(false);
    const [resetDrop, SetResetDrop] = useState(true);
    const [multiSelectDrop, setMultiSelectDrop] = useState([]);
    const [feedbackMsg, setFeedbackMsg] = useState("");
    const loginData = JSON.parse(sessionStorage.getItem("loginData"));

    const [statusData, setStatusData] = useState({
        col: [],
        row: [],
    });
    const [feedValueQ1, setFeedValueQ1] = useState(0);
    const [feedValueQ2, setFeedValueQ2] = useState(0);
    const [feedValueQ3, setFeedValueQ3] = useState(0);
    const [feedValueQ4, setFeedValueQ4] = useState(0);
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

    const WeightageQ1 = 4 * Number(feedValueQ1);
    const WeightageQ2 = 7 * Number(feedValueQ2);
    const WeightageQ3 = 7 * Number(feedValueQ3);
    const WeightageQ4 = 2 * Number(feedValueQ4);
    const multiSelectValues = multiSelectDrop.map((item) => item === 'Others(Free Text)' ? feedbackMsg : item);
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
    const onMultiSelect = (multiSelectData) => {
        setMultiSelectDrop(multiSelectData);
    };

    const RecetAllFeildData = () => {
        setFeedbackMsg("");
        setFeedValueQ1(0);
        setFeedValueQ2(0);
        setFeedValueQ3(0);
        setFeedValueQ4(0);
        setMultiSelectDrop([]);
    }

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
        APIPNPIMProductData(`api/NPIM/l1l2/npim/get/product/details/l1l2`, productDetails)
            .then((response) => {
                console.log("response==>", response.data);
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
                    if (response.data.value.itemCode === "Already Indented") {
                        document.getElementById("result").style.visibility = "hidden";
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
                }
                setLoading(false);
            }).catch((error) => setLoading(false));
    }

    const CheckItemCode = (itemCode) => {
        setLoading(true);
        APICheckItemCode(`/api/NPIM/l1l2/get/check/itemCode?itemcode=${itemCode}`)
            .then(res => res).then(response => {
                console.log("response==>", response.data);
                if (response.data.code === "1000") {
                    GetProductDetailsPnpim(productDetails);
                } else if (response.data.code === "1001") {
                    setAlertPopupStatus({
                        status: true,
                        main: "ItemCode Not In Master",
                        contain: "",
                        mode: true,
                    });
                    productDetails.setDropState("");
                }
            }).then(err => setLoading(false));
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
        RecetAllFeildData();
    }, [storeCode, feedShowState.itemCode]);

    useEffect(() => {
        if (sessionStorage.getItem("Npim-type") === "DNPIM") {
            GetProductDetailsDnpim(productDetailsDigital);
        }
    }, [productDetailsDigital]);

    useEffect(() => {
        if (sessionStorage.getItem("Npim-type") === "PNPIM" && productDetails.itemCode) {
            CheckItemCode(productDetails.itemCode);
        }
    }, [productDetails.itemCode]);

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
        APIGetPreNextProductData(`api/NPIM/l1l2/new/npim/get/product/details/PreNex`, Input)
            .then(res => res).then((response) => {
                console.log("response==>", response.data);
                if (response.data.code === "1001") {
                    setAlertPopupStatus({
                        status: true,
                        main: "No more data available for the selected category.",
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
                    document.getElementById("result").style.visibility = "visible";
                    setFeedShowState(response.data.value);
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
        if (feedValueQ1 && feedValueQ2 && feedValueQ3 && feedValueQ4) {
            const feedbackPayload = {
                doe: "",
                strCode: storeCode,
                region: loginData.region,
                needstate: feedShowState.consumerBase,
                collection: feedShowState.collection,
                catPB: feedShowState.catPB,
                itemCode: feedShowState.itemCode,
                activity: feedShowState.activity,
                itgroup: feedShowState.itGroup,
                category: feedShowState.category,
                q1_Rating: feedValueQ1,
                q2_Rating: feedValueQ2,
                q3_Rating: feedValueQ3,
                q4_Rating: feedValueQ4,
                specificFeedback: multiSelectValues.toString(),
                rsoName: rsoName,
                npimEventNo: feedShowState.npimEventNo,
                indentLevelType: "L1L2",
                submitStatus: "feedback",
                overallProductPercentage: WeightageQ1 + WeightageQ2 + WeightageQ3 + WeightageQ4,
            }
            console.log("feedbackPayload==>", feedbackPayload);
            setLoading(true);
            APIInsertRatingL1L2Feedback(`/api/NPIM/l1l2/insert/response/l1l2`, feedbackPayload)
                .then(res => res).then(response => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    document.getElementById("result").style.visibility = "hidden";
                    console.log("response==>", response.data);
                    if (response.data.code === "1000") {
                        if (sessionStorage.getItem("Npim-type") === "DNPIM") {
                            setAlertPopupStatus({
                                status: true,
                                main: "Feedback Submitted Successfully",
                                contain: "",
                                mode: true,
                            });
                            setTimeout(() => {
                                onClickNextPreBtnHandler("pre");
                            }, 1000);
                        }
                    }
                    if (sessionStorage.getItem("Npim-type") === "PNPIM") {
                        setAlertPopupStatus({
                            status: true,
                            main: "Feedback Submitted Successfully",
                            contain: "",
                            mode: true,
                        });
                    }
                    RecetAllFeildData();
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
                    setLoading(false);
                }).catch(err => setLoading(false));
        } else {
            toast.error("Please Insure All The Questions Are Answered", { theme: "colored" })
        }
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AlertPopup
                status={alertPopupStatus.status}
                mainLable={alertPopupStatus.main}
                containLable={alertPopupStatus.contain}
                procideHandler=""
                discardHandler=""
                closeHandler={() => alertPopupStatus.mode ? closeHandlerForRest() : closeHandler()}
            />
            <Grid item xs={12}>
                <UpperHeader itemCode={feedShowState.itemCode} storeCode={feedShowState.strCode} />
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
                            <div className="img_info_show">
                                <ImgShow
                                    className="img_show"
                                    itemCode={feedShowState.itemCode}
                                    imgLink={imageUrl}
                                    videoLink={feedShowState.videoLink}
                                />
                            </div>
                        </div>
                        <div className="col-md-7" style={{ margin: "0%", padding: "3px", boxShadow: "0 2px 4px 0 #00000033, 0 6px 20px 0 #00000030" }}>
                            <Typography className={classes.headingColor} align="center">{feedShowState.itemCode}</Typography>
                            <div className="row my-3">
                                <div className="col-md-5" style={{ margin: "0%", padding: "0%" }}>
                                    <L1L2ProductsInfo feedShowState={feedShowState} />
                                </div>
                                <div className="col-md-7">
                                    <h5 className="text-center"><b>FEEDBACK</b></h5>
                                    <div style={{ border: "1px solid gray", padding: "5px" }}>
                                        <div className="mt-3">
                                            <h6 style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "1px", textAlign: "justify" }}>How relevent is this product to your market/region?</h6>
                                            <div className="d-flex justify-content-center">
                                                <Rating
                                                    name="simple-controlled"
                                                    value={feedValueQ1}
                                                    onChange={(event, newValue) => setFeedValueQ1(newValue)}
                                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
                                                    sx={{
                                                        '& .MuiRating-iconFilled': { color: feedValueQ1 <= 3 ? "red" : "#57e32c" }, // Filled stars
                                                        '& .MuiRating-iconHover': { color: '#ffa534' }, // Hover effect
                                                        '& .MuiRating-iconEmpty': { color: 'gray' } // Empty stars (optional)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <h6 style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "1px", textAlign: "justify" }}>How would you rate this product in terms of look to price?</h6>
                                            <div className="d-flex justify-content-center">
                                                <Rating
                                                    name="simple-controlled"
                                                    value={feedValueQ2}
                                                    onChange={(event, newValue) => setFeedValueQ2(newValue)}
                                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
                                                    sx={{
                                                        '& .MuiRating-iconFilled': { color: feedValueQ2 <= 3 ? "red" : "#57e32c" }, // Filled stars
                                                        '& .MuiRating-iconHover': { color: '#ffa534' }, // Hover effect
                                                        '& .MuiRating-iconEmpty': { color: 'gray' } // Empty stars (optional)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <h6 style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "1px", textAlign: "justify" }}>How would you rate this product in terms of differentiation fit for Tanishq brand?</h6>
                                            <div className="d-flex justify-content-center">
                                                <Rating
                                                    name="simple-controlled"
                                                    value={feedValueQ3}
                                                    onChange={(event, newValue) => setFeedValueQ3(newValue)}
                                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
                                                    sx={{
                                                        '& .MuiRating-iconFilled': { color: feedValueQ3 <= 3 ? "red" : "#57e32c" }, // Filled stars
                                                        '& .MuiRating-iconHover': { color: '#ffa534' }, // Hover effect
                                                        '& .MuiRating-iconEmpty': { color: 'gray' } // Empty stars (optional)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <h6 style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "1px", textAlign: "justify" }}>How would you rate quality of the product?</h6>
                                            <div className="d-flex justify-content-center">
                                                <Rating
                                                    name="simple-controlled"
                                                    value={feedValueQ4}
                                                    onChange={(event, newValue) => setFeedValueQ4(newValue)}
                                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
                                                    sx={{
                                                        '& .MuiRating-iconFilled': { color: feedValueQ4 <= 3 ? "red" : "#57e32c" }, // Filled stars
                                                        '& .MuiRating-iconHover': { color: '#ffa534' }, // Hover effect
                                                        '& .MuiRating-iconEmpty': { color: 'gray' } // Empty stars (optional)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-3" onMouseMove={() => window.scrollBy({ top: 100, behavior: "smooth" })}>
                                            <MuliSelectDropdownField
                                                onMultiSelect={onMultiSelect}
                                                value={multiSelectDrop}
                                                feedShowState={feedShowState}
                                            />
                                        </div>
                                        {multiSelectDrop.includes("Others(Free Text)") && <div className="mt-3">
                                            <textarea type="text" className="w-100" placeholder="Write your Feedback (Max 50 Character)" onChange={(e) => setFeedbackMsg(e.target.value)} />
                                        </div>}
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
                                <Button className={classes.btnSub} onClick={onClickSubmitBtnHandler}>
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
export default NewFeedbackL1AndL2;
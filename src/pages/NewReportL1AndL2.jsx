import { Grid, AppBar, Drawer, Toolbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DropdownField from "../Components/DropdownField";
import UpperHeader from "../Components/UpperHeader";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import { L1L2PnddHeaders, L1L2Reports, L1L2SubmittedHeaders, feedbackl1l2Navigate } from "../DataCenter/DataList";
import { BsCardList } from "react-icons/bs";
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineBarChart } from "react-icons/ai";
import Loader from "../Components/Loader";
import { APIGetL1L2PendingRtp, APIGetStatusReports, APIPNPIMProductData } from "../HostManager/CommonApiCallL3";
import PendingTable from "../Components/PendingTable";
import NewEditProductL1L2 from "../Components/NewEditProductL1L2";
import StatusTabularL1L2 from "../Components/StatusTabularL1L2";
import AlertPopup from "../Components/AlertPopup";

const NewReportL1AndL2 = () => {
    const { storeCode, rsoName } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [pndReports, setPndReports] = useState([]);
    const [collectionRtp, setCollectionRtp] = useState([]);
    const [productInfo, setProductInfo] = useState({});
    const [selectReport, setSelectReport] = useState("submitted");
    const [collectionOpt, setCollectionOpt] = useState("");
    const [statusData, setStatusData] = useState({
        col: [],
        row: [],
    });
    const [alertPopupStatus, setAlertPopupStatus] = useState({
        status: false,
        main: "",
        contain: "",
        mode: false,
    });
    const [statusCloserOpener, setStatusCloserOpener] = useState(false);
    const selectReportList = ["yet to submit", "submitted"];
    const loginData = JSON.parse(sessionStorage.getItem("loginData"));
    const collType = pndReports.map(item => item.collection.split(/\s+/).join(''));
    const collectionFilter = ["", ...new Set(collType)];

    function CloseHandler() {
        setAlertPopupStatus({
            status: false,
            main: "",
            contain: "",
            mode: false,
        });
    }

    function CloseHandlerForRest() {
        setAlertPopupStatus({
            status: false,
            main: "",
            contain: "",
            mode: false,
        });
    }

    const GetL1l2PendinRtp = (storeCode) => {
        let statusUrl = "";
        switch (selectReport) {
            case "submitted":
                statusUrl = `/api/NPIM/l1l2/get/feedback/data?strCode=${storeCode}`
                break;
            case "yet to submit":
                statusUrl = `/api/NPIM/l1l2/get/pending/feedback/data?strCode=${storeCode}`
            default:
                break;
        }
        setLoading(true);
        APIGetL1L2PendingRtp(statusUrl)
            .then(res => res).then(response => {
                if (response.data.code === "1000") {
                    setPndReports(response.data.value);
                } else {
                    setPndReports([]);
                }
                setLoading(false);
                setProductInfo({});
                setCollectionRtp([]);
                setCollectionOpt("");
            }).catch(err => setLoading(false));
    }

    useEffect(() => {
        GetL1l2PendinRtp(storeCode);
    }, [storeCode, selectReport]);

    useEffect(() => {
        const CollFilter = pndReports.filter(item => item.collection && item.collection.split(/\s+/).join('').trim() === collectionOpt);
        setCollectionRtp(CollFilter);
    }, [collectionOpt]);

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
        const getItemByCardDataNpim = {
            storeCode: storeCode,
            collection: "ALL",
            consumerBase: "ALL",
            group: "ALL",
            category: "ALL",
            itemCode: data.itemCode,
        }
        setLoading(true);
        APIPNPIMProductData(`/NPIM/base/npim/get/product/details`, getItemByCardDataNpim)
            .then(res => res).then(response => {
                if (response.data.code === "1000") {
                    setProductInfo(response.data.value);
                }
                setLoading(false);
            }).catch(err => setLoading(false));
        window.scrollTo({ top: "0", behavior: "smooth" });
    };

    const statusOpener = (event) => {
        setStatusCloserOpener(!statusCloserOpener);
    };

    const ReportsRouting = () => {
        if (loginData.role === "L1" || loginData.role === "L2") {
            navigate(`/${L1L2Reports}/${storeCode}/${rsoName}`);
        } else if (loginData.role === "L3") {
            navigate(`/NpimPortal/reportL3/${storeCode}/${rsoName}`);
        }
    }

    return (
        <React.Fragment>
            {loading === true && <Loader />}
            <AlertPopup
                status={alertPopupStatus.status}
                mainLable={alertPopupStatus.main}
                containLable={alertPopupStatus.contain}
                procideHandler=""
                discardHandler=""
                closeHandler={() => alertPopupStatus.mode ? CloseHandlerForRest() : CloseHandler()}
            />
            <Drawer anchor="top" open={statusCloserOpener} onClick={statusOpener}>
                <StatusTabularL1L2 statusData={statusData} />
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
                                    myChangeHandler={(e) => {
                                        setCollectionOpt(e.target.value.split(/\s+/).join(' ').trim());
                                        setProductInfo({});
                                    }}
                                />}
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
            <Grid item xs={12}>
                {productInfo.id && (<NewEditProductL1L2 productInfo={productInfo} setProductInfo={setProductInfo}
                    GetL1l2PendinRtp={GetL1l2PendinRtp} setAlertPopupStatus={setAlertPopupStatus} selectReport={selectReport}
                />)}
            </Grid>
            <Grid item xs={12} className="p-3">
                {pndReports.length > 0 ? (
                    <PendingTable
                        report={collectionRtp.length > 0 ? collectionRtp : pndReports}
                        coloum={selectReport === "submitted" ? L1L2SubmittedHeaders : L1L2PnddHeaders}
                        reportType={selectReport}
                        getProductData={getProductData}
                        reportName={selectReport}
                    />
                ) : <div className="text-center">Data Not Available</div>}
            </Grid>
        </React.Fragment>
    );
};
export default NewReportL1AndL2;
import React, { useEffect, useState } from "react";
import { BsCardList, BsCart3 } from "react-icons/bs";
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineBarChart } from "react-icons/ai";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import StatusTabular from "./StatusTabular";
import { Drawer } from "@material-ui/core";
import { APIGetReportL3, APIGetStatuL3 } from "../HostManager/CommonApiCallL3";
import { feedbackl1l2Navigate } from "../DataCenter/DataList";

const GetPdtLowerHeader = () => {
    const { storeCode, rsoName } = useParams();
    const [statusData, setStatusData] = useState({
        col: [],
        row: [],
    });

    const location = useLocation();
    const [statusCloserOpener, setStatusCloserOpener] = useState(false);
    const [cardStuddData, setCardStuddData] = useState([]);
    const [cardPlainData, setCardPlainData] = useState([]);
    const navigate = useNavigate();
    const loginData = JSON.parse(sessionStorage.getItem("loginData"));

    const GetStatusReport = (storeCode) => {
        APIGetStatuL3(`/NPIML3/npim/get/status/L3/${storeCode}`)
            .then(res => res).then((response) => {
                if (response.data.code === "1000") {
                    setStatusData({
                        col: response.data.coloum,
                        row: response.data.value,
                    });
                }
            }).catch((error) => { });
    }


    const GetCardSttudValue = (storeCode) => {
        APIGetReportL3(`/NPIML3/npim/summary/report/L3/${storeCode}/StuddedValue`)
            .then(res => res).then(response => {
                if (response.data.code === "1000") {
                    setCardStuddData(response.data.value);
                }
            }).catch(error => console.log(""));
    }

    const GetCardPlainValue = (storeCode) => {
        APIGetReportL3(`/NPIML3/npim/summary/report/L3/${storeCode}/PlainValue`)
            .then(res => res).then(response => {
                if (response.data.code === "1000") {
                    setCardPlainData(response.data.value);
                }
            }).catch(error => console.log(""));
    }

    useEffect(() => {
        GetStatusReport(storeCode);
        GetCardSttudValue(storeCode);
        GetCardPlainValue(storeCode);
    }, [storeCode]);

    const HomePageRouting = () => {
        const npimType = sessionStorage.getItem("Npim-type");
        if (npimType === 'DNPIM') {
            if (loginData.role === "L1" || loginData.role === "L2") {
                navigate(`/${feedbackl1l2Navigate}/${storeCode}/${rsoName}`);
            } else if (loginData.role === "L3") {
                navigate(`/NpimPortal/cart/product/L3/${storeCode}/${rsoName}`);
            }
        } else if (npimType === 'PNPIM') {
            if (loginData.role === "L1" || loginData.role === "L2") {
                navigate(`/${feedbackl1l2Navigate}/${storeCode}/${rsoName}`);
            } else if (loginData.role === "L3") {
                navigate(`/NpimPortal/indentL3Digital/${storeCode}/${rsoName}`);
            }
        }
    }

    const ReportsRouting = () => {
        if (loginData.role === "L1" || loginData.role === "L2") {
            navigate(`/NpimPortal/reportL1andL2/${storeCode}/${rsoName}`);
        } else if (loginData.role === "L3") {
            navigate(`/NpimPortal/reportL3/${storeCode}/${rsoName}`);
        }
    }

    return (
        <React.Fragment>
            <Drawer anchor="top" open={statusCloserOpener} onClick={() => setStatusCloserOpener(false)}>
                <StatusTabular statusData={statusData} />
            </Drawer>
            <div className="SectionStyle">
                <div className="d-flex justify-content-between">
                    <div className="d-flex">
                        <div className="IconsStyle mx-3" onClick={() => setStatusCloserOpener(!statusCloserOpener)}>
                            <AiOutlineBarChart size={23} />
                            <b>Status</b>
                        </div>
                        <div className="IconsStyle" onClick={HomePageRouting}>
                            <BiHomeAlt size={23} />
                            <b>Indenting Screen</b>
                        </div>
                    </div>

                    {location.pathname === `/NpimPortal/added/cart/products/${storeCode}/${rsoName}` && (loginData.role === "L3" && <div className="d-flex mt-4">
                        <h6><span className="text-primary">▣ </span><b style={{ color: "#832729" }}>STUDDED VALUE (Crs) - {cardStuddData.length > 0 ? parseFloat(parseFloat(cardStuddData[0].tolValue) / 10000000).toFixed(3) : 0}</b></h6>
                        <h6 className="mx-4"><span className="text-primary">▣ </span><b style={{ color: "#832729" }}>PLAIN VALUE (Kgs) - {cardPlainData.length > 0 ? (parseFloat(cardPlainData[0].totWeight) / 1000).toFixed(3) : 0}</b></h6>
                    </div>)}

                    <div className="d-flex mx-3">
                        {loginData.role === "L3" && <div className="IconsStyle" onClick={() => navigate(`/NpimPortal/added/cart/products/${loginData.userID}/${rsoName}`)}>
                            <BsCart3 size={23} />
                            <b>Cart</b>
                        </div>}
                        <div className="IconsStyle" onClick={() => {
                            navigate(`/NpimPortal/get/products/home/${storeCode}/${rsoName}`)
                            GetCardPlainValue(storeCode);
                            GetCardSttudValue(storeCode);
                        }}>
                            <BiHomeAlt size={23} />
                            <b>Home</b>
                        </div>
                        <div className="IconsStyle" onClick={() => navigate(`/NpimPortal/wishlist/${loginData.userID}/${rsoName}`)}>
                            <AiOutlineHeart size={23} />
                            <b>Wishlist</b>
                        </div>
                        <div className="IconsStyle" onClick={ReportsRouting}>
                            <BsCardList size={23} />
                            <b>Reports</b>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default GetPdtLowerHeader;
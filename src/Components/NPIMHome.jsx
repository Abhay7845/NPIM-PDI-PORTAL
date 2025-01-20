import React, { useState, useEffect } from "react";
import "../Style/CssStyle/NPIMHome.css";
import PreLoginHeader from "../Components/PreLoginHeader";
import BGImage from "../images/LoginBg.jpg"
import Login from "../pages/Login";
import Loader from "./Loader";
import { APIGetStatusPortal } from "../HostManager/CommonApiCallL3";

const NPIMHome = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [portalDetail, setPortalDetail] = useState([]);

    useEffect(() => {
        setLoading(true);
        APIGetStatusPortal(`/NPIM/base/get/portal/status/OPEN`)
            .then(res => res).then(response => {
                if (response.data.code === "1000") {
                    setPortalDetail(response.data.value);
                }
                setLoading(false);
            }).catch(error => setLoading(false));
        sessionStorage.clear();
    }, []);

    return (
        <React.Fragment>
            {loading === true && <Loader />}
            <PreLoginHeader />
            <div className='d-flex'>
                {portalDetail.map((data, i) => {
                    return (
                        data.status === "OPEN" && <div key={i} className='NpimRedirectionTab' onClick={() => {
                            if (data.portalType === "PNPIM" || data.portalType === "DNPIM" || data.portalType === "IndentExpress" || data.portalType === "MIA-PostNPIMPortal") {
                                setOpen(true);
                                if (data.portalType === "PNPIM") {
                                    sessionStorage.setItem("Npim-type", "PNPIM");
                                } else if (data.portalType === "DNPIM") {
                                    sessionStorage.setItem("Npim-type", "DNPIM");
                                } else if (data.portalType === "IndentExpress") {
                                    sessionStorage.setItem("Npim-type", "INDENT_EXPRESS");
                                } else if (data.portalType === "MIA-PostNPIMPortal") {
                                    sessionStorage.setItem("Npim-type", "MIA_FEEBBACK");
                                }
                            }
                        }}>
                            {data.portalType === "PNPIM" ? "PHYSICAL" : data.portalType === "DNPIM" ? "DIGITAL" : data.portalType === "IndentExpress" ? "INDENT EXPRESS" : data.portalType === "MIA-PostNPIMPortal" && "MIA FEEDBACK"}
                        </div>
                    )
                })}
            </div>
            <img src={BGImage} className='L1L2BGImage' alt='Image_Not Load' />
            <Login open={open} setOpen={setOpen} />
        </React.Fragment>
    );
};

export default NPIMHome;

import React, { useState, useEffect } from "react";
import UpperHeader from "./UpperHeader";
import "../Style/CssStyle/ProductsCard.css"
import GetPdtLowerHeader from "./GetPdtLowerHeader";
import "../Style/CssStyle/GetPdtLowerHeader.css"
import ImageCrousel from "./ImageCrousel";
import ProductCard from "./ProductCard";
import { BsArrowRightCircleFill, BsArrowLeftCircleFill } from "react-icons/bs";
import Loader from "./Loader";
import AlertPopup from "./AlertPopup";
import deImgUrl from "../images/CrouselDefaultImg.jpg"
import { useParams } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import { APIGetForAdvariant, APIGetHomeReligion, APIGetReportL3, APIGetStatuL3 } from "../HostManager/CommonApiCallL3";

const GetProductsHome = () => {
    const { storeCode } = useParams();
    const loginData = JSON.parse(sessionStorage.getItem("loginData"));
    const { region } = loginData;
    const [loading, setLoading] = useState(false);
    const [statusData, setStatusData] = useState({
        col: [],
        row: [],
    });
    const [homePdtDetailsRegion, setHomePdtDetailsRegion] = useState([]);
    const [homePdtDetailsAdvariant, setHomePdtDetailsAdvariant] = useState([]);
    const [cardStuddData, setCardStuddData] = useState([]);
    const [cardPlainData, setCardPlainData] = useState([]);
    const [alertPopupStatus, setAlertPopupStatus] = useState({
        status: false,
        main: "",
        contain: "",
        mode: false,
    });

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

    const GetHomeProductsDataForRegion = (region) => {
        setLoading(true);
        APIGetHomeReligion(`/NPIM/base/get/home/page/products/region/${region}`)
            .then(res => res).then(response => {
                if (response.data.code === "1000") {
                    setHomePdtDetailsRegion(response.data.value);
                }
                setLoading(false);
            }).catch(error => setLoading(false));
    }

    const GetHomeProductsDataForAdvariant = (Advariant) => {
        setLoading(true);
        APIGetForAdvariant(`/NPIM/base/get/home/page/products/${Advariant}/""`)
            .then(res => res).then(response => {
                if (response.data.code === "1000") {
                    setHomePdtDetailsAdvariant(response.data.value);
                }
                setLoading(false);
            }).catch(error => setLoading(false));
    }

    useEffect(() => {
        GetHomeProductsDataForRegion(region);
        GetHomeProductsDataForAdvariant("Advariant");
    }, [region]);

    let box = document.querySelector('.product_container');
    const btnpressprev = () => {
        let width = box.clientWidth;
        box.scrollLeft = box.scrollLeft - width;
    }

    const btnpressnext = () => {
        let width = box.clientWidth;
        box.scrollLeft = box.scrollLeft + width;
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

    const GetCardSttudValue = (storeCode) => {
        console.log("storeCode123checking==>");
        APIGetReportL3(`/NPIML3/npim/summary/report/L3/${storeCode}/StuddedValue`)
            .then(res => res).then(response => {
                if (response.data.code === "1000") {
                    setCardStuddData(response.data.value);
                }
            }).catch(error => setLoading(false));
    }

    const GetCardPlainValue = (storeCode) => {
        APIGetReportL3(`/NPIML3/npim/summary/report/L3/${storeCode}/PlainValue`)
            .then(res => res).then(response => {
                if (response.data.code === "1000") {
                    setCardPlainData(response.data.value);
                }
            }).catch(error => setLoading(false))
    }

    const SeprateCard = statusData.row.length > 0 && statusData.row[statusData.row.length - 1];

    useEffect(() => {
        GetStatusReport(storeCode);
        GetCardSttudValue(storeCode);
        GetCardPlainValue(storeCode);
    }, [storeCode]);


    return (
        <div style={{ backgroundColor: "#f0ebec", height: "100vh" }}>
            {loading === true && <Loader />}
            <UpperHeader />
            <GetPdtLowerHeader />
            <AlertPopup
                status={alertPopupStatus.status}
                mainLable={alertPopupStatus.main}
                containLable={alertPopupStatus.contain}
                procideHandler=""
                discardHandler=""
                closeHandler={() => alertPopupStatus.mode ? CloseHandlerForRest() : CloseHandler()}
            />
            {homePdtDetailsAdvariant.length > 0 || homePdtDetailsRegion.length > 0 ? <div className="mt-2" style={{ backgroundColor: "#f0ebec" }}>
                <div className="mx-3 p-3">
                    <h5 className="Heading_text my-4"><b>ADVARIANTS!</b></h5>
                    <ImageCrousel advariantDetails={homePdtDetailsAdvariant.length > 0 && homePdtDetailsAdvariant} statusData={statusData} cardStuddData={cardStuddData} cardPlainData={cardPlainData} />
                </div>
                {homePdtDetailsRegion.length > 0 && <div className="product_carousel">
                    <h5 className="Heading_text mt-5"><b>REGIONAL COLLECTION</b></h5>
                    <button className="pre-btn" onClick={btnpressprev}><BsArrowLeftCircleFill /></button>
                    <button className="next-btn" onClick={btnpressnext}><BsArrowRightCircleFill /></button>
                    <div className="product_container">
                        {homePdtDetailsRegion.map((item, i) => {
                            return (<ProductCard key={i} cardDetails={item} AlertPopup={setAlertPopupStatus} PdtCardData={GetHomeProductsDataForRegion} />)
                        })}
                    </div>
                    <br />
                </div>}
            </div> :
                <div className="row mt-3 mx-0" style={{ backgroundColor: "#f0ebec" }}>
                    <div className="col-md-8">
                        <img src={deImgUrl} style={{ width: "100%", height: "83%", borderRadius: "5px" }} alt="deImgUrl" />
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card border-secondary">
                            <div className="row g-2 p-1">
                                <div className="col-md-6">
                                    <div className="card border-secondary">
                                        <div className="card-header" style={{ background: "black", color: "#fff", textAlign: "center", fontSize: "13px", fontWeight: "bold" }}>Total Products Displayed</div>
                                        <div className="text-center p-2"><b>{SeprateCard.totalSKU === "N/A" ? 0 : SeprateCard.totalSKU}</b></div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card border-secondary">
                                        <div className="card-header" style={{ background: "black", color: "#fff", textAlign: "center", fontSize: "13px", fontWeight: "bold" }}>Total Products Indented</div>
                                        <div className="text-center text-primary p-2">
                                            {SeprateCard.indented > 5 ? "" : SeprateCard.indented === "N/A" ? 0 : SeprateCard.indented}
                                            <ProgressBar variant="success" now={SeprateCard.indented === "N/A" ? 0 : SeprateCard.indented} label={SeprateCard.indented === "N/A" ? 0 : SeprateCard.indented} animated />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border-secondary my-4">
                            <div className="card-header" style={{ background: "black", color: "#fff", fontWeight: "bold" }}>Value Of Studded Products Indented(In Crs)</div>
                            <div className="card-body">
                                <h6 className="card-title">{cardStuddData.length > 0 ? parseFloat(parseFloat(cardStuddData[0].tolValue) / 10000000).toFixed(3) : "Studded Products Not Indented"}</h6>
                            </div>
                        </div>
                        <div className="card border-secondary">
                            <div className="card-header" style={{ background: "black", color: "#fff", fontWeight: "bold" }}>Plain Products Indented (In Kgs)</div>
                            <div className="card-body">
                                <h6 className="card-title">{cardPlainData.length > 0 ? (parseFloat(cardPlainData[0].totWeight) / 1000).toFixed(3) : "Plain Products Not Indented"}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default GetProductsHome;
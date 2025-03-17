import React, { useState } from "react";
import { imageUrl } from "../DataCenter/DataList";
import { BsCart2 } from "react-icons/bs";
import Heart from "react-heart";
import Tippy from "@tippyjs/react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import deImgUrl from "../images/Loading_icon.gif";
import { APISaveFormDataL3 } from "../HostManager/CommonApiCallL3";

const ProductCard = ({ cardDetails, AlertPopup, PdtCardData }) => {
  const { storeCode, rsoName } = useParams();
  const loginData = JSON.parse(sessionStorage.getItem("loginData"));
  const { region } = loginData;
  const imageCode = cardDetails.itemCode.substring(2, 9);
  const imgUrl = `${imageUrl}${imageCode}`;
  const [heatActive, setHeatActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoad, setImgLoad] = useState(true);
  const navigate = useNavigate();

  const ProductsToWishlist = (productDetails) => {
    setHeatActive(true);
    setLoading(true);
    const WislistPayload = {
      category: productDetails.category,
      childNodesE: productDetails.childNodesE,
      childNodesN: productDetails.childNodesN,
      childNodeF: productDetails.childNodesF,
      childNodeO: productDetails.childNodesO,
      childNodeV: productDetails.childNodesV,
      childNodeK: productDetails.childNodesK,
      childNodeH: productDetails.childNodesH,
      collection: productDetails.collection,
      karatageRange: productDetails.karatageRange,
      consumerbase: productDetails.consumerBase,
      findings: productDetails.findings,
      indCategory: productDetails.category,
      indQty: "1",
      indentLevelType: productDetails.itemLevelType,
      itemCode: productDetails.itemCode,
      itgroup: productDetails.itGroup,
      npimEventNo: productDetails.npimEventNo,
      reasons: "",
      rsoName: rsoName,
      saleable: "",
      set2Type: "",
      sizeQuantitys: [],
      sizeUomQuantitys: [],
      stoneQuality: "",
      stoneQualityVal: "0",
      tagQuantitys: [],
      strCode: storeCode,
      submitStatus: "Wishlist",
    };
    APISaveFormDataL3(`/NPIML3/npim/insert/responses/from/L3`, WislistPayload)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          AlertPopup({
            status: true,
            main: "Product is Wishlisted",
            contain: "",
            mode: true,
          });
        } else if (response.data.code === "1001") {
          AlertPopup({
            status: true,
            main: "Product is Already Wishlisted",
            contain: "",
            mode: true,
          });
        } else if (response.data.code === "1005") {
          AlertPopup({
            status: true,
            main: response.data.value,
            contain: "",
            mode: true,
          });
        }
        PdtCardData(region);
        setLoading(false);
      })
      .catch((error) => setLoading(false));
    setTimeout(() => {
      setHeatActive(false);
    }, 2000);
  };

  const GetSingPdtDetails = (data) => {
    sessionStorage.setItem("CardItemCode", JSON.stringify(data));
    navigate(`/NpimPortal/indentL3Digital/${storeCode}/${rsoName}`);
  };
  return (
    <div>
      {loading === true && <Loader />}
      <div className="mycard">
        <Heart
          isActive={heatActive}
          className="hearIconsStyle"
          onClick={() => ProductsToWishlist(cardDetails)}
        />
        <img
          src={imgLoad === true ? deImgUrl : imgUrl}
          onLoad={() => setImgLoad(false)}
          className="pdtImageStyle"
          alt="imageNotFound"
        />
        <h6 className="itemCodeStyle">
          <b>{cardDetails.itemCode}</b>
          <Tippy content={<span>Show More</span>}>
            <b>
              <BsCart2
                size={21}
                cursor="pointer"
                onClick={() => GetSingPdtDetails(cardDetails)}
              />
            </b>
          </Tippy>
        </h6>
        <div className="d-flex justify-content-between mx-2">
          <b style={{ fontSize: "14px" }}>{cardDetails.collection}</b>
          <b style={{ fontSize: "14px", color: "#832729" }}>
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              minimumFractionDigits: 2,
            }).format(cardDetails.stdUCP)}
          </b>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;

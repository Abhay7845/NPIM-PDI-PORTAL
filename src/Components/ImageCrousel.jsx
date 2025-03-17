import React, { useState, useEffect } from "react";
import { imageUrl } from "../DataCenter/DataList";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "../Style/CssStyle/ImageCrousel.css";
import deImgUrl from "../images/Loading_icon.gif";
import { useNavigate, useParams } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";

const ImageCrousel = ({
  advariantDetails,
  statusData,
  cardStuddData,
  cardPlainData,
}) => {
  const { storeCode, rsoName } = useParams();
  const [slide, setSlide] = useState(0);
  const [imgLoad, setImgLoad] = useState(true);
  const navigate = useNavigate();
  const SeprateCard =
    statusData.row.length > 0 && statusData.row[statusData.row.length - 1];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((cout) => cout + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (slide === advariantDetails.length) {
    setSlide(0);
  }

  const GetCrouselDetails = (data) => {
    setImmediate(() =>
      sessionStorage.setItem("CardItemCode", JSON.stringify(data))
    );
    navigate(`/NpimPortal/indentL3Digital/${storeCode}/${rsoName}`);
  };

  return (
    <div className="row g-3">
      {advariantDetails.length > 0 ? (
        <div className="col-md-8">
          <div className="ImgCarousel">
            <BsArrowLeftCircleFill
              onClick={() =>
                setSlide(slide === 0 ? advariantDetails.length - 1 : slide - 1)
              }
              className="arrow arrow-left"
            />
            {advariantDetails.map((item, i) => {
              const imageCode = item.itemCode.substring(2, 9);
              const imgUrl = `${imageUrl}${imageCode}.jpg`;
              return (
                <img
                  key={i}
                  src={imgLoad === true ? deImgUrl : imgUrl}
                  alt={imageCode}
                  onLoad={() => setImgLoad(false)}
                  className={slide === i ? "ImgSlide" : "ImgSlide slide-hidden"}
                  onClick={() => GetCrouselDetails(item)}
                />
              );
            })}
            <BsArrowRightCircleFill
              onClick={() =>
                setSlide(slide === advariantDetails.length - 1 ? 0 : slide + 1)
              }
              className="arrow arrow-right"
            />
            <span className="indicators">
              <button
                className={
                  slide === 0 ? "indicator" : "indicator indicator-inactive"
                }
                onClick={() => setSlide(0)}
              />
              <button
                className={
                  slide === 1 ? "indicator" : "indicator indicator-inactive"
                }
                onClick={() => setSlide(1)}
              />
              <button
                className={
                  slide === 2 ? "indicator" : "indicator indicator-inactive"
                }
                onClick={() => setSlide(2)}
              />
              <button
                className={
                  slide === 3 ? "indicator" : "indicator indicator-inactive"
                }
                onClick={() => setSlide(3)}
              />
            </span>
          </div>
        </div>
      ) : (
        <div className="col-md-8">
          <img
            src={deImgUrl}
            style={{ width: "100%", height: "83%", borderRadius: "5px" }}
          />
        </div>
      )}
      {/* NEW CARD ADDING  */}
      <div className="col-md-4">
        <div className="card border-secondary">
          <div className="row g-2 p-1">
            <div className="col-md-6">
              <div className="card border-secondary">
                <div
                  className="card-header"
                  style={{
                    background: "black",
                    color: "#fff",
                    textAlign: "center",
                    fontSize: "13px",
                    fontWeight: "bold",
                  }}
                >
                  Total Products Displayed
                </div>
                <div className="text-center p-2">
                  <b>
                    {SeprateCard.totalSKU === "N/A" ? 0 : SeprateCard.totalSKU}
                  </b>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border-secondary">
                <div
                  className="card-header"
                  style={{
                    background: "black",
                    color: "#fff",
                    textAlign: "center",
                    fontSize: "13px",
                    fontWeight: "bold",
                  }}
                >
                  Total Products Indented
                </div>
                <div className="text-center text-primary p-2">
                  {SeprateCard.indented > 5
                    ? ""
                    : SeprateCard.indented === "N/A"
                    ? 0
                    : SeprateCard.indented}
                  <ProgressBar
                    variant="success"
                    now={
                      SeprateCard.indented === "N/A" ? 0 : SeprateCard.indented
                    }
                    label={
                      SeprateCard.indented === "N/A" ? 0 : SeprateCard.indented
                    }
                    animated
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card border-secondary my-4">
          <div
            className="card-header"
            style={{ background: "black", color: "#fff", fontWeight: "bold" }}
          >
            Value Of Studded Products Indented(In Crs)
          </div>
          <div className="card-body">
            <h6 className="card-title">
              {cardStuddData
                ? parseFloat(cardStuddData.sumTotWeight / 100000).toFixed(3)
                : "Studded Products Not Indented"}
            </h6>
          </div>
        </div>
        <div className="card border-secondary">
          <div
            className="card-header"
            style={{ background: "black", color: "#fff", fontWeight: "bold" }}
          >
            Plain Products Indented (In Kgs)
          </div>
          <div className="card-body">
            <h6 className="card-title">
              {cardPlainData
                ? parseFloat(cardPlainData.sumTotWeight / 1000).toFixed(3)
                : "Plain Products Not Indented"}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImageCrousel;

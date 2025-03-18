import React, { useState } from "react";
import deImgUrl from "../images/Loading_icon.gif";
import NoImage from "../images/NoImg.png";

const SingleImgCreator = (props) => {
  const [imgLoad, setImgLoad] = useState(true);
  const { itemCode, link } = props;
  const imageCode = itemCode.substring(2, 9);
  const ImageURL = `${link}${imageCode}.jpg`;

  return (
    <img
      src={imgLoad === true ? deImgUrl : ImageURL}
      onLoad={() => setImgLoad(false)}
      alt={imageCode}
      width="100"
      height="80"
      onError={(e) => (e.target.src = NoImage)}
    />
  );
};
export default SingleImgCreator;

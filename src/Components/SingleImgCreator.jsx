import React, { useState } from "react";
import deImgUrl from "../images/Loading_icon.gif"


const SingleImgCreator = (props) => {
  const [imgLoad, setImgLoad] = useState(true);
  const { itemCode, link } = props;
  const imageCode = itemCode.substring(2, 9);
  const ImageURL = `${link}${imageCode}.jpg`;

  return (
    <img src={imgLoad === true ? deImgUrl : ImageURL}
      onLoad={() => setImgLoad(false)}
      alt={imageCode} width="100" height="80" />
  );
};
export default SingleImgCreator;

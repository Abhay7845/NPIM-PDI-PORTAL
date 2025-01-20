import React, { useState } from "react";
import LoadingGif from "../../images/Loading_icon.gif";
import ReactImageMagnify from "react-image-magnify";

const ShowImageCart = (props) => {
  const { imageURL } = props;
  const [ImgLoad, setImgLoad] = useState(true);
  return (
    <ReactImageMagnify
      {...{
        smallImage: {
          src: ImgLoad ? LoadingGif : `${imageURL}.jpg`,
          height: 233.5,
          width: window.innerWidth * (22.11145833 / 100),
          onLoad: () => { imageURL.length <= 0 ? setImgLoad(true) : setImgLoad(false) },
          alt: "Image_Not Available",
        },
        largeImage: {
          src: ImgLoad ? LoadingGif : `${imageURL}.jpg`,
          width: 600,
          height: 500,
          onLoad: () => { imageURL.length <= 0 ? setImgLoad(true) : setImgLoad(false) },
          alt: "Image_Not Available",
        },
        shouldUsePositiveSpaceLens: true,
        enlargedImagePosition: "over",
        enlargedImageClassName: "large_img",
      }}
    />
  );
};

export default ShowImageCart;

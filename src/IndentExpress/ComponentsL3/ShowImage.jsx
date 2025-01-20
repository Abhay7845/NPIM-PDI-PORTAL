/** @format */

import React, { useState } from "react";
import LoadingGif from "../../images/Loading_icon.gif";
import "../Style/ShowImage.css";
import { Tabs, Tab, AppBar, Avatar } from "@material-ui/core";
import ReactImageMagnify from 'react-image-magnify';

const ShowImage = (props) => {
  const { imageURL } = props;
  const [ImgLoad, setImgLoad] = useState(true);
  const [value, setValue] = useState(0);

  const ClickGetNextImage = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className='showImageStyle'>
      <ReactImageMagnify
        {...{
          smallImage: {
            src: ImgLoad ? LoadingGif : `${imageURL}.jpg`,
            height: 440,
            isFluidWidth: true,
            width: window.innerWidth * (37.81145833 / 100),
            onLoad: () => { imageURL.length <= 0 ? setImgLoad(true) : setImgLoad(false) },
            alt: "Image_Not Available",
          },
          largeImage: {
            src: ImgLoad ? LoadingGif : `${imageURL}.jpg`,
            width: window.innerWidth * (37.81145833 / 100),
            height: 900,
            onLoad: () => { imageURL.length <= 0 ? setImgLoad(true) : setImgLoad(false) },
            alt: "Image_Not Available",
          },
          shouldUsePositiveSpaceLens: true,
          enlargedImagePosition: "over",
          enlargedImageClassName: "large_img",
        }}
      />
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={ClickGetNextImage}
          variant='scrollable'
          scrollButtons='on'
          indicatorColor='primary'
          textColor='primary'>
          <Tab
            style={{ minWidth: "1%" }}
            icon={<Avatar variant='square' src={`${imageURL}.jpg`} />}
          />
          <Tab
            style={{ minWidth: "1%" }}
            icon={<Avatar variant='square' src={`${imageURL}_2.jpg`} />}
          />
          <Tab
            style={{ minWidth: "1%" }}
            icon={<Avatar variant='square' src={`${imageURL}_3.jpg`} />}
          />
          <Tab
            style={{ minWidth: "1%" }}
            icon={<Avatar variant='square' src={`${imageURL}_4.jpg`} />}
          />
          <Tab
            style={{ minWidth: "1%" }}
            icon={<Avatar variant='square' src={`${imageURL}_5.jpg`} />}
          />
        </Tabs>
      </AppBar>
    </div>
  );
};

export default ShowImage;

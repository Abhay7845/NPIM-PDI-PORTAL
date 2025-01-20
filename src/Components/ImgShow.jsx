import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactImageMagnify from "react-image-magnify";
import { makeStyles, Tabs, Tab, AppBar, Avatar, CardActionArea, Card } from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { loadingGif } from "../images/images";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "100%",
    minWidth: "100%",
  },
  itemCodeColor: {
    backgroundColor: "#c4c4c0",
  },
  hidden: {
    display: "none",
  },
  show: {
    display: "none",
  },
}));

const ImgShow = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [ImgLoad, setImgLoad] = React.useState(true);
  const [imgLink, setImgLink] = React.useState("");

  useEffect(() => {
    setImgLink(props.imgLink);
    if (props.imgLink) {
      setValue(0);
    } else {
      setValue(1);
    }
  }, [props.imgLink]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (event.target.src) {
      setImgLink(event.target.src);
    } else {
      setImgLink(props.videoLink);
    }
  };

  const imageCode = props.itemCode !== "" && props.itemCode.substring(2, 9);
  const combineImage = `${imgLink}${imageCode}`;
  return (
    <React.Fragment>
      <Card className={classes.cardStyle}>
        <CardActionArea>
          {combineImage.search("preview") > 0 ? (
            <iframe
              src={props.videoLink + "?autoplay=1&mute=1"}
              width="590"
              height="500"
              title="Video is not available"
            />
          ) : (
            <ReactImageMagnify
              {...{
                smallImage: {
                  src: ImgLoad ? loadingGif : `${combineImage}.jpg`,
                  height: 472,
                  width: window.innerWidth * (40.41145833 / 100),
                  alt: "Image is not available",
                  onLoad: () => { combineImage.length <= 0 ? setImgLoad(true) : setImgLoad(false) },
                },
                largeImage: {
                  src: ImgLoad ? loadingGif : `${combineImage}.jpg`,
                  width: 1000,
                  height: 900,
                  alt: "Image is not available",
                  onLoad: () => combineImage.length <= 0 ? setImgLoad(true) : setImgLoad(false),
                },
                shouldUsePositiveSpaceLens: true,
                enlargedImagePosition: "over",
                enlargedImageClassName: "large_img",
              }}
            />
          )}
        </CardActionArea>
      </Card>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab style={{ minWidth: "1%" }} icon={<PlayCircleOutlineIcon />} />
          <Tab
            style={{ minWidth: "1%" }}
            icon={<Avatar variant="square" src={`${combineImage}.jpg`} />}
          />
          <Tab
            style={{ minWidth: "1%" }}
            icon={<Avatar variant="square" src={`${combineImage}_2.jpg`} />}
          />
          <Tab
            style={{ minWidth: "1%" }}
            icon={<Avatar variant="square" src={`${combineImage}_3.jpg`} />}
          />
          <Tab
            style={{ minWidth: "1%" }}
            icon={<Avatar variant="square" src={`${combineImage}_4.jpg`} />}
          />
          <Tab
            style={{ minWidth: "1%" }}
            icon={<Avatar variant="square" src={`${combineImage}_5.jpg`} />}
          />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
};
export default ImgShow;

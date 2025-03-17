import { Button, Divider } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Rating from "@mui/material/Rating";
import StarIcon from "@material-ui/icons/Star";
import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import ImgShow from "./ImgShow";
import {
  MuliSelectDropdownField,
  MuliSelectDropdownFieldQualityFeedback,
} from "./MuliSelectDropdownField";
import { useStyles } from "../Style/ProductInfo";
import { imageUrl } from "../DataCenter/DataList";
import { L1L2ProductsInfo } from "./NewComponents/L1L2ProductsInfo";

const ProductInfo = (props) => {
  const classes = useStyles();
  const [switchData, setSwitchData] = useState(true);
  const [multiSelectDrop, setMultiSelectDrop] = useState([]);
  const [multiSelectQtyFeed, setMultiSelectQtyFeedback] = useState([]);
  const [value, setValue] = useState(0);
  const [feedValue, setFeedValue] = useState(0);

  useEffect(() => {
    setSwitchData(true);
    if (!props.showinfo) {
      setMultiSelectDrop([]);
      setMultiSelectQtyFeedback([]);
      setValue(0);
      setFeedValue(0);
    }
  }, [props]);

  const onMultiSelect = (multiSelectData) => {
    setMultiSelectDrop(multiSelectData);
  };

  const onMultiSelectQtyFeedback = (multiSelectQlty) => {
    setMultiSelectQtyFeedback(multiSelectQlty);
  };

  const onClickSubmitBtnHandler = () => {
    props.getSubmitFormChild({
      feedValue: feedValue,
      multiSelectDrop: multiSelectDrop,
      multiSelectQtyFeed: multiSelectQtyFeed,
      qualityRating: value,
    });
  };
  const onClickUpdateBtnHandler = () => {
    props.getUpdateFormChild({
      feedValue: feedValue,
      multiSelectDrop: multiSelectDrop,
      multiSelectQtyFeed: multiSelectQtyFeed,
      qualityRating: value,
    });
  };

  return (
    <React.Fragment>
      <Grid container style={{ marginTop: "2%" }}>
        <div className="col-md-5">
          <ImgShow
            itemCode={props.productInfo.itemCode}
            videoLink=""
            imgLink={imageUrl}
          />
        </div>
        <Divider />
        <div className="col-md-7">
          <Typography className={classes.headingColor} align="center">
            {props.productInfo.itemCode}
          </Typography>
          <div className="row my-3">
            <div className="col-md-7">
              <L1L2ProductsInfo feedShowState={props.productInfo} />
            </div>
            <div className="d-flex justify-content-center col-md-5">
              <div className="text-lg-center">
                <h5 className="text-center my-1">
                  <b>FEEDBACK</b>
                </h5>
                <div className="border p-3">
                  <h6 className="my-2">
                    <b>Product Feedback</b>
                  </h6>
                  <Rating
                    name="simple-controlled"
                    value={feedValue}
                    onChange={(event, newValue) => {
                      setFeedValue(newValue);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
                  />
                  {feedValue > 0 && feedValue <= 4 && (
                    <div className="mutli_select_drop">
                      <MuliSelectDropdownField
                        onMultiSelect={onMultiSelect}
                        value={multiSelectDrop}
                        feedShowState={props.productInfo}
                      />
                    </div>
                  )}
                </div>
                <br />
                <div className="text-center border p-3">
                  <h6 className="my-2">
                    <b>Quality Feedback</b>
                  </h6>
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    emptyIcon={<StarIcon />}
                  />
                  {value > 0 && value <= 4 && (
                    <div className="mutli_select_drop">
                      <MuliSelectDropdownFieldQualityFeedback
                        onMultiSelectQlty={onMultiSelectQtyFeedback}
                        value={multiSelectQtyFeed}
                        feedShowState={props.productInfo}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row-cols-1 btn_feed_show">
            {props.SelectReport === "submitted" ? (
              <Button
                onClick={onClickUpdateBtnHandler}
                variant="outlined"
                color="secondary"
                fullWidth
                className={classes.buttonStyle}
              >
                Update
              </Button>
            ) : (
              <Button
                onClick={onClickSubmitBtnHandler}
                variant="outlined"
                color="secondary"
                fullWidth
                className={classes.buttonStyle}
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </Grid>
    </React.Fragment>
  );
};
export default ProductInfo;

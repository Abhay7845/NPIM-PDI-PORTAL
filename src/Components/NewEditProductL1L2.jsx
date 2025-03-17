import React, { useState, useEffect } from "react";
import { Button, Divider } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Rating from "@mui/material/Rating";
import StarIcon from "@material-ui/icons/Star";
import { Grid } from "@material-ui/core";
import ImgShow from "./ImgShow";
import { useStyles } from "../Style/ProductInfo";
import { imageUrl } from "../DataCenter/DataList";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import ProductDetailsTabular from "./ProductDetailsTabular";
import { APIInsertRatingL1L2Feedback } from "../HostManager/CommonApiCallL3";
import Loader from "./Loader";
import { MuliSelectDropdownField } from "./MuliSelectDropdownField";

const NewEditProductL1L2 = ({
  selectReport,
  productInfo,
  setProductInfo,
  GetL1l2PendinRtp,
  setAlertPopupStatus,
}) => {
  const classes = useStyles();
  const loginData = JSON.parse(sessionStorage.getItem("loginData"));

  const [loading, setLoading] = useState(false);
  const { storeCode, rsoName } = useParams();
  const [feedValueQ1, setFeedValueQ1] = useState(0);
  const [feedValueQ2, setFeedValueQ2] = useState(0);
  const [feedValueQ3, setFeedValueQ3] = useState(0);
  const [feedValueQ4, setFeedValueQ4] = useState(0);
  const [multiSelectDrop, setMultiSelectDrop] = useState([]);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const WeightageQ1 = 4 * Number(feedValueQ1);
  const WeightageQ2 = 7 * Number(feedValueQ2);
  const WeightageQ3 = 7 * Number(feedValueQ3);
  const WeightageQ4 = 2 * Number(feedValueQ4);
  const onMultiSelect = (multiSelectData) => {
    setMultiSelectDrop(multiSelectData);
  };
  const multiSelectValues = multiSelectDrop.map((item) =>
    item === "Others(Free Text)" ? feedbackMsg : item
  );

  const RecetAllFeildData = () => {
    setFeedbackMsg("");
    setFeedValueQ1(0);
    setFeedValueQ2(0);
    setFeedValueQ3(0);
    setFeedValueQ4(0);
    setMultiSelectDrop([]);
  };

  useEffect(() => {
    RecetAllFeildData();
  }, [productInfo.id, productInfo.itemCode]);
  const onClickSubmitBtnHandler = () => {
    if (feedValueQ1 && feedValueQ2 && feedValueQ3 && feedValueQ4) {
      setLoading(true);
      const feedbackPayload = {
        doe: "",
        strCode: storeCode,
        region: loginData.region,
        needstate: productInfo.consumerBase,
        collection: productInfo.collection,
        catPB: productInfo.catPB,
        itemCode: productInfo.itemCode,
        activity: productInfo.activity,
        itgroup: productInfo.itGroup,
        category: productInfo.category,
        q1_Rating: feedValueQ1,
        q2_Rating: feedValueQ2,
        q3_Rating: feedValueQ3,
        q4_Rating: feedValueQ4,
        specificFeedback: multiSelectValues.toString(),
        rsoName: rsoName,
        npimEventNo: productInfo.npimEventNo,
        indentLevelType: "L1L2",
        submitStatus: "feedback",
        overallProductPercentage:
          WeightageQ1 + WeightageQ2 + WeightageQ3 + WeightageQ4,
      };
      console.log("feedbackPayload==>", feedbackPayload);
      const updateAndEditUrl =
        selectReport === "submitted"
          ? "/api/NPIM/l1l2/update/response/l1l2"
          : "/api/NPIM/l1l2/insert/response/l1l2";
      APIInsertRatingL1L2Feedback(updateAndEditUrl, feedbackPayload)
        .then((res) => res)
        .then((response) => {
          console.log("response==>", response.data);
          if (response.data.code === "1000") {
            setProductInfo({});
            setAlertPopupStatus({
              status: true,
              main:
                selectReport === "submitted"
                  ? "Updated Successfully"
                  : "Inserted Successfully",
              contain: "",
              mode: true,
            });
            GetL1l2PendinRtp(storeCode);
          } else if (response.data.code === "1001") {
            toast.info("Something Wrong", { theme: "colored" });
          }
          setLoading(false);
        })
        .catch((err) => setLoading(false));
    } else {
      toast.error("Please Insure All The Questions Are Answered", {
        theme: "colored",
      });
    }
  };

  return (
    <React.Fragment>
      {loading === true && <Loader />}
      <Grid container style={{ marginTop: "2%" }}>
        <div className="col-md-5">
          <ImgShow
            itemCode={productInfo.itemCode || ""}
            videoLink=""
            imgLink={imageUrl}
          />
        </div>
        <Divider />
        <div
          className="col-md-7 p-1"
          style={{ boxShadow: "0 4px 8px 0 #00000033, 0 6px 20px 0 #00000030" }}
        >
          <Typography className={classes.headingColor} align="center">
            {productInfo.itemCode}
          </Typography>
          <div className="row my-3">
            <div className="col-md-5">
              <ProductDetailsTabular information={productInfo} />
            </div>
            <div className="col-md-7">
              <h5 className="text-center">
                <b>FEEDBACK</b>
              </h5>
              <div style={{ border: "1px solid gray", padding: "5px" }}>
                <div className="mt-3">
                  <h6
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      marginBottom: "1px",
                      textAlign: "justify",
                    }}
                  >
                    How relevent is this product to your market/region?
                  </h6>
                  <div className="d-flex justify-content-center">
                    <Rating
                      name="simple-controlled"
                      value={feedValueQ1}
                      onChange={(event, newValue) => setFeedValueQ1(newValue)}
                      emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
                      sx={{
                        "& .MuiRating-iconFilled": {
                          color: feedValueQ1 <= 3 ? "red" : "#57e32c",
                        }, // Filled stars
                        "& .MuiRating-iconHover": { color: "#ffa534" }, // Hover effect
                        "& .MuiRating-iconEmpty": { color: "gray" }, // Empty stars (optional)
                      }}
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <h6
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      marginBottom: "1px",
                      textAlign: "justify",
                    }}
                  >
                    How would you rate this product in terms of look to price?
                  </h6>
                  <div className="d-flex justify-content-center">
                    <Rating
                      name="simple-controlled"
                      value={feedValueQ2}
                      onChange={(event, newValue) => setFeedValueQ2(newValue)}
                      emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
                      sx={{
                        "& .MuiRating-iconFilled": {
                          color: feedValueQ2 <= 3 ? "red" : "#57e32c",
                        }, // Filled stars
                        "& .MuiRating-iconHover": { color: "#ffa534" }, // Hover effect
                        "& .MuiRating-iconEmpty": { color: "gray" }, // Empty stars (optional)
                      }}
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <h6
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      marginBottom: "1px",
                      textAlign: "justify",
                    }}
                  >
                    How would you rate this product in terms of differentiation
                    fit for Tanishq brand?
                  </h6>
                  <div className="d-flex justify-content-center">
                    <Rating
                      name="simple-controlled"
                      value={feedValueQ3}
                      onChange={(event, newValue) => setFeedValueQ3(newValue)}
                      emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
                      sx={{
                        "& .MuiRating-iconFilled": {
                          color: feedValueQ3 <= 3 ? "red" : "#57e32c",
                        }, // Filled stars
                        "& .MuiRating-iconHover": { color: "#ffa534" }, // Hover effect
                        "& .MuiRating-iconEmpty": { color: "gray" }, // Empty stars (optional)
                      }}
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <h6
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      marginBottom: "1px",
                      textAlign: "justify",
                    }}
                  >
                    How would you rate quality of the product?
                  </h6>
                  <div className="d-flex justify-content-center">
                    <Rating
                      name="simple-controlled"
                      value={feedValueQ4}
                      onChange={(event, newValue) => setFeedValueQ4(newValue)}
                      emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
                      sx={{
                        "& .MuiRating-iconFilled": {
                          color: feedValueQ4 <= 3 ? "red" : "#57e32c",
                        }, // Filled stars
                        "& .MuiRating-iconHover": { color: "#ffa534" }, // Hover effect
                        "& .MuiRating-iconEmpty": { color: "gray" }, // Empty stars (optional)
                      }}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <MuliSelectDropdownField
                    onMultiSelect={onMultiSelect}
                    value={multiSelectDrop}
                    feedShowState={productInfo}
                  />
                </div>
                {multiSelectDrop.includes("Others(Free Text)") && (
                  <div className="mt-3">
                    <textarea
                      type="text"
                      className="w-100"
                      placeholder="Write your Feedback (Max 50 Character)"
                      onChange={(e) => setFeedbackMsg(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row-cols-1 btn_feed_show">
            <Button
              onClick={onClickSubmitBtnHandler}
              variant="outlined"
              color="secondary"
              fullWidth
              className={classes.buttonStyle}
            >
              {selectReport === "submitted" ? " UPDATE" : "INSERT"}
            </Button>
          </div>
        </div>
      </Grid>
    </React.Fragment>
  );
};
export default NewEditProductL1L2;

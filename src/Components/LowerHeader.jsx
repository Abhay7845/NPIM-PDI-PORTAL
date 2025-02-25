import React, { useEffect, useState } from "react";
import "../Style/CssStyle/LowerHeader.css";
import SearchIcon from "@material-ui/icons/Search";
import { AppBar, Drawer, IconButton, TextField, Toolbar } from "@material-ui/core";
import StatusTabular from "./StatusTabular";
import { useStyles } from "../Style/LowerHeader";
import { useNavigate, useParams } from "react-router-dom";
import { L1L2Reports, specialChars } from "../DataCenter/DataList";
import { BsCardList, BsCart3 } from "react-icons/bs";
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineBarChart } from "react-icons/ai";
// import { APIGetReportL3 } from "../HostManager/CommonApiCallL3";
import StatusTabularL1L2 from "./StatusTabularL1L2";

const LowerHeader = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { storeCode, rsoName } = useParams();
  const [statusCloserOpener, setStatusCloserOpener] = useState(false);
  const [dropState, setDropState] = useState("");
  const [itemCodeValid, setItemCodeValid] = useState(false);
  // const [cardStuddData, setCardStuddData] = useState([]);
  // const [cardPlainData, setCardPlainData] = useState([]);
  const loginData = JSON.parse(sessionStorage.getItem("loginData"));

  const newChangeHandler = (inputValue) => {
    if (inputValue === "") {
      setItemCodeValid(false);
      setDropState(inputValue);
    } else {
      for (let char of inputValue) {
        if (specialChars.includes(char)) {
          setItemCodeValid(true);
        } else {
          setItemCodeValid(false);
        }
      }
      setDropState(inputValue);
    }
  };

  const mySearchClickHandler = () => {
    if (props.L3) {
      props.setAllDataFromValidation({
        sizeUomQuantityRes: [],
        sizeQuantityRes: [],
        stoneQualityRes: "",
        tegQuantityRes: [],
        typeSet2Res: "",
        quantityRes: "",
        findingsRes: "",
      });
    }
    props.onSear(dropState, setDropState);
  };

  useEffect(() => {
    if (dropState.length === 14) {
      mySearchClickHandler();
    }
  }, [dropState]);

  const ReportsRouting = () => {
    if (loginData.role === "L1" || loginData.role === "L2") {
      navigate(`/${L1L2Reports}/${storeCode}/${rsoName}`);
    } else if (loginData.role === "L3") {
      navigate(`/NpimPortal/reportL3/${storeCode}/${rsoName}`);
    }
  }

  // const GetCardSttudValue = (storeCode) => {
  //   APIGetReportL3(`/NPIML3/npim/summary/report/L3/${storeCode}/StuddedValue`)
  //     .then(res => res).then(response => {
  //       if (response.data.code === "1000") {
  //         setCardStuddData(response.data.value);
  //       }
  //     }).catch(error => console.log(""));
  // }

  // const GetCardPlainValue = (storeCode) => {
  //   APIGetReportL3(`/NPIML3/npim/summary/report/L3/${storeCode}/PlainValue`)
  //     .then(res => res).then(response => {
  //       if (response.data.code === "1000") {
  //         setCardPlainData(response.data.value);
  //       }
  //     }).catch(error => console.log(""));
  // }

  // useEffect(() => {
  //   GetCardSttudValue(storeCode);
  //   GetCardPlainValue(storeCode);
  // }, [storeCode, dropState]);

  return (
    <React.Fragment>
      <Drawer anchor="top" open={statusCloserOpener} onClick={() => setStatusCloserOpener(!statusCloserOpener)}>
        {loginData.role === "L3" ? <StatusTabular statusData={props.statusData} /> :
          <StatusTabularL1L2 statusData={props.statusData} />}
      </Drawer>
      <section className="lower_header_show">
        <div className={classes.root}>
          <AppBar
            position="static"
            color="transparent"
            className={classes.lowerHeader}
          >
            <Toolbar>
              <div className="d-flex justify-content-between w-100">
                <div className="d-flex mt-3">
                  <TextField
                    name="phydata"
                    placeholder="Enter 14 digit Item Code"
                    type="text"
                    value={dropState}
                    onChange={(e) => {
                      const inputValue = e.target.value.toUpperCase();
                      newChangeHandler(inputValue);
                    }}
                    helperText={itemCodeValid ? "Enter valid ItemCode" : ""}
                    error={itemCodeValid}
                    autoFocus={true}
                  />
                  <IconButton
                    onClick={mySearchClickHandler}
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    style={{ marginTop: "-10px" }}
                  >
                    <SearchIcon />
                  </IconButton>
                </div>
                {/* {loginData.role === "L3" && <div className="d-flex mt-4">
                  <h6><span className="text-primary">▣ </span><b style={{ color: "#832729" }}>STUDDED VALUE (Crs) - {cardStuddData.length > 0 ? parseFloat(parseFloat(cardStuddData[0].tolValue) / 10000000).toFixed(3) : 0}</b></h6>
                  <h6 className="mx-4"><span className="text-primary">▣ </span><b style={{ color: "#832729" }}>PLAIN VALUE (Kgs) - {cardPlainData.length > 0 ? (parseFloat(cardPlainData[0].totWeight) / 1000).toFixed(3) : 0}</b></h6>
                </div>} */}
                <div className="d-flex">
                  {loginData.role === "L3" && <div className="IconsStyle" onClick={() => navigate(`/NpimPortal/get/products/home/${storeCode}/${rsoName}`)}>
                    <BiHomeAlt size={23} />
                    <b>Home</b>
                  </div>}
                  {loginData.role === "L3" && <div className="IconsStyle" onClick={() => navigate(`/NpimPortal/added/cart/products/${loginData.userID}/${rsoName}`)}>
                    <BsCart3 size={23} />
                    <b>Cart</b>
                  </div>}
                  <div className="IconsStyle" onClick={() => setStatusCloserOpener(!statusCloserOpener)}>
                    <AiOutlineBarChart size={23} />
                    <b>Status</b>
                  </div>
                  {loginData.role === "L3" && <div className="IconsStyle" onClick={() => navigate(`/NpimPortal/wishlist/${storeCode}/${rsoName}`)}>
                    <AiOutlineHeart size={23} />
                    <b>Wishlist</b>
                  </div>}
                  <div className="IconsStyle" onClick={ReportsRouting}>
                    <BsCardList size={23} />
                    <b>Reports</b>
                  </div>
                </div>
              </div>
            </Toolbar>
          </AppBar>
        </div>
      </section>
    </React.Fragment>
  );
};
export default LowerHeader;

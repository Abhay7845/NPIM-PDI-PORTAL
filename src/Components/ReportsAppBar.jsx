import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  FormControlLabel,
  Switch,
  IconButton,
} from "@material-ui/core";
import DropdownField from "./DropdownField";
import { BsCardList, BsCart3 } from "react-icons/bs";
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineBarChart } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

function ReportsAppBar(props) {
  const navigate = useNavigate();
  const { storeCode, rsoName } = useParams();
  const loginData = JSON.parse(sessionStorage.getItem("loginData"));
  const {
    reportOptions,
    reportDropHandler,
    showInformationHandler,
    showInfo,
    switchEnable,
    droptype,
    statusOpener,
    barHandler,
  } = props;

  const ReportsRouting = () => {
    if (loginData.role === "L1" || loginData.role === "L2") {
      navigate(`/NpimPortal/reportL1andL2/${storeCode}/${rsoName}`);
    } else if (loginData.role === "L3") {
      navigate(`/NpimPortal/reportL3/${storeCode}/${rsoName}`);
    }
  };
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        {loginData.role === "Admin" && (
          <IconButton
            onClick={barHandler}
            edge="start"
            color="inherit"
            aria-label="menu"
            className="mr-2"
          >
            <MenuIcon />
          </IconButton>
        )}
        {showInformationHandler && (
          <div className="d-flex justify-content-between w-100">
            {droptype.toUpperCase() !== "WISHLIST" && (
              <DropdownField
                name={droptype}
                labelName={droptype}
                bigSmall={false}
                dropList={reportOptions}
                myChangeHandler={(event) =>
                  reportDropHandler(event.target.value)
                }
              />
            )}
            <FormControlLabel
              control={
                <Switch
                  checked={showInfo}
                  onChange={showInformationHandler}
                  name="feedbackSwitch"
                  color="secondary"
                  disabled={switchEnable}
                />
              }
              label="Product Description"
              style={{ width: "100%" }}
            />
            <div className="d-flex">
              {loginData.role === "L3" && (
                <div
                  className="IconsStyle"
                  onClick={() =>
                    navigate(
                      `/NpimPortal/added/cart/products/${loginData.userID}/${rsoName}`
                    )
                  }
                >
                  <BsCart3 size={23} />
                  <b>Cart</b>
                </div>
              )}
              <div
                className="IconsStyle"
                onClick={() =>
                  navigate(
                    `/NpimPortal/get/products/home/${storeCode}/${rsoName}`
                  )
                }
              >
                <BiHomeAlt size={23} />
                <b>Home</b>
              </div>
              <div className="IconsStyle" onClick={statusOpener}>
                <AiOutlineBarChart size={23} />
                <b>Status</b>
              </div>
              {loginData.role === "L3" && (
                <div
                  className="IconsStyle"
                  onClick={() =>
                    navigate(`/NpimPortal/wishlist/${storeCode}/${rsoName}`)
                  }
                >
                  <AiOutlineHeart size={23} />
                  <b>Wishlist</b>
                </div>
              )}
              <div className="IconsStyle" onClick={ReportsRouting}>
                <BsCardList size={23} />
                <b>Reports</b>
              </div>
            </div>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default ReportsAppBar;

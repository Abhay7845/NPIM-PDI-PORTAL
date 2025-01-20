import React from "react";
import "../Style/RedirectionTab.css";
import { Link } from "react-router-dom";
import InddentBGImage from "../../images/L1L2Background.jpg";
import UpperHeader from "../../Components/UpperHeader";

const RedirectionHomePage = () => {
  const ROLE = sessionStorage.getItem("indent-expressRole");
  return (
    <React.Fragment>
      <UpperHeader />
      <div className='DropDownFormStyle'>
        <div className='row w-100'>
          {ROLE === "L1" || ROLE === "L2" ? (
            <div className='d-flex w-100 mx-3'>
              <Link
                className='col-md-6 redirectionTab'
                to='/NpimPortal/Indent-express/L1/L2/physical/home'>
                PHYSICAL
              </Link>
              <Link
                className='col-md-6 redirectionTab'
                to='/NpimPortal/Indent-express/feedback/L1/L2'>
                DIGITAL
              </Link>
            </div>
          ) : null}
          {ROLE === "L3" && (
            <div className='d-flex'>
              <Link
                className='col-md-6 redirectionTab'
                to='/NpimPortal/Indent-express/L3/physical/home'>
                PHYSICAL
              </Link>
              <Link
                className='col-md-6 redirectionTab'
                to='/NpimPortal/Indent-express/L3/digital/home'>
                DIGITAL
              </Link>
            </div>
          )}
        </div>
      </div>
      <img src={InddentBGImage} className='L1L2BGImage' alt='Image_Not Load' />
    </React.Fragment>
  );
};

export default RedirectionHomePage;

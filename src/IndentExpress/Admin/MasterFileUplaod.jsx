import React, { useState } from "react";
import AdminSideBar from "./AdminSideBar";
import AdiminFileSideBar from "./AdiminFileSideBar";
import axios from "axios";
import swal from "sweetalert";
import Loader from "../../Components/Loader";
import { excelsheetURL, INDENT_HOST_URL } from "../../HostManager/UrlManager";
import UpperHeader from "../../Components/UpperHeader";

const MasterFileUplaod = () => {
  const [loading, setLoading] = useState(false);
  const [uploadMasterFile, setUploadMasterFile] = useState("");
  const [resError, setResError] = useState("");
  const UploadMasterFile = () => {
    if (uploadMasterFile) {
      setLoading(true);
      let formData = new FormData();
      formData.append("masterFile", uploadMasterFile);
      axios({
        method: "post",
        url: `${INDENT_HOST_URL}/INDENTADMIN/express/insert/sku/master`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setResError("");
            swal({
              title: "Success",
              text: "Master File Uploaded Successuly!",
              icon: "success",
              buttons: "OK",
            });
          } else {
            setResError(response.data.value)
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      alert("Please Select File");
    }

  };
  return (
    <div>
      {loading === true && <Loader />}
      <UpperHeader />
      <div className="DropdownForAdmin">
        <div className="AdminSideBarStyle">
          <AdminSideBar />
        </div>
      </div>
      <AdiminFileSideBar />
      <div className="main">
        <h5 className="text-center mt-2">MASTER FILE UPLOAD</h5>
        <div className="text-danger mx-3 mt-3 text-justify">
          <h6 className="my-3">
            <b className="text-dark">1.</b>
            **Please make sure that GENDER column is not blank for Categories
            like BRACELET, COUPLE BAND, FINGER RING, ANKLETS, TOE RING,
            MANGALSUTRA, CHAIN & WAIST BELT.
          </h6>
          <h6>
            <b className="text-dark">2.</b> **Please make sure that GENDER &
            SHAPE column is not blank for BANGLE CATEGORY.
          </h6>
          <h6 className="my-3">
            <b className="text-dark">3.</b> **Please make sure that FINDINGS
            column is not blank for Categories like DROP EARRING JHUMKA, & STUD
            EARRING.
          </h6>
          <h6>
            <b className="text-dark">4.</b> **Please make sure that ChildNodes_N
            & ChildNodes_E column is not blank for Categories like SET0, SET1,
            SET2 & T-CATEGORY.
          </h6>
          <hr />
        </div>
        <div className="d-flex mt-2 mx-1 justify-content-center">
          <div className="mx-1">
            <p>
              If you want to master SKU template then please click &nbsp;
              <a href={excelsheetURL} target="_blank" rel="noreferrer">
                Master Template
              </a>
            </p>
            <b className="p-1">Master File</b>
            <input type="file" className="DateSelect" onChange={(e) => setUploadMasterFile(e.target.files[0])} />
            <span className="text-danger">{resError}</span>
            <div className="d-flex justify-content-end mb-3">
              <button type="submit" className="ACommonBTN" onClick={UploadMasterFile}>
                UPLOAD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterFileUplaod;

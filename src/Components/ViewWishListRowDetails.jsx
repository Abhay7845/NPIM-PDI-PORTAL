import React from "react";
import ImgShow from "./ImgShow";
import { imageUrl } from "../DataCenter/DataList";
import StaticTabularInformation from "./StaticTabularInformation";

const ViewWishListRowDetails = ({
  wishListRowData,
  MoveToWishlist,
  setWishListRowData,
}) => {
  return (
    <div>
      <div className="row my-3 g-3 mx-0">
        <div className="col-sm-6">
          <ImgShow
            itemCode={wishListRowData.itemCode}
            videoLink=""
            imgLink={imageUrl}
          />
        </div>
        <div className="col-sm-6 border">
          <h6
            className="text-center my-2"
            style={{
              backgroundColor: "#832729",
              color: "#ffff",
              padding: "4px",
            }}
          >
            <b>{wishListRowData.itemCode}</b>
          </h6>
          <h6 className="text-center mt-3">
            <b>PRODUCT DETAILS</b>
          </h6>
          <table className="w-100">
            <tbody>
              <tr>
                <th>GROUP</th>
                <td>- &nbsp;&nbsp;</td>
                <td>{wishListRowData.itGroup}</td>
              </tr>
              <tr>
                <th>CATEGORY</th>
                <td>-</td>
                <td>{wishListRowData.category}</td>
              </tr>
              <tr>
                <th>STD WT</th>
                <td>-</td>
                <td>{wishListRowData.stdWt}</td>
              </tr>
              <tr>
                <th>STD UCP</th>
                <td>-</td>
                <td>{wishListRowData.stdUCP}</td>
              </tr>
              <tr>
                <th>WISHLISTED CATEGORY</th>
                <td>-</td>
                <td>{wishListRowData.indCategory}</td>
              </tr>
              <tr>
                <th>CAT PB</th>
                <td>-</td>
                <td>{wishListRowData.catPB}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
          {wishListRowData.si2Gh ||
          wishListRowData.vsGh ||
          wishListRowData.vvs1 ||
          wishListRowData.i2Gh ||
          wishListRowData.si2Ij ? (
            <StaticTabularInformation
              si2Gh={wishListRowData.si2Gh}
              vsGh={wishListRowData.vsGh}
              vvs1={wishListRowData.vvs1}
              i2Gh={wishListRowData.i2Gh}
              si2Ij={wishListRowData.si2Ij}
            />
          ) : null}
          <br />
          <button
            style={{
              backgroundColor: "#832729",
              color: "#ffff",
              border: "none",
              padding: "7px",
              width: "100%",
              borderRadius: "4px",
            }}
            onClick={() => MoveToWishlist(wishListRowData, setWishListRowData)}
          >
            Send To Indent List
          </button>
        </div>
      </div>
    </div>
  );
};
export default ViewWishListRowDetails;

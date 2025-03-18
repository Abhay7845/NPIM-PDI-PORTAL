import React, { useState, useEffect } from "react";
import "../Style/FeedbackFormL1L2.css";
import Tippy from "@tippyjs/react";
import { Link } from "react-router-dom";
import {
  BsSearch,
  BsFillHouseDoorFill,
  BsFillBarChartFill,
  BsCartFill,
  BsCardList,
} from "react-icons/bs";
import axios from "axios";
import swal from "sweetalert";
import { IMAGE_URL } from "../Data/DataList";
import ShowImage from "./ShowImage";
import TableDataDetails from "./TableDataDetails";
import BangleMultiUOMSize from "./BangleMultiUOMSize";
import ChooseMultiSize from "./ChooseMultiSize";
import IndentQuantityFiled from "./IndentQuantityFiled";
import StoneQualityDropdown from "../Common/StoneQualityDropdown";
import StoneQualityTable from "./StoneQualityTable";
import ChooseMultiSizeForLadies from "./ChooseMultiSizeForLadies";
import { INDENT_HOST_URL } from "../../HostManager/UrlManager";
import UpperHeader from "../../Components/UpperHeader";
import Loader from "../../Components/Loader";
import ChooseDynamicTag from "./ChooseDynamicTag";

const PhysicalL3 = () => {
  const storeCode = sessionStorage.getItem("store_code");
  const YourCart = sessionStorage.getItem("your-cart");
  const [SizeState, setSizeState] = useState([]);
  const [searchItemCode, setSearchItemCode] = useState("");
  const [productsDetails, setProductsDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [CoupleGentsSize, setCoupleGentsSize] = useState([]);
  const [CoupleLadiesSize, setCoupleLadiesSize] = useState([]);
  // INPUT FILED VALUE VARIABLE
  const [tagQuantity, SetTagQuantity] = useState([]);
  const [sizeUomQuantity, SetSizeUomQuantityRes] = useState([]);
  const [sizeQuantity, setSizeQuantityRes] = useState([]);
  const [getLadiesSizeValue, setGetLadiesSizeValue] = useState([]);
  const [findingsRes, setFindings] = useState("");
  const [stoneQuality, setStoneQualityRes] = useState("");
  const [indentQuantity, setIndentQuantityRes] = useState("");
  const [typeSet2, setTypeSet2Res] = useState("");
  const [coupleBandValue, setCoupleBandValue] = useState("");
  const { itemCode, videoLink } = productsDetails;
  const digit = !itemCode ? "" : itemCode[6];
  const sizeQuantities = [...sizeQuantity, ...getLadiesSizeValue];

  // STONE QUANTITY DATA
  const SI_2GH = productsDetails.si2Gh;
  const VS_GH = productsDetails.vsGh;
  const VVS1 = productsDetails.vvs1;
  const I2_GH = productsDetails.i2Gh;
  const SI2_IJ = productsDetails.si2Ij;
  const stoneTableData = [SI_2GH, VS_GH, VVS1, I2_GH, SI2_IJ];
  const stoneDropdown = stoneTableData.filter((item) => !item === false);

  const GetProductsDetails = () => {
    if (searchItemCode) {
      setLoading(true);
      const SearchByItemCoe = {
        storeCode: storeCode,
        collection: "ALL",
        consumerBase: "ALL",
        group: "ALL",
        category: "ALL",
        itemCode: searchItemCode,
      };
      axios
        .post(
          `${INDENT_HOST_URL}/INDENT/express/get/product/details`,
          SearchByItemCoe
        )
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setProductsDetails(response.data.value);
          } else if (response.data.code === "1001") {
            swal({
              title: "Data Not Found",
              text: response.data.value,
              icon: "error",
              buttons: "OK",
            });
          }
          if (response.data.code === "1003") {
            swal({
              title: "Already Indented",
              text: response.data.value,
              icon: "warning",
              buttons: "OK",
            });
          }
          setSearchItemCode("");
          setLoading(false);
        })
        .catch((error) => console.log(""));
    } else {
      alert("Please Enter Item Code");
    }
  };

  const imageCode = !productsDetails.itemCode
    ? ""
    : productsDetails.itemCode.substring(2, 9);
  const imageURL = `${IMAGE_URL}${imageCode}`;

  // DROPDOWN SIZE FOR NORMAL
  useEffect(() => {
    axios
      .get(`${INDENT_HOST_URL}/INDENTL3/express/size/dropdown/${itemCode}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setSizeState(response.data.value);
        } else if (response.data.code === "1001") {
          setSizeState([]);
        }
      })
      .catch((error) => console.log(""));
  }, [itemCode]);

  // <----------------------------COUPLE BAND SIZE-------------------->
  useEffect(() => {
    axios
      .get(
        `${INDENT_HOST_URL}/INDENTL3/express/L3/dropdown/couple/band/${itemCode}/COUPLE%20GENTS`
      )
      .then((res) => res)
      .then((result) => {
        if (result.data.Code === "1000") {
          setCoupleGentsSize(result.data.value);
        } else if (result.data.Code === "1001") {
          setCoupleGentsSize([]);
        }
      })
      .catch((error) => console.log(""));
  }, [itemCode]);
  useEffect(() => {
    axios
      .get(
        `${INDENT_HOST_URL}/INDENTL3/express/L3/dropdown/couple/band/${itemCode}/COUPLE%20LADIES`
      )
      .then((res) => res)
      .then((result) => {
        if (result.data.Code === "1000") {
          setCoupleLadiesSize(result.data.value);
        } else if (result.data.Code === "1001") {
          setCoupleLadiesSize([]);
        }
      })
      .catch((error) => console.log(""));
  }, [itemCode]);

  const GetTagFiledValues = (getTagSize) => {
    SetTagQuantity(getTagSize);
  };
  const GetUomSizeQuantity = (getUMOSize) => {
    SetSizeUomQuantityRes(getUMOSize);
  };
  const GetChooseSizeData = (getSizeData) => {
    setSizeQuantityRes(getSizeData);
  };
  const GetLadiesSizeValue = (getSizeData) => {
    setGetLadiesSizeValue(getSizeData);
  };
  const GetFindingData = (findingValue) => {
    setFindings(findingValue.target.value);
  };
  const GetStoneData = (stoneValue) => {
    setStoneQualityRes(stoneValue.target.value);
  };
  const GetSet2TypeData = (set2TypeValue) => {
    setTypeSet2Res(set2TypeValue.target.value);
  };

  const GetIndentQuantityValue = (indentQuantity) => {
    const newValue = indentQuantity.target.value;
    const lastNumber = parseInt(newValue.toString().slice(-1));
    setIndentQuantityRes(lastNumber);
  };

  // SUBMIT BUTTON
  const AddProductsToCard = () => {
    setLoading(true);
    const AddToCardProduct = {
      category: productsDetails.category,
      childNodesE: productsDetails.childNodesE,
      childNodesN: productsDetails.childNodesN,
      childNodeF: productsDetails.childNodeF,
      childNodeH: productsDetails.childNodeH,
      childNodeK: productsDetails.childNodeK,
      childNodeV: productsDetails.childNodeV,
      collection: productsDetails.collection,
      consumerbase: productsDetails.consumerBase,
      indCategory: productsDetails.category,
      indentLevelType: "L3",
      itemCode: productsDetails.itemCode,
      itgroup: productsDetails.itGroup,
      npimEventNo: productsDetails.npimEventNo,
      reasons: productsDetails.reasons,
      rsoName: productsDetails.rsoName,
      saleable: productsDetails.saleable,
      stoneQualityVal: productsDetails.stoneQualityVal,
      set2Type: typeSet2,
      indQty: indentQuantity,
      sizeQuantitys: sizeQuantities,
      sizeUomQuantitys: sizeUomQuantity,
      findings: findingsRes,
      stoneQuality: stoneQuality,
      tagQuantitys: tagQuantity,
      strCode: storeCode,
      submitStatus: "indent",
    };
    axios
      .post(
        `${INDENT_HOST_URL}/INDENTL3/express/insert/responses/from/L3`,
        AddToCardProduct
      )
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          swal({
            title: "Success!",
            text: "Your Data Has been Added To Cart Successfully",
            icon: "success",
            buttons: "OK",
          });
        }
        if (response.data.code === "1001") {
          alert("Your Data Has been Added To Cart Successfully");
          swal({
            title: "Warning",
            text: "No more data available for the selected category",
            icon: "warning",
            buttons: "OK",
          });
        }
        setLoading(false);
        setProductsDetails({});
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  return (
    <React.Fragment>
      <UpperHeader />
      {loading === true && <Loader />}
      <div className="DropDownFormStyle">
        <div className="row mx-2 w-100">
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <Tippy content="Home">
                <Link to="/NpimPortal/Indent-express/direction/home">
                  <BsFillHouseDoorFill size={25} className="my-2 text-dark" />
                </Link>
              </Tippy>
              <Tippy content="Status Report">
                <Link to="/NpimPortal/Indent-express/L3/status/reports">
                  <BsFillBarChartFill
                    size={25}
                    className="my-2 text-dark mx-3"
                  />
                </Link>
              </Tippy>
              <input
                type="text"
                value={searchItemCode}
                className="SearchInput"
                placeholder="Search by Item Code"
                onChange={(e) => setSearchItemCode(e.target.value)}
              />
              <BsSearch
                size={30}
                className="my-2 mx-3"
                style={{ cursor: "pointer" }}
                onClick={GetProductsDetails}
              />
            </div>
            <div className="d-flex">
              <Tippy content="Cancel Item List">
                <Link to="/NpimPortal/Indent-express/L3/cancel/item/list">
                  <BsCardList size={25} className="mt-2 mx-2 text-dark" />
                </Link>
              </Tippy>
              <Link
                to="/NpimPortal/Indent-express/L3/your/cart/reports"
                className="notification"
              >
                <BsCartFill size={25} className="mt-2 mx-2 text-dark" />
                <span className="badge">{YourCart}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* PHYSICAL PAGE */}
      {productsDetails.itemCode ? (
        <div className="row row-cols-1 row-cols-md-2 mx-0 my-3">
          <div className="col-md-5">
            <ShowImage imageURL={imageURL} videoLink={videoLink} />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h5
                className="text-center p-1 itemCodeText"
                style={{ backgroundColor: "#832729" }}
              >
                {productsDetails.itemCode}
              </h5>
              <div className="row my-3">
                <div className="col-md-5">
                  <div>
                    <h6 className="text-center my-2">
                      <b>PRODUCT SPECIFICATION</b>
                    </h6>
                    <br />
                    <table className="w-100">
                      <tbody className="productsDetailsStyle">
                        <tr>
                          <th>COLLECTION</th>
                          <td>- &nbsp;&nbsp;</td>
                          <td>{productsDetails.collection}</td>
                        </tr>
                        <tr>
                          <th>NEED STATE</th>
                          <td>-</td>
                          <td>{productsDetails.consumerBase}</td>
                        </tr>
                        <tr>
                          <th>GROUP</th>
                          <td>-</td>
                          <td>{productsDetails.itGroup}</td>
                        </tr>
                        <tr>
                          <th>CATEGORY</th>
                          <td>-</td>
                          <td>{productsDetails.category}</td>
                        </tr>
                        <tr>
                          <th>GENDER</th>
                          <td>-</td>
                          <td>{productsDetails.gender}</td>
                        </tr>
                        <tr>
                          <th>COMPLEXITY</th>
                          <td>-</td>
                          <td>{productsDetails.complexity}</td>
                        </tr>
                        <tr>
                          <th>STD WT</th>
                          <td>-</td>
                          <td>{productsDetails.stdWt}</td>
                        </tr>
                        <tr>
                          <th>STD UCP</th>
                          <td>-</td>
                          <td>{productsDetails.stdUCP}</td>
                        </tr>
                        <tr>
                          <th>METAL COLOR</th>
                          <td>-</td>
                          <td>{productsDetails.metalColor}</td>
                        </tr>
                        <tr>
                          <th>FINDING</th>
                          <td>-</td>
                          <td>{productsDetails.findings}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-md-7">
                  <h6 className="text-center my-2 feedBackText">
                    <b>INDENT DETAILS</b>
                  </h6>
                  <br />

                  {/* <-----------------------------TAG CATEGORY------------------------------->  */}
                  {!productsDetails.category ? (
                    ""
                  ) : productsDetails.category
                      .toUpperCase()
                      .replace(/\s{2,}/g, " ")
                      .trim() === "T CATEGORY" ||
                    digit === "0" ||
                    digit === "1" ||
                    digit === "2" ||
                    digit === "3" ||
                    digit === "4" ||
                    digit === "5" ||
                    digit === "6" ||
                    digit === "7" ? (
                    <ChooseDynamicTag
                      singleProductsDetails={productsDetails}
                      GetTagFiledValues={GetTagFiledValues}
                      GetUomSizeQuantity={GetUomSizeQuantity}
                      GetFindingData={GetFindingData}
                      SizeState={SizeState}
                      GetSet2TypeData={GetSet2TypeData}
                    />
                  ) : (
                    ""
                  )}

                  {digit === "V" && (
                    <BangleMultiUOMSize
                      optionsList={SizeState}
                      GetUomSizeQuantity={GetUomSizeQuantity}
                    />
                  )}

                  {/* <----------------------------SIZEABLE CATEGORY------------------------------> */}
                  {!productsDetails.category ? (
                    ""
                  ) : productsDetails.category
                      .toUpperCase()
                      .replace(/\s{2,}/g, " ")
                      .trim() === "FINGER RING" ||
                    digit === "L" ||
                    digit === "C" ||
                    digit === "Y" ||
                    digit === "B" ? (
                    <ChooseMultiSize
                      optionsList={SizeState}
                      singleProductsDetails={productsDetails}
                      GetChooseSizeData={GetChooseSizeData}
                    />
                  ) : (
                    ""
                  )}

                  {/* <------------------------------TOE RING-------------------------> */}
                  {!productsDetails.category ? (
                    ""
                  ) : productsDetails.category
                      .toUpperCase()
                      .replace(/\s{2,}/g, " ")
                      .trim() === "TOE RING" ? (
                    <ChooseMultiSize
                      optionsList={SizeState}
                      singleProductsDetails={productsDetails}
                      GetChooseSizeData={GetChooseSizeData}
                    />
                  ) : (
                    ""
                  )}
                  {/* <----------------------TABLE DATA--------------------------> */}
                  {digit === "0" ||
                  digit === "1" ||
                  digit === "2" ||
                  digit === "3" ||
                  digit === "4" ||
                  digit === "5" ||
                  digit === "6" ||
                  digit === "7" ? (
                    <TableDataDetails singleProductsDetails={productsDetails} />
                  ) : (
                    ""
                  )}
                  {/*<-----------------------INDENT QUANTITY BOX-----------------------------------> */}
                  {digit === "N" ||
                  digit === "O" ||
                  digit === "D" ||
                  productsDetails.category.toUpperCase() === "OTHER" ||
                  digit === "H" ||
                  digit === "J" ||
                  digit === "S" ||
                  digit === "W" ||
                  digit === "E" ||
                  digit === "P" ||
                  digit === "K" ||
                  digit === "A" ||
                  digit === "G" ? (
                    <IndentQuantityFiled
                      GetIndentQuantityValue={GetIndentQuantityValue}
                      indentQuantity={indentQuantity}
                    />
                  ) : (
                    ""
                  )}
                  {/* <-------------------------------COUPLE BAND--------------------------------> */}

                  {!productsDetails.category
                    ? ""
                    : productsDetails.category
                        .toUpperCase()
                        .replace(/\s{2,}/g, " ")
                        .trim() === "COUPLE BAND" && (
                        <div>
                          <select
                            className="L3SelectDropdown"
                            onChange={(e) => setCoupleBandValue(e.target.value)}
                          >
                            <option value="">CHOOSE COUPLE TAG</option>
                            <option value="Single_Tag">SINGLE TAG</option>
                            <option value="Separate_Tag">SEPARATE TAG</option>
                          </select>
                          {coupleBandValue === "Single_Tag" && (
                            <div className="mt-2">
                              <ChooseMultiSize
                                optionsList={SizeState}
                                singleProductsDetails={productsDetails}
                                GetChooseSizeData={GetChooseSizeData}
                              />
                            </div>
                          )}
                          {coupleBandValue === "Separate_Tag" && (
                            <div className="my-1">
                              <span className="text-primary">FOR GENTS</span>
                              <ChooseMultiSize
                                optionsList={CoupleGentsSize}
                                GetChooseSizeData={GetChooseSizeData}
                              />
                              <span className="text-primary mt-2">
                                FOR LADIES
                              </span>
                              <ChooseMultiSizeForLadies
                                optionsList={CoupleLadiesSize}
                                GetLadiesSizeValue={GetLadiesSizeValue}
                              />
                            </div>
                          )}
                          {/* <----------------------STONE QUALITY DROPDOWN-----------------------> */}
                          {stoneDropdown.length > 0 && (
                            <StoneQualityDropdown
                              optionsList={stoneDropdown}
                              GetStoneData={GetStoneData}
                              singleProductsDetails={productsDetails}
                            />
                          )}
                        </div>
                      )}
                </div>

                {/* <----------------------STONE QUALITY TABLE--------------------------> */}
                {stoneDropdown.length > 0 && (
                  <StoneQualityTable tableRowData={productsDetails} />
                )}
              </div>
              <div className="d-flex justify-content-center">
                <button className="CButton" onClick={AddProductsToCard}>
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <span>ADD TO CART</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default PhysicalL3;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import TableDataDownload from "../Common/TableDataDownload";
import * as Icon from "react-bootstrap-icons";
import { DataGrid } from "@mui/x-data-grid";
import CommonImage from "../Common/CommonImage";
import { IMAGE_URL } from "../Data/DataList";
import axios from "axios";
import swal from "sweetalert";
import ShowImage from "./ShowImage";
import ChooseDynamicTag from "./ChooseDynamicTag";
import BangleMultiUOMSize from "./BangleMultiUOMSize";
import ChooseMultiSize from "./ChooseMultiSize";
import IndentQuantityFiled from "./IndentQuantityFiled";
import StoneQualityDropdown from "../Common/StoneQualityDropdown";
import StoneQualityTable from "./StoneQualityTable";
import ChooseMultiSizeForLadies from "./ChooseMultiSizeForLadies";
import { INDENT_HOST_URL } from "../../HostManager/UrlManager";
import Loader from "../../Components/Loader";

const CancelTableList = (props) => {
  const { col, rows } = props;
  const [loading, setLoading] = useState(false);
  const storeCode = sessionStorage.getItem("store_code");
  const [searchItemCode, setSearchItemCode] = useState("");
  const [coupleBandValue, setCoupleBandValue] = useState("");
  const [reportRowTable, setReportRowTable] = useState({});
  const [SizeState, setSizeState] = useState([]);
  const [CoupleGentsSize, setCoupleGentsSize] = useState([]);
  const [CoupleLadiesSize, setCoupleLadiesSize] = useState([]);
  // INPUT FILED VALUE VARIABLE
  const [tagQuantity, SetTagQuantity] = useState([]);
  const [sizeUomQuantity, SetSizeUomQuantity] = useState([]);
  const [sizeQuantity, setSizeQuantity] = useState([]);
  const [getLadiesSizeValue, setGetLadiesSizeValue] = useState([]);
  const [findingsRes, setFindings] = useState("");
  const [stoneQuality, setStoneQuality] = useState("");
  const [indentQuantity, setIndentQuantity] = useState("");
  const [typeSet2, setTypeSet2Res] = useState("");
  const { itemCode } = reportRowTable;
  const digit = !itemCode ? "" : itemCode[6];
  const imageCode = !itemCode ? "" : itemCode.substring(2, 9);
  const imageURL = `${IMAGE_URL}${imageCode}`;
  const sizeQuantities = [...sizeQuantity, ...getLadiesSizeValue];

  const DataRows = rows.filter((eachRow) =>
    eachRow.itemCode.includes(searchItemCode.toUpperCase())
  );
  const UpdateCancelRow = (rowData) => {
    setReportRowTable(rowData);
    window.scrollTo({ top: "0", behavior: "smooth" });
  };

  // STONE QUANTITY DATA
  const SI_2GH = reportRowTable.si2Gh;
  const VS_GH = reportRowTable.vsGh;
  const VVS1 = reportRowTable.vvs1;
  const I2_GH = reportRowTable.i2Gh;
  const SI2_IJ = reportRowTable.si2Ij;
  const stoneTableData = [SI_2GH, VS_GH, VVS1, I2_GH, SI2_IJ];
  const stoneDropdown = stoneTableData.filter((item) => !item === false);

  // DROPDOWN SIZE FOR NORMAL
  useEffect(() => {
    axios.get(`${INDENT_HOST_URL}/INDENTL3/express/size/dropdown/${itemCode}`)
      .then((res) => res).then((response) => {
        if (response.data.code === "1000") {
          setSizeState(response.data.value);
        }
      }).catch((error) => console.log(""));
  }, [itemCode]);

  useEffect(() => {
    axios.get(`${INDENT_HOST_URL}/INDENTL3/express/L3/dropdown/couple/band/${itemCode}/COUPLE%20GENTS`)
      .then((res) => res).then((result) => {
        if (result.data.Code === "1000") {
          setCoupleGentsSize(result.data.value);
        } else if (result.data.Code === "1001") {
          setCoupleGentsSize([]);
        }
      }).catch((error) => console.log(""));
  }, [itemCode]);

  useEffect(() => {
    axios.get(`${INDENT_HOST_URL}/INDENTL3/express/L3/dropdown/couple/band/${itemCode}/COUPLE%20LADIES`)
      .then((res) => res).then((result) => {
        if (result.data.Code === "1000") {
          setCoupleLadiesSize(result.data.value);
        } else if (result.data.Code === "1001") {
          setCoupleLadiesSize([]);
        }
      }).catch((error) => console.log(""));
  }, [itemCode]);

  //GET INPUT VALUES
  const GetTagFiledValues = (getTagSize) => {
    SetTagQuantity(getTagSize);
  };

  const GetUomSizeQuantity = (getUMOSize) => {
    SetSizeUomQuantity(getUMOSize);
  };

  const GetChooseSizeData = (getSizeData) => {
    setSizeQuantity(getSizeData);
  };

  const GetLadiesSizeValue = (getSizeData) => {
    setGetLadiesSizeValue(getSizeData);
  };

  const GetFindingData = (findingValue) => {
    setFindings(findingValue.target.value);
  };

  const GetStoneData = (stoneValue) => {
    setStoneQuality(stoneValue.target.value);
  };

  const GetSet2TypeData = (set2TypeValue) => {
    setTypeSet2Res(set2TypeValue.target.value);
  };

  const GetIndentQuantityValue = (indentQuantity) => {
    const newValue = indentQuantity.target.value;
    const lastNumber = parseInt(newValue.toString().slice(-1));
    setIndentQuantity(lastNumber);
  };

  const column = col.map((element) => {
    let fieldRes;
    if (element === "Action") {
      fieldRes = {
        field: "Action",
        headerName: "Action",
        renderCell: (params) => {
          return (
            <Icon.PencilSquare
              className="EditButton"
              onClick={() => UpdateCancelRow(params.row)}
            />
          );
        },
      };
    } else if (element === "Image") {
      fieldRes = {
        field: "Image",
        headerName: "Image",
        renderCell: (params) => {
          return <CommonImage itemCode={params.row.itemCode} />;
        },
      };
    } else {
      fieldRes = {
        field: element,
        sortable: false,
        flex: 1,
      };
    }
    return fieldRes;
  });
  // CANCEL UPDATE API CALLING
  const UpdateCancelTableRow = () => {
    setLoading(true);
    const UpdateInputData = {
      itemCode: reportRowTable.itemCode,
      strCode: storeCode,
      saleable: "",
      reasons: "",
      childNodesE: reportRowTable.childNodesE,
      childNodesN: reportRowTable.childNodesN,
      childNodeF: reportRowTable.childNodeF,
      childNodeK: reportRowTable.childNodeK,
      childNodeV: reportRowTable.childNodeV,
      childNodeH: reportRowTable.childNodeH,
      childNodeO: reportRowTable.childNodeO,
      indCategory: reportRowTable.category,
      submitStatus: "report",
      stoneQualityVal: reportRowTable.stoneQualityVal,
      rsoName: "",
      npimEventNo: 1,
      indentLevelType: "L3",
      collection: "",
      consumerbase: reportRowTable.needState,
      itgroup: reportRowTable.itGroup,
      category: reportRowTable.category,
      exSize: reportRowTable.size,
      exUOM: reportRowTable.uom,
      exIndCategory: reportRowTable.indCategory,
      set2Type: typeSet2,
      indQty: indentQuantity,
      stoneQuality: stoneQuality,
      exStonequality: reportRowTable.stoneQuality,
      findings: findingsRes,
      sizeUomQuantitys: sizeUomQuantity,
      sizeQuantitys: sizeQuantities,
      tagQuantitys: tagQuantity,
    };
    axios
      .post(
        `${INDENT_HOST_URL}/INDENTL3/express/update/responses/from/L3`,
        UpdateInputData
      )
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          swal({
            title: "Success",
            text: "Your Data Has been Updated Successfully",
            icon: "success",
            buttons: "OK",
          });
        }
        if (response.data.code === "1001") {
          swal({
            title: "error",
            text: "Your Data is Not Updated",
            icon: "error",
            buttons: "OK",
          });
        }
        setReportRowTable("");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  return (
    <div>
      {loading === true && <Loader />}
      {reportRowTable.itemCode === undefined ? (
        ""
      ) : (
        <div className="row row-cols-1 row-cols-md-2 mx-1 my-3">
          <div className="col-md-5">
            <ShowImage imageURL={imageURL} />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h5
                className="text-center p-1 itemCodeText"
                style={{ backgroundColor: "#832729" }}
              >
                {reportRowTable.itemCode}
              </h5>
              <div className="row my-3">
                <div className="col-md-6">
                  <div>
                    <h6 className="text-center my-2">
                      <b>PRODUCT DESCRIPTION</b>
                    </h6>
                    <br />
                    <table className="w-100">
                      <tbody className="productsDetailsStyle">
                        <tr>
                          <th>GROUP</th>
                          <td>-</td>
                          <td>{reportRowTable.itGroup}</td>
                        </tr>
                        <tr>
                          <th>CATEGORY</th>
                          <td>-</td>
                          <td>{reportRowTable.category}</td>
                        </tr>
                        <tr>
                          <th>NEED STATE</th>
                          <td>-</td>
                          <td>{reportRowTable.needState}</td>
                        </tr>
                        <tr>
                          <th>STD WT</th>
                          <td>-</td>
                          <td>{reportRowTable.stdWt}</td>
                        </tr>
                        <tr>
                          <th>STD UCP</th>
                          <td>-</td>
                          <td>{reportRowTable.stdUCP}</td>
                        </tr>
                        <tr>
                          <th>IND-CATEGORY</th>
                          <td>-</td>
                          <td>{reportRowTable.indCategory}</td>
                        </tr>
                        <tr>
                          <th>SIZE</th>
                          <td>-</td>
                          <td>{reportRowTable.size}</td>
                        </tr>
                        <tr>
                          <th>UOM</th>
                          <td>-</td>
                          <td>{reportRowTable.uom}</td>
                        </tr>
                        <tr>
                          <th>QUANTITY</th>
                          <td>-</td>
                          <td>{reportRowTable.itemQty}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-md-6">
                  <h6 className="text-center my-2 feedBackText">
                    <b>INDENT DETAILS</b>
                  </h6>
                  <br />
                  {!reportRowTable.category ? (
                    ""
                  ) : reportRowTable.category
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
                      singleProductsDetails={reportRowTable}
                      GetTagFiledValues={GetTagFiledValues}
                      GetUomSizeQuantity={GetUomSizeQuantity}
                      GetFindingData={GetFindingData}
                      GetSet2TypeData={GetSet2TypeData}
                    />
                  ) : (
                    ""
                  )}
                  <div style={{ marginTop: "-15px" }}>
                    {digit === "V" && (
                      <BangleMultiUOMSize
                        optionsList={SizeState}
                        GetUomSizeQuantity={GetUomSizeQuantity}
                      />
                    )}
                  </div>
                  {!reportRowTable.category ? (
                    ""
                  ) : reportRowTable.category
                    .toUpperCase()
                    .replace(/\s{2,}/g, " ")
                    .trim() === "FINGER RING" ||
                    digit === "L" ||
                    digit === "C" ||
                    digit === "Y" ||
                    digit === "B" ? (
                    <div className="mt-3">
                      <ChooseMultiSize
                        optionsList={SizeState}
                        GetChooseSizeData={GetChooseSizeData}
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  {/* TOE RING */}
                  {!reportRowTable.category ? (
                    ""
                  ) : reportRowTable.category
                    .toUpperCase()
                    .replace(/\s{2,}/g, " ")
                    .trim() === "TOE RING" ? (
                    <ChooseMultiSize
                      optionsList={SizeState}
                      GetChooseSizeData={GetChooseSizeData}
                    />
                  ) : (
                    ""
                  )}

                  {!reportRowTable.category
                    ? ""
                    : reportRowTable.category
                      .toUpperCase()
                      .replace(/\s{2,}/g, " ")
                      .trim() === "COUPLE BAND" && (
                      <div className="mt-3">
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
                      </div>
                    )}

                  {digit === "N" ||
                    digit === "O" ||
                    digit === "D" ||
                    digit === "X" ||
                    digit === "H" ||
                    digit === "J" ||
                    digit === "S" ||
                    digit === "W" ||
                    digit === "E" ||
                    digit === "P" ||
                    digit === "K" ||
                    digit === "A" ||
                    digit === "G" ? (
                    <div className="mt-3">
                      <IndentQuantityFiled
                        GetIndentQuantityValue={GetIndentQuantityValue}
                        indentQuantity={indentQuantity}
                      />
                    </div>
                  ) : ""}

                  {stoneDropdown.length > 0 && (
                    <StoneQualityDropdown
                      optionsList={stoneDropdown}
                      GetStoneData={GetStoneData}
                      singleProductsDetails={reportRowTable}
                    />
                  )}
                </div>
              </div>
              {stoneDropdown.length > 0 && (
                <StoneQualityTable tableRowData={reportRowTable} />
              )}

              <div className="d-flex">
                <button className="CButton" onClick={UpdateCancelTableRow}>
                  UPDATE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="d-flex justify-content-between mx-0 my-3">
        <input
          type="text"
          value={searchItemCode}
          className="SearchRowByItem"
          placeholder="Search by Item Code"
          onChange={(e) => setSearchItemCode(e.target.value)}
        />
        <b className="text-primary mt-2 mx-2">COUNT- {DataRows.length}</b>
      </div>
      <DataGrid
        rows={DataRows}
        columns={column}
        autoHeight={true}
        pageSize={50}
        components={{
          Toolbar: TableDataDownload,
        }}
      />
    </div>
  );
};

export default CancelTableList;

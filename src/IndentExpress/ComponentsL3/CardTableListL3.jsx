/** eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TableDataDownload from "../Common/TableDataDownload";
import * as Icon from "react-bootstrap-icons";
import "../Style/TableForAll.css";
import axios from "axios";
import swal from "sweetalert";
import ChooseDynamicTag from "./ChooseDynamicTag";
import BangleMultiUOMSize from "./BangleMultiUOMSize";
import IndentQuantityFiled from "./IndentQuantityFiled";
import ChooseMultiSize from "./ChooseMultiSize";
import StoneQualityTable from "./StoneQualityTable";
import StoneQualityDropdown from "../Common/StoneQualityDropdown";
import CommonImage from "../Common/CommonImage";
import { IMAGE_URL } from "../Data/DataList";
import ShowImage from "./ShowImage";
import ChooseMultiSizeForLadies from "./ChooseMultiSizeForLadies";
import { INDENT_HOST_URL } from "../../HostManager/UrlManager";
import Loader from "../../Components/Loader";

const CardTableList = (props) => {
  const { reportsName } = props;
  const [loading, setLoading] = useState(false);
  const storeCode = sessionStorage.getItem("store_code");
  const [searchItemCode, setSearchItemCode] = useState("");
  const [coupleBandValue, setCoupleBandValue] = useState("");
  const [reportRowTable, setReportRowTable] = useState({});
  const [SizeState, setSizeState] = useState([]);
  const [CoupleGentsSize, setCoupleGentsSize] = useState([]);
  const [CoupleLadiesSize, setCoupleLadiesSize] = useState([]);
  const [col, setCol] = useState([]);
  const [rows, setRows] = useState([]);
  // INPUT FILED VALUE VARIABLE
  const [tagQuantity, SetTagQuantity] = useState([]);
  const [getLadiesSizeValue, setGetLadiesSizeValue] = useState([]);
  const [sizeUomQuantity, SetSizeUomQuantity] = useState([]);
  const [sizeQuantity, setSizeQuantity] = useState([]);
  const [findingsRes, setFindings] = useState("");
  const [stoneQuality, setStoneQuality] = useState("");
  const [indentQuantity, setIndentQuantity] = useState("");
  const [typeSet2, setTypeSet2] = useState("");
  const { itemCode } = reportRowTable;
  const digit = !itemCode ? "" : itemCode[6];
  const imageCode = !itemCode ? "" : itemCode.substring(2, 9);
  const imageURL = `${IMAGE_URL}${imageCode}`;
  const sizeQuantities = [...sizeQuantity, ...getLadiesSizeValue];

  // STONE QUANTITY DATA
  const SI_2GH = reportRowTable.si2Gh;
  const VS_GH = reportRowTable.vsGh;
  const VVS1 = reportRowTable.vvs1;
  const I2_GH = reportRowTable.i2Gh;
  const SI2_IJ = reportRowTable.si2Ij;
  const stoneTableData = [SI_2GH, VS_GH, VVS1, I2_GH, SI2_IJ];
  const stoneDropdown = stoneTableData.filter((item) => !item === false);

  const ReloadTableRows = () => {
    setLoading(true);
    axios.get(`${INDENT_HOST_URL}/INDENTL3/express/item/wise/rpt/L3/${storeCode}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setCol(response.data.coloum);
          setRows(response.data.value);
        } else if (response.data.code === "1001") {
          setCol([]);
          setRows([]);
        }
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
      });
  };

  const ErrorOnConfirmMail = () => {
    setLoading(true);
    axios
      .get(`${INDENT_HOST_URL}/INDENTL3/express/L3/store/status/update/${storeCode}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          swal({
            title: "Success",
            text: "All Data Already Confirmed",
            icon: "success",
            buttons: "OK",
          });
          ReloadTableRows();
        }
        setLoading(false);
      })
      .catch((error) => {
        alert(`${error.message} from error handling mail`);
        setLoading(false);
      });
  };

  // CONFIRM MAIL API CALLING
  const SuccessCount = rows.filter((item) => item.confirmationStatus === "Successful");
  const ConfirmMailData = rows.filter((item) => item.confirmationStatus !== "Successful");

  const ConfirmMail = () => {
    setLoading(true);
    axios.post(`${INDENT_HOST_URL}/INDENTL3/express/item/wise/rpt/edr/L3/${storeCode}`, ConfirmMailData)
      .then((res) => res).then((response) => {
        if (response.data.code === "1000") {
          swal({
            title: "Success",
            text: "Success",
            icon: "success",
            buttons: "OK",
          });
          ReloadTableRows();
        }
        setLoading(false);
      })
      .catch((error) => {
        ErrorOnConfirmMail();
        setLoading(false);
      });
  };

  // CARD REPORTS DATA
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${INDENT_HOST_URL}/INDENTL3/express/item/wise/rpt/L3/${storeCode}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setCol(response.data.coloum);
          setRows(response.data.value);
        }
        if (response.data.code === "1001") {
          setCol([]);
          setRows([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [storeCode, reportRowTable.id]);

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
      .catch((error) => { });
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
      .catch((error) => { });
  }, [itemCode]);

  const DeleteRow = (DeleteRow) => {
    setLoading(true);
    const { itemCode, size } = DeleteRow;
    axios
      .get(
        `${INDENT_HOST_URL}/INDENTL3/express/L3/cancel/indent/${itemCode}/${storeCode}/${size}`
      )
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1001") {
          swal({
            title: "Success",
            text: "Cancel Indent Has been Success",
            icon: "success",
            buttons: "OK",
          });
          ReloadTableRows();
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const UpdateRowData = (UpdateRow) => {
    window.scrollTo({ top: "0", behavior: "smooth" });
    setReportRowTable(UpdateRow);
  };

  const DataRows = rows.filter((eachRow) =>
    eachRow.itemCode.includes(searchItemCode.toUpperCase())
  );


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
    setTypeSet2(set2TypeValue.target.value);
  };

  const GetIndentQuantityValue = (indentQuantity) => {
    const newValue = indentQuantity.target.value;
    const lastNumber = parseInt(newValue.toString().slice(-1));
    setIndentQuantity(lastNumber);
  };

  // CANCEL INDENT API CALLING
  const CancelIndent = () => {
    setLoading(true);
    const { itemCode, size } = reportRowTable;
    axios
      .get(
        `${INDENT_HOST_URL}/INDENTL3/express/L3/cancel/indent/${itemCode}/${storeCode}/${size}`
      )
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1001") {
          swal({
            title: "Success",
            text: "Cancel Indent Has been Successful",
            icon: "success",
            buttons: "OK",
          });
        }
        setReportRowTable("");
        setLoading(false);
        ReloadTableRows();
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const UpdateTableRowData = () => {
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
  // SEN MAIL ERROR HANDLING
  const SendMailErrorHandel = () => {
    setLoading(true);
    axios
      .get(`${INDENT_HOST_URL}/INDENTL3/express/L3/store/status/update/${storeCode}`)
      .then((res) => res)
      .then((response) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  // SEND MAIL API CALLING
  const SendMail = () => {
    setLoading(true);
    axios
      .get(`${INDENT_HOST_URL}/INDENTL3/express/L3/mail/content/${storeCode}`)
      .then((res) => res)
      .then((response) => {
        const success =
          "Thankyou for completing the Indent Confirmation Process successfully";
        const error = "There was an error in Triggering email Please try Again";
        const msg =
          response.data.value.storeNPIMStatus === "LOCKED"
            ? `${response.data.value.storeNPIMStatus}, And Mail Already Sent`
            : response.data.mailStatus === "sent successfully"
              ? success
              : error;
        if (response.data.code === "1000") {
          swal({
            title: "Success",
            text: msg,
            icon: "success",
            buttons: "OK",
          });
        }
        if (response.data.code === "1002") {
          swal({
            title: "Error",
            text: error,
            icon: "error",
            buttons: "OK",
          });
          SendMailErrorHandel();
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const column = col.map((element) => {
    let fieldRes;
    if (element === "Action") {
      fieldRes = {
        field: "Action",
        headerName: "Action",
        sortable: false,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <div>
              {params.row.confirmationStatus === "" && (
                <div>
                  <Icon.PencilSquare
                    className="EditButton"
                    onClick={() => UpdateRowData(params.row)}
                  />
                  <Icon.Trash
                    className="DeleteButton"
                    onClick={() => DeleteRow(params.row)}
                  />
                </div>
              )}
              {reportsName === "Cancel_Item_List" && (
                <Icon.PencilSquare
                  className="EditButton"
                  onClick={() => UpdateRowData(params.row)}
                />
              )}
            </div>
          );
        },
      };
    } else if (element === "Image") {
      fieldRes = {
        field: "Image",
        headerName: "Image",
        sortable: false,
        renderCell: (params) => {
          return <CommonImage itemCode={params.row.itemCode} />;
        },
      };
    } else if (element === "confirmationStatus") {
      fieldRes = {
        field: "confirmationStatus",
        headerName: "confirmationStatus",
        sortable: false,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <p className="text-success">
              {params.row.confirmationStatus === "" ? "" : "Success"}
            </p>
          );
        },
      };
    } else {
      fieldRes = {
        field: element,
        sortable: false,
      };
    }
    return fieldRes;
  });
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
                <button className="CButton mx-1" onClick={CancelIndent}>
                  CANCEL INDENT
                </button>
                <button className="CButton" onClick={UpdateTableRowData}>
                  UPDATE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row g-2 my-2 ConfirmCollumreverse">
        <div className="col-md-4">
          <input
            type="text"
            value={searchItemCode}
            className="SearchRowByItem w-100"
            placeholder="Search by Item Code"
            onChange={(e) => setSearchItemCode(e.target.value)}
          />
        </div>
        <div className="col-md-4 text-danger">
          <div className="mt-3 d-flex justify-content-between mx-2">
            <b>TOTAL COUNT- {DataRows.length}</b>
            <b>||</b>
            <b>
              SUCCESS COUNT-
              {SuccessCount.length}
            </b>
          </div>
        </div>
        <div className="col-md-4 d-flex confirmButtons">
          <button className="confirmSendmail mx-2" onClick={ConfirmMail}>
            CONFIRM
          </button>
          <button className="confirmSendmail" onClick={SendMail}>
            SEND MAIL
          </button>
        </div>
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
export default CardTableList;

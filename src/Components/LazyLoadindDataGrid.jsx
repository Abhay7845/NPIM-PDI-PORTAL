import React, { useState } from "react";
import loadable from "./loadable";
import { Typography, Button, Container, Grid } from "@material-ui/core";
import SingleImgCreator from "./SingleImgCreator";
import {
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import * as Icon from "react-bootstrap-icons";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Tippy from "@tippyjs/react";
import AlertPopup, { ModelPopup } from "./AlertPopup";
import { Link, useParams } from "react-router-dom";
import "../Style/CssStyle/LazyLoadingDataGrid.css";
import { imageUrl } from "../DataCenter/DataList";
import {
  APIMailContentIndent,
  APIUpdateStaus,
} from "../HostManager/CommonApiCallL3";

const DataGrid = loadable(() =>
  import("@material-ui/data-grid").then((module) => {
    return { default: module.DataGrid };
  })
);

function CustomToolbar(props) {
  const successCountArray = props?.rows.filter(
    (row) => row.confirmationStatus !== ""
  );
  const [alertPopupStatus, setAlertPopupStatus] = useState({
    status: false,
    main: "",
    contain: "",
    mode: false,
  });
  const { storeCode } = useParams();
  function closeHandler() {
    setAlertPopupStatus({
      status: false,
      main: "",
      contain: "",
      mode: false,
    });
  }
  function closeHandlerForRest() {
    setAlertPopupStatus({
      status: false,
      main: "",
      contain: "",
      mode: false,
    });
  }
  const handelClick = () => {
    props.handelOpen();
  };
  const errorHandling = (storeCode) => {
    APIUpdateStaus(`/NPIML3/npim/L3/store/status/update/${storeCode}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setAlertPopupStatus({
            status: true,
            main: response.data.value,
            contain: "",
            mode: true,
          });
        }
      })
      .catch((error) => console.log(""));
  };

  const handelSendMail = () => {
    APIMailContentIndent(`/NPIML3/new/npim/L3/mail/content/${storeCode}/Indent`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          const success =
            "Thankyou for completing the Indent Confirmation Process successfully";
          const msg =
            response?.data?.value?.storeNPIMStatus === "LOCKED"
              ? `${response?.data?.value?.storeNPIMStatus} and mail already sent!`
              : response?.data?.mailStatus === "sent successfully" && success;
          setAlertPopupStatus({
            status: true,
            main: msg,
            contain: "",
            mode: true,
          });
        } else {
          errorHandling(storeCode);
        }
      })
      .catch((error) => console.log(""));
  };
  return (
    <GridToolbarContainer>
      <GridToolbarExport csvOptions={{ fileName: `Npim - ${new Date()}` }} />
      {/* <Grid item container className="mx-3">
        <input
          type="text"
          placeholder="Search ItemCode"
          className={classes.search}
          value={props.searchValue}
          onChange={props.handelSearch}
        />
      </Grid> */}
      {props.reportLabel === "Item_Wise_Report" && (
        <React.Fragment>
          <Grid item container>
            <h6>
              {" "}
              Total:
              <span>
                <b>{props?.rows.length}</b>
              </span>
            </h6>
            <h6 className="ml-5">
              {" "}
              Successful Indent Count:{" "}
              <span>
                <b>{successCountArray.length}</b>
              </span>
            </h6>
          </Grid>
          <Grid item container justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              className="m-1"
              onClick={handelClick}
            >
              Confirm
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="m-1"
              onClick={handelSendMail}
            >
              Send Mail
            </Button>
          </Grid>
        </React.Fragment>
      )}
      <AlertPopup
        status={alertPopupStatus.status}
        mainLable={alertPopupStatus.main}
        containLable={alertPopupStatus.contain}
        procideHandler=""
        discardHandler=""
        closeHandler={() => {
          alertPopupStatus.mode ? closeHandlerForRest() : closeHandler();
        }}
      />
      <ModelPopup
        open={props.popupOpen}
        handelClose={props.handelClose}
        option1="NO"
        option2="YES"
        message="Are you sure you want to conclude the indenting process. Click Yes to Confirm"
        onyes={props.handelYes}
      />
    </GridToolbarContainer>
  );
}
const LazyLoadindDataGrid = (props) => {
  const {
    col,
    rows,
    reportLabel,
    isConfirmed,
    rowDataHandler,
    popupOpen,
    handelYes,
    handelClose,
    handelOpen,
    DeleteRowData,
    MoveToWishlist,
  } = props;
  const [searchValue, setSearchValue] = useState("");
  const { storeCode, rsoName } = useParams();

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
              {params?.row?.confirmationStatus === "" && (
                <div>
                  <Icon.PencilSquare
                    onClick={() => rowDataHandler(params.row)}
                    size={16}
                    className="EditButton"
                  />
                  <DeleteRoundedIcon
                    size={16}
                    className="DeleteButton"
                    onClick={() => DeleteRowData(params.row)}
                  />
                  <Tippy content={<span>Send To WishList</span>}>
                    <SendRoundedIcon
                      className="SendIcon"
                      onClick={() => MoveToWishlist(params.row)}
                    />
                  </Tippy>
                </div>
              )}
              {reportLabel === "Cancel_Item_List" && (
                <div className="mx-3">
                  <Icon.PencilSquare
                    onClick={() => rowDataHandler(params.row)}
                    size={16}
                    className="EditButton"
                  />
                </div>
              )}
              {reportLabel === "CatPB_Report" && (
                <Link
                  to={`/NpimPortal/wishlist/${storeCode}/${rsoName}`}
                  onClick={() => {
                    sessionStorage.setItem(
                      "catPbRow",
                      JSON.stringify(params.row)
                    );
                  }}
                  style={{ marginLeft: "20px" }}
                >
                  <Tippy content={<span>Indent</span>}>
                    <SendRoundedIcon className="SendIcon" />
                  </Tippy>
                </Link>
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
          return (
            <SingleImgCreator
              itemCode={params.row.itemCode ? params.row.itemCode : ""}
              link={imageUrl}
            />
          );
        },
      };
    } else if (element === "confirmationStatus") {
      fieldRes = {
        field: "confirmationStatus",
        headerName: "confirmationStatus",
        sortable: false,
        flex: 1,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
            <div>
              {params?.row?.confirmationStatus === "" ? (
                ""
              ) : (
                <p className="text-success">Success</p>
              )}
            </div>
          );
        },
      };
    } else if (element === "totalIndentForCatPB") {
      fieldRes = {
        field: "totalIndentForCatPB",
        headerName: "totalIndentForCatPB",
        sortable: false,
        flex: 1,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          const { totalIndentForCatPB } = params.row;
          return <b>{totalIndentForCatPB}</b>;
        },
      };
    } else if (element === "limit") {
      fieldRes = {
        field: "limit",
        headerName: "limit",
        sortable: false,
        flex: 1,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          const { limit } = params.row;
          return <b>{limit || "N/A"}</b>;
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

  const handelSearch = (e) => setSearchValue(e.target.value);

  const DataRows = rows?.filter((eachRow) =>
    eachRow?.itemCode?.includes(searchValue.toUpperCase())
  );
  const FilttredRows = DataRows.length > 0 ? DataRows : rows;

  return (
    <Container maxWidth="xl" className="mb-4">
      <Typography align="center" variant="h6" color="secondary">
        {reportLabel.replace(/_/g, " $&").replace(/_/g, "").toUpperCase()}
      </Typography>
      <DataGrid
        rows={FilttredRows}
        columns={column}
        autoHeight={true}
        rowsPerPageOptions={[50]}
        pagination
        pageSize={50}
        components={{ Toolbar: () => CustomToolbar(props) }}
        componentsProps={{
          toolbar: {
            handelSearch: handelSearch,
            isConfirmed: isConfirmed,
            reportLabel: reportLabel,
            rows: rows,
            popupOpen: popupOpen,
            handelYes: handelYes,
            handelClose: handelClose,
            handelOpen: handelOpen,
          },
        }}
      />
    </Container>
  );
};

export default LazyLoadindDataGrid;

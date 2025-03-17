import React, { useState } from "react";
import loadable from "./loadable";
import { Typography, Container, Grid, Button } from "@material-ui/core";
import SingleImgCreator from "./SingleImgCreator";
import {
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AlertPopup, { ModelPopup } from "./AlertPopup";
import Tippy from "@tippyjs/react";
import { Link, useParams } from "react-router-dom";
import { useStyles } from "../Style/LazyLoadingDataGrid";
import "../Style/CssStyle/LazyLoadingDataGrid.css";
import { imageUrl } from "../DataCenter/DataList";
import { BsCardChecklist } from "react-icons/bs";
import ViewWishListRowDetails from "./ViewWishListRowDetails";
import {
  APIMailContentWishList,
  APIUpdateStaus,
} from "../HostManager/CommonApiCallL3";
import Loader from "./Loader";

const DataGrid = loadable(() =>
  import("@material-ui/data-grid").then((module) => {
    return { default: module.DataGrid };
  })
);

function CustomToolbar(props) {
  const classes = useStyles();
  const [alertPopupStatus, setAlertPopupStatus] = useState({
    status: false,
    main: "",
    contain: "",
    mode: false,
  });

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

  return (
    <GridToolbarContainer>
      <GridToolbarExport csvOptions={{ fileName: `Npim-${new Date()}` }} />
      <Grid item container className="mx-3">
        <input
          type="text"
          placeholder="Search ItemCode"
          className={classes.search}
          value={props.searchValue}
          onChange={props.handelSearch}
        />
      </Grid>
      <AlertPopup
        status={alertPopupStatus.status}
        mainLable={alertPopupStatus.main}
        containLable={alertPopupStatus.contain}
        procideHandler=""
        discardHandler=""
        closeHandler={() =>
          alertPopupStatus.mode ? closeHandlerForRest() : closeHandler()
        }
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

const LazyloadingDataGridForWishlist = (props) => {
  const {
    col,
    rows,
    reportLabel,
    isConfirmed,
    popupOpen,
    handelYes,
    handelClose,
    handelOpen,
    DeleteRowData,
    MoveToWishlist,
    getCatPbRow,
    showInfo,
    switchEnable,
  } = props;

  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { storeCode, rsoName } = useParams();
  const [wishListRowData, setWishListRowData] = useState({});
  const [alertPopupStatus, setAlertPopupStatus] = useState({
    status: false,
    main: "",
    contain: "",
    mode: false,
  });

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
              <BsCardChecklist
                size={20}
                className="DeleteButton"
                onClick={() => {
                  setWishListRowData(params.row);
                  showInfo(true);
                  switchEnable(false);
                  window.scrollTo({ top: "0", behavior: "smooth" });
                }}
              />
              <DeleteRoundedIcon
                size={8}
                className="DeleteButton"
                onClick={() => DeleteRowData(params.row)}
              />
              <Tippy content={<span>Send To Indent List</span>}>
                <SendRoundedIcon
                  className="SendIcon"
                  onClick={() => MoveToWishlist(params.row, setWishListRowData)}
                />
              </Tippy>
            </div>
          );
        },
      };
    } else if (element === "indCategory") {
      fieldRes = {
        field: "Category",
        headerName: "Category",
        sortable: false,
        renderCell: (params) => {
          return (
            <Tippy content={<span>{params.row.indCategory}</span>}>
              <Typography>{params.row.indCategory}</Typography>
            </Tippy>
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
    } else if (element === "catPB") {
      fieldRes = {
        field: element,
        sortable: false,
        flex: 3,
        renderCell: (params) => {
          return (
            <Tippy content={<span>{params.row.catPB}</span>}>
              <Typography style={{ fontSize: "13px" }}>
                {params.row.catPB}
              </Typography>
            </Tippy>
          );
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

  const handelSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const filterByCatPb = getCatPbRow
    ? rows.filter((row) => row.catPB.includes(getCatPbRow.catPB))
    : rows;
  const DataRows = filterByCatPb?.filter((eachRow) =>
    eachRow?.itemCode?.includes(searchValue.toUpperCase())
  );

  const handelSendMail = (storeCode) => {
    APIMailContentWishList(
      `/NPIML3/new/npim/L3/mail/content/${storeCode}/Wishlist`
    )
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          const success = "Wishlist Report has been E-mailed successfully";
          const error =
            "There was an Error in Triggering E-mail Please try Again !";
          const msg =
            response?.data?.value?.storeNPIMStatus === "LOCKED"
              ? `${response?.data?.value?.storeNPIMStatus} and mail already sent!`
              : response?.data?.mailStatus === "sent successfully"
              ? success
              : error;
          setAlertPopupStatus({
            status: true,
            main: msg,
            contain: "",
            mode: true,
          });
        }
        setLoading(false);
      })
      .catch((error) => setLoading(false));
  };

  const ErrorHandlingMail = () => {
    setLoading(true);
    APIUpdateStaus(`/NPIML3/npim/L3/store/status/update/${storeCode}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          handelSendMail(storeCode);
        }
        setLoading(false);
      })
      .catch((error) => setLoading(false));
  };

  return (
    <Container maxWidth="xl" className="mb-4">
      {loading && <Loader />}
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
      <Typography
        align="center"
        variant="h6"
        color="secondary"
        className="mt-3"
      >
        {reportLabel.toUpperCase()}
      </Typography>
      {wishListRowData.id && (
        <ViewWishListRowDetails
          wishListRowData={wishListRowData}
          MoveToWishlist={MoveToWishlist}
          setWishListRowData={setWishListRowData}
        />
      )}
      <div className="d-flex justify-content-end">
        <Button
          variant="contained"
          color="primary"
          className="m-1"
          onClick={ErrorHandlingMail}
        >
          Send Mail
        </Button>
        {getCatPbRow && (
          <Link
            to={`/NpimPortal/reportL3/${storeCode}/${rsoName}`}
            onClick={() => sessionStorage.removeItem("catPbRow")}
          >
            <Button variant="contained" color="primary" className="m-1">
              BACK
            </Button>
          </Link>
        )}
      </div>
      <DataGrid
        rows={DataRows}
        columns={column}
        autoHeight={true}
        rowsPerPageOptions={[50]}
        pagination
        pageSize={50}
        components={{ Toolbar: CustomToolbar }}
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

export default LazyloadingDataGridForWishlist;

import React, { useState } from "react";
import {
  Container,
  CssBaseline,
  Grid,
  Button,
  Drawer,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useParams } from "react-router-dom";
import {
  CustomToolbar,
  DataGridForAdmin,
  SelectOfMUI,
  TextFieldOfMUI,
} from "../Components/ComponentForAdmin";
import Loading from "../Components/Loading";
import ReportsAppBar from "../Components/ReportsAppBar";
import SideAppBar from "../Components/SideAppBar";
import UpperHeader from "../Components/UpperHeader";
import "../Style/CssStyle/DayEndReportAdmin.css";
import {
  L1L2Header,
  L3Header,
  wishlistHeader,
} from "../DataCenter/AdminDataList";
import {
  APIAdminGetParameter,
  APIGetEndDayRtp,
  APIGetWishEndDayRtp,
} from "../HostManager/CommonApiCallL3";
import { hitRateColItemCode, hitRateColRegion } from "../DataCenter/DataList";
import { toast } from "react-toastify";
import Modal from "../Components/Dashboard/Modal";

const DayEndReportAdmin = () => {
  const { storeCode, rsoName } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [endDayReport, setEndDayReport] = useState({
    col: [],
    rows: [],
  });

  const [endDayReportInput, setEndDayReportInput] = useState({
    level: "",
    parameter: "",
    fromDate: "",
    toDate: "",
  });

  const [barOpener, setBarOpener] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ParameterData, setParameterData] = useState({
    col: [],
    row: [],
  });

  const navBarList = [
    {
      id: 1,
      name: "Home",
      link: `/NpimPortal/AdminHome/${storeCode}/${rsoName}`,
      icon: "HomeIcon",
    },
    {
      id: 2,
      name: "Day End Report",
      link: `/NpimPortal/new/dayEndReportForAdmin/${storeCode}/${rsoName}`,
      icon: "ReportIcon",
    },
    {
      id: 4,
      name: "Send Store Report",
      link: `/NpimPortal/SendStoreReportAdmin/${storeCode}/${rsoName}`,
      icon: "SendIcon",
    },
  ];

  function endDayReportCall(inputData) {
    if (endDayReportInput.level === "Wishist_Report") {
      APIGetWishEndDayRtp(`/NPIML3/wishlist/end/day/report/${inputData}`)
        .then((response) => {
          if (response.data.code === "1000") {
            setEndDayReport({
              col: wishlistHeader,
              rows: response.data.value,
            });
          } else if (response.data.code === "1001") {
            toast.warn("Data Not Found", { theme: "colored", autoClose: 1000 });
          }
          setLoading(false);
        })
        .catch((error) => setLoading(false));
    } else {
      let urlReport;
      switch (endDayReportInput.level) {
        case "L1/L2":
          urlReport = `/ADMIN/end/day/report/${inputData}`;
          break;
        case "L3":
          urlReport = `/ADMIN/end/day/report/${inputData}`;
          break;
        default:
          break;
      }
      setLoading(true);
      APIGetEndDayRtp(urlReport)
        .then((response) => {
          if (response.data.code === "1000") {
            setEndDayReport({
              col:
                endDayReportInput.level === "L3"
                  ? L3Header
                  : endDayReportInput.level === "L1/L2"
                  ? L1L2Header
                  : wishlistHeader,
              rows: response.data.value,
            });
          } else if (response.data.code === "1001") {
            toast.warn("Data Not Found", { theme: "colored", autoClose: 1000 });
          }
          setLoading(false);
        })
        .catch((error) => setLoading(false));
    }
  }

  const onChangeInputHandler = (event) => {
    const { name, value } = event.target;
    setEndDayReportInput((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
    setParameterData({
      col: [],
      row: [],
    });
    setEndDayReport({
      col: [],
      rows: [],
    });
  };

  const validateFiled = () => {
    let { level, fromDate, toDate } = endDayReportInput;
    if (!level) {
      toast.warn("Select Level", { theme: "colored", autoClose: 1000 });
    } else if (!fromDate) {
      toast.warn("Select From Date", { theme: "colored", autoClose: 1000 });
    } else if (!toDate) {
      toast.warn("Select To Date", { theme: "colored", autoClose: 1000 });
    } else if (level && fromDate && toDate) {
      endDayReportCall(`?fromDate=${fromDate}&level=${level}&toDate=${toDate}`);
    }
  };

  //API CALLING
  const getParameterData = (parameter) => {
    setLoading(true);
    APIAdminGetParameter(`/ADMIN/npim/scanned/report/L1/hit/rates/${parameter}`)
      .then((res) => res)
      .then((result) => {
        if (result.data.code === "1000") {
          setParameterData({
            col: parameter === "Region" ? hitRateColRegion : hitRateColItemCode,
            row: result.data.value,
          });
        } else if (result.data.code === "1001") {
          toast.warn("Data Not Found", { theme: "colored", autoClose: 1000 });
        }
        setLoading(false);
      })
      .catch((error) => setLoading(false));
  };

  const validateParameter = () => {
    let { parameter } = endDayReportInput;
    if (!parameter) {
      toast.warn("Select Parameter", { theme: "colored", autoClose: 1000 });
      setLoading(false);
    } else if (parameter) {
      getParameterData(parameter);
    }
  };

  const levelDropDown = ["L1/L2", "L3", "Wishist_Report", "HitRate_Report"];
  const parameterOption = ["ItemCode", "Region"];

  const column = ParameterData.col.map((element) => {
    let filedResp;
    if (element === "hitRate") {
      filedResp = {
        field: element,
        sortable: false,
        flex: 150,
        renderCell: (params) => {
          return <h6>{params.row.hitRate} %</h6>;
        },
      };
    } else {
      filedResp = {
        field: element,
        sortable: false,
        flex: 150,
      };
    }
    return filedResp;
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <Drawer
        anchor="left"
        open={barOpener}
        onClose={() => setBarOpener(false)}
      >
        <SideAppBar navBarList={navBarList} pageName="admin" />
      </Drawer>
      <Grid item xs={12} sm={12}>
        <UpperHeader itemCode={123} storeCode={storeCode} />
        <Loading flag={loading} />
      </Grid>
      <Grid item xs={12} sm={12}>
        <ReportsAppBar barHandler={() => setBarOpener(true)} />
      </Grid>
      <Grid className="ReportGenerateStyle">
        <Grid item xs={6} sm={3} className="mx-2 Level_Style">
          <SelectOfMUI
            label="Level"
            optionList={levelDropDown}
            selectHandleChange={onChangeInputHandler}
            value={endDayReportInput.level}
            name="level"
          />
        </Grid>
        <br />
        {endDayReportInput.level === "HitRate_Report" ? (
          <Grid item xs={6} sm={3} className="mx-2 Parameter_style">
            <SelectOfMUI
              label="Parameter"
              optionList={parameterOption}
              selectHandleChange={onChangeInputHandler}
              value={endDayReportInput.parameter}
              name="parameter"
            />
          </Grid>
        ) : (
          <React.Fragment>
            <Grid item xs={6} sm={3} className="Parameter_style">
              <TextFieldOfMUI
                lable="From"
                type="date"
                textFieldHandlerChange={onChangeInputHandler}
                value={endDayReportInput.fromDate}
                name="fromDate"
                placeholder="Select Date"
              />
            </Grid>
            <br />
            <Grid item xs={6} sm={3} className="mx-2 Parameter_style">
              <TextFieldOfMUI
                lable="To"
                type="date"
                textFieldHandlerChange={onChangeInputHandler}
                value={endDayReportInput.toDate}
                name="toDate"
              />
            </Grid>
          </React.Fragment>
        )}
        <br />
        <Grid className="d-flex mx-1">
          {endDayReportInput.level === "HitRate_Report" ? (
            <Button
              color="primary"
              variant="contained"
              onClick={validateParameter}
            >
              GENERATE REPORT
            </Button>
          ) : (
            <div style={{ display: "flex", marginTop: "-5px" }}>
              <Button
                color="primary"
                variant="contained"
                onClick={validateFiled}
              >
                GENERATE REPORT
              </Button>
              {(endDayReportInput.level === "L3" ||
                endDayReportInput.level === "Wishist_Report") &&
                endDayReport.rows.length > 0 && (
                  <Button
                    color="primary"
                    className="mx-1"
                    variant="contained"
                    onClick={() => setOpenModal(true)}
                  >
                    VIEW DASHBOARD
                  </Button>
                )}
            </div>
          )}
        </Grid>
      </Grid>
      {endDayReportInput.level === "L1/L2" ||
      endDayReportInput.level === "Wishist_Report" ||
      endDayReportInput.level === "L3" ? (
        <Container maxWidth="xl" className="my-3">
          {endDayReport.rows.length > 0 && (
            <DataGridForAdmin
              col={endDayReport.col}
              rows={endDayReport.rows}
              reportLabel={endDayReportInput.level}
            />
          )}
        </Container>
      ) : null}

      {endDayReportInput.level === "L1/L2" ||
      endDayReportInput.level === "Wishist_Report" ||
      endDayReportInput.level === "L3" ? (
        ""
      ) : (
        <Container maxWidth="xl" className="my-3">
          {ParameterData.row.length > 0 && (
            <DataGrid
              rows={ParameterData.row}
              columns={column}
              autoHeight={true}
              pageSize={50}
              components={{
                Toolbar: () =>
                  CustomToolbar({ reportLabel: endDayReportInput.level }),
              }}
            />
          )}
        </Container>
      )}
      {openModal && endDayReport.rows && (
        <Modal
          endDayReport={endDayReport.rows}
          close={() => setOpenModal(false)}
        />
      )}
    </React.Fragment>
  );
};

export default DayEndReportAdmin;

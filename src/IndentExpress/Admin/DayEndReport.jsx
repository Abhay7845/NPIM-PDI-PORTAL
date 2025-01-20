import React, { useState } from "react";
import AdminSideBar from "./AdminSideBar";
import AdiminFileSideBar from "./AdiminFileSideBar";
import { endDayReportLevel, parametreOptions } from "../Data/DataList";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import TableDataDownload from "../Common/TableDataDownload";
import { HOST_URL, INDENT_HOST_URL } from "../../HostManager/UrlManager";
import Loader from "../../Components/Loader";
import UpperHeader from "../../Components/UpperHeader";

const DayEndReport = (props) => {
  const { showAlert } = props;
  const [levelvalue, setLevelvalue] = useState("");
  const [loading, setLoading] = useState(false);
  const [parameter, setParameter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);

  const OnchageLevel = (e) => {
    setLevelvalue(e.target.value);
    setRows([]);
  };
  const GetParameter = (e) => {
    setParameter(e.target.value);
    setRows([]);
  };

  const GetEndDayReports = () => {
    const endDayReports = `?fromDate=${fromDate}&level=${levelvalue}&toDate=${toDate}`;
    if (levelvalue && fromDate && toDate) {
      setLoading(true);
      axios
        .get(`${INDENT_HOST_URL}/INDENTADMIN/end/day/report/${endDayReports}`)
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setCols(response.data.coloum);
            setRows(response.data.value);
          } else if (response.data.code === "1001") {
            showAlert("Data Not Available for Selected Date", "danger");
          }
          setLoading(false);
        }).catch((error) => setLoading(false));
    } else {
      alert("Please Select Valid Level & Date");
    }
  };

  const GetParameterReports = () => {
    if (levelvalue && parameter) {
      setLoading(true);
      axios.get(`${HOST_URL}/INDENT/express/scanned/report/L1/hit/rates/${parameter}`)
        .then((res) => res).then((response) => {
          if (response.data.code === "1000") {
            setCols(response.data.column);
            setRows(response.data.value);
          } else if (response.data.code === "1001") {
            alert(`Data Not Available For ${parameter}`);
          }
          setLoading(false);
        }).catch((error) => setLoading(false));
    } else {
      alert("Please Select Valid Level & Parametere");
    }
  };

  const columns = cols.map((element) => {
    return {
      field: element,
      flex: 1,
    };
  });

  return (
    <React.Fragment>
      {loading === true && <Loader />}
      <UpperHeader />
      <div className="DropdownForAdmin">
        <AdminSideBar />
      </div>
      <AdiminFileSideBar />
      <div className="main">
        <h5 className="text-center mt-2">DAY END REPORTS</h5>
        <div className="row g-3 mt-2 mx-1">
          <div
            className={
              levelvalue === "HitRate Report" ? "col-md-6" : "col-md-4"
            }
          >
            <b className="p-1">
              Level<span className="text-danger">*</span>
            </b>
            <select type="text" className="DateSelect" onChange={OnchageLevel}>
              <option value="">Select Level</option>
              {endDayReportLevel.map((item, i) => {
                return <option key={item.value}>{item.lebel}</option>;
              })}
            </select>
          </div>
          {levelvalue === "HitRate Report" ? (
            <div className="col-md-6">
              <b className="p-1">Parameter</b>
              <select
                type="text"
                className="DateSelect"
                onChange={GetParameter}
              >
                <option value="">Select Parameter</option>
                {parametreOptions.map((item, i) => {
                  return <option key={item.value}>{item.lebel}</option>;
                })}
              </select>
            </div>
          ) : (
            <React.Fragment>
              <div className="col-md-4">
                <b className="p-1">
                  From Date<span className="text-danger">*</span>
                </b>
                <input
                  type="date"
                  className="DateSelect"
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <b className="p-1">
                  To Date<span className="text-danger">*</span>
                </b>
                <input
                  type="date"
                  className="DateSelect"
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </React.Fragment>
          )}
          <div className="d-flex justify-content-end mt-3">
            {levelvalue === "HitRate Report" ? (
              <button
                type="submit"
                className="ACommonBTN"
                onClick={GetParameterReports}
              >
                GENERATE REPORTS
              </button>
            ) : (
              <button
                type="submit"
                className="ACommonBTN"
                onClick={GetEndDayReports}
              >
                GENERATE REPORTS
              </button>
            )}
          </div>
        </div>
        {rows.length > 0 && (
          <div className="mx-2 my-4">
            <DataGrid
              columns={columns}
              rows={rows}
              autoHeight={true}
              pageSize={50}
              components={{
                Toolbar: TableDataDownload,
              }}
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default DayEndReport;

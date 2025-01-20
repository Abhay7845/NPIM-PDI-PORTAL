import React, { useState, useEffect } from "react";
import AdminSideBar from "./AdminSideBar";
import AdiminFileSideBar from "./AdiminFileSideBar";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import TableDataDownload from "../Common/TableDataDownload";
import { INDENT_HOST_URL } from "../../HostManager/UrlManager";
import Loader from "../../Components/Loader";
import UpperHeader from "../../Components/UpperHeader";

const GetMasterSKU = () => {
  const [loading, setLoading] = useState(false);
  const [loginValue, SetLoginValue] = useState("");
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${INDENT_HOST_URL}/INDENTADMIN/express/get/sku/master`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setCols(response.data.col);
          setRows(response.data.value);
          setLoading(false);
        }
      })
      .then((error) => {
        setLoading(false);
      });
  }, []);

  const columns = cols.map((element) => {
    return {
      field: element,
      flex: 1,
    };
  });
  const DataRows = rows.filter((eachRow) =>
    eachRow.itemCode.includes(loginValue.toUpperCase())
  );

  return (
    <div>
      {loading === true && <Loader />}
      <UpperHeader />
      <div className="DropdownForAdmin">
        <AdminSideBar />
      </div>
      <AdiminFileSideBar />
      <div className="main">
        <h5 className="text-center mt-2">GET MASTER SKU</h5>
        {rows.length > 0 && (
          <div className="mx-2 my-4">
            <div className="row mb-3 g-3">
              <div className="col-md-4">
                <input
                  type="text"
                  className="SearchInputLogin"
                  placeholder="Search By Item Code"
                  onChange={(e) => SetLoginValue(e.target.value)}
                />
              </div>
              <div className="col-md-8 d-flex justify-content-end">
                <b>
                  COUNT:-
                  {DataRows.length === 0 ? (
                    <b className="text-danger">DATA NOT FOUND</b>
                  ) : (
                    <b className="text-success"> {DataRows.length}</b>
                  )}
                </b>
              </div>
            </div>
            <DataGrid
              columns={columns}
              rows={DataRows}
              autoHeight={true}
              pageSize={[50]}
              components={{
                Toolbar: TableDataDownload,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GetMasterSKU;

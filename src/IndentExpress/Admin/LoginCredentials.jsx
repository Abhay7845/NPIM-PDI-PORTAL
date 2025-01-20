import React, { useState } from "react";
import AdminSideBar from "./AdminSideBar";
import AdiminFileSideBar from "./AdiminFileSideBar";
import { Field, Form, Formik } from "formik";
import { loginCredentialsInitialValue, loginCredentialsSchema } from "../Schema/LoginSchema";
import ShowError from "../Schema/ShowError";
import axios from "axios";
import { columns } from "../Data/DataList";
import { DataGrid } from "@mui/x-data-grid";
import TableDataDownload from "../Common/TableDataDownload";
import { INDENT_HOST_URL } from "../../HostManager/UrlManager";
import Loader from "../../Components/Loader";
import UpperHeader from "../../Components/UpperHeader";

const LoginCredentials = () => {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [loginValue, SetLoginValue] = useState("");

  const GetLoginCredential = (payload) => {
    setLoading(true);
    const { level } = payload;
    axios
      .get(`${INDENT_HOST_URL}/INDENTADMIN/get/login/data/admin/${level}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setRows(response.data.value);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const DataRows = rows.filter((eachRow) =>
    eachRow.loginId.includes(loginValue.toUpperCase())
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
        <Formik
          initialValues={loginCredentialsInitialValue}
          validationSchema={loginCredentialsSchema}
          onSubmit={(payload) => GetLoginCredential(payload)}
        >
          <Form>
            <h5 className="text-center mt-2">LOGIN CREDENTIALS</h5>
            <div className="row d-flex mt-2 mx-1">
              <div className="col-md-10">
                <b className="p-1">
                  Level <span className="text-danger">*</span>
                </b>
                <Field as="select" className="DateSelect" name="level">
                  <option value="">Select Level</option>
                  <option value="L1">L1</option>
                  <option value="L2">L2</option>
                  <option value="L3">L3</option>
                </Field>
                <ShowError name="level" />
              </div>
              <div className="col-md-2">
                <div className="d-flex justify-content-end mt-3">
                  <button type="submit" className="ACommonBTN">
                    GET DATA
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
        {rows.length > 0 && (
          <div className="mx-2 my-4">
            <div className="row d-flex justify-content-between mb-3 mx-1">
              <div className="col">
                <input
                  type="text"
                  className="SearchInputLogin"
                  placeholder="Search By Login ID"
                  onChange={(e) => SetLoginValue(e.target.value)}
                />
              </div>
              <div className="col d-flex justify-content-end">
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
              pageSize={50}
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

export default LoginCredentials;

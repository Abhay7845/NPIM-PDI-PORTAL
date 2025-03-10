import React, { useState } from "react";
import Logo from "../images/Tanishq_Logo1.png";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { LoginInitialValue, LoginSchema } from "../validationSchema/LoginSchema";
import ShowError from "../validationSchema/ShowError";
import { useMsal } from '@azure/msal-react';
import { loginRequest } from "../DataCenter/AzurConfig";
import micIcon from "../images/mic-icon.png"
import { APILogin } from "../HostManager/CommonApiCallL3";
import { INDENT_HOST_URL } from "../HostManager/UrlManager";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 700,
  bgcolor: "background.paper",
  p: 4,
  borderRadius: "2px",
  borderColor: "#fff"
};

const Login = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const { instance } = useMsal();
  const [errorSms, setErrorSms] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const PortalType = sessionStorage.getItem("Npim-type");

  const OnClickLoginHandler = (payload) => {
    const inputPayloadData = {
      userID: payload.userName,
      password: payload.password,
      region: payload.rsoName,
      role: "",
      status: "",
      validInvalid: "",
    };
    setLoading(true);
    if (PortalType === "INDENT_EXPRESS") {
      axios.post(`${INDENT_HOST_URL}/INDENT/express/user/login`, inputPayloadData)
        .then(res => res).then((response) => {
          if (response.data.code === "1000") {
            if (response.data.value.status === "open") {
              if (response.data.value.role === "L1" || response.data.value.role === "L2" || response.data.value.role === "L3") {
                sessionStorage.setItem("store_code", response.data.value.userID);
                sessionStorage.setItem("indent-expressRole", response.data.value.role);
                navigate("/NpimPortal/Indent-express/direction/home");
              } else if (response.data.value.role === "Admin") {
                sessionStorage.setItem("store_code", response.data.value.role);
                navigate("/NpimPortal/Indent-express/admin/update/tortal/status");
              }
            } else if (response.data.value.status === "close") {
              setErrorSms("Portal is Closed");
            }
          } else if (response.data.code === "1001") {
            setErrorSms("Please enter valid Username and Password!");
          }
          setLoading(false);
        }).catch((error) => {
          setLoading(false);
          setErrorSms("Please Enter valid Username and Password!");
        });
    } else {
      APILogin(`/NPIM/base/npim/user/login`, inputPayloadData)
        .then(res => res).then((response) => {
          sessionStorage.setItem("rsoName", inputPayloadData.region);
          sessionStorage.setItem("store_value", response.data.value.role);
          sessionStorage.setItem("store_code", response.data.value.userID);
          sessionStorage.setItem("loginData", JSON.stringify(response.data.value));
          if (response.data.code === "1000") {
            if (response.data.value.status === "open") {
              if (response.data.value.role === "Admin") {
                navigate(`/NpimPortal/AdminHome/${response.data.value.userID}/${inputPayloadData.region}`);
              } else if (response.data.value.role === "L3") {
                navigate(`/NpimPortal/get/products/home/${response.data.value.userID}/${inputPayloadData.region}`);
              } else {
                // navigate(`/NpimPortal/feedbackL1andL2/${response.data.value.userID}/${inputPayloadData.region}`);
                navigate(`/NpimPortal/new/feedbackL1andL2/${response.data.value.userID}/${inputPayloadData.region}`);
              }
            } else {
              setErrorSms("Portal is Closed");
            }
          } else {
            setErrorSms("Please Enter Valid Username and Password!");
          }
          setLoading(false);
        }).catch((error) => {
          setErrorSms("Please Enter Valid Username and Password!");
          setLoading(false);
        });
    }
  };


  const LoginByAzzure = async () => {
    instance.loginPopup(loginRequest).then(response => {
      console.log("response==>", response);
      const headers = {
        'Authorization': `Bearer ${response.idToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': "no-cach",
        "access-control-allow-origin": "*"
      }
      console.log("headers==>", headers);
      sessionStorage.setItem("authToken", response.idToken);
    }).catch(error => console.log("error==>", error));
  };

  return (
    <React.Fragment>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="custom-modal"
      >
        <Box sx={style}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setOpen(false)}
            aria-label="close"
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
          >
            <CloseIcon style={{ marginRight: "10px" }} />
          </IconButton>
          <div className="d-flex">
            <div className="col-md-6 d-none d-md-block left_col_img" />
            <div className="d-flex flex-column  justify-content-center align-item-center w-100">
              <div className="text-center">
                <img
                  src={Logo}
                  className="mb-2"
                  alt="tanishq"
                  height="60"
                  width="80"
                />
              </div>
              <Formik
                initialValues={LoginInitialValue}
                validationSchema={LoginSchema}
                onSubmit={(payload) => OnClickLoginHandler(payload)}
              >
                <Form>
                  {errorSms && <h6 className="text-center text-danger my-3"><b>{errorSms}</b></h6>}
                  <div className="my-1">
                    <b>Username <span className="text-danger"> *</span></b>
                    <Field
                      placeholder="Username"
                      name="userName"
                      className="GInput"
                    />
                    <ShowError name="userName" />
                  </div>
                  <div className="my-2">
                    <b>Password <span className="text-danger"> *</span></b>
                    <div className="d-flex">
                      <Field
                        type={passwordShown ? "text" : "password"}
                        placeholder="Password"
                        className="GInput"
                        name="password"
                      />
                      <span className="border-bottom">
                        {passwordShown ? (
                          <FaRegEye
                            size={20}
                            cursor="pointer"
                            onClick={() => setPasswordShown(!passwordShown)}
                            style={{ marginTop: 15 }}
                          />
                        ) : (
                          <FaRegEyeSlash
                            size={20}
                            cursor="pointer"
                            onClick={() => setPasswordShown(!passwordShown)}
                            style={{ marginTop: 15 }}
                          />
                        )}
                      </span>
                    </div>
                    <ShowError name="password" />
                  </div>
                  <div className="my-2">
                    <b>RSO Name <span className="text-danger"> *</span></b>
                    <Field
                      placeholder="RSO Name"
                      className="GInput"
                      name="rsoName"
                    />
                    <ShowError name="rsoName" />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="submit" className="LoginBtn">
                      {loading === true ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                        />
                      ) : (
                        <span>LOGIN</span>
                      )}
                    </button>
                  </div>
                </Form>
              </Formik>
              {/* <button className="m_LoginBtn" onClick={LoginByAzzure}>
                <img src={micIcon} width="23" alt="micIcon" />
                <span className="mx-3 mt-3">Continue With Microsoft</span>
              </button> */}
            </div>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
};
export default Login;

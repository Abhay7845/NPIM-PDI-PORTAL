import { useEffect } from "react";
import { Container, Grid, makeStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Drawer } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import React, { useState } from "react";
import Loading from "../Components/Loading";
import ReportsAppBar from "../Components/ReportsAppBar";
import UpperHeader from "../Components/UpperHeader";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MultiSelectFroAdmin, TextFieldOfMUI } from "../Components/ComponentForAdmin";
import { useParams } from "react-router-dom";
import Alert from '@mui/material/Alert';
import SideAppBar from "../Components/SideAppBar";
import { APIGetMailerContent, APIGetStoreListFromDate, APIInsContentMailer, APISendMail, APISendTestMail } from "../HostManager/CommonApiCallL3";

const useStyle = makeStyles({
  root: {
    margin: "0%",
    padding: "0%",
  },
});

function SendStoreReportAdmin() {
  const classes = useStyle();
  const { storeCode, rsoName } = useParams();
  const [barOpener, setBarOpener] = useState(false);
  const [sendReportInput, setSendReportInput] = useState({
    from: "",
    subject: "",
    mailBody: "",
    fromDate: "",
    storeCode: "",
    to: "",
    cc: "",
  });
  const [tabularData, setTabularData] = useState("");
  const [fetchAutoMailer, setFetchAutoMailer] = useState({});
  const [alertState, setAlertState] = useState({
    alertFlag1: false,
    alertFlag2: false,
    alertFlag3: false,
    alertSeverity: "",
    alertMessage: "",
  });
  const [loading, setLoading] = useState(false);
  const [storeList, setStoreList] = useState([]);
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
      link: `/NpimPortal/dayEndreportForAdmin/${storeCode}/${rsoName}`,
      icon: "ReportIcon",
    },
    {
      id: 4,
      name: "Send Store Report",
      link: `/NpimPortal/SendStoreReportAdmin/${storeCode}/${rsoName}`,
      icon: "SendIcon",
    },
  ];

  function onChangeInputHandler(event) {
    let { name, value } = event.target;
    setSendReportInput((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    if (tabularData) {
      APIGetMailerContent(`/ADMIN/fetch/automailer/content/${tabularData}`)
        .then(res => res).then(response => {
          if (response.data.code === "1000") {
            setFetchAutoMailer(response.data);
          } else if (response.data.code === "1001") {
            setFetchAutoMailer({});
          }
        }).catch(error => setLoading(false));
    }
  }, [tabularData])

  const FetchMailBody = fetchAutoMailer.body === undefined ? "" : fetchAutoMailer.body.replace(/<br><br>/g, "").replace(/<br>/g, "");
  const mailBodyText = FetchMailBody.replace(/\s+/g, ' ');

  // UPDATE AUTO MAIL 
  const UpdateAutoMail = () => {
    if ((sendReportInput.from || fetchAutoMailer.from) && (sendReportInput.subject || fetchAutoMailer.subject) && (sendReportInput.mailBody || mailBodyText)) {
      const updateAutoMailPayload = {
        fromMailId: sendReportInput.from ? sendReportInput.from : fetchAutoMailer.from,
        mailSubject: sendReportInput.subject ? sendReportInput.subject : fetchAutoMailer.subject,
        mailBody: sendReportInput.mailBody ? sendReportInput.mailBody : mailBodyText,
        reportType: tabularData
      };
      setLoading(true);
      APIInsContentMailer(`/ADMIN/npim/insert/auto/mailer/content`, updateAutoMailPayload)
        .then(res => res).then((responce) => {
          if (responce.data.code === "1000") {
            setAlertState({
              alertFlag1: true,
              alertSeverity: "success",
              alertMessage: responce.data.value,
            });
            setSendReportInput({
              from: "",
              subject: "",
              mailBody: "",
              fromDate: "",
              storeCode: "",
              to: "",
              cc: "",
            })
            setTabularData("");
          } else {
            setAlertState({
              alertFlag1: true,
              alertSeverity: "error",
              alertMessage: responce.data.value,
            });
          }
          setLoading(false);
        }).catch((error) => setLoading(false));
    } else {
      setAlertState({
        alertFlag1: true,
        alertSeverity: "error",
        alertMessage: "Invalid Input Data",
      });
    }
  }

  const SendStoreReport = () => {
    setLoading(true);
    if (sendReportInput.storeCode.length > 0) {
      const sendReportPaylod = sendReportInput.storeCode.map(data => {
        return {
          to: data.to,
          cc: data.cc,
          storeCode: data.storeCode
        }
      })
      APISendMail(`/ADMIN/npim/send/mail`, sendReportPaylod)
        .then(res => res).then((responce) => {
          if (responce.data.code === "1000") {
            let notSent = responce.data.notSent[0] && `But fro this stores not send mail plz check mail content and mail Ids ${responce.data.notSent}`;
            setAlertState({
              alertFlag2: true,
              alertSeverity: "success",
              alertMessage: `${responce.data.value} ${notSent}`,
            });
            setSendReportInput({
              from: "",
              subject: "",
              mailBody: "",
              fromDate: "",
              storeCode: "",
              to: "",
              cc: "",
            })
            setStoreList([]);
          } else {
            setAlertState({
              lertFlag2: false,
              alertSeverity: "error",
              alertMessage: responce.data.value,
            });
          }
        }).catch((error) => setLoading(false));
    } else {
      setAlertState({
        lertFlag2: false,
        alertSeverity: "error",
        alertMessage: "Invalid Input Data",
      });
    }
    setLoading(false);
  }

  const GetStoreCode = (fromDate) => {
    setLoading(true);
    APIGetStoreListFromDate(`/ADMIN/npim/from/store/list/${fromDate}`)
      .then(res => res).then((response) => {
        if (response.data.code === "1000") {
          setStoreList(response.data.value)
        }
        setLoading(false);
      }).catch(error => setLoading(false));
  }

  useEffect(() => {
    if (sendReportInput.fromDate) {
      GetStoreCode(sendReportInput.fromDate);
    }
  }, [sendReportInput.fromDate]);

  const SendTestMail = () => {
    const testMailPaylod = {
      to: sendReportInput.to,
      cc: sendReportInput.cc,
    }
    if (sendReportInput.to && sendReportInput.cc) {
      setLoading(true);
      APISendTestMail(`/ADMIN/npim/test/send/mail`, testMailPaylod)
        .then(res => res).then((responce) => {
          if (responce.data.code === "1000") {
            setAlertState({
              alertFlag3: true,
              alertSeverity: "success",
              alertMessage: responce.data.value,
            });
            setSendReportInput({
              from: "",
              subject: "",
              mailBody: "",
              fromDate: "",
              storeCode: "",
              to: "",
              cc: "",
            })
          } else {
            setAlertState({
              alertFlag3: true,
              alertSeverity: "error",
              alertMessage: responce.data.value,
            });
          }
          setLoading(false);
        }).catch((error) => setLoading(false));
    } else {
      setAlertState({
        alertFlag3: true,
        alertSeverity: "error",
        alertMessage: "Invalid Input Data",
      });
    }
  }

  function ccCombiner(inputCc) {
    let resData = [];
    for (const key in inputCc) {
      if (key === "strCode" || key === "storeMailId") {
        continue;
      } else if (inputCc[key]) {
        resData = [...resData, inputCc[key]];
      }
    }
    return resData;
  }

  function onChangeStoreCodeHandler(storeCodes) {
    let storeDataList = storeCodes.map((objData) => ({
      storeCode: objData.strCode,
      to: objData.storeMailId,
      cc: ccCombiner(objData),
    }));
    setSendReportInput((old) => {
      return {
        ...old,
        storeCode: storeDataList,
      };
    });
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Drawer
        anchor="left"
        open={barOpener}
        onClose={() => {
          setBarOpener(false);
        }}
      >
        <SideAppBar
          navBarList={navBarList}
          pageName="admin"
        />
      </Drawer>
      <Container maxWidth="xl" className={classes.root}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <UpperHeader itemCode="NO Available" storeCode={storeCode} />
            {loading === true && <Loading flag={loading} />}
          </Grid>
          <Grid item xs={12} sm={12}>
            <ReportsAppBar barHandler={() => setBarOpener(true)} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Container maxWidth="xl" style={{ marginTop: "2%" }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      onClick={() => setTabularData("")}
                    >
                      <Typography
                        color="secondary"
                        variant="subtitle1"
                        align="left"
                      >
                        Update Auto Mail
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Container>
                        <div className='mb-2 w-100'>
                          <div className='d-flex w-100'>
                            <div className={`${tabularData === "Indent" ? "activeTab col-md-6" : "redirectionTab col-md-6"}`} onClick={() => setTabularData("Indent")}>INDENT</div>
                            <div className={`${tabularData === "Wishlist" ? "activeTab col-md-6" : "redirectionTab col-md-6"}`} onClick={() => setTabularData("Wishlist")}>WISHLIST</div>
                          </div>
                        </div>
                        <Grid item xs={12} sm={12} className="mb-3">
                          {alertState.alertFlag1 && <Alert severity={alertState.alertSeverity} onClose={() => {
                            setAlertState({
                              alertFlag1: false,
                              alertSeverity: "",
                              alertMessage: "",
                            })
                          }}>
                            {alertState.alertMessage}
                          </Alert>}
                        </Grid>
                        {tabularData && <Grid container spacing={3}>
                          <Grid item xs={12} sm={12}>
                            <TextFieldOfMUI
                              label="From"
                              type="email"
                              textFieldHandlerChange={onChangeInputHandler}
                              value={sendReportInput.from ? sendReportInput.from : fetchAutoMailer.from}
                              name="from"
                              autoComplete="email"
                              required={true}
                              mailData={fetchAutoMailer}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <TextFieldOfMUI
                              label="Subject"
                              type="textarea"
                              textFieldHandlerChange={onChangeInputHandler}
                              value={sendReportInput.subject ? sendReportInput.subject : fetchAutoMailer.subject}
                              name="subject"
                              multiline={true}
                              minRows={0}
                              required={true}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <TextFieldOfMUI
                              label="Mail Body"
                              type="textarea"
                              textFieldHandlerChange={onChangeInputHandler}
                              value={sendReportInput.mailBody ? sendReportInput.mailBody : mailBodyText}
                              name="mailBody"
                              multiline={true}
                              minRows={3}
                              required={true}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <button
                              className="btn btn-primary w-100"
                              onClick={UpdateAutoMail}
                            >
                              {loading ? (
                                <span
                                  className="spinner-border spinner-border-sm text-light"
                                  role="status"
                                  aria-hidden="true"
                                />
                              ) : (
                                <span>UPDATE</span>
                              )}
                            </button>
                          </Grid>
                        </Grid>}
                      </Container>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography
                        color="secondary"
                        variant="subtitle1"
                        align="left"
                      >
                        Send Store Report
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Container maxWidth="sm">
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={12}>
                            {alertState.alertFlag2 && <Alert severity={alertState.alertSeverity} onClose={() => {
                              setAlertState({
                                alertFlag2: false,
                                alertSeverity: "",
                                alertMessage: "",
                              })
                            }}>
                              {alertState.alertMessage}
                            </Alert>}
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <TextFieldOfMUI
                              label="From Date"
                              type="date"
                              textFieldHandlerChange={onChangeInputHandler}
                              value={sendReportInput.fromDate}
                              name="fromDate"
                              required={true}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <MultiSelectFroAdmin
                              optionsList={storeList}
                              labelName="Store Code"
                              onChangeHandler={onChangeStoreCodeHandler}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <button
                              className="btn btn-primary w-100"
                              onClick={SendStoreReport}
                            >
                              {loading ? (
                                <span
                                  className="spinner-border spinner-border-sm text-light"
                                  role="status"
                                  aria-hidden="true"
                                />
                              ) : (
                                <span>SEND</span>
                              )}
                            </button>
                          </Grid>
                        </Grid>
                      </Container>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3a-content"
                      id="panel3a-header"
                    >
                      <Typography
                        color="secondary"
                        variant="subtitle1"
                        align="left"
                      >
                        Send Test Mail
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Container maxWidth="sm">
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={12}>
                            {alertState.alertFlag3 && <Alert severity={alertState.alertSeverity} onClose={() => {
                              setAlertState({
                                alertFlag3: false,
                                alertSeverity: "",
                                alertMessage: "",
                              })
                            }}>
                              {alertState.alertMessage}
                            </Alert>}
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <TextFieldOfMUI
                              label="To"
                              type="text"
                              textFieldHandlerChange={onChangeInputHandler}
                              value={sendReportInput.to}
                              name="to"
                              required={true}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <TextFieldOfMUI
                              label="CC"
                              type="textarea"
                              textFieldHandlerChange={onChangeInputHandler}
                              value={sendReportInput.cc}
                              name="cc"
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <button
                              className="btn btn-primary w-100"
                              onClick={SendTestMail}
                            >
                              {loading ? (
                                <span
                                  className="spinner-border spinner-border-sm text-light"
                                  role="status"
                                  aria-hidden="true"
                                />
                              ) : (
                                <span>SEND TEST MAIL</span>
                              )}
                            </button>
                          </Grid>
                        </Grid>
                      </Container>
                    </AccordionDetails>
                  </Accordion>
                  <br />
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Grid >
      </Container >
    </React.Fragment>
  );
}

export default SendStoreReportAdmin;

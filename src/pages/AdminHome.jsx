import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Drawer,
} from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import Loading from "../Components/Loading";
import ReportsAppBar from "../Components/ReportsAppBar";
import UpperHeader from "../Components/UpperHeader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AdminLoginCredentials,
  DataGridForAdmin,
  SelectOfMUI,
  TextFieldOfMUI,
} from "../Components/ComponentForAdmin";
import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { AdminLoginHeading } from "../DataCenter/DataList";
import SideAppBar from "../Components/SideAppBar";
import { StoreMasterHeaders } from "../DataCenter/AdminDataList";
import {
  APIBulkMoveWhislist,
  APICopyIndentStore,
  APIGetAdminLoginData,
  APIGetMailerContent,
  APIGetReportL3,
  APIGetSkuMaster,
  APIGetStoreList,
  APIGetStoreListFromDate,
  APIGetWishlistData,
  APIInsContentMailer,
  APIInsDataLogin,
  APIInsObjStoreMaster,
  APIInsSizeMaster,
  APIOpenPortal,
  APIUpdateGenderShape,
} from "../HostManager/CommonApiCallL3";
import { HOST_URL } from "../HostManager/UrlManager";
import axios from "axios";

const useStyle = makeStyles({
  root: {
    margin: "0%",
    padding: "0%",
  },
});

function AdminHome() {
  const classes = useStyle();
  const { storeCode, rsoName } = useParams();
  const [adminLoginData, setAdminLoginData] = useState([]);
  const [barOpener, setBarOpener] = useState(false);
  const [adminDeskBoardInput, setAdminDeskBoardInput] = useState({
    fromDate: "",
    fromStoreCode: "",
    toStoreCode: "",
    level: "",
    status: "",
    storeMaster: "",
    toStrCodeWish: "",
    gender: "",
    shape: "",
    rtpStore: "",
    rtpType: "",
  });
  const [fetchAutoMailer, setFetchAutoMailer] = useState({});
  const [masterFile, setMasterFile] = useState("");
  const [storeMasterFile, setStoreMasterFile] = useState("");
  const [loginMasterFile, setLoginMasterFile] = useState("");
  const [sizeMasterFile, setSizeMasterFile] = useState("");
  const [labelValue, setLabelValue] = useState("");
  const [tabLoginMaster, setTabLoginMaster] = useState("");
  const [tabSizeMaster, setTabSizeMaster] = useState("");
  const [tabStoreMaster, setTabStoreMaster] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [alertState, setAlertState] = useState({
    alertFlag1: false,
    alertFlag2: false,
    alertFlag3: false,
    alertFlag4: false,
    alertFlag5: false,
    alertFlag6: false,
    alertFlag7: false,
    alertFlag8: false,
    alertFlag9: false,
    alertFlag10: false,
    alertFlag11: false,
    alertSeverity: "",
    alertMessage: "",
  });
  const [loading, setLoading] = useState(false);
  const [storeList, setStoreList] = useState([]);
  const [toStoreList, setToStoreList] = useState([]);
  const [reportsData, setReportsData] = useState({
    rows: [],
    cols: [],
  });
  const [masterExcels, setMasterExcels] = useState({
    rows: [],
    cols: [],
  });

  // LOGIN MOSTER
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [region, setRegion] = useState("");
  const [role, setRole] = useState("");
  const [addedRows, setaAddedRows] = useState([]);
  const [wislistData, setWislistData] = useState([]);
  const [sendReportInput, setSendReportInput] = useState({
    from: "",
    subject: "",
    mailBody: "",
    fromDate: "",
    storeCode: "",
    to: "",
    cc: "",
  });

  // SIZE MASTER
  const [catSizeMaster, setCatSizeMaster] = useState("");
  const [genderSizeMaster, setGenderSizeMaster] = useState("");
  const [sizeMaster, setSizeMaster] = useState("");
  const [catShapeSizeMaster, setCatShapeSizeMaster] = useState("");
  const [catValSizeMaster, setCatValSizeMaster] = useState("");
  const [addRowSizeMaster, setAddRowSizeMaster] = useState([]);

  // STORE MASTER
  const [strCodeUplMaster, setStrCodeUplMaster] = useState("");
  const [strLvlUplMaster, setStrLvlUplMaster] = useState("");
  const [regionUplMaster, setRegionUplMaster] = useState("");
  const [strMailUplMaster, setStrMailUplMaster] = useState("");
  const [abmMailUplMaster, setAbmMailUplMaster] = useState("");
  const [rbmMailUplMaster, setRbmMailUplMaster] = useState("");
  const [rmMailUplMaster, setRmMailUplMaster] = useState("");
  const [uplStoreMaster, setUplStoreMaster] = useState([]);

  const ResetFiledValues = () => {
    setAdminDeskBoardInput({
      fromDate: "",
      fromStoreCode: "",
      toStoreCode: "",
      level: "",
      status: "",
      storeMaster: "",
      toStrCodeWish: "",
      gender: "",
      shape: "",
      rtpStore: "",
    });
    setItemCode("");
  };
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

  // useEffect(() => {
  //   if (tabLoginMaster) {
  //     APIGetMailerContent(`/ADMIN/fetch/automailer/content/${tabLoginMaster}`)
  //       .then(res => res).then(response => {
  //         if (response.data.code === "1000") {
  //           setFetchAutoMailer(response.data);
  //         } else if (response.data.code === "1001") {
  //           setFetchAutoMailer({});
  //         }
  //       }).catch(error => setLoading(false));
  //   }
  // }, [tabLoginMaster]);

  const FetchMailBody =
    fetchAutoMailer.body === undefined
      ? ""
      : fetchAutoMailer.body.replace(/<br><br>/g, "").replace(/<br>/g, "");
  const mailBodyText = FetchMailBody.replace(/\s+/g, " ");

  useEffect(() => {
    if (adminDeskBoardInput.fromDate) {
      GetStoreList(adminDeskBoardInput.fromDate);
    }
    GetToStoreList();
  }, [adminDeskBoardInput.fromDate]);

  useEffect(() => {
    if (adminDeskBoardInput.toStrCodeWish) {
      GetWhishlistData(adminDeskBoardInput.toStrCodeWish);
    }
  }, [adminDeskBoardInput.toStrCodeWish]);

  function onChangeInputHandler(event) {
    let { name, value } = event.target;
    setSendReportInput((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
    if (name === "fromDate") {
      setAdminDeskBoardInput({
        fromDate: value,
        fromStoreCode: "",
        toStoreCode: "",
      });
    } else {
      setAdminDeskBoardInput((old) => {
        return {
          ...old,
          [name]: value,
        };
      });
    }
  }

  const copyIndentsStore = () => {
    if (
      !adminDeskBoardInput.fromStoreCode ||
      !adminDeskBoardInput.toStoreCode
    ) {
      setAlertState({
        alertFlag1: true,
        alertSeverity: "error",
        alertMessage: "Please Select Valid Input",
      });
    } else {
      setLoading(true);
      APICopyIndentStore(
        `/ADMIN/npim/store/response/copy/${adminDeskBoardInput.fromStoreCode}/${adminDeskBoardInput.toStoreCode}`
      )
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setAlertState({
              alertFlag1: true,
              alertSeverity: "success",
              alertMessage: response.data.value,
            });
            setLoading(false);
            ResetFiledValues();
          } else if (response.data.code === "1001") {
            setAlertState({
              alertFlag1: true,
              alertSeverity: "error",
              alertMessage: response.data.value,
            });
            setLoading(false);
          }
        })
        .catch((error) => setLoading(false));
    }
  };

  const UpdatePortalStatus = () => {
    if (adminDeskBoardInput.level && adminDeskBoardInput.status) {
      setLoading(true);
      const OpenPortalPayload = {
        level: adminDeskBoardInput.level,
        mode: adminDeskBoardInput.status,
      };
      APIOpenPortal(`/ADMIN/npim/open/portal`, OpenPortalPayload)
        .then((response) => {
          if (response.data.code === "1000") {
            setAlertState({
              alertFlag3: true,
              alertSeverity: "success",
              alertMessage: response.data.value,
            });
            ResetFiledValues();
          } else {
            setAlertState({
              alertFlag3: true,
              alertSeverity: "error",
              alertMessage: response.data.value,
            });
          }
          setLoading(false);
        })
        .catch((error) => {
          setAlertState({
            alertFlag3: true,
            alertSeverity: "error",
            alertMessage: error,
          });
          setLoading(false);
        });
    } else {
      setAlertState({
        alertFlag3: true,
        alertSeverity: "error",
        alertMessage: "Invalid Input Passing...!",
      });
    }
    setLoading(false);
  };

  const GetToStoreList = () => {
    APIGetStoreList(`/ADMIN/npim/to/store/list`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setToStoreList(response.data.value);
        } else {
          setAlertState({
            alertFlag1: true,
            alertSeverity: "error",
            alertMessage: response.data.value,
          });
        }
      })
      .catch((error) => setLoading(false));
  };

  const GetNeedStCatReport = () => {
    setLoading(true);
    APIGetReportL3(
      `/NPIML3/npim/summary/report/L3/${adminDeskBoardInput.rtpStore}/${adminDeskBoardInput.rtpType}`
    )
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setReportsData({
            cols: response.data.coloum,
            rows: response.data.value,
          });
          setAlertState({
            alertFlag11: true,
            alertSeverity: "success",
            alertMessage: "Data Fetched Successfully",
          });
        } else {
          setAlertState({
            alertFlag11: true,
            alertSeverity: "warning",
            alertMessage: `Data not found for this Store Code ${adminDeskBoardInput.rtpStore}`,
          });
        }
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  };

  const GetStoreList = (fromDate) => {
    APIGetStoreListFromDate(`/ADMIN/npim/from/store/list/${fromDate}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setStoreList(response.data.value);
        } else {
          setAlertState({
            alertFlag1: true,
            alertSeverity: "error",
            alertMessage: response.data.value,
          });
        }
      })
      .catch((error) => setLoading(false));
  };

  // UPLOAD FILE DATA
  const uploadFileData = () => {
    if (!masterFile) {
      alert("Please Choose File");
    } else {
      setLoading(true);
      let formData = new FormData();
      formData.append("masterFile", masterFile);
      axios
        .post(`${HOST_URL}/ADMIN/npim/insert/sku/master`, formData)
        .then((response) => {
          if (response.data.code === "1000") {
            setAlertState({
              alertFlag2: true,
              alertSeverity: "success",
              alertMessage: response.data.value,
            });
            setLoading(false);
          } else if (response.data.code === "1001") {
            setAlertState({
              alertFlag2: true,
              alertSeverity: "error",
              alertMessage: response.data.value,
            });
            setLoading(false);
          }
        })
        .catch((error) => {
          setAlertState({
            alertFlag2: true,
            alertSeverity: "error",
            alertMessage: "File Not Uploaded",
          });
          setLoading(false);
        });
    }
  };

  // GET SKU MASTER DATA
  const GetSKUMasterData = () => {
    setLoading(true);
    APIGetSkuMaster(`/ADMIN/npim/get/sku/master`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setMasterExcels({
            rows: response.data.value,
            cols: response.data.col,
          });
          setAlertState({
            alertFlag4: true,
            alertSeverity: "success",
            alertMessage: "Data Fetched Successfully",
          });
        } else if (response.data.code === "1001") {
          setAlertState({
            alertFlag4: true,
            alertSeverity: "warning",
            alertMessage: "No Records Found",
          });
        }
        setLoading(false);
      })
      .catch((error) => setLoading(false));
  };

  const FetchCredentials = () => {
    if (labelValue === "") {
      alert("Please Select Level");
    } else {
      setLoading(true);
      APIGetAdminLoginData(`/ADMIN/get/login/data/admin/${labelValue}`)
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setAdminLoginData(response.data.value);
            setAlertState({
              alertFlag5: true,
              alertSeverity: "success",
              alertMessage: "Data Fetched Successfully",
            });
          } else if (response.data.code === "1000") {
            setAlertState({
              alertFlag5: true,
              alertSeverity: "warning",
              alertMessage: "No Records Found",
            });
          }
          setLoading(false);
        })
        .catch((error) => setLoading(false));
    }
  };

  const UploadStoreMaster = () => {
    if (!storeMasterFile) {
      alert("Please Choose File");
    } else {
      setLoading(true);
      let formData = new FormData();
      formData.append("masterFile", storeMasterFile);
      axios
        .post(`${HOST_URL}/ADMIN/npim/ins/data/store/master`, formData)
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setAlertState({
              alertFlag6: true,
              alertSeverity: "success",
              alertMessage: response.data.value,
            });
            setLoading(false);
          } else if (response.data.code === "1001") {
            setAlertState({
              alertFlag6: true,
              alertSeverity: "error",
              alertMessage: response.data.value,
            });
          }
          setLoading(false);
        })
        .catch((error) => {
          setAlertState({
            alertFlag6: true,
            alertSeverity: "error",
            alertMessage: "File Not Uploaded",
          });
          setLoading(false);
        });
    }
  };

  const UploadLoginMaster = () => {
    if (!loginMasterFile) {
      setAlertState({
        alertFlag7: true,
        alertSeverity: "error",
        alertMessage: "Please Choose File",
      });
    } else {
      setLoading(true);
      let formData = new FormData();
      formData.append("masterFile", loginMasterFile);
      axios
        .post(`${HOST_URL}/ADMIN/npim/insert/login/master`, formData)
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setAlertState({
              alertFlag7: true,
              alertSeverity: "success",
              alertMessage: response.data.value,
            });
            setLoading(false);
          } else if (response.data.code === "1001") {
            setAlertState({
              alertFlag7: true,
              alertSeverity: "error",
              alertMessage: response.data.value,
            });
          }
          setLoading(false);
        })
        .catch((error) => {
          setAlertState({
            alertFlag7: true,
            alertSeverity: "error",
            alertMessage: "File Not Uploaded",
          });
          setLoading(false);
        });
    }
  };

  // UPLOAD LOGIN MASTER BY TABLE
  const AddRows = () => {
    if (loginId && password && region && role) {
      const addRowObj = {
        loginId: loginId,
        password: password,
        role: role,
        region: region,
      };
      setaAddedRows([...addedRows, addRowObj]);
      setLoginId("");
      setPassword("");
      setRegion("");
      setRole("");
    } else {
      setAlertState({
        alertFlag7: true,
        alertSeverity: "error",
        alertMessage: "Please Enter Row Values",
      });
    }
  };

  const InsertLoginMaster = () => {
    setLoading(true);
    APIInsDataLogin(`/ADMIN/ins/data/login/obj`, addedRows)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setAlertState({
            alertFlag7: true,
            alertSeverity: "success",
            alertMessage: `${response.data.value} Successfully`,
          });
        } else {
          setAlertState({
            alertFlag7: true,
            alertSeverity: "error",
            alertMessage: response.data.value,
          });
        }
        setaAddedRows([]);
        setTabLoginMaster("");
        setLoading(false);
      })
      .catch((error) => setLoading(false));
  };

  const UploadSizeMaster = () => {
    if (!sizeMasterFile) {
      setAlertState({
        alertFlag8: true,
        alertSeverity: "error",
        alertMessage: "Please Choose File",
      });
    } else {
      setLoading(true);
      let formData = new FormData();
      formData.append("masterFile", sizeMasterFile);
      axios
        .post(`${HOST_URL}/ADMIN/npim/ins/data/size/master`, formData)
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setAlertState({
              alertFlag8: true,
              alertSeverity: "success",
              alertMessage: response.data.value,
            });
            setLoading(false);
          } else if (response.data.code === "1001") {
            setAlertState({
              alertFlag8: true,
              alertSeverity: "error",
              alertMessage: response.data.value,
            });
          }
          setLoading(false);
        })
        .catch((error) => {
          setAlertState({
            alertFlag8: true,
            alertSeverity: "error",
            alertMessage: "File Not Uploaded",
          });
          setLoading(false);
        });
    }
  };

  // UPLOAD SIZE MASTER
  const AddRowsSiseMaster = () => {
    if (
      catSizeMaster &&
      genderSizeMaster &&
      sizeMaster &&
      catShapeSizeMaster &&
      catValSizeMaster
    ) {
      const addRowObjSizeMaster = {
        category: catSizeMaster,
        gender: genderSizeMaster,
        size: sizeMaster,
        catShape: catShapeSizeMaster,
        categoryVal: catValSizeMaster,
      };
      setAddRowSizeMaster([...addRowSizeMaster, addRowObjSizeMaster]);
      setCatSizeMaster("");
      setGenderSizeMaster("");
      setSizeMaster("");
      setCatShapeSizeMaster("");
      setCatValSizeMaster("");
    } else {
      setAlertState({
        alertFlag8: true,
        alertSeverity: "warning",
        alertMessage: "Please Enter Row Filed Values",
      });
    }
  };

  const InsertSizeMaster = () => {
    setLoading(true);
    APIInsSizeMaster(`/ADMIN/ins/data/size/master/obj`, addRowSizeMaster)
      .then((res) => res)
      .then((responce) => {
        if (responce.data.code === "1000") {
          setAlertState({
            alertFlag8: true,
            alertSeverity: "success",
            alertMessage: `${addRowSizeMaster.length} Records Inserted Successfully`,
          });
          setAddRowSizeMaster([]);
          setTabSizeMaster("");
        } else {
          setAlertState({
            alertFlag8: true,
            alertSeverity: "error",
            alertMessage: responce.data.value,
          });
        }
        setLoading(false);
      })
      .catch((error) => setLoading(false));
  };

  const UpdateValueShape = () => {
    if (itemCode) {
      setLoading(true);
      const UpdateShapPayload = {
        storeCode: "",
        itemCode: itemCode,
        shape: adminDeskBoardInput.shape,
        gender: adminDeskBoardInput.gender,
      };
      APIUpdateGenderShape(`/ADMIN/update/gender/shape`, UpdateShapPayload)
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setAlertState({
              alertFlag9: true,
              alertSeverity: "success",
              alertMessage: "Shape & Gender Updated Successfully !",
            });
            setItemCode("");
            ResetFiledValues();
          }
          setLoading(false);
        })
        .catch((error) => setLoading(false));
    } else {
      setAlertState({
        alertFlag9: true,
        alertSeverity: "error",
        alertMessage: "Please Enter Store Code & IntemCode !",
      });
    }
  };

  const GetWhishlistData = (storeCode) => {
    setLoading(true);
    APIGetWishlistData(`/NPIML3/get/wishlisted/listdata/${storeCode}`)
      .then((response) => {
        if (response.data.Code === "1000") {
          setWislistData(response.data.value);
        } else {
          setWislistData([]);
        }
        setLoading(false);
      })
      .catch((error) => setLoading(false));
  };

  const wishListItems = wislistData.map((item) => item.itemCode);
  const IndentToWislist = () => {
    if (adminDeskBoardInput.toStrCodeWish && wislistData.length > 0) {
      setLoading(true);
      const BulkWishItem = {
        storeCode: adminDeskBoardInput.toStrCodeWish,
        itemBulk: wishListItems.toString(),
      };
      APIBulkMoveWhislist(
        `/ADMIN/bulk/movement/from/wishlist/to/indent`,
        BulkWishItem
      )
        .then((res) => res)
        .then((response) => {
          if (response.data.code === "1000") {
            setAlertState({
              alertFlag10: true,
              alertSeverity: "success",
              alertMessage: `Item Indented Successfully ${response.data.value.count}`,
            });
          }
          setLoading(false);
        })
        .catch((error) => setLoading(false));
    } else {
      setAlertState({
        alertFlag10: true,
        alertSeverity: "error",
        alertMessage: !adminDeskBoardInput.toStrCodeWish
          ? "Please Choose Store Code !"
          : wislistData.length === 0 &&
            `Wishlist Data Not Found For This Store Code ${adminDeskBoardInput.toStrCodeWish}`,
      });
    }
  };

  // UPDATE AUTO MAIL
  const UpdateAutoMail = () => {
    if (
      (sendReportInput.from || fetchAutoMailer.from) &&
      (sendReportInput.subject || fetchAutoMailer.subject) &&
      (sendReportInput.mailBody || mailBodyText)
    ) {
      const updateAutoMailPayload = {
        fromMailId: sendReportInput.from
          ? sendReportInput.from
          : fetchAutoMailer.from,
        mailSubject: sendReportInput.subject
          ? sendReportInput.subject
          : fetchAutoMailer.subject,
        mailBody: sendReportInput.mailBody
          ? sendReportInput.mailBody
          : mailBodyText,
        reportType: tabLoginMaster,
      };
      setLoading(true);
      APIInsContentMailer(
        `/ADMIN/npim/insert/auto/mailer/content`,
        updateAutoMailPayload
      )
        .then((res) => res)
        .then((responce) => {
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
            });
            setTabLoginMaster("");
          } else {
            setAlertState({
              alertFlag1: true,
              alertSeverity: "error",
              alertMessage: responce.data.value,
            });
          }
        })
        .catch((error) => setLoading(false));
      setLoading(false);
    } else {
      setAlertState({
        alertFlag1: true,
        alertSeverity: "error",
        alertMessage: "Invalid Input Data",
      });
    }
  };

  const ReSetStoreMasterFiled = () => {
    setStrCodeUplMaster("");
    setStrLvlUplMaster("");
    setRegionUplMaster("");
    setStrMailUplMaster("");
    setAbmMailUplMaster("");
    setRbmMailUplMaster("");
    setRmMailUplMaster("");
    setUplStoreMaster([]);
    setAlertState({
      alertFlag6: false,
      alertSeverity: "",
      alertMessage: "",
    });
  };

  // UPLOAD STORE MASTER
  const AddRowsStoreMaster = () => {
    if (
      strCodeUplMaster &&
      strLvlUplMaster &&
      regionUplMaster &&
      regionUplMaster
    ) {
      const StoreMasterAddRow = {
        storeCode: strCodeUplMaster,
        storeLevel: strLvlUplMaster,
        region: regionUplMaster,
        storeMailId: strMailUplMaster,
        abmMailId: abmMailUplMaster,
        rbmMailId: rbmMailUplMaster,
        rmMailId: rmMailUplMaster,
        npdManagerMailId: "",
      };
      setUplStoreMaster([...uplStoreMaster, StoreMasterAddRow]);
      setStrCodeUplMaster("");
      setStrLvlUplMaster("");
      setRegionUplMaster("");
      setStrMailUplMaster("");
      setAbmMailUplMaster("");
      setRbmMailUplMaster("");
      setRmMailUplMaster("");
    } else {
      setAlertState({
        alertFlag6: true,
        alertSeverity: "warning",
        alertMessage: "Please Enter Row Values",
      });
    }
  };

  const InsertStoreMaster = () => {
    setLoading(true);
    APIInsObjStoreMaster(`/ADMIN/ins/data/store/master/obj`, uplStoreMaster)
      .then((res) => res)
      .then((responce) => {
        if (responce.data.code === "1000") {
          setAlertState({
            alertFlag6: true,
            alertSeverity: "success",
            alertMessage: `${uplStoreMaster.length} Records Inserted Successfully`,
          });
          ReSetStoreMasterFiled();
        } else {
          setAlertState({
            alertFlag6: true,
            alertSeverity: "error",
            alertMessage: responce.data.value,
          });
        }
        setLoading(false);
      })
      .catch((error) => setLoading(false));
  };

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
      <Container maxWidth="xl" className={classes.root}>
        <Grid item xs={12} sm={12}>
          <UpperHeader itemCode="NO Available" storeCode={storeCode} />
          <Loading flag={loading} />
        </Grid>
        <Grid item xs={12} sm={12}>
          <ReportsAppBar barHandler={() => setBarOpener(true)} />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Container maxWidth="xl" style={{ marginTop: "4%" }}>
            <div className="row g-3">
              <div className="col-md-6">
                <Grid item xs={12} sm={12}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      onClick={ResetFiledValues}
                    >
                      <Typography
                        color="secondary"
                        variant="subtitle1"
                        align="left"
                      >
                        Copy Store Indents
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Container maxWidth="sm">
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={12}>
                            {alertState.alertFlag1 && (
                              <Alert
                                severity={alertState.alertSeverity}
                                onClose={() => {
                                  setAlertState({
                                    alertFlag1: false,
                                    alertSeverity: "",
                                    alertMessage: "",
                                  });
                                }}
                              >
                                {alertState.alertMessage}
                              </Alert>
                            )}
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <TextFieldOfMUI
                              label="From Date"
                              type="date"
                              textFieldHandlerChange={onChangeInputHandler}
                              value={adminDeskBoardInput.fromDate}
                              name="fromDate"
                              required={true}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <SelectOfMUI
                              label="From Store Code"
                              optionList={storeList.map(
                                (element) => element.strCode
                              )}
                              selectHandleChange={onChangeInputHandler}
                              value={adminDeskBoardInput.fromStoreCode}
                              name="fromStoreCode"
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <SelectOfMUI
                              label="To Store Code"
                              optionList={toStoreList}
                              selectHandleChange={onChangeInputHandler}
                              value={adminDeskBoardInput.toStoreCode}
                              name="toStoreCode"
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <button
                              className="btn btn-primary w-100"
                              onClick={copyIndentsStore}
                            >
                              {loading ? (
                                <span
                                  className="spinner-border spinner-border-sm text-light"
                                  role="status"
                                  aria-hidden="true"
                                />
                              ) : (
                                <span>
                                  COPY
                                  <FileCopyIcon
                                    className="mx-1"
                                    style={{ fontSize: "18px" }}
                                  />
                                </span>
                              )}
                            </button>
                          </Grid>
                        </Grid>
                      </Container>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <br />
                <Grid item xs={12} sm={12}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                      onClick={ResetFiledValues}
                    >
                      <Typography
                        color="secondary"
                        variant="subtitle1"
                        align="left"
                      >
                        Master File Upload
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm={12}>
                          <Container maxWidth="sm">
                            <Grid className="text-danger">
                              <h6 className="text-justify">
                                <b className="text-dark">1.</b> **Please make
                                sure that GENDER column is not blank for
                                Categories like BRACELET, COUPLE BAND, FINGER
                                RING, ANKLETS, TOE RING, MANGALSUTRA, CHAIN &
                                WAIST BELT.
                              </h6>
                              <h6 className="text-justify">
                                <b className="text-dark">2.</b> **Please make
                                sure that GENDER & SHAPE column is not blank for
                                BANGLE CATEGORY.
                              </h6>
                              <h6 className="text-justify">
                                <b className="text-dark">3.</b> **Please make
                                sure that FINDINGS column is not blank for
                                Categories like DROP EARRING JHUMKA, & STUD
                                EARRING.
                              </h6>
                              <h6 className="text-justify">
                                <b className="text-dark">4.</b> **Please make
                                sure that ChildNodes_N & ChildNodes_E column is
                                not blank for Categories like G-CATEGORY, SET0,
                                SET1, SET2 & T-CATEGORY.
                              </h6>
                              <hr />
                            </Grid>
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={12}>
                                {alertState.alertFlag2 && (
                                  <Alert
                                    severity={alertState.alertSeverity}
                                    onClose={() => {
                                      setAlertState({
                                        alertFlag2: false,
                                        alertSeverity: "",
                                        alertMessage: "",
                                      });
                                    }}
                                  >
                                    {alertState.alertMessage}
                                  </Alert>
                                )}
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <Typography color="initial" variant="subtitle2">
                                  If you want to master SKU template then please
                                  click &nbsp;
                                  <a
                                    href="https://docs.google.com/spreadsheets/d/1AoThWIV-h0xRdn1ONW_qABM_CvIsVicBx2JiehwODeA/edit#gid=0"
                                    target="_blank"
                                  >
                                    Master Template
                                  </a>
                                </Typography>
                                <br />
                                <TextFieldOfMUI
                                  label="Master File"
                                  type="file"
                                  textFieldHandlerChange={(e) =>
                                    setMasterFile(e.target.files[0])
                                  }
                                  value={adminDeskBoardInput.masterFile}
                                  name="masterFile"
                                  required={true}
                                />
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <button
                                  className="btn btn-primary w-100"
                                  onClick={uploadFileData}
                                >
                                  {loading ? (
                                    <span
                                      className="spinner-border spinner-border-sm text-light"
                                      role="status"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <span>
                                      UPLOAD
                                      <CloudUploadIcon
                                        style={{
                                          marginTop: "-5px",
                                          marginLeft: "5px",
                                        }}
                                      />
                                    </span>
                                  )}
                                </button>
                              </Grid>
                            </Grid>
                          </Container>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <br />
                <Grid item xs={12} sm={12}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      onClick={ResetFiledValues}
                    >
                      <Typography
                        color="secondary"
                        variant="subtitle1"
                        align="left"
                      >
                        Update Portal Status
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Container maxWidth="sm">
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={12}>
                            {alertState.alertFlag3 && (
                              <Alert
                                severity={alertState.alertSeverity}
                                onClose={() => {
                                  setAlertState({
                                    alertFlag3: false,
                                    alertSeverity: "",
                                    alertMessage: "",
                                  });
                                }}
                              >
                                {alertState.alertMessage}
                              </Alert>
                            )}
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <SelectOfMUI
                              label="Level"
                              optionList={["L1", "L2", "L3"]}
                              selectHandleChange={onChangeInputHandler}
                              value={adminDeskBoardInput.level}
                              name="level"
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <SelectOfMUI
                              label="Status"
                              optionList={["Open", "Close"]}
                              selectHandleChange={onChangeInputHandler}
                              value={adminDeskBoardInput.status}
                              name="status"
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <button
                              className="btn btn-primary w-100"
                              onClick={UpdatePortalStatus}
                            >
                              {loading ? (
                                <span
                                  className="spinner-border spinner-border-sm text-light"
                                  role="status"
                                  aria-hidden="true"
                                />
                              ) : (
                                <span>UPDATE STATUS</span>
                              )}
                            </button>
                          </Grid>
                        </Grid>
                      </Container>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <br />
                <Grid item xs={12} sm={12}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      onClick={ResetFiledValues}
                    >
                      <Typography
                        color="secondary"
                        variant="subtitle1"
                        align="left"
                      >
                        Update Shape & Gender Values
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm={12}>
                          <Container maxWidth="sm">
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={12}>
                                {alertState.alertFlag9 && (
                                  <Alert
                                    severity={alertState.alertSeverity}
                                    onClose={() => {
                                      setAlertState({
                                        alertFlag9: false,
                                        alertSeverity: "",
                                        alertMessage: "",
                                      });
                                    }}
                                  >
                                    {alertState.alertMessage}
                                  </Alert>
                                )}
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <TextFieldOfMUI
                                  label="Item Code"
                                  type="text"
                                  textFieldHandlerChange={(e) =>
                                    setItemCode(e.target.value)
                                  }
                                  name="itemCode"
                                  required={true}
                                  value={itemCode}
                                />
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <SelectOfMUI
                                  label="Choose Gender"
                                  optionList={[
                                    "LADIES",
                                    "GENTS",
                                    "UNISEX",
                                    "KIDS",
                                  ]}
                                  selectHandleChange={onChangeInputHandler}
                                  value={adminDeskBoardInput.gender}
                                  name="gender"
                                />
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <SelectOfMUI
                                  label="Choose Shape"
                                  optionList={["ROUND", "OVAL"]}
                                  selectHandleChange={onChangeInputHandler}
                                  value={adminDeskBoardInput.shape}
                                  name="shape"
                                />
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <button
                                  className="btn btn-primary w-100"
                                  onClick={UpdateValueShape}
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
                            </Grid>
                          </Container>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </div>
              <div className="col-md-6">
                <Grid item xs={12} sm={12}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      onClick={() => {
                        setLabelValue("");
                        setAdminLoginData([]);
                        setAlertState({
                          alertFlag5: false,
                          alertSeverity: "",
                          alertMessage: "",
                        });
                      }}
                    >
                      <Typography
                        color="secondary"
                        variant="subtitle1"
                        align="left"
                      >
                        Login Credentials
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Container maxWidth="sm">
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={12}>
                            {alertState.alertFlag5 && (
                              <Alert
                                severity={alertState.alertSeverity}
                                onClose={() => {
                                  setAlertState({
                                    alertFlag5: false,
                                    alertSeverity: "",
                                    alertMessage: "",
                                  });
                                }}
                              >
                                {alertState.alertMessage}
                              </Alert>
                            )}
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <SelectOfMUI
                              label="Level"
                              optionList={["L1", "L2", "L3"]}
                              selectHandleChange={(e) =>
                                setLabelValue(e.target.value)
                              }
                              value={labelValue}
                              name="level"
                            />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <button
                              className="btn btn-primary w-100"
                              onClick={FetchCredentials}
                            >
                              {loading ? (
                                <span
                                  className="spinner-border spinner-border-sm text-light"
                                  role="status"
                                  aria-hidden="true"
                                />
                              ) : (
                                <span>FETCH CREDENTIALS</span>
                              )}
                            </button>
                          </Grid>
                        </Grid>
                        {adminLoginData.length > 0 && (
                          <AdminLoginCredentials
                            col={AdminLoginHeading}
                            rows={adminLoginData}
                            reportLabel="Login Credentials"
                          />
                        )}
                      </Container>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <br />
                <Grid item xs={12} sm={12}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      onClick={() => setTabLoginMaster("")}
                    >
                      <Typography
                        color="secondary"
                        variant="subtitle1"
                        align="left"
                      >
                        Upload Login Master
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container>
                        <div className="w-100 mb-4">
                          <div className="d-flex w-100">
                            <div
                              className={
                                tabLoginMaster === "excelFile"
                                  ? "activeTab col-md-6"
                                  : "redirectionTab col-md-6"
                              }
                              onClick={() => setTabLoginMaster("excelFile")}
                            >
                              UPLOAD DATA FROM EXCEL
                            </div>
                            <div
                              className={
                                tabLoginMaster === "tblData"
                                  ? "activeTab col-md-6"
                                  : "redirectionTab col-md-6"
                              }
                              onClick={() => setTabLoginMaster("tblData")}
                            >
                              UPLOAD DATA FROM TABLE
                            </div>
                          </div>
                        </div>
                        <Grid item xs={12} sm={12} className="mb-2">
                          {alertState.alertFlag7 && (
                            <Alert
                              severity={alertState.alertSeverity}
                              onClose={() => {
                                setAlertState({
                                  alertFlag7: false,
                                  alertSeverity: "",
                                  alertMessage: "",
                                });
                              }}
                            >
                              {alertState.alertMessage}
                            </Alert>
                          )}
                        </Grid>
                        {tabLoginMaster === "excelFile" && (
                          <Grid item xs={12} sm={12}>
                            <Typography color="initial" variant="subtitle2">
                              If you want Login Master Template then please
                              click &nbsp;
                              <a
                                href="https://titancompltd-my.sharepoint.com/:x:/r/personal/mamathadl_titan_co_in/_layouts/15/Doc.aspx?sourcedoc=%7B8E6C370F-77A2-4D26-8587-EE92CD1A552A%7D&file=Login%20Master%20NPIM.xlsx&wdOrigin=TEAMS-MAGLEV.p2p_ns.rwc&action=default&mobileredirect=true"
                                target="_blank"
                              >
                                Login Master Template
                              </a>
                            </Typography>
                            <br />
                            <TextFieldOfMUI
                              label="Login Master"
                              type="file"
                              textFieldHandlerChange={(e) =>
                                setLoginMasterFile(e.target.files[0])
                              }
                              name="loginMasterFile"
                              required={true}
                            />
                            <button
                              className="btn btn-primary w-100 my-2"
                              onClick={UploadLoginMaster}
                            >
                              {loading ? (
                                <span
                                  className="spinner-border spinner-border-sm text-light"
                                  role="status"
                                  aria-hidden="true"
                                />
                              ) : (
                                <span>UPLOAD LOGIN MASTER</span>
                              )}
                            </button>
                          </Grid>
                        )}
                        {tabLoginMaster === "tblData" && (
                          <Grid item xs={12} sm={12}>
                            <Table
                              className="table table-bordered text-center"
                              style={{
                                border: "2px solid black",
                                margin: "0%",
                              }}
                            >
                              <Thead>
                                <Tr>
                                  <Th>Login ID</Th>
                                  <Th>Password</Th>
                                  <Th>Region</Th>
                                  <Th>Role</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {addedRows.map((data, i) => {
                                  return (
                                    <Tr key={i}>
                                      <Td>{data.loginId}</Td>
                                      <Td>{data.password}</Td>
                                      <Td>{data.region}</Td>
                                      <Td>{data.role}</Td>
                                    </Tr>
                                  );
                                })}
                                <Tr>
                                  <Th>
                                    <input
                                      type="text"
                                      value={loginId}
                                      placeholder="Login ID"
                                      className="w-100"
                                      onChange={(e) =>
                                        setLoginId(e.target.value)
                                      }
                                    />
                                  </Th>
                                  <Th>
                                    <input
                                      type="text"
                                      value={password}
                                      placeholder="Password"
                                      className="w-100"
                                      onChange={(e) =>
                                        setPassword(e.target.value)
                                      }
                                    />
                                  </Th>
                                  <Th>
                                    <input
                                      type="text"
                                      value={region}
                                      placeholder="Region"
                                      className="w-100"
                                      onChange={(e) =>
                                        setRegion(e.target.value)
                                      }
                                    />
                                  </Th>
                                  <Th>
                                    <input
                                      type="text"
                                      value={role}
                                      placeholder="Role"
                                      className="w-100"
                                      onChange={(e) => setRole(e.target.value)}
                                    />
                                  </Th>
                                </Tr>
                              </Tbody>
                            </Table>
                            <div className="d-flex justify-content-end my-2">
                              <button
                                className="btn btn-primary mx-2"
                                onClick={AddRows}
                              >
                                Add Row
                              </button>
                              {addedRows.length > 0 && (
                                <button
                                  className="btn btn-primary"
                                  onClick={InsertLoginMaster}
                                >
                                  {loading ? (
                                    <span
                                      className="spinner-border spinner-border-sm text-light"
                                      role="status"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <span>UPLOAD LOGIN MASTER</span>
                                  )}
                                </button>
                              )}
                            </div>
                          </Grid>
                        )}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <br />
                <Grid item xs={12} sm={12}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      onClick={() => {
                        setTabSizeMaster("");
                        setAddRowSizeMaster([]);
                        setAlertState({
                          alertFlag8: false,
                          alertSeverity: "",
                          alertMessage: "",
                        });
                      }}
                    >
                      <Typography
                        color="secondary"
                        variant="subtitle1"
                        align="left"
                      >
                        Upload Size Master
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container>
                        <div className="w-100 mb-4">
                          <div className="d-flex w-100">
                            <div
                              className={
                                tabSizeMaster === "excelFile"
                                  ? "activeTab col-md-6"
                                  : "redirectionTab col-md-6"
                              }
                              onClick={() => setTabSizeMaster("excelFile")}
                            >
                              UPLOAD DATA FROM EXCEL
                            </div>
                            <div
                              className={
                                tabSizeMaster === "tblData"
                                  ? "activeTab col-md-6"
                                  : "redirectionTab col-md-6"
                              }
                              onClick={() => setTabSizeMaster("tblData")}
                            >
                              UPLOAD DATA FROM TABLE
                            </div>
                          </div>
                        </div>
                        <Grid item xs={12} sm={12} className="my-1">
                          {alertState.alertFlag8 && (
                            <Alert
                              severity={alertState.alertSeverity}
                              onClose={() => {
                                setAlertState({
                                  alertFlag8: false,
                                  alertSeverity: "",
                                  alertMessage: "",
                                });
                              }}
                            >
                              {alertState.alertMessage}
                            </Alert>
                          )}
                        </Grid>
                        {tabSizeMaster === "excelFile" && (
                          <Grid item xs={12} sm={12}>
                            <Typography color="initial" variant="subtitle2">
                              If you want Size Master Template then please click
                              &nbsp;
                              <a
                                href="https://titancompltd-my.sharepoint.com/:x:/r/personal/mamathadl_titan_co_in/_layouts/15/Doc.aspx?sourcedoc=%7BFC4CCE99-84B4-4818-9727-BE59D246AACE%7D&file=Size%20Template.xlsx&wdOrigin=TEAMS-MAGLEV.p2p_ns.rwc&action=default&mobileredirect=true"
                                target="_blank"
                              >
                                Size Master Template
                              </a>
                            </Typography>
                            <br />
                            <TextFieldOfMUI
                              label="Size Master"
                              type="file"
                              textFieldHandlerChange={(e) =>
                                setSizeMasterFile(e.target.files[0])
                              }
                              name="sizeMasterFile"
                              required={true}
                            />
                            <button
                              className="btn btn-primary w-100 mt-2"
                              onClick={UploadSizeMaster}
                            >
                              {loading ? (
                                <span
                                  className="spinner-border spinner-border-sm text-light"
                                  role="status"
                                  aria-hidden="true"
                                />
                              ) : (
                                <span>UPLOAD SIZE MASTER</span>
                              )}
                            </button>
                          </Grid>
                        )}
                        {tabSizeMaster === "tblData" && (
                          <Grid item xs={12} sm={12}>
                            <Table
                              className="table table-bordered text-center"
                              style={{
                                border: "2px solid black",
                                margin: "0%",
                              }}
                            >
                              <Thead>
                                <Tr>
                                  <Th>Category</Th>
                                  <Th>Gender</Th>
                                  <Th>Size</Th>
                                  <Th>Cat Shape</Th>
                                  <Th>Cat Value</Th>
                                </Tr>
                              </Thead>
                              <Tbody>
                                {addRowSizeMaster.map((data, i) => {
                                  return (
                                    <Tr key={i}>
                                      <Td>{data.category}</Td>
                                      <Td>{data.gender}</Td>
                                      <Td>{data.size}</Td>
                                      <Td>{data.catShape}</Td>
                                      <Td>{data.categoryVal}</Td>
                                    </Tr>
                                  );
                                })}
                                <Tr>
                                  <Th>
                                    <input
                                      type="text"
                                      value={catSizeMaster}
                                      placeholder="Category"
                                      className="w-100"
                                      onChange={(e) =>
                                        setCatSizeMaster(e.target.value)
                                      }
                                    />
                                  </Th>
                                  <Th>
                                    <input
                                      type="text"
                                      value={genderSizeMaster}
                                      placeholder="Gender"
                                      className="w-100"
                                      onChange={(e) =>
                                        setGenderSizeMaster(e.target.value)
                                      }
                                    />
                                  </Th>
                                  <Th>
                                    <input
                                      type="text"
                                      value={sizeMaster}
                                      placeholder="Size"
                                      className="w-100"
                                      onChange={(e) =>
                                        setSizeMaster(e.target.value)
                                      }
                                    />
                                  </Th>
                                  <Th>
                                    <input
                                      type="text"
                                      value={catShapeSizeMaster}
                                      placeholder="Cat Shape"
                                      className="w-100"
                                      onChange={(e) =>
                                        setCatShapeSizeMaster(e.target.value)
                                      }
                                    />
                                  </Th>
                                  <Th>
                                    <input
                                      type="text"
                                      value={catValSizeMaster}
                                      placeholder="Category Value"
                                      className="w-100"
                                      onChange={(e) =>
                                        setCatValSizeMaster(e.target.value)
                                      }
                                    />
                                  </Th>
                                </Tr>
                              </Tbody>
                            </Table>
                            <div className="d-flex justify-content-end my-2">
                              <button
                                className="btn btn-primary mx-2"
                                onClick={AddRowsSiseMaster}
                              >
                                Add Row
                              </button>
                              {addRowSizeMaster.length > 0 && (
                                <button
                                  className="btn btn-primary"
                                  onClick={InsertSizeMaster}
                                >
                                  {loading ? (
                                    <span
                                      className="spinner-border spinner-border-sm text-light"
                                      role="status"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <span>UPLOAD SIZE MASTER</span>
                                  )}
                                </button>
                              )}
                            </div>
                          </Grid>
                        )}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <br />
                <Grid item xs={12} sm={12}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      onClick={ResetFiledValues}
                    >
                      <Typography
                        color="secondary"
                        variant="subtitle1"
                        align="left"
                      >
                        Wishlist to Indent - Bulk Movement
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm={12}>
                          <Container maxWidth="sm">
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={12}>
                                {alertState.alertFlag10 && (
                                  <Alert
                                    severity={alertState.alertSeverity}
                                    onClose={() => {
                                      setAlertState({
                                        alertFlag10: false,
                                        alertSeverity: "",
                                        alertMessage: "",
                                      });
                                    }}
                                  >
                                    {alertState.alertMessage}
                                  </Alert>
                                )}
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <SelectOfMUI
                                  label="Store Code"
                                  optionList={toStoreList}
                                  selectHandleChange={onChangeInputHandler}
                                  value={adminDeskBoardInput.toStrCodeWish}
                                  name="toStrCodeWish"
                                />
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                {wislistData.length > 0 && (
                                  <h6 className="text-primary">
                                    Count Of Wislist Products -{" "}
                                    {wislistData.length}
                                  </h6>
                                )}
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <button
                                  className="btn btn-primary w-100"
                                  onClick={IndentToWislist}
                                >
                                  {loading ? (
                                    <span
                                      className="spinner-border spinner-border-sm text-light"
                                      role="status"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <span>Wishlist To Indent </span>
                                  )}
                                </button>
                              </Grid>
                            </Grid>
                          </Container>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </div>
            </div>
            <br />
            <Grid item xs={12} sm={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  onClick={() => setTabLoginMaster("")}
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
                    <div className="mb-2 w-100">
                      <div className="d-flex w-100">
                        <div
                          className={`${
                            tabLoginMaster === "Indent"
                              ? "activeTab col-md-6"
                              : "redirectionTab col-md-6"
                          }`}
                          onClick={() => setTabLoginMaster("Indent")}
                        >
                          INDENT
                        </div>
                        <div
                          className={`${
                            tabLoginMaster === "Wishlist"
                              ? "activeTab col-md-6"
                              : "redirectionTab col-md-6"
                          }`}
                          onClick={() => setTabLoginMaster("Wishlist")}
                        >
                          WISHLIST
                        </div>
                      </div>
                    </div>
                    <Grid item xs={12} sm={12} className="my-1">
                      {alertState.alertFlag1 && (
                        <Alert
                          severity={alertState.alertSeverity}
                          onClose={() => {
                            setAlertState({
                              alertFlag1: false,
                              alertSeverity: "",
                              alertMessage: "",
                            });
                          }}
                        >
                          {alertState.alertMessage}
                        </Alert>
                      )}
                    </Grid>
                    {tabLoginMaster && (
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                          <TextFieldOfMUI
                            label="From"
                            type="email"
                            textFieldHandlerChange={onChangeInputHandler}
                            value={
                              sendReportInput.from
                                ? sendReportInput.from
                                : fetchAutoMailer.from
                            }
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
                            value={
                              sendReportInput.subject
                                ? sendReportInput.subject
                                : fetchAutoMailer.subject
                            }
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
                            value={
                              sendReportInput.mailBody
                                ? sendReportInput.mailBody
                                : mailBodyText
                            }
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
                      </Grid>
                    )}
                  </Container>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <br />
            <Grid item xs={12} sm={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  onClick={() => {
                    setTabStoreMaster("");
                    ReSetStoreMasterFiled();
                  }}
                >
                  <Typography
                    color="secondary"
                    variant="subtitle1"
                    align="left"
                  >
                    Upload Store Master
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <div className="w-100 mb-4">
                      <div className="d-flex w-100">
                        <div
                          className={
                            tabStoreMaster === "excelFile"
                              ? "activeTab col-md-6"
                              : "redirectionTab col-md-6"
                          }
                          onClick={() => setTabStoreMaster("excelFile")}
                        >
                          UPLOAD DATA FROM EXCEL
                        </div>
                        <div
                          className={
                            tabStoreMaster === "tblData"
                              ? "activeTab col-md-6"
                              : "redirectionTab col-md-6"
                          }
                          onClick={() => setTabStoreMaster("tblData")}
                        >
                          UPLOAD DATA FROM TABLE
                        </div>
                      </div>
                    </div>
                    <Grid item xs={12} sm={12} className="my-1">
                      {alertState.alertFlag6 && (
                        <Alert
                          severity={alertState.alertSeverity}
                          onClose={() => {
                            setAlertState({
                              alertFlag6: false,
                              alertSeverity: "",
                              alertMessage: "",
                            });
                          }}
                        >
                          {alertState.alertMessage}
                        </Alert>
                      )}
                    </Grid>
                    {tabStoreMaster === "excelFile" && (
                      <Grid item xs={12} sm={12}>
                        <Typography color="initial" variant="subtitle2">
                          If you want Store Master Template then please click
                          &nbsp;
                          <a
                            href="https://titancompltd-my.sharepoint.com/:x:/r/personal/mamathadl_titan_co_in/_layouts/15/Doc.aspx?sourcedoc=%7B1B8E1EB8-D7AE-4DC0-9793-0D5C693234AA%7D&file=Store%20Master%20Template.xlsx&wdOrigin=TEAMS-MAGLEV.p2p_ns.rwc&action=default&mobileredirect=true"
                            target="_blank"
                          >
                            Store Master Template
                          </a>
                        </Typography>
                        <br />
                        <TextFieldOfMUI
                          label="Store Master"
                          type="file"
                          textFieldHandlerChange={(e) =>
                            setStoreMasterFile(e.target.files[0])
                          }
                          name="storeMasterFile"
                          required={true}
                        />
                        <button
                          className="btn btn-primary w-100 mt-2"
                          onClick={UploadStoreMaster}
                        >
                          {loading ? (
                            <span
                              className="spinner-border spinner-border-sm text-light"
                              role="status"
                              aria-hidden="true"
                            />
                          ) : (
                            <span>UPLOAD STORE MASTER</span>
                          )}
                        </button>
                      </Grid>
                    )}
                    {tabStoreMaster === "tblData" && (
                      <Grid item xs={12} sm={12}>
                        <Table
                          className="table table-bordered text-center"
                          style={{ border: "2px solid black", margin: "0%" }}
                        >
                          <Thead>
                            <Tr>
                              {StoreMasterHeaders.map((data, i) => {
                                return <Th key={i}>{data}</Th>;
                              })}
                            </Tr>
                          </Thead>
                          <Tbody>
                            {uplStoreMaster.map((data, i) => {
                              return (
                                <Tr key={i}>
                                  <Td>{data.storeCode}</Td>
                                  <Td>{data.storeLevel}</Td>
                                  <Td>{data.region}</Td>
                                  <Td>{data.storeMailId}</Td>
                                  <Td>{data.abmMailId}</Td>
                                  <Td>{data.rbmMailId}</Td>
                                  <Td>{data.rmMailId}</Td>
                                  <Td>{data.npdManagerMailId}</Td>
                                </Tr>
                              );
                            })}
                            <Tr>
                              <Th>
                                <input
                                  type="text"
                                  value={strCodeUplMaster}
                                  placeholder="Store Code"
                                  className="w-100"
                                  onChange={(e) =>
                                    setStrCodeUplMaster(e.target.value)
                                  }
                                />
                              </Th>
                              <Th>
                                <input
                                  type="text"
                                  value={strLvlUplMaster}
                                  placeholder="Store Level"
                                  className="w-100"
                                  onChange={(e) =>
                                    setStrLvlUplMaster(e.target.value)
                                  }
                                />
                              </Th>
                              <Th>
                                <input
                                  type="text"
                                  value={regionUplMaster}
                                  placeholder="Region"
                                  className="w-100"
                                  onChange={(e) =>
                                    setRegionUplMaster(e.target.value)
                                  }
                                />
                              </Th>
                              <Th>
                                <input
                                  type="mail"
                                  value={strMailUplMaster}
                                  placeholder="Store Mail"
                                  className="w-100"
                                  onChange={(e) =>
                                    setStrMailUplMaster(e.target.value)
                                  }
                                />
                              </Th>
                              <Th>
                                <input
                                  type="mail"
                                  value={abmMailUplMaster}
                                  placeholder="ABM Mail"
                                  className="w-100"
                                  onChange={(e) =>
                                    setAbmMailUplMaster(e.target.value)
                                  }
                                />
                              </Th>
                              <Th>
                                <input
                                  type="mail"
                                  value={rbmMailUplMaster}
                                  placeholder="RBM Mail"
                                  className="w-100"
                                  onChange={(e) =>
                                    setRbmMailUplMaster(e.target.value)
                                  }
                                />
                              </Th>
                              <Th>
                                <input
                                  type="mail"
                                  value={rmMailUplMaster}
                                  placeholder="RM Mail"
                                  className="w-100"
                                  onChange={(e) =>
                                    setRmMailUplMaster(e.target.value)
                                  }
                                />
                              </Th>
                            </Tr>
                          </Tbody>
                        </Table>
                        <div className="d-flex justify-content-end my-2">
                          <button
                            className="btn btn-primary mx-2"
                            onClick={AddRowsStoreMaster}
                          >
                            Add Row
                          </button>
                          {uplStoreMaster.length > 0 && (
                            <button
                              className="btn btn-primary"
                              onClick={InsertStoreMaster}
                            >
                              {loading ? (
                                <span
                                  className="spinner-border spinner-border-sm text-light"
                                  role="status"
                                  aria-hidden="true"
                                />
                              ) : (
                                <span>UPLOAD STORE MASTER</span>
                              )}
                            </button>
                          )}
                        </div>
                      </Grid>
                    )}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <br />
            <Grid item xs={12} sm={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  onClick={() => {
                    setMasterExcels({
                      rows: [],
                      cols: [],
                    });
                    setAlertState({
                      alertFlag4: false,
                      alertSeverity: "",
                      alertMessage: "",
                    });
                  }}
                >
                  <Typography
                    color="secondary"
                    variant="subtitle1"
                    align="left"
                  >
                    Get Master SKU
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <Grid item xs={12} sm={12}>
                      <button
                        className="btn btn-primary w-100"
                        onClick={GetSKUMasterData}
                      >
                        {loading ? (
                          <span
                            className="spinner-border spinner-border-sm text-light"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          <span>SEE MASTER</span>
                        )}
                      </button>
                    </Grid>
                    <Grid item xs={12} sm={12} className="my-2">
                      {alertState.alertFlag4 && (
                        <Alert
                          severity={alertState.alertSeverity}
                          onClose={() => {
                            setAlertState({
                              alertFlag4: false,
                              alertSeverity: "",
                              alertMessage: "",
                            });
                          }}
                        >
                          {alertState.alertMessage}
                        </Alert>
                      )}
                    </Grid>
                    {masterExcels.rows.length > 0 && (
                      <Grid item xs={12} sm={12}>
                        <DataGridForAdmin
                          col={masterExcels.cols}
                          rows={masterExcels.rows}
                          reportLabel="MasterExcel"
                        />
                      </Grid>
                    )}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <br />
            <Grid item xs={12} sm={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  onClick={() => {
                    setReportsData({
                      rows: [],
                      cols: [],
                    });
                    setAlertState({
                      alertFlag11: false,
                      alertSeverity: "",
                      alertMessage: "",
                    });
                    ResetFiledValues();
                  }}
                >
                  <Typography
                    color="secondary"
                    variant="subtitle1"
                    align="left"
                  >
                    Store Wise Category & Needstate Report
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      {alertState.alertFlag11 && (
                        <Alert
                          severity={alertState.alertSeverity}
                          onClose={() => {
                            setAlertState({
                              alertFlag11: false,
                              alertSeverity: "",
                              alertMessage: "",
                            });
                          }}
                        >
                          {alertState.alertMessage}
                        </Alert>
                      )}
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <SelectOfMUI
                        label="Select Store"
                        optionList={toStoreList}
                        selectHandleChange={onChangeInputHandler}
                        value={adminDeskBoardInput.rtpStore}
                        name="rtpStore"
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <SelectOfMUI
                        label="Select Report"
                        optionList={["NeedState", "Category"]}
                        selectHandleChange={onChangeInputHandler}
                        value={adminDeskBoardInput.rtpType}
                        name="rtpType"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <button
                        className="btn btn-primary w-100"
                        onClick={GetNeedStCatReport}
                      >
                        {loading ? (
                          <span
                            className="spinner-border spinner-border-sm text-light"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          <span>GET REPORTS</span>
                        )}
                      </button>
                    </Grid>
                    {reportsData.rows.length > 0 && (
                      <Grid item xs={12} sm={12}>
                        <DataGridForAdmin
                          col={reportsData.cols}
                          rows={reportsData.rows}
                          reportLabel="MasterExcel"
                        />
                      </Grid>
                    )}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <br />
          </Container>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default AdminHome;

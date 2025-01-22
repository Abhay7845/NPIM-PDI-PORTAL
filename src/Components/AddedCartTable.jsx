import React, { useEffect, useState } from "react";
import GetPdtLowerHeader from "./GetPdtLowerHeader";
import UpperHeader from "./UpperHeader";
import * as Icon from "react-bootstrap-icons";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import Tippy from '@tippyjs/react';
import { DataGrid } from "@mui/x-data-grid";
import TableDataDownload from "./TableDataDownload";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { imageUrl } from "../DataCenter/DataList";
import AlertPopup, { ModelPopup } from "./AlertPopup";
import EditItemWiseProducts from "./EditItemWiseProducts";
import { Button } from "@material-ui/core";
import SingleImgCreator from "./SingleImgCreator";
import { APIDeleteUpdate, APIGetItemWiseRptL3, APIMailContentIndent, APIMoveToWishList, APIPNPIMProductData, APIUpdateStaus, APIYesItemWiseRtp } from "../HostManager/CommonApiCallL3";

const AddedCartTable = () => {
    const { storeCode, rsoName } = useParams();
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [cols, setCols] = useState([]);
    const [inputItemCode, setInputItemCode] = useState("");
    const [itemWiseData, setItemWiseData] = useState({});
    const [editProductsData, setEditProductsData] = useState({});
    const [alertPopupStatus, setAlertPopupStatus] = useState({
        status: false,
        main: "",
        contain: "",
        mode: false,
    });
    const [popupOpen, setPopupOpen] = useState(false);
    const [sendMailBtn, setSendMailBtn] = useState(true);

    function CloseHandler() {
        setAlertPopupStatus({
            status: false,
            main: "",
            contain: "",
            mode: false,
        });
    }

    function CloseHandlerForRest() {
        setAlertPopupStatus({
            status: false,
            main: "",
            contain: "",
            mode: false,
        });
    }

    const GetProductDetailsBySearchPnpim = (itemCode) => {
        const productDetails = {
            storeCode: storeCode,
            collection: "ALL",
            consumerBase: "ALL",
            group: "ALL",
            category: "ALL",
            itemCode: itemCode,
        }
        APIPNPIMProductData(`/NPIM/base/npim/get/product/details`, productDetails).then(res => res)
            .then(response => {
                if (response.data.code === "1000") {
                    setItemWiseData(response.data.value)
                }
            }).catch(err => setLoading(false));
    }

    const GetItemWiseReports = (storeCode) => {
        setLoading(true);
        APIGetItemWiseRptL3(`/NPIML3/npim/item/wise/rpt/L3/${storeCode}`)
            .then(res => res).then(response => {
                if (response.data.code === "1000") {
                    setRows(response.data.value);
                    setCols(response.data.coloum);
                }
                setLoading(false);
            }).catch(error => setLoading(false));
    }

    useEffect(() => {
        GetItemWiseReports(storeCode);
        if (editProductsData.itemCode) { GetProductDetailsBySearchPnpim(editProductsData.itemCode); }
    }, [storeCode, editProductsData.itemCode]);

    const MoveToWishlist = (event) => {
        setLoading(true);
        APIMoveToWishList(`/NPIML3/npim/move/item/wishlist/to/indent/${event.itemCode}/${storeCode}/Wishlist`)
            .then(res => res).then((response) => {
                if (response.data.Code === "1000") {
                    setAlertPopupStatus({
                        status: true,
                        main: 'Item Wishlisted Successfully',
                        contain: "",
                    });
                }
                GetItemWiseReports(storeCode);
                setLoading(false);
            }).catch((error) => setLoading(false));
    }

    const columns = cols.map((element) => {
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
                            {params?.row?.confirmationStatus === "" &&
                                <div>
                                    <Icon.PencilSquare
                                        size={16}
                                        className="EditButton"
                                        onClick={() => {
                                            setEditProductsData(params.row);
                                            window.scrollTo({ top: "0", behavior: "smooth" });
                                        }}
                                    />
                                    <DeleteRoundedIcon
                                        size={16}
                                        className="DeleteButton"
                                        onClick={() => DeleteRowData(params.row)}
                                    />
                                    <Tippy content={<span>Send To WishList</span>}>
                                        <SendRoundedIcon className="SendIcon"
                                            onClick={() => MoveToWishlist(params.row)}
                                        />
                                    </Tippy>
                                </div>
                            }
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
                            itemCode={params.row.itemCode || ""}
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
                    return (<div>{params.row.confirmationStatus && <p className="text-success">Success</p>}</div>);
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

    const DataRows = rows.filter((item) => item.itemCode.includes(inputItemCode.toUpperCase()) ||
        item.childNodesN.includes(inputItemCode.toUpperCase()) ||
        item.childNodesE.includes(inputItemCode.toUpperCase()) ||
        item.childNodeV.includes(inputItemCode.toUpperCase()) ||
        item.childNodeO.includes(inputItemCode.toUpperCase()) ||
        item.childNodeK.includes(inputItemCode.toUpperCase()) ||
        item.childNodeH.includes(inputItemCode.toUpperCase()) ||
        item.childNodeF.includes(inputItemCode.toUpperCase())
    );
    const successCount = DataRows.filter((row) => row.confirmationStatus !== "");

    // --------------------------------> FUNCTINALITY IMPLIMANTATION <---------------------------------------
    const DeleteRowData = (event) => {
        const updateRowPayload = {
            itemCode: event.itemCode,
            strCode: storeCode,
            saleable: "",
            size: "0",
            uom: "0",
            reasons: "",
            findings: "",
            indQty: "0",
            indCategory: "0",
            submitStatus: "report",
            set2Type: "",
            stoneQuality: "0",
            stoneQualityVal: "0",
            rsoName: rsoName,
            npimEventNo: "",
            IndentLevelType: "",
            exSize: event.size,
            exUOM: event.uom,
            exIndCategory: event.indCategory,
            exStonequality: event.stoneQuality,
        };
        setLoading(true);
        APIDeleteUpdate(`/NPIML3/npim/update/responses`, updateRowPayload)
            .then((response) => {
                if (response.data.code === "1000") {
                    GetItemWiseReports(storeCode);
                    setAlertPopupStatus({
                        status: true,
                        main: 'Item Deleted Successfully',
                        contain: "",
                    });
                }
                setLoading(false);
            }).catch((error) => setLoading(false));
    };



    const errorHandling = (storeCode) => {
        setLoading(true);
        APIUpdateStaus(`/NPIML3/npim/L3/store/status/update/${storeCode}`)
            .then(res => res).then(response => {
                if (response.data.code === "1000") {
                    setAlertPopupStatus({
                        status: true,
                        main: "There was an Error in Triggering E-mail Please try Again!",
                        contain: "",
                        mode: true,
                    });
                    setLoading(false);
                }
            }).catch(error => setLoading(false));
    };

    const HandelSendMail = () => {
        setLoading(true);
        APIMailContentIndent(`/NPIML3/new/npim/L3/mail/content/${storeCode}/Indent`)
            .then(res => res).then(response => {
                if (response.data.code === "1000") {
                    const success = 'Thankyou for completing the Indent Confirmation Process successfully';
                    const msg = response?.data?.value?.storeNPIMStatus === "LOCKED"
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
                setLoading(false);
            }).catch(error => setLoading(false));
    };

    const HandelClickYes = () => {
        setLoading(true);
        APIYesItemWiseRtp(`/NPIML3/npim/item/wise/rpt/edr/L3/${storeCode}`, DataRows)
            .then(res => res).then(response => {
                if (response.data.code) {
                    GetItemWiseReports(storeCode);
                    setEditProductsData({});
                    setPopupOpen(false);
                    setSendMailBtn(false);
                }
                setLoading(false);
            }).then(error => setLoading(false));
    };

    return (
        <React.Fragment>
            <UpperHeader />
            <GetPdtLowerHeader />
            {loading === true && <Loader />}
            <AlertPopup
                status={alertPopupStatus.status}
                mainLable={alertPopupStatus.main}
                containLable={alertPopupStatus.contain}
                procideHandler=""
                discardHandler=""
                closeHandler={() => alertPopupStatus.mode ? CloseHandlerForRest() : CloseHandler()}
            />
            <ModelPopup
                open={popupOpen}
                handelClose={() => setPopupOpen(false)}
                option1="NO"
                option2="YES"
                message="Are you sure you want to conclude the indenting process. Click Yes to Confirm"
                onyes={HandelClickYes}
                loading={loading}
            />
            {rows.length > 0 && cols.length > 0 ?
                <div className="mx-2 my-2">
                    <h5 className="text-center text-danger mt-3">ITEM WISE REPORTS </h5>
                    <div className="row d-flex justify-content-between mx-0 my-2">
                        <div className="col-md-4">
                            <input type="text" placeholder="Search by ItemCode" className="mb-1" onChange={(e) => setInputItemCode(e.target.value)} />
                        </div>
                        <div className="d-flex col-md-4">
                            <h6 className="mx-2">Total: <b>{DataRows.length}</b></h6>
                            <h6 className="mx-2">Successful Indent Count: <b>{successCount.length}</b></h6>
                        </div>
                        <div className="col-md-4 d-flex justify-content-end">
                            <Button
                                variant="contained"
                                color="primary"
                                className="m-1"
                                onClick={() => setPopupOpen(true)}
                            >
                                Confirm
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className="m-1"
                                onClick={HandelSendMail}
                                disabled={sendMailBtn}
                            >
                                Send Mail
                            </Button>
                        </div>
                    </div>
                    {editProductsData.id && <EditItemWiseProducts itemWiseData={itemWiseData} rows={DataRows} productsData={editProductsData} AlertPopupStatus={setAlertPopupStatus} ItemWiseReport={GetItemWiseReports} editProductsData={setEditProductsData} />}
                    <DataGrid
                        rows={DataRows}
                        columns={columns}
                        autoHeight={true}
                        pageSize={50}
                        components={{ Toolbar: () => TableDataDownload("ItemWiseReports") }}
                    />
                </div> : <h5 className="text-center text-danger my-2">DATA NOT AVAILABLE</h5>}
        </React.Fragment>)
}
export default AddedCartTable;
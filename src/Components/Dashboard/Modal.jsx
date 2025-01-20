import React from "react";
import "../../Style/CssStyle/Modal.css";
import { BiX } from "react-icons/bi";
import Dashboard from "./Dashboard";

const Modal = ({ close, endDayReport }) => {
    const storeList = [...new Set(endDayReport.map(item => item.storeCode))];
    return (
        <React.Fragment>
            <div className="ModalBackGround">
                <div className="ModalContainer">
                    <BiX className="ModalCloseBtn" onClick={close} />
                    <Dashboard data={endDayReport} storeList={storeList} />
                </div>
            </div>
        </React.Fragment>)
}
export default Modal;
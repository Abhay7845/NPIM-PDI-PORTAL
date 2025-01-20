import React from "react";
import "../Style/Modal.css";
import AddProductsL3 from "../ComponentsL3/AddProductsL3";
import { BiX } from "react-icons/bi";

const Modal = ({ close, singleProductsDetails, CatTypeData }) => {
    return (
        <React.Fragment>
            <div className="ModalBackGround">
                <div className="ModalContainer">
                    <BiX className="ModalCloseBtn" onClick={close} />
                    <AddProductsL3 singleProductsDetails={singleProductsDetails} close={close} CatTypeData={CatTypeData} />
                </div>
            </div>
        </React.Fragment>)
}
export default Modal;
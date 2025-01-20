import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function InputFieldMaterialUI({ onChangeHandler, CategoryData }) {
    const [quantityVal, setQuantityVal] = useState("");
    const HandelQuantity = (value) => {
        setQuantityVal(value);
        if (value < 0) { return toast.error("Please Enter POsitive Value", { theme: "colored" }) }
        if (value > 2) {
            const isYes = window.confirm("Indent Quantity is greater than 2  Do you wish to Proceed ?");
            if (isYes) {
                return onChangeHandler(value);
            } else {
                onChangeHandler("");
                setQuantityVal("");
            }
        } else {
            onChangeHandler(value);
        }
    }

    useEffect(() => {
        setQuantityVal("");
    }, [CategoryData.itemCode, CategoryData.id])

    return (
        <React.Fragment>
            <b>Indent Quantity</b>
            <input className="w-100 p-2"
                type="number"
                placeholder="Enter Quantity"
                value={quantityVal}
                onChange={(e) => HandelQuantity(e.target.value)}
            />
        </React.Fragment>
    );
}
export default InputFieldMaterialUI;

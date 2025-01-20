import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, Select, InputLabel } from "@material-ui/core";

function DropDownMaterialUI({ labelName, onChangeHandler, optionsList, CategoryData }) {
    const [handelValue, setHandelValue] = useState("");
    const generateOptions = (dropList) => {
        const optionItems = dropList.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
        ));
        return optionItems;
    };

    useEffect(() => {
        if (handelValue) {
            onChangeHandler(handelValue);
        }
    }, [handelValue]);

    useEffect(() => {
        setHandelValue("");
    }, [CategoryData.itemCode, CategoryData.id]);

    return (
        <FormControl variant="outlined" className="w-100 mt-3">
            <InputLabel id="demo-simple-select-outlined-label">
                {labelName}
            </InputLabel>
            <Select
                label={labelName}
                value={handelValue}
                onChange={(e) => setHandelValue(e.target.value)}
            >
                <MenuItem value=""><em>None</em></MenuItem>
                {generateOptions(optionsList)}
            </Select>
        </FormControl>
    );
}

export default DropDownMaterialUI;

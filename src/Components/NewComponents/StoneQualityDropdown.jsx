import React, { useState, useEffect } from "react";

const StoneQualityDropdown = ({ CategoryData, stoneQualityResHandler }) => {
    const [stoneQuantity, setStoneQuantity] = useState("");

    function stoneOptionsData(inputObj) {
        let stoneOptionList = [];
        if (inputObj.stdUCP) {
            stoneOptionList[1 + stoneOptionList.length] = `stdUCP - ${inputObj.stdUCP}`;
        }
        if (inputObj.si2Gh) {
            stoneOptionList[1 + stoneOptionList.length] = `si2Gh - ${inputObj.si2Gh}`;
        }
        if (inputObj.vsGh) {
            stoneOptionList[1 + stoneOptionList.length] = `vsGh - ${inputObj.vsGh}`;
        }
        if (inputObj.vvs1) {
            stoneOptionList[1 + stoneOptionList.length] = `vvs1 - ${inputObj.vvs1}`;
        }
        if (inputObj.i2Gh) {
            stoneOptionList[1 + stoneOptionList.length] = `i2Gh - ${inputObj.i2Gh}`;
        }
        if (inputObj.si2Ij) {
            stoneOptionList[1 + stoneOptionList.length] = `i1JKL - ${inputObj.si2Ij}`;
        }
        return stoneOptionList;
    }

    const optionsList = stoneOptionsData(CategoryData);

    useEffect(() => {
        return stoneQualityResHandler(stoneQuantity);
    }, [stoneQuantity]);

    useEffect(() => {
        setStoneQuantity("");
    }, [CategoryData.itemCode]);

    return (
        <select
            onChange={(e) => setStoneQuantity(e.target.value)}
            value={stoneQuantity}
            className="p-3 w-100 mt-2"
            style={{ cursor: "pointer" }}
        >
            <option value="">Select Stone Quality</option>
            {optionsList.map((item, i) => {
                return (
                    <option key={i} value={item}>
                        {item}
                    </option>
                );
            })}
        </select>
    );
};

export default StoneQualityDropdown;

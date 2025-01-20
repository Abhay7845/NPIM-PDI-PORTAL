import React, { useState, useEffect, useRef } from "react";
import { Multiselect } from 'multiselect-react-dropdown';
import { toast } from 'react-toastify';
import { Typography } from "@material-ui/core";
import DropDownMaterialUI from "./DropDownMaterialUI";
import MultipuleSelectSizable from "./MultipuleSelectSizable";
import MultipleSelecteBangle from "./MultipleSelecteBangle";

const MultipleSelectTagDropdown = ({
    optionList,
    tegQuantityResHandler,
    CategoryData,
    findingsResHandler,
    sizeQuantityResHandler,
    typeSet2ResHandler,
    sizeUomQuantityResHandler,
    findingsOptions,
    setType2option,
    ChildNodeF,
    ChildNodeN,
    ChildNodeV,
}) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [optionInputs, setOptionInputs] = useState({});
    const selectedTagArray = selectedOptions.map(tag => tag.name);

    const multiselectRef = useRef(null);
    const ResetMaltiSelectValues = () => {
        if (multiselectRef.current) {
            multiselectRef.current.resetSelectedValues();
            setOptionInputs({});
            setSelectedOptions([]);
        }
    };

    const options = optionList.map((data, i) => {
        return {
            name: data, id: i
        }
    });

    const HandleSelectSetTag = (selectedList) => {
        setSelectedOptions(selectedList);
        const newInputs = { ...optionInputs };
        selectedList.forEach((item) => {
            if (!(item.name in newInputs)) {
                newInputs[item.name] = '';
            }
        });
        setOptionInputs(newInputs);
    };

    const HandleRemoveSetTag = (selectedList) => {
        setSelectedOptions(selectedList);
        const updatedInputs = { ...optionInputs };
        selectedOptions.forEach((item) => {
            if (!selectedList.some((selected) => selected.name === item.name)) {
                delete updatedInputs[item.name];
            }
        });
        setOptionInputs(updatedInputs);
    };

    const HandleInputChange = (optionName, value) => {
        if (value < 0) { return toast.error("Please Enter Positive Value", { theme: "colored", autoClose: 2000 }); }
        if (/^[0-9]$/.test(value) || value === '') {
            setOptionInputs({ ...optionInputs, [optionName]: value });
        } else {
            toast.error("Please Enter Single Digit", { theme: "colored", autoClose: 2000 });
        }
    };

    const TagsInputsData = Object.entries(optionInputs).map(([rowName, value]) => ({
        size: rowName,
        quantity: value
    }));

    useEffect(() => {
        ResetMaltiSelectValues();
    }, [CategoryData.itemCode, CategoryData.id]);

    useEffect(() => {
        return tegQuantityResHandler(TagsInputsData);
    }, [optionInputs]);


    return (
        <React.Fragment>
            <Typography className="my-1 text-primary">Choose Tag</Typography>
            <Multiselect
                options={options}
                selectedValues={selectedOptions}
                onSelect={HandleSelectSetTag}
                onRemove={HandleRemoveSetTag}
                displayValue="name"
                placeholder="Choose Tag"
                showCheckbox={true}
                ref={multiselectRef}
            />

            {selectedOptions.map((option, i) => (
                <div key={i}>
                    {option.name === "Only_FINGERRING" || option.name === "Only_BANGLE" || option.name === "Only_MANGALSUTRA" ? "" : <input
                        type="number"
                        value={optionInputs[option.name] || ''}
                        onChange={(e) => HandleInputChange(option.name, e.target.value)}
                        placeholder={option.name}
                        style={{ marginTop: "5px", width: "100%", }}
                    />}
                </div>
            ))}

            {selectedTagArray.includes("Only_FINGERRING") &&
                <MultipuleSelectSizable
                    optionsList={ChildNodeF}
                    onChangeHandler={sizeQuantityResHandler}
                    CategoryData={CategoryData}
                />}

            {selectedTagArray.includes("Only_MANGALSUTRA") &&
                <MultipuleSelectSizable
                    optionsList={ChildNodeN}
                    onChangeHandler={sizeQuantityResHandler}
                    CategoryData={CategoryData}
                />}

            {selectedTagArray.includes("Only_BANGLE") &&
                <MultipleSelecteBangle
                    optionsList={ChildNodeV}
                    sizeUomQuantityResHandler={sizeUomQuantityResHandler}
                    CategoryData={CategoryData}
                />}

            {selectedTagArray.includes("Only_NECKWEAR") && (CategoryData.activity.toUpperCase() === "STUDDED" || CategoryData.activity === "" ? "" : <DropDownMaterialUI
                labelName="Type Set-2"
                onChangeHandler={typeSet2ResHandler}
                optionsList={setType2option}
                CategoryData={CategoryData}
            />)}

            {selectedTagArray.includes("Only_EARRING") && CategoryData.findings &&
                <DropDownMaterialUI
                    labelName={CategoryData.category.toUpperCase() === "CHAINS" ? "Hooks Type" : "Findings"}
                    onChangeHandler={findingsResHandler}
                    optionsList={findingsOptions}
                    CategoryData={CategoryData}
                />}
        </React.Fragment>)
}
export default MultipleSelectTagDropdown;

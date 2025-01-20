import React, { useEffect, useState, useRef } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { toast } from 'react-toastify';
import { Typography } from "@material-ui/core";

const MultipuleSelectSizable = ({ optionsList, onChangeHandler, CategoryData }) => {
    const [selectedSizeOption, setSelectedSizeOption] = useState([]);
    const [seizeInputsOption, setSizeInputsOption] = useState({});
    const multiselectSizeRef = useRef(null);

    const ResetMaltiSelectSizeValues = () => {
        if (multiselectSizeRef.current) {
            multiselectSizeRef.current.resetSelectedValues();
            setSizeInputsOption({});
            setSelectedSizeOption([]);
        }
    };

    const options = optionsList.map((data, i) => {
        return {
            name: data, id: i
        }
    });
    const HandleSelectSetTag = (selectedList) => {
        setSelectedSizeOption(selectedList);
        const newInputs = { ...seizeInputsOption };
        selectedList.forEach((item) => {
            if (!(item.name in newInputs)) {
                newInputs[item.name] = '';
            }
        });
        setSizeInputsOption(newInputs);
    };
    const HandleRemoveSetTag = (selectedList) => {
        setSelectedSizeOption(selectedList);
        const updatedInputs = { ...seizeInputsOption };
        selectedSizeOption.forEach((item) => {
            if (!selectedList.some((selected) => selected.name === item.name)) {
                delete updatedInputs[item.name];
            }
        });
        setSizeInputsOption(updatedInputs);
    };

    const HandleInputChange = (optionName, value) => {
        if (value < 0) { return toast.error("Please Enter Positive Value", { theme: "colored", autoClose: 2000 }); }
        if (/^[0-9]$/.test(value) || value === '') {
            setSizeInputsOption({ ...seizeInputsOption, [optionName]: value });
        } else {
            toast.error("Please Enter Single Digit", { theme: "colored", autoClose: 2000 });
        }
    };
    const TagsInputsData = Object.entries(seizeInputsOption).map(([rowName, value]) => ({
        size: rowName,
        quantity: value
    }));

    useEffect(() => {
        onChangeHandler(TagsInputsData);
    }, [selectedSizeOption, seizeInputsOption]);

    useEffect(() => {
        ResetMaltiSelectSizeValues();
    }, [CategoryData.itemCode, CategoryData.id]);

    return (
        <React.Fragment>
            <div className="mt-2">
                <Typography className="my-1 text-primary">Choose Size</Typography>
                <Multiselect
                    options={options}
                    selectedValues={selectedSizeOption}
                    onSelect={HandleSelectSetTag}
                    onRemove={HandleRemoveSetTag}
                    displayValue="name"
                    placeholder="Choose Size"
                    showCheckbox={true}
                    ref={multiselectSizeRef}
                />
                {selectedSizeOption.map((option, i) => {
                    return (
                        <div key={i} className="d-flex w-100 mt-1">
                            <input style={{ width: "100%" }} placeholder={option.name} onChange={(e) => HandleInputChange(option.name, e.target.value)} />
                        </div>)
                })}
            </div>
        </React.Fragment>)
}

export default MultipuleSelectSizable;

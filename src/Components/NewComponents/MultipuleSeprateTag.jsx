import React, { useEffect, useState, useRef } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { toast } from 'react-toastify';
import { Typography } from "@material-ui/core";

const MultipuleSeprateTag = ({ optionsListLadies, optionsListGenst, onChangeHandler, CategoryData }) => {
    const [selectedSizeOptionL, setSelectedSizeOptionL] = useState([]);
    const [seizeInputsOptionL, setSizeInputsOptionL] = useState({});
    // FOR GENTS 
    const [selectedSizeOptionM, setSelectedSizeOptionM] = useState([]);
    const [seizeInputsOptionM, setSizeInputsOptionM] = useState({});
    const multiselectSizeRef = useRef(null);

    const ResetMaltiSelectSizeValues = () => {
        if (multiselectSizeRef.current) {
            multiselectSizeRef.current.resetSelectedValues();
            setSizeInputsOptionL({});
            setSelectedSizeOptionL([]);
        }
    };

    const optionsLadies = optionsListLadies.map((data, i) => {
        return {
            name: data, id: i
        }
    });

    const HandleSelectSetTagL = (selectedList) => {
        setSelectedSizeOptionL(selectedList);
        const newInputs = { ...seizeInputsOptionL };
        selectedList.forEach((item) => {
            if (!(item.name in newInputs)) {
                newInputs[item.name] = '';
            }
        });
        setSizeInputsOptionL(newInputs);
    };

    const HandleRemoveSetTagL = (selectedList) => {
        setSelectedSizeOptionL(selectedList);
        const updatedInputs = { ...seizeInputsOptionL };
        selectedSizeOptionL.forEach((item) => {
            if (!selectedList.some((selected) => selected.name === item.name)) {
                delete updatedInputs[item.name];
            }
        });
        setSizeInputsOptionL(updatedInputs);
    };

    const HandleInputChangeL = (optionName, value) => {
        if (value < 0) { return toast.error("Please Enter Positive Value", { theme: "colored", autoClose: 2000 }); }
        if (/^[0-9]$/.test(value) || value === '') {
            setSizeInputsOptionL({ ...seizeInputsOptionL, [optionName]: value });
        } else {
            toast.error("Please Enter Single Digit", { theme: "colored", autoClose: 2000 });
        }
    };

    const TagsInputsDataL = Object.entries(seizeInputsOptionL).map(([rowName, value]) => ({
        size: rowName,
        quantity: value
    }));


    //    <-------------------------------------------- FOR GENTS ---------------------------------->

    const optionsGenst = optionsListGenst.map((data, i) => {
        return {
            name: data, id: i
        }
    });
    const HandleSelectSetTagM = (selectedList) => {
        setSelectedSizeOptionM(selectedList);
        const newInputs = { ...seizeInputsOptionM };
        selectedList.forEach((item) => {
            if (!(item.name in newInputs)) {
                newInputs[item.name] = '';
            }
        });
        setSizeInputsOptionM(newInputs);
    };

    const HandleRemoveSetTagM = (selectedList) => {
        setSelectedSizeOptionM(selectedList);
        const updatedInputs = { ...seizeInputsOptionM };
        selectedSizeOptionM.forEach((item) => {
            if (!selectedList.some((selected) => selected.name === item.name)) {
                delete updatedInputs[item.name];
            }
        });
        setSizeInputsOptionM(updatedInputs);
    };

    const HandleInputChangeM = (optionName, value) => {
        if (value < 0) { return toast.error("Please Enter Positive Value", { theme: "colored", autoClose: 2000 }); }
        if (/^[0-9]$/.test(value) || value === '') {
            setSizeInputsOptionM({ ...seizeInputsOptionM, [optionName]: value });
        } else {
            toast.error("Please Enter Single Digit", { theme: "colored", autoClose: 2000 });
        }
    };

    const TagsInputsDataM = Object.entries(seizeInputsOptionM).map(([rowName, value]) => ({
        size: rowName,
        quantity: value
    }));

    const BothTag = [...TagsInputsDataL, ...TagsInputsDataM];

    useEffect(() => {
        onChangeHandler(BothTag);
    }, [selectedSizeOptionL, seizeInputsOptionM]);

    useEffect(() => {
        ResetMaltiSelectSizeValues();
    }, [CategoryData.itemCode, CategoryData.id]);

    return (
        <React.Fragment>
            <div className="mt-2">
                <Typography className="my-1 text-primary">FOR LADIES</Typography>
                <Multiselect
                    options={optionsLadies}
                    selectedValues={selectedSizeOptionL}
                    onSelect={HandleSelectSetTagL}
                    onRemove={HandleRemoveSetTagL}
                    displayValue="name"
                    placeholder="Choose Size"
                    showCheckbox={true}
                    ref={multiselectSizeRef}
                />
                {selectedSizeOptionL.map((option, i) => {
                    return (
                        <div key={i} className="d-flex w-100 mt-1">
                            <input style={{ width: "100%" }} placeholder={option.name} onChange={(e) => HandleInputChangeL(option.name, e.target.value)} />
                        </div>)
                })}
            </div>
            <div className="mt-2">
                <Typography className="my-1 text-primary">FOR GENTS</Typography>
                <Multiselect
                    options={optionsGenst}
                    selectedValues={selectedSizeOptionM}
                    onSelect={HandleSelectSetTagM}
                    onRemove={HandleRemoveSetTagM}
                    displayValue="name"
                    placeholder="Choose Size"
                    showCheckbox={true}
                    ref={multiselectSizeRef}
                />
                {selectedSizeOptionM.map((option, i) => {
                    return (
                        <div key={i} className="d-flex w-100 mt-1">
                            <input style={{ width: "100%" }} placeholder={option.name} onChange={(e) => HandleInputChangeM(option.name, e.target.value)} />
                        </div>)
                })}
            </div>
        </React.Fragment>)
}

export default MultipuleSeprateTag;

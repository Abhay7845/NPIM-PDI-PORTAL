import React, { useEffect, useState, useRef } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { toast } from 'react-toastify';
import { Typography } from "@material-ui/core";

const MultipleSelecteBangle = ({ optionsList, sizeUomQuantityResHandler, CategoryData }) => {
    const [selectedData, setSelectedData] = useState([]);

    const multiselectUmoRef = useRef(null);
    const ResetMaltiSelectSizeValues = () => {
        if (multiselectUmoRef.current) {
            multiselectUmoRef.current.resetSelectedValues();
            setSelectedData([]);
        }
    };

    // Handle option selection
    const onSelect = (selectedList) => {
        const updatedData = selectedList.map((item) => {
            // Check if item already exists to avoid duplicates
            const existingItem = selectedData.find(data => data.size === item);
            return existingItem || { size: item, uom10: '', uom8: '', uom6: '', uom4: '', uom2: '', uom1: '' };
        });
        setSelectedData(updatedData);
    };

    // Handle option removal
    const onRemove = (selectedList) => {
        const updatedData = selectedData.filter(data => selectedList.includes(data.size));
        setSelectedData(updatedData);
    };

    // Handle input change for each field
    const handleInputChange = (e, index, field) => {
        if (e.target.value < 0) { return toast.error("Please Enter Positive Value", { theme: "colored", autoClose: 2000 }) };
        if (/^[0-9]$/.test(e.target.value) || e.target.value === '') {
            const updatedData = [...selectedData];
            updatedData[index][field] = e.target.value;
            setSelectedData(updatedData);
        } else {
            toast.error("Please Enter Single Digit", { theme: "colored", autoClose: 2000 });
        }
    };

    useEffect(() => {
        return sizeUomQuantityResHandler(selectedData);
    }, [selectedData]);

    useEffect(() => {
        ResetMaltiSelectSizeValues();
    }, [CategoryData.itemCode, CategoryData.id]);

    return (
        <React.Fragment>
            <Typography className="my-1 text-primary mt-2">Choose Size UOM</Typography>
            <Multiselect
                options={optionsList}
                isObject={false}
                onSelect={onSelect}
                onRemove={onRemove}
                placeholder="Choose Size"
                ref={multiselectUmoRef}
            />
            {selectedData.map((item, index) => (
                <div key={item.size} className="d-flex mt-2">
                    <b className="mx-1">{item.size}10</b>
                    <input
                        type="number"
                        value={item.uom10}
                        className="w-100"
                        placeholder="Size"
                        onChange={(e) => handleInputChange(e, index, 'uom10')}
                    />
                    <b className="mx-1">8</b>
                    <input
                        type="number"
                        value={item.uom8}
                        className="w-100"
                        placeholder="Size"
                        onChange={(e) => handleInputChange(e, index, 'uom8')}
                    />
                    <b className="mx-1">6</b>
                    <input
                        type="number"
                        value={item.uom6}
                        className="w-100"
                        placeholder="Size"
                        onChange={(e) => handleInputChange(e, index, 'uom6')}
                    />
                    <b className="mx-1">4</b>
                    <input
                        type="number"
                        value={item.uom4}
                        className="w-100"
                        placeholder="Size"
                        onChange={(e) => handleInputChange(e, index, 'uom4')}
                    />
                    <b className="mx-1">2</b>
                    <input
                        type="number"
                        value={item.uom2}
                        className="w-100"
                        placeholder="Size"
                        onChange={(e) => handleInputChange(e, index, 'uom2')}
                    />
                    <b className="mx-1">1</b>
                    <input
                        type="number"
                        value={item.uom1}
                        className="w-100"
                        placeholder="Size"
                        onChange={(e) => handleInputChange(e, index, 'uom1')}
                    />
                </div>
            ))}
        </React.Fragment>)
}

export default MultipleSelecteBangle;

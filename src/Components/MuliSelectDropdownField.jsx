import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/CssStyle/MuliSelectDropdownField.css";
import { Multiselect } from "multiselect-react-dropdown";

export const MuliSelectDropdownField = ({ onMultiSelect, feedShowState }) => {
  const multiselectRef = useRef();

  const resetSelectField = () => {
    multiselectRef.current.resetSelectedValues();
  };

  // const NoReasonOption = [
  //   "Not Relevant To Market",
  //   "Price is High",
  //   "Similar design exists",
  //   "Wearibility Issue",
  //   "Design Not Applicable",
  // ];

  const NoReasonOption = [
    "Design Not relevent",
    "Not Value for Money",
    "Pricing is too high",
    "Similar design exist",
    "Wearability issue",
    "Not Differentiated as per Tanish brand",
    "Others(Free Text)",
  ];

  const data = NoReasonOption.map((element, index) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });

  const onInternalSelectChange = (selectedList, selectedItem) => {
    let selectedData = selectedList.map((data) => {
      return data.valueData;
    });
    return onMultiSelect(selectedData);
  };

  const onInternalRemoveChange = (selectedList, removedItem) => {
    let selectedData = selectedList.map((data) => {
      return data.valueData;
    });
    return onMultiSelect(selectedData);
  };

  useEffect(() => {
    resetSelectField();
  }, [feedShowState.itemCode, feedShowState.id]);

  return (
    <React.Fragment>
      <label>Choose Reasons For No (Optional)</label>
      <Multiselect
        options={data}
        displayValue="lableValue"
        onSelect={onInternalSelectChange}
        onRemove={onInternalRemoveChange}
        showCheckbox={true}
        closeOnSelect={true}
        placeholder="Choose Reasons"
        className="searchbox"
        ref={multiselectRef}
      />
    </React.Fragment>
  );
};


export const MuliSelectDropdownFieldQualityFeedback = (props) => {
  const multiselectRef = useRef();

  useEffect(() => {
    multiselectRef.current.resetSelectedValues();
  }, [props.feedShowState.itemCode]);

  const ratingReason = [
    "Antique Finish",
    "Enamel Finish",
    "Surface & Intricate Finish",
    "Wearability",
    "Sharp Edges",
    "Strength",
    "Findings/Lock Function",
    "Stone visibility",
    "Stone Setting issues",
  ];

  const dataQlty = ratingReason.map((element, index) => {
    return {
      valueData: element,
      lableValue: element,
    };
  });
  const onInternalSelectChange = (selectedList, selectedItem) => {
    let selectedData = selectedList.map((data) => {
      return data.valueData;
    });
    return props.onMultiSelectQlty(selectedData);
  };
  const onInternalRemoveChange = (selectedList, removedItem) => {
    let selectedData = selectedList.map((data) => {
      return data.valueData;
    });
    return props.onMultiSelectQlty(selectedData);
  };

  return (
    <React.Fragment>
      <label>Choose Reasons</label>
      <div className="drop_multi">
        <Multiselect
          options={dataQlty}
          displayValue="lableValue"
          onSelect={onInternalSelectChange}
          onRemove={onInternalRemoveChange}
          showCheckbox={true}
          closeOnSelect={true}
          selectionLimit={3}
          placeholder="Reason For Low Quality Rating"
          className="searchbox"
          ref={multiselectRef}
        />
      </div>
    </React.Fragment>
  );
};


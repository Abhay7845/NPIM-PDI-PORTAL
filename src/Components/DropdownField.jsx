import React from "react";

const DropdownField = (props) => {
  const generateOptions = (dropList) => {
    let optionItems = dropList.map((option) => (
      <option key={option} value={option}>
        {option.replace(/\_/g, " $&").replace(/\s_/g, " ").toUpperCase()}
      </option>
    ));
    return optionItems;
  };
  return (
    <div className="input-group">
      <div className="input-group-prepend">
        <label className="input-group-text mt-3">{props.labelName}</label>
      </div>
      <select
        onChange={props.myChangeHandler}
        name={props.name}
        value={props.value}
        id="inputGroupSelect01"
      >
        {generateOptions(props.dropList)}
      </select>
    </div>
  );
};
export default DropdownField;

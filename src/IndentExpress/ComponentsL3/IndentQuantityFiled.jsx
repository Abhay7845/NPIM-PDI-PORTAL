import React from "react";

const IndentQuantityFiled = (props) => {
  const { GetIndentQuantityValue, indentQuantity } = props;

  return (
    <input
      type="number"
      pattern="[0-9]"
      min="0"
      max="9"
      id="numberInput"
      maxLength={1}
      minLength={1}
      value={`${indentQuantity}`}
      onInput={GetIndentQuantityValue}
      className="IndentQuantity"
      placeholder="Enter Indent Quantity"
    />
  );
};

export default IndentQuantityFiled;

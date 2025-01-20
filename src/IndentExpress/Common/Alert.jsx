import React from "react";

const Alert = (props) => {
  const Capital = (word) => {
    if (word === "danger") {
      word = "Sorry";
    } else if (word === "success") {
      word = "Congratulations";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <div className="alertStyle">
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} fade show`}
          role="alert"
        >
          <strong>{Capital(props.alert.type)}! </strong>
          {props.alert.msg}
        </div>
      )}
    </div>
  );
};

export default Alert;

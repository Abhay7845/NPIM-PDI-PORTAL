import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  selectDrop: {
    fontWeight: "bold",
    padding: "5px",
    border: "1.3px solid #832729",
    cursor: "pointer",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    outline: "none",
  },
});

const DropdownFieldDigital = (props) => {
  const { myChangeHandler, name, value, labelName, dropList } = props;
  const classes = useStyles();
  const generateOptions = (dropList) => {
    let optionItems = dropList.map((option) => (
      <option className={classes.selectDrop} key={option} value={option}>
        {option}
      </option>
    ));
    return optionItems;
  };
  return (
    <select
      onChange={myChangeHandler}
      name={name}
      value={value}
      className={classes.selectDrop}
    >
      <option className={classes.selectDrop} value="ALL">
        Select {labelName}
      </option>
      {generateOptions(dropList)}
    </select>
  );
};
export default DropdownFieldDigital;

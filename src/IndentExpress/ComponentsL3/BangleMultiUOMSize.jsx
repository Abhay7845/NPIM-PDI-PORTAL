import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { Multiselect } from "multiselect-react-dropdown";
import { useStyles } from "../Style/StyleJsx/BangleMultiUOMSize";

const BangleMultiUOMSize = (props) => {
  const { optionsList, GetUomSizeQuantity } = props;
  const classes = useStyles();
  const [sizeRow, setSizeRow] = useState({
    A: false,
    B: false,
    C: false,
    D: false,
    E: false,
    F: false,
    G: false,
    H: false,
    I: false,
    J: false,
    K: false,
    L: false,
    M: false,
    N: false,
    O: false,
    P: false,
    Q: false,
    R: false,
    S: false,
    T: false,
    U: false,
    V: false,
    W: false,
    X: false,
    Y: false,
    Z: false,
  });

  const options = optionsList.map((element, index) => {
    return {
      valueData: element,
      labelValue: element,
    };
  });

  const enableRows = (name, value) => {
    setSizeRow(function (old) {
      switch (name) {
        case "A":
          return {
            ...old,
            [name]: value,
          };
        case "B":
          return {
            ...old,
            [name]: value,
          };
        case "C":
          return {
            ...old,
            [name]: value,
          };
        case "D":
          return {
            ...old,
            [name]: value,
          };
        case "E":
          return {
            ...old,
            [name]: value,
          };
        case "F":
          return {
            ...old,
            [name]: value,
          };
        case "G":
          return {
            ...old,
            [name]: value,
          };
        case "H":
          return {
            ...old,
            [name]: value,
          };
        case "I":
          return {
            ...old,
            [name]: value,
          };
        case "J":
          return {
            ...old,
            [name]: value,
          };
        case "K":
          return {
            ...old,
            [name]: value,
          };
        case "L":
          return {
            ...old,
            [name]: value,
          };
        case "M":
          return {
            ...old,
            [name]: value,
          };
        case "N":
          return {
            ...old,
            [name]: value,
          };
        case "O":
          return {
            ...old,
            [name]: value,
          };
        case "P":
          return {
            ...old,
            [name]: value,
          };
        case "Q":
          return {
            ...old,
            [name]: value,
          };
        case "R":
          return {
            ...old,
            [name]: value,
          };
        case "S":
          return {
            ...old,
            [name]: value,
          };
        case "T":
          return {
            ...old,
            [name]: value,
          };
        case "U":
          return {
            ...old,
            [name]: value,
          };

        case "V":
          return {
            ...old,
            [name]: value,
          };
        case "W":
          return {
            ...old,
            [name]: value,
          };

        case "X":
          return {
            ...old,
            [name]: value,
          };
        case "Y":
          return {
            ...old,
            [name]: value,
          };
        case "Z":
          return {
            ...old,
            [name]: value,
          };
        default:
          break;
      }
    });
  };
  const onInternalSelectChange = (selectedList, selectedItem) => {
    enableRows(selectedItem.labelValue, true);
  };

  const onInternalRemoveChange = (selectedList, removedItem) => {
    enableRows(removedItem.labelValue, false);
  };
  const rowHandlerChange = (event) => {
    let getData = [];
    let count = 0;

    for (let rowName in sizeRow) {
      if (sizeRow[rowName]) {
        getData[count++] = {
          size: rowName,
          uom8: document.getElementById(`${rowName}8`).value
            ? document.getElementById(`${rowName}8`).value
            : "",
          uom6: document.getElementById(`${rowName}6`).value
            ? document.getElementById(`${rowName}6`).value
            : "",
          uom4: document.getElementById(`${rowName}4`).value
            ? document.getElementById(`${rowName}4`).value
            : "",
          uom2: document.getElementById(`${rowName}2`).value
            ? document.getElementById(`${rowName}2`).value
            : "",
          uom1: document.getElementById(`${rowName}1`).value
            ? document.getElementById(`${rowName}1`).value
            : "",
        };
      }
    }
    return GetUomSizeQuantity(getData);
  };

  const enableRow = (labelValue) => {
    for (let rowName in sizeRow) {
      if (rowName === labelValue && sizeRow[rowName]) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="mt-3">
      <Multiselect
        displayValue="labelValue"
        options={options}
        onSelect={onInternalSelectChange}
        onRemove={onInternalRemoveChange}
        showCheckbox={true}
        closeOnSelect={true}
        placeholder="Choose Size"
        disablePreSelectedValues={true}
      />
      <table className="w-100">
        <tbody>
          {options.map((row, index) => (
            <tr
              key={index}
              onChange={rowHandlerChange}
              id={row.labelValue}
              className={
                enableRow(row.labelValue) ? classes.show : classes.hide
              }
            >
              <td>
                <Typography size="small" color="primary">
                  {row.labelValue}
                </Typography>
              </td>
              <td>
                <Typography size="small" color="primary">
                  8
                </Typography>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  id={`${row.labelValue}8`}
                  name={`${row.labelValue}8`}
                  className={classes.inputField}
                />
              </td>
              <td>
                <Typography size="small" color="primary">
                  6
                </Typography>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  id={`${row.labelValue}6`}
                  name={`${row.labelValue}6`}
                  className={classes.inputField}
                />
              </td>
              <td>
                <Typography size="small" color="primary">
                  4
                </Typography>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  id={`${row.labelValue}4`}
                  name={`${row.labelValue}4`}
                  className={classes.inputField}
                />
              </td>
              <td>
                <Typography size="small" color="primary">
                  2
                </Typography>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  id={`${row.labelValue}2`}
                  name={`${row.labelValue}2`}
                  className={classes.inputField}
                />
              </td>
              <td>
                <Typography size="small" color="primary">
                  1
                </Typography>
              </td>
              <td>
                <input
                  type="text"
                  maxLength="1"
                  id={`${row.labelValue}1`}
                  name={`${row.labelValue}1`}
                  className={classes.inputField}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BangleMultiUOMSize;

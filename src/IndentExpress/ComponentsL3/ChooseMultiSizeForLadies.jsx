import React, { useState } from "react";
import { useStyles } from "../Style/ChooseMultiSize";
import { Multiselect } from "multiselect-react-dropdown";

const ChooseMultiSizeForLadies = (props) => {
  const { optionsList, GetLadiesSizeValue } = props;
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
    V: false,
    X: false,
    Y: false,
    Z: false,
    2: false,
    4: false,
    6: false,
    8: false,
  });

  const options = optionsList.map((element) => {
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
        case "1":
          return {
            ...old,
            [name]: value,
          };
        case "2":
          return {
            ...old,
            [name]: value,
          };
        case "3":
          return {
            ...old,
            [name]: value,
          };
        case "4":
          return {
            ...old,
            [name]: value,
          };
        case "5":
          return {
            ...old,
            [name]: value,
          };
        case "6":
          return {
            ...old,
            [name]: value,
          };
        case "7":
          return {
            ...old,
            [name]: value,
          };
        case "8":
          return {
            ...old,
            [name]: value,
          };
        case "9":
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
          quantity: document.getElementById(`${rowName}sq`).value
            ? document.getElementById(`${rowName}sq`).value
            : "",
        };
      }
    }
    return GetLadiesSizeValue(getData);
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
    <div className={classes.drop_multi}>
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
        <tbody className="d-flex">
          {options.map((row, index) => (
            <tr
              key={index}
              onChange={rowHandlerChange}
              id={row.labelValue}
              className={
                enableRow(row.labelValue) ? classes.show : classes.hide
              }
            >
              <td className="w-100">
                <input
                  type="text"
                  maxLength="1"
                  id={`${row.labelValue}sq`}
                  name={`${row.labelValue}sq`}
                  className={classes.inputField}
                  placeholder={row.labelValue}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChooseMultiSizeForLadies;

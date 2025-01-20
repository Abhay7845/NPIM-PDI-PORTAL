/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStyles } from "../Style/StyleJsx/ChooseDynamicTag";
import { Multiselect } from 'multiselect-react-dropdown';
import BangleMultiUOMSize from "./BangleMultiUOMSize";
import FindingDropdown from "../Common/FindingDropdown";
import Set2TypeDropdown from "../Common/Set2TypeDropdown";
import { INDENT_HOST_URL } from "../../HostManager/UrlManager";

const ChooseDynamicTag = (props) => {
  const classes = useStyles();
  const [option, setOption] = useState([]);
  const [sizeRow, setSizeRow] = useState();
  const [ChildNodeV, setChildNodeV] = useState([]);
  const [ChildNodesN, setChildNodesN] = useState([]);
  const [ChildNodeF, setChildNodeF] = useState([]);
  const {
    singleProductsDetails,
    optionsList,
    GetTagFiledValues,
    GetUomSizeQuantity,
    GetFindingData,
    GetSet2TypeData,
  } = props;
  const { itemCode } = singleProductsDetails;
  const digit = !itemCode ? "" : itemCode[6];

  // DYNAMIC TAG
  const FingerTag = !singleProductsDetails.childNodeF ? "" : singleProductsDetails.childNodeF.trim();
  const haramTag = !singleProductsDetails.childNodeH ? "" : singleProductsDetails.childNodeH.trim();
  const tikkaTag = !singleProductsDetails.childNodeK ? "" : singleProductsDetails.childNodeK.trim();
  const otherTag = !singleProductsDetails.childNodeO ? "" : singleProductsDetails.childNodeO.trim();
  const bangleTag = !singleProductsDetails.childNodeV ? "" : singleProductsDetails.childNodeV.trim();
  const earingTag = !singleProductsDetails.childNodesE ? "" : singleProductsDetails.childNodesE.trim();
  const neckwearTag = !singleProductsDetails.childNodesN ? "" : singleProductsDetails.childNodesN.trim();

  const finger = !FingerTag ? "" : "Only_FINGER_RING";
  const harm = !haramTag ? "" : "Only_HARAM";
  const Tikka = !tikkaTag ? "" : "Only_TIKKA";
  const other = !otherTag ? "" : "Only_OTHER";
  const bangle = !bangleTag ? "" : "Only_BANGLE";
  const earing = !earingTag ? "" : "Only_EARRING";
  const neckwear = !neckwearTag ? "" : "Only_NECKWEAR";

  const optionForOtherAllSet = [
    "Single_Tag",
    "Separate_Tag",
    earing,
    neckwear,
    harm,
    Tikka,
    other,
    finger,
    bangle,
  ];
  const tagsOptions = optionForOtherAllSet.filter((item) => !item === false);
  const optionForSet0 = [
    "Single_Tag",
    "Separate_Tag",
    "Only_EARRING",
    "Only_CHAIN_WITH_PENDANT",
  ];
  const optionForSet1 = [
    "Single_Tag",
    "Separate_Tag",
    "Only_EARRING",
    "Only_NECKWEAR_OR_PENDANT",
  ];
  const tagsTCategory = [
    "Single_Tag",
    "Separate_Tag",
    "Only_EARRING",
    "Only_MANGALSUTRA",
  ];
  useEffect(() => {
    if (digit === "0") {
      setOption(optionForSet0);
    }
    if (digit === "1") {
      setOption(optionForSet1);
    }
    if (digit === "T") {
      setOption(tagsTCategory);
    }
    if (
      digit === "2" ||
      digit === "3" ||
      digit === "4" ||
      digit === "5" ||
      digit === "6" ||
      digit === "7"
    ) {
      setOption(tagsOptions);
    }
  }, [digit]);

  const setType2option = ["Chain", "Dori"];
  useEffect(() => {
    if (optionsList)
      setImmediate(() => {
        setSizeRow(
          optionsList.reduce(
            (total, value) => ({ ...total, [value[1]]: false }),
            {}
          )
        );
      });
  }, [optionsList]);

  const childNodeV = !singleProductsDetails
    ? singleProductsDetails.childNodeV
    : singleProductsDetails.childNodeV;
  useEffect(() => {
    axios.get(`${INDENT_HOST_URL}/INDENTL3/express/size/dropdown/${childNodeV}`)
      .then((res) => res).then((result) => {
        if (result.data.code === "1000") {
          setChildNodeV(result.data.value);
        } else if (result.data.code === "1001") {
          setChildNodeV([]);
        }
      }).catch((error) => { });
  }, [childNodeV]);

  const childNodeN = !singleProductsDetails
    ? singleProductsDetails.childNodesN
    : singleProductsDetails.childNodesN;
  useEffect(() => {
    axios
      .get(`${INDENT_HOST_URL}/INDENTL3/express/size/dropdown/${childNodeN}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setChildNodesN(response.data.value);
        } else if (response.data.code === "1001") {
          setChildNodesN([]);
        }
      })
      .catch((error) => { });
  }, [childNodeN]);

  const childNodeF = !singleProductsDetails
    ? singleProductsDetails.childNodeF
    : singleProductsDetails.childNodeF;
  useEffect(() => {
    axios
      .get(`${INDENT_HOST_URL}/INDENTL3/express/size/dropdown/${childNodeF}`)
      .then((res) => res)
      .then((response) => {
        if (response.data.code === "1000") {
          setChildNodeF(response.data.value);
        } else if (response.data.code === "1001") {
          setChildNodeF([]);
        }
      })
      .catch((error) => { });
  }, [childNodeF]);

  const options = option.map((element) => {
    return {
      valueData: element,
      labelValue: element,
    };
  });
  const fingerRingSize = ChildNodeF.map((element) => {
    return {
      valueData: element,
      labelValue: element,
    };
  });

  const ChildNodeN = ChildNodesN.map((element) => {
    return {
      valueData: element,
      labelValue: element,
    };
  });

  const optionsOnlyE = ["Only_EARRING"];
  const optionE = optionsOnlyE.map((element) => {
    return {
      valueData: element,
      labelValue: element,
    };
  });
  const optionsOnlyF = ["Only_FINGER_RING"];
  const optionF = optionsOnlyF.map((element) => {
    return {
      valueData: element,
      labelValue: element,
    };
  });
  const optionsOnlyM = ["Only_MANGALSUTRA"];
  const optionM = optionsOnlyM.map((element) => {
    return {
      valueData: element,
      labelValue: element,
    };
  });
  const optionsOnlyV = ["Only_BANGLE"];
  const optionV = optionsOnlyV.map((element) => {
    return {
      valueData: element,
      labelValue: element,
    };
  });
  const optionsOnlyN = ["Only_NECKWEAR"];
  const optionN = optionsOnlyN.map((element) => {
    return {
      valueData: element,
      labelValue: element,
    };
  });

  const enableRows = (name, value) => {
    setSizeRow(function (old) {
      return {
        ...old,
        [name]: value,
      };
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
          quantity: document.getElementById(`${rowName}sq`).value,
        };
      }
    }
    return GetTagFiledValues(getData);
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
    <React.Fragment>
      <Multiselect
        displayValue="labelValue"
        options={options}
        onSelect={onInternalSelectChange}
        onRemove={onInternalRemoveChange}
        showCheckbox={true}
        closeOnSelect={true}
        placeholder="Choose Tag"
        disablePreSelectedValues={true}
      />
      <table className="w-100">
        <tbody className="d-flex">
          {options.map((row, index) => (
            <tr
              key={index}
              onChange={rowHandlerChange}
              id={row.labelValue}
              className={enableRow(row.labelValue) ? classes.show : classes.hide}
            >
              <td className="w-100">
                <input
                  type="text"
                  maxLength="1"
                  id={`${row.labelValue}sq`}
                  name={`${row.labelValue}sq`}
                  className={
                    row.labelValue === "Only_BANGLE" ||
                      row.labelValue === "Only_FINGER_RING" ||
                      row.labelValue === "Only_MANGALSUTRA"
                      ? classes.hide
                      : classes.inputField
                  }
                  placeholder={row.labelValue}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="w-100">
        <tbody>
          {optionE.map((row, index) => (
            <tr
              key={index}
              onChange={rowHandlerChange}
              id={row.labelValue}
              className={
                enableRow(row.labelValue) ? classes.showDropdown : classes.hide
              }
            >
              <td className="w-100">
                {!singleProductsDetails
                  ? singleProductsDetails.findings
                  : singleProductsDetails.findings && (
                    <FindingDropdown
                      GetFindingData={GetFindingData}
                      singleProductsDetails={singleProductsDetails}
                    />
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="w-100">
        <tbody>
          {optionF.map((row, index) => (
            <tr
              key={index}
              onChange={rowHandlerChange}
              id={row.labelValue}
              className={
                enableRow(row.labelValue) ? classes.showDropdown : classes.hide
              }
            >
              <td className="w-100">
                <Multiselect
                  displayValue="labelValue"
                  options={fingerRingSize}
                  onSelect={onInternalSelectChange}
                  onRemove={onInternalRemoveChange}
                  showCheckbox={true}
                  closeOnSelect={true}
                  placeholder="Choose Size"
                  disablePreSelectedValues={true}
                />
                <table className="w-100">
                  <tbody className="d-flex">
                    {fingerRingSize.map((row, index) => (
                      <tr
                        key={index}
                        onChange={rowHandlerChange}
                        id={row.labelValue}
                        className={
                          enableRow(row.labelValue)
                            ? classes.show
                            : classes.hide
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="w-100">
        <tbody>
          {optionM.map((row, index) => (
            <tr
              key={index}
              onChange={rowHandlerChange}
              id={row.labelValue}
              className={
                enableRow(row.labelValue) ? classes.showDropdown : classes.hide
              }
            >
              <td className="w-100">
                <Multiselect
                  displayValue="labelValue"
                  options={ChildNodeN}
                  onSelect={onInternalSelectChange}
                  onRemove={onInternalRemoveChange}
                  showCheckbox={true}
                  closeOnSelect={true}
                  placeholder="Choose Size"
                  disablePreSelectedValues={true}
                />
                <table className="w-100">
                  <tbody className="d-flex">
                    {ChildNodeN.map((row, index) => (
                      <tr
                        key={index}
                        onChange={rowHandlerChange}
                        id={row.labelValue}
                        className={
                          enableRow(row.labelValue)
                            ? classes.show
                            : classes.hide
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="w-100">
        <tbody>
          {optionV.map((row, index) => (
            <tr
              key={index}
              onChange={rowHandlerChange}
              id={row.labelValue}
              className={
                enableRow(row.labelValue) ? classes.showDropdown : classes.hide
              }
            >
              <td className="w-100">
                <BangleMultiUOMSize
                  optionsList={ChildNodeV}
                  GetUomSizeQuantity={GetUomSizeQuantity}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="w-100">
        <tbody>
          {optionN.map((row, index) => (
            <tr
              key={index}
              onChange={rowHandlerChange}
              id={row.labelValue}
              className={
                enableRow(row.labelValue) ? classes.showDropdown : classes.hide
              }
            >
              <td className="w-100">
                <Set2TypeDropdown
                  GetSet2TypeData={GetSet2TypeData}
                  optionsList={setType2option}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default ChooseDynamicTag;

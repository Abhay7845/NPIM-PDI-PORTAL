import React from "react";
import "../Style/ShowImage.css";

const StoneQualityDropdown = (props) => {
  const { GetStoneData, singleProductsDetails } = props;

  const stoneOptions = (inputObj) => {
    let stoneOptionList = [];
    if (inputObj.stdUCP) {
      stoneOptionList[1 + stoneOptionList.length] = `stdUCP-${inputObj.stdUCP}`;
    }
    if (inputObj.si2Gh) {
      stoneOptionList[1 + stoneOptionList.length] = `si2Gh-${inputObj.si2Gh}`;
    }
    if (inputObj.vsGh) {
      stoneOptionList[1 + stoneOptionList.length] = `vsGh-${inputObj.vsGh}`;
    }
    if (inputObj.vvs1) {
      stoneOptionList[1 + stoneOptionList.length] = `vvs1-${inputObj.vvs1}`;
    }
    if (inputObj.i2Gh) {
      stoneOptionList[1 + stoneOptionList.length] = `i2Gh-${inputObj.i2Gh}`;
    }
    if (inputObj.si2Ij) {
      stoneOptionList[1 + stoneOptionList.length] = `si2Ij-${inputObj.si2Ij}`;
    }
    return stoneOptionList;
  };

  const optionsList = stoneOptions(singleProductsDetails);

  return (
    <div className="mt-3">
      <select onChange={GetStoneData} className="L3SelectDropdown">
        <option value="">Select Stone Quality</option>
        {optionsList.map((item, i) => {
          return (
            <option key={i} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default StoneQualityDropdown;

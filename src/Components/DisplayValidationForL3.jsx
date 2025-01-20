import React, { useState, useEffect } from "react";
import { APICoupleBandDropdown, APIGetSizeDropdown } from "../HostManager/CommonApiCallL3";
import MultipuleSelectSizable from "./NewComponents/MultipuleSelectSizable";
import MultipleSelecteBangle from "./NewComponents/MultipleSelecteBangle";
import InputFieldMaterialUI from "./NewComponents/InputFieldMaterialUI";
import DropDownMaterialUI from "./NewComponents/DropDownMaterialUI";
import MultipleSelectTagDropdown from "./NewComponents/MultipleSelectTagDropdown";
import StoneQualityDropdown from "./NewComponents/StoneQualityDropdown";
import MultipuleSeprateTag from "./NewComponents/MultipuleSeprateTag";

export default function DisplayValidationComponent(props) {
    const [SizeState, setSizeState] = useState([]);
    const [ChildNodeV, setChildNodeV] = useState([]);
    const [ChildNodeF, setChildNodeF] = useState([]);
    const [ChildNodeN, setChildNodeN] = useState([]);
    const [CoupleGentsSize, setCoupleGentsSize] = useState([]);
    const [CoupleLadiesSize, setCoupleLadiesSize] = useState([]);
    const [option, setOption] = useState([]);
    const [tagOption, setTagOption] = useState("");
    const { digit, itemCode, setType2option, findingsResHandler, tegQuantityResHandler, sizeUomQuantityResHandler, sizeQuantityResHandler, allDataFromValidation, typeSet2ResHandler, quantityResHandler, feedShowState, stoneQualityResHandler } = props;
    const finger = feedShowState.childNodeF && "Only_FINGERRING" || "";
    const harm = feedShowState.childNodeH && "Only_HARAM" || "";
    const Tikka = feedShowState.childNodeK && "Only_TIKKA" || "";
    const other = feedShowState.childNodeO && "Only_OTHER" || "";
    const bangle = feedShowState.childNodeV && "Only_BANGLE" || "";
    const earing = feedShowState.childNodesE && "Only_EARRING" || "";
    const neckwear = feedShowState.childNodesN && "Only_NECKWEAR" || "";
    const set2tag = (digit === "0" || digit === "1" || digit === "2") ? "" : feedShowState.childNodesN && feedShowState.childNodesE && "Set2Tag";
    const set2Tag_H = (digit === "0" || digit === "1" || digit === "2") ? "" : feedShowState.childNodeH && feedShowState.childNodesE && "Set2Tag_H";
    const optionForOtherAllSet = [
        "Single_Tag",
        // "Separate_Tag",
        set2tag,
        set2Tag_H,
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
        // "Separate_Tag",
        "Only_EARRING",
        "Only_CHAIN_WITH_PENDANT",
    ];

    const optionForSet1 = [
        "Single_Tag",
        // "Separate_Tag",
        "Only_EARRING",
        "Only_NECKWEAR_OR_PENDANT",
    ];

    const tagsTCategory = [
        "Single_Tag",
        // "Separate_Tag",
        "Only_EARRING",
        "Only_MANGALSUTRA",
    ];

    useEffect(() => {
        if (digit === "0") {
            setOption(optionForSet0);
        } else if (digit === "1") {
            setOption(optionForSet1);
        } else if (digit === "T") {
            setOption(tagsTCategory);
        } else if (
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

    useEffect(() => {
        APIGetSizeDropdown(`/NPIML3/npim/size/dropdown/${itemCode}`)
            .then((res) => res).then((result) => {
                if (result.data.code === "1000") {
                    setSizeState(result.data.value);
                }
                setTagOption("");
            }).catch((error) => console.log(""));
    }, [itemCode]);

    //FETCH CHILD NODE ITEM CODE
    const childNodeV = feedShowState.childNodeV;
    const childNodeF = feedShowState.childNodeF;
    const childNodeN = feedShowState.childNodesN;

    useEffect(() => {
        if (childNodeV) {
            APIGetSizeDropdown(`/NPIML3/npim/size/dropdown/${childNodeV}`)
                .then((res) => res).then((result) => {
                    if (result.data.code === "1000") {
                        setChildNodeV(result.data.value);
                    }
                }).catch((error) => console.log(""));
        }
    }, [ChildNodeV]);

    useEffect(() => {
        if (childNodeF) {
            APIGetSizeDropdown(`/NPIML3/npim/size/dropdown/${childNodeF}`)
                .then((res) => res).then((result) => {
                    if (result.data.code === "1000") {
                        setChildNodeF(result.data.value);
                    }
                }).catch((error) => console.log(""));
        }
    }, [childNodeF]);

    useEffect(() => {
        if (childNodeN) {
            APIGetSizeDropdown(`/NPIML3/npim/size/dropdown/${childNodeN}`)
                .then((res) => res).then((result) => {
                    if (result.data.code === "1000") {
                        setChildNodeN(result.data.value);
                    }
                }).catch((error) => console.log(""));
        }
    }, [childNodeN]);

    // THIS IS FOR GENTS SIZE FETCH API
    useEffect(() => {
        APICoupleBandDropdown(`/NPIML3/npim/L3/dropdown/couple/band/${itemCode}/COUPLE%20GENTS`)
            .then((res) => res).then((result) => {
                setCoupleGentsSize(result.data.value);
            }).catch((error) => console.log(""));
    }, [itemCode]);

    // THIS IS FOR LADIES SIZE FETCH API
    useEffect(() => {
        APICoupleBandDropdown(`/NPIML3/npim/L3/dropdown/couple/band/${itemCode}/COUPLE%20LADIES`)
            .then((res) => res).then((result) => {
                setCoupleLadiesSize(result.data.value);
            }).catch((error) => console.log(""));
    }, [itemCode]);

    const findings = feedShowState.findings;
    const findingsOptions = !findings ? "" : findings.split(",");

    return (
        <React.Fragment>
            {digit === "0" || digit === "1" || digit === "2" || digit === "3" || digit === "4" || digit === "5" || digit === "6" || digit === "7" || digit === "T" ?
                <MultipleSelectTagDropdown
                    optionList={option}
                    tegQuantityResHandler={tegQuantityResHandler}
                    CategoryData={feedShowState}
                    findingsResHandler={findingsResHandler}
                    sizeQuantityResHandler={sizeQuantityResHandler}
                    typeSet2ResHandler={typeSet2ResHandler}
                    sizeUomQuantityResHandler={sizeUomQuantityResHandler}
                    findingsOptions={findingsOptions}
                    setType2option={setType2option}
                    ChildNodeF={ChildNodeF}
                    ChildNodeN={ChildNodeN}
                    ChildNodeV={ChildNodeV}
                /> : ""}

            {digit === "V" && (
                <MultipleSelecteBangle
                    optionsList={SizeState}
                    sizeUomQuantityResHandler={sizeUomQuantityResHandler}
                    CategoryData={feedShowState}
                />
            )}

            {digit === "B" || digit === "C" || digit === "R" ? (
                <MultipuleSelectSizable
                    labelName="Size/Quantity"
                    optionsList={SizeState}
                    onChangeHandler={sizeQuantityResHandler}
                    CategoryData={feedShowState}
                    tagOption={tagOption}
                />
            ) : ""}

            {digit === "D" ||
                digit === "J" ||
                digit === "H" ||
                digit === "S" ||
                digit === "P" ||
                digit === "X" ||
                digit === "O" ||
                feedShowState.category.toUpperCase() === "OTHERS" ||
                digit === "G" ||
                digit === "W" ||
                digit === "E" ||
                digit === "A" ||
                digit === "N" ||
                digit === "K" ? (
                <React.Fragment>
                    <InputFieldMaterialUI
                        onChangeHandler={quantityResHandler}
                        allDataFromValidation={allDataFromValidation}
                        CategoryData={feedShowState}
                    />
                    {feedShowState.findings && (
                        <DropDownMaterialUI
                            labelName={feedShowState.category.toUpperCase() === "CHAINS" ? "Hooks Type" : "Findings"}
                            onChangeHandler={findingsResHandler}
                            optionsList={findingsOptions}
                            CategoryData={feedShowState}
                        />
                    )}
                </React.Fragment>
            ) : null}

            {digit === "L" || feedShowState.category.toUpperCase().replace(/\s{2,}/g, " ").trim() === "TOE RING" ? (
                <MultipuleSelectSizable
                    optionsList={SizeState}
                    onChangeHandler={sizeQuantityResHandler}
                    CategoryData={feedShowState}
                />
            ) : null}

            {digit === "Y" || feedShowState.category.toUpperCase().replace(/\s{2,}/g, " ").trim() === "FINGER RING" ? (
                <React.Fragment>
                    <MultipuleSelectSizable
                        optionsList={SizeState}
                        onChangeHandler={sizeQuantityResHandler}
                        CategoryData={feedShowState}
                    />
                    {feedShowState.findings && (
                        <DropDownMaterialUI
                            labelName={feedShowState.category.toUpperCase() === "CHAINS" ? "Hooks Type" : "Findings"}
                            onChangeHandler={findingsResHandler}
                            optionsList={findingsOptions}
                            CategoryData={feedShowState}
                        />
                    )}
                </React.Fragment>
            ) : null}

            {feedShowState.category.toUpperCase().replace(/\s{2,}/g, " ") ===
                "COUPLE BAND" && (
                    <select className="w-100 p-3" value={tagOption} style={{ cursor: "pointer" }} onChange={(e) => setTagOption(e.target.value)}>
                        <option value="">Choose Tag</option>
                        <option value="Single_Tag">Single_Tag</option>
                        <option value="Separate_Tag">Separate_Tag</option>
                    </select>
                )}

            {tagOption === "Single_Tag" && (
                <MultipuleSelectSizable
                    optionsList={SizeState}
                    onChangeHandler={sizeQuantityResHandler}
                    CategoryData={feedShowState}
                />
            )}

            {tagOption === "Separate_Tag" && (
                <MultipuleSeprateTag
                    optionsListLadies={CoupleLadiesSize}
                    optionsListGenst={CoupleGentsSize}
                    onChangeHandler={sizeQuantityResHandler}
                    CategoryData={feedShowState}
                    labelName="FOR LADIES"
                />
            )}

            {feedShowState.si2Gh || feedShowState.vsGh || feedShowState.vvs1 || feedShowState.i2Gh || feedShowState.si2Ij ? (
                <StoneQualityDropdown
                    CategoryData={feedShowState}
                    stoneQualityResHandler={stoneQualityResHandler}
                />) : ""}

            {digit === "N" && (feedShowState.activity.toUpperCase() === "STUDDED" || feedShowState.activity === "" ? "" : <DropDownMaterialUI
                labelName="Type Set-2"
                onChangeHandler={typeSet2ResHandler}
                optionsList={setType2option}
                CategoryData={feedShowState}
            />)}
        </React.Fragment>
    )
}

import React, { useEffect, useState } from "react";
import "../Style/CssStyle/LowerHeaderDigital.css";
import DropdownFieldDigital from "./DropdownFieldDigital";
import SearchIcon from "@material-ui/icons/Search";
import { AppBar, Drawer, Toolbar } from "@material-ui/core";
import StatusTabular from "./StatusTabular";
import { useStyles } from "../Style/LowerHeader";
import Loading from "./Loading";
import { BsCardList } from "react-icons/bs";
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineBarChart } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { APIGetDropdownCollectionList, APIGetDropdownConsumerBaseList, APIGetDropdownITGroupList, APIGetDropdownList } from "../HostManager/CommonApiCallL3";
import StatusTabularL1L2 from "./StatusTabularL1L2";
import { L1L2Reports } from "../DataCenter/DataList";

const LowerHeaderDigital = (props) => {
    const classes = useStyles();
    const { storeCode, rsoName } = useParams();
    const navigate = useNavigate();
    const [dropValueForNeedState, setDropValueForNeedState] = useState([]);
    const [dropValueForGroupState, setDropValueForGroupState] = useState([]);
    const [dropValueForCollectionState, setDropValueForCollectionState] = useState([]);
    const [dropValueForCategoryState, setDropValueForCategoryState] = useState([]);
    const [statusCloserOpener, setStatusCloserOpener] = useState(false);
    const [loading, setLoading] = useState(false);
    const loginData = JSON.parse(sessionStorage.getItem("loginData"));
    const CartItemCode = sessionStorage.getItem("CartItemCode");

    const [dropState, setDropState] = useState({
        consumerBase: "ALL",
        collection: "ALL",
        groupData: "ALL",
        category: "ALL",
    });

    useEffect(() => {
        APIGetDropdownList(`/NPIM/base/npim/dropdown/ALL/ALL/ALL/ALL`)
            .then((response) => {
                if (response.data.code == "1000") {
                    setDropValueForCollectionState(response.data.value);
                } else {
                    setDropValueForCollectionState([])
                }
            }).catch((error) => console.log(""));
    }, [dropState.consumerBase]);

    const onchangeHandler = (event) => {
        const { name, value } = event.target;
        setDropState(function (old) {
            switch (name) {
                case "consumerBase":
                    return {
                        ...old,
                        [name]: value,
                    };
                case "collection":
                    return {
                        ...old,
                        [name]: value,
                    };
                case "groupData":
                    return {
                        ...old,
                        [name]: value,
                    };
                case "category":
                    return {
                        ...old,
                        [name]: value,
                    };
            }
        });
        if (name === "collection") {
            setLoading(true);
            APIGetDropdownCollectionList(`/NPIM/base/npim/dropdown/${value}/ALL/ALL/ALL`)
                .then(res => res).then((response) => {
                    setDropValueForNeedState(response.data.value);
                    setDropValueForGroupState([]);
                    setDropValueForCategoryState([]);
                    setDropState((old) => {
                        old.consumerBase = "ALL";
                        old.groupData = "ALL";
                        old.category = "ALL";
                        return old;
                    });
                    setLoading(false);
                }).catch(error => console.log(""));
        } else if (name === "consumerBase") {
            setLoading(true);
            APIGetDropdownConsumerBaseList(`/NPIM/base/npim/dropdown/${dropState.collection}/${value}/ALL/ALL`)
                .then((response) => {
                    setDropValueForGroupState(response.data.value);
                    setDropValueForCategoryState([]);
                    setDropState((old) => {
                        old.groupData = "ALL";
                        old.category = "ALL";
                        return old;
                    });
                    setLoading(false);
                }).catch(error => console.log(""));
        } else if (name === "groupData") {
            setLoading(true);
            setDropValueForCategoryState([]);
            APIGetDropdownITGroupList(`/NPIM/base/npim/dropdown/${dropState.collection}/${dropState.consumerBase}/${value}/ALL`)
                .then((response) => {
                    if (response.data.code === "1000") {
                        setDropValueForCategoryState(response.data.value);
                        setDropState((old) => {
                            old.category = "ALL";
                            return old;
                        });
                    } else {
                        setDropValueForCategoryState([]);
                    }
                    setLoading(false);
                }).catch(error => setLoading(false));
        }
    };

    const mySearchClickHandler = () => {
        if (props.L3) {
            props.setAllDataFromValidation({
                sizeUomQuantityRes: [],
                sizeQuantityRes: [],
                stoneQualityRes: "",
                tegQuantityRes: [],
                typeSet2Res: "",
                quantityRes: "",
                findingsRes: "",
            });
        }
        props.onSear(dropState);
    };
    const statusOpener = (event) => {
        setStatusCloserOpener(!statusCloserOpener);
    };

    const ReportsRouting = () => {
        if (loginData.role === "L1" || loginData.role === "L2") {
            navigate(`/${L1L2Reports}/${storeCode}/${rsoName}`);
        } else if (loginData.role === "L3") {
            navigate(`/NpimPortal/reportL3/${storeCode}/${rsoName}`);
        }
    }

    return (
        <React.Fragment>
            <Loading flag={loading} />
            <Drawer anchor="top" open={statusCloserOpener} onClick={statusOpener}>
                {loginData.role === "L3" ? <StatusTabular statusData={props.statusData} /> : <StatusTabularL1L2 statusData={props.statusData} />}
            </Drawer>
            <section className="lower_header_show">
                <div className={classes.root}>
                    <AppBar
                        position="static"
                        color="transparent"
                        className={classes.lowerHeader}
                    >
                        <Toolbar>
                            {loginData.role === "L1" &&
                                <div className="d-flex justify-content-between w-100">
                                    <div className="dropDownStyle">
                                        <div className="row">
                                            <div className="col">
                                                <DropdownFieldDigital
                                                    name="collection"
                                                    value={dropState.collection}
                                                    labelName="Collection"
                                                    bigSmall={true}
                                                    dropList={dropValueForCollectionState}
                                                    myChangeHandler={onchangeHandler}
                                                />
                                            </div>
                                            <div className="col">
                                                <DropdownFieldDigital
                                                    name="consumerBase"
                                                    value={dropState.consumerBase}
                                                    labelName="NeedState"
                                                    bigSmall={true}
                                                    dropList={dropValueForNeedState}
                                                    myChangeHandler={onchangeHandler}
                                                />
                                            </div>
                                            <div className="col">
                                                <DropdownFieldDigital
                                                    name="groupData"
                                                    value={dropState.groupData}
                                                    labelName="Group"
                                                    bigSmall={true}
                                                    dropList={dropValueForGroupState}
                                                    myChangeHandler={onchangeHandler}
                                                />
                                            </div>
                                            <div className="col">
                                                <DropdownFieldDigital
                                                    name="category"
                                                    value={dropState.category}
                                                    labelName="Category"
                                                    bigSmall={true}
                                                    dropList={dropValueForCategoryState}
                                                    myChangeHandler={onchangeHandler}
                                                />
                                            </div>
                                            <div className="col">
                                                <SearchIcon onClick={mySearchClickHandler} style={{ cursor: "pointer" }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        {loginData.role === "L3" && <div className="IconsStyle" onClick={() => navigate(`/NpimPortal/get/products/home/${storeCode}/${rsoName}`)}>
                                            <BiHomeAlt size={23} />
                                            <b>Home</b>
                                        </div>}
                                        <div className="IconsStyle" onClick={statusOpener}>
                                            <AiOutlineBarChart size={23} />
                                            <b>Status</b>
                                        </div>
                                        {loginData.role === "L3" && <div className="IconsStyle" onClick={() => navigate(`/NpimPortal/wishlist/${storeCode}/${rsoName}`)}>
                                            <AiOutlineHeart size={23} />
                                            <b>Wishlist</b>
                                        </div>}
                                        <div className="IconsStyle" onClick={ReportsRouting}>
                                            <BsCardList size={23} />
                                            <b>Reports</b>
                                        </div>
                                    </div>
                                </div>}
                            {loginData.role === "L3" && <div className="IconsStyle" onClick={() => {
                                if (CartItemCode) {
                                    navigate(`/NpimPortal/cart/product/L3/${storeCode}/${rsoName}`);
                                    sessionStorage.removeItem("CartItemCode");
                                } else {
                                    navigate(`/NpimPortal/get/products/home/${storeCode}/${rsoName}`);
                                }
                            }}>
                                <b>BACK</b>
                            </div>}
                        </Toolbar>
                    </AppBar>
                </div>
            </section>
        </React.Fragment>
    );
};
export default LowerHeaderDigital;

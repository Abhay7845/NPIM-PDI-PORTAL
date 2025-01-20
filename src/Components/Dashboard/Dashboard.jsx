/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import BaarChart from "./BaarChart";
import ValueCard from "./ValueCard";
import TrafficChannels from "./TrafficChannels";

const Dashboard = ({ data, storeList }) => {
    const [getStoreCode, setGetStoreCode] = useState("");
    // eslint-disable-next-line
    const [endDayReport, setEndDayReport] = useState(data);
    const [indentedData, setIndentedData] = useState(endDayReport);

    const HandelOnStoreCode = (value) => {
        setGetStoreCode(value);
        if (value === "ALL") {
            setIndentedData(data);
        } else {
            setIndentedData(endDayReport.filter(item => item.storeCode === value));
        }
    }

    function groupByNeedState(data) {
        return data.reduce((acc, item) => {
            const key = item.needState.replace(/[_\-\/\|\(\)]/g, " ").replace(/\s+/g, "").trim();
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
        }, {});
    }

    function groupByCategory(data) {
        return data.reduce((acc, item) => {
            const key = item.indCategory.replace(/[_\-\/\|\(\)]/g, " ").replace(/\s+/g, "").trim();
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
        }, {});
    }

    function groupByRegion(data) {
        return data.reduce((acc, item) => {
            const key = item.region.replace(/[_\-\/\|\(\)]/g, " ").replace(/\s+/g, "").trim();
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
        }, {});
    }

    function groupByCollection(data) {
        return data.reduce((acc, item) => {
            const key = item.collection.replace(/[_\-\/\|\(\)]/g, " ").replace(/\s+/g, "").trim();
            if (!acc[key]) acc[key] = [];
            acc[key].push(item);
            return acc;
        }, {});
    }

    function GetGroupedData(groupsData) {
        const groupTotals = {};
        for (const group in groupsData) {
            if (Array.isArray(groupsData[group])) {
                groupTotals[group] = groupsData[group].reduce((sum, item) => sum + (Number(item.totCost) || 0), 0);
            }
        }

        const NeedStateTotal = Object.entries(groupTotals).map((entry, index) => {
            const [key, value] = entry;
            return {
                id: index + 1,
                labelName: key,
                totalCost: Number(parseFloat(value / 10000000).toFixed(3)),
                valCr: Number(parseFloat(value / 10000000).toFixed(3))
            }
        });
        return NeedStateTotal;
    }

    const needStateData = GetGroupedData(groupByNeedState(indentedData));
    const categoryData = GetGroupedData(groupByCategory(indentedData));
    const collectionData = GetGroupedData(groupByCollection(indentedData));
    const regionData = GetGroupedData(groupByRegion(indentedData));

    return (
        <React.Fragment>
            <div style={{ paddingTop: "2.5%", borderRadius: "2px", borderBottom: "1.5px solid #A8BFFF", display: "flex", justifyContent: "space-between" }}>
                <h5>DASHBOARD</h5>
                {storeList.length > 0 && <select
                    style={{ width: "30%", marginBottom: "1%", padding: "7px", cursor: "pointer", borderBottom: "1px solid #A8BFFF", borderTop: "none", borderLeft: "none", borderRight: "none", outline: "none" }}
                    onChange={(e => HandelOnStoreCode(e.target.value))}
                    value={getStoreCode}
                >
                    <option value="ALL">ALL</option>
                    {storeList.map((item, i) => {
                        return <option key={i} value={item}>{item}</option>
                    })}
                </select>}
                <h6 style={{ color: "gray" }}>OVERVIEW</h6>
            </div>

            {/* <div className="row row-cols-1 row-cols-md-2 g-4 mx-0 my-4">
                <div className="col-md-3">
                    <select
                        style={{ width: "100%", padding: "7px", cursor: "pointer", borderBottom: "1px solid #A8BFFF", borderTop: "none", borderLeft: "none", borderRight: "none", outline: "none" }}
                        onChange={(e) => setReportType(e.target.value)}
                    >
                        <option value="">Select Report Type</option>
                        <option value="L3">L3</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <input type="date"
                        style={{ width: "100%", padding: "7px", borderBottom: "1px solid #A8BFFF", borderTop: "none", borderLeft: "none", borderRight: "none", outline: "none" }}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <input
                        type="date"
                        style={{ width: "100%", padding: "7px", borderBottom: "1px solid #A8BFFF", borderTop: "none", borderLeft: "none", borderRight: "none", outline: "none" }}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <button
                        style={{ border: "none", height: "100%", width: "100%", backgroundColor: "#A8BFFF" }}
                        onClick={HandelGetEndDayReports}
                    >{loading ? "Loading..." : "View Dashboard"}</button>
                </div>
            </div> */}

            {indentedData.length > 0 &&
                <React.Fragment>
                    <ValueCard data={indentedData} />
                    <div className="row row-cols-1 row-cols-md-2 g-4 mx-0 mt-1">
                        <div className="col-md-6">
                            <BaarChart data={needStateData} label="NEED STATE" />
                        </div>
                        <div className="col-md-6">
                            <BaarChart data={categoryData} label="CATEGORY" />
                        </div>
                    </div>
                    <div className="row row-cols-1 row-cols-md-2 g-4 mx-0 mt-1">
                        <div className="col-md-6">
                            <BaarChart data={regionData} label="REGION" />
                        </div>
                        <div className="col-md-6">
                            <TrafficChannels data={collectionData} label="COLLECTION" />
                        </div>
                    </div>

                    {/* <div className="row row-cols-1 row-cols-md-2 g-4 mx-0 mt-1">
                        <div className="col-md-12">
                            <BaarChart data={uniqueIndCategory}
                                label="CATEGORY"
                                dataKey="indCategory"
                            />
                        </div>
                    </div> */}

                    {/* <div className="row row-cols-1 row-cols-md-2 g-4 mx-0 mt-1">
                        <div className="col-md-6">
                            <SalesGraph data={uniqueRegion} headerName="Collection & Region" />
                        </div>
                        <div className="col-md-6">
                            <TrafficChannels data={indentedData} />
                        </div>
                    </div> */}
                </React.Fragment>}
            <br />
        </React.Fragment>
    );
};


export default Dashboard;

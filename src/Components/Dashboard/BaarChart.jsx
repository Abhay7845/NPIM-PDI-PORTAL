import React, { useRef } from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from "recharts";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { BsCloudDownload } from "react-icons/bs";

const cardStyle = {
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
};

const BaarChart = ({ data, label }) => {
    // const [showComparison, setShowComparison] = useState(false);
    const chartContainerRef = useRef(null);

    const HandleDownload = async () => {
        if (chartContainerRef.current) {
            try {
                const canvas = await html2canvas(chartContainerRef.current);
                canvas.toBlob((blob) => {
                    saveAs(blob, "Share_Percentile_NeedState.png");
                });
            } catch (error) {
                console.error("Error capturing chart:", error);
            }
        }
    };

    return (
        <div style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#f9f9f9", borderBottom: "1px solid #A8BFFF", padding: "10px" }}>
                <div className="d-flex">
                    <h4 style={{ textAlign: 'center', fontSize: '16px', fontWeight: '500' }}>{label}</h4>
                    <BsCloudDownload onClick={HandleDownload} className="mt-1 mx-3" cursor="pointer" />
                </div>
                {/* <div className="form-check form-switch">
                    <span>Last Inented Comparison</span>
                    <input className="form-check-input" type="checkbox"
                        checked={showComparison}
                        onChange={() => setShowComparison(!showComparison)}
                    />
                </div> */}
            </div>
            <div style={cardStyle} ref={chartContainerRef}>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <YAxis dataKey="valCr" />
                        <XAxis dataKey="labelName" fontSize={9} angle={-20} textAnchor="end" />
                        <RechartsTooltip />
                        <Legend />
                        <Bar dataKey="totalCost" fill="#007bff" name="Total Cost (In Cr)" />
                        {/* {showComparison && <Bar dataKey="totalCost" fill="gray" name="Total Cost (In Cr)" />} */}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BaarChart;

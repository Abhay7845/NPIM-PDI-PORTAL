import React, { useRef } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { BsCloudDownload } from "react-icons/bs";

const SalesGraph = ({ data, headerName }) => {
    const chartContainerRef = useRef(null);

    // const data = [
    //     { date: "Oct 1", sales: 0 },
    //     { date: "Oct 3", sales: 5000 },
    //     { date: "Oct 6", sales: 10000 },
    //     { date: "Oct 9", sales: 8000 },
    //     { date: "Oct 12", sales: 15000 },
    //     { date: "Oct 15", sales: 12000 },
    //     { date: "Oct 18", sales: 20000 },
    //     { date: "Oct 21", sales: 17000 },
    //     { date: "Oct 24", sales: 25000 },
    //     { date: "Oct 27", sales: 30000 },
    //     { date: "Oct 30", sales: 28000 },
    // ];

    const HandleDownload = async () => {
        if (chartContainerRef.current) {
            try {
                const canvas = await html2canvas(chartContainerRef.current);
                canvas.toBlob((blob) => {
                    saveAs(blob, `${headerName}.png`);
                });
            } catch (error) {
                console.error("Error capturing chart:", error);
            }
        }
    };

    return (
        <div style={{ backgroundColor: "#f9f9f9", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", }}
            ref={chartContainerRef}
        >
            <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#f9f9f9", borderBottom: "1px solid #A8BFFF", padding: "10px" }}>
                <h4 style={{ textAlign: 'center', fontSize: '16px', fontWeight: '500' }}>{headerName}</h4>
                {/* <div style={{ textAlign: 'center', color: '#777', fontSize: '12px', marginBottom: '10px' }}>
                    <span style={{ marginRight: '10px', fontWeight: 'bold', cursor: "pointer" }}>All</span>
                    <span style={{ fontWeight: 'bold', cursor: "pointer" }}>DIRECT</span>
                </div> */}
                <BsCloudDownload onClick={HandleDownload} className="mt-1 mx-3" cursor="pointer" />
            </div>
            <LineChart
                width={600}
                height={400}
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis dataKey="totCost" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="totCost" name="TOTAL COST" stroke="#007bff" strokeWidth={2} />
            </LineChart>
        </div>
    );
};

export default SalesGraph;
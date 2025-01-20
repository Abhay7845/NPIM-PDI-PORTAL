import React, { useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { BsCloudDownload } from "react-icons/bs";

ChartJS.register(ArcElement, Tooltip, Legend);

const cardStyle = {
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "320px",
    padding: "10px",
};

const TrafficChannelsChart = ({ data, label }) => {
    const chartContainerRef = useRef(null);
    const labelName = data.map(item => item.labelName);
    const costData = data.map(item => item.totalCost);

    const Pidata = {
        labels: labelName,
        datasets: [
            {
                data: costData, // Replace these values with your data
                backgroundColor: ['#4776E6', '#A8BFFF', '#E5E9F2'], // Colors matching the image
                hoverBackgroundColor: ['#4776E6', '#A8BFFF', '#E5E9F2'],
                borderWidth: 0, // No border for the chart
            },
        ],
    };

    const options = {
        cutout: '70%', // Creates the hollow effect in the center
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    boxWidth: 8, // Matches the small dots
                    padding: 20,
                },
            },
            tooltip: {
                enabled: true,
            },
        },
        maintainAspectRatio: false, // Allows custom size
    };

    const HandleDownload = async () => {
        if (chartContainerRef.current) {
            try {
                const canvas = await html2canvas(chartContainerRef.current);
                canvas.toBlob((blob) => {
                    saveAs(blob, "TrafficChannel.png");
                });
            } catch (error) {
                console.error("Error capturing chart:", error);
            }
        }
    };
    return (
        <div ref={chartContainerRef}>
            <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#f9f9f9", borderBottom: "1px solid #A8BFFF", padding: "10px" }}>
                <div className='d-flex'>
                    <h4 style={{ textAlign: 'center', fontSize: '16px', fontWeight: '500' }}>{label}</h4>
                    <BsCloudDownload onClick={HandleDownload} className="mt-1 mx-3" cursor="pointer" />
                </div>
                <div style={{ textAlign: 'center', color: '#777', fontSize: '12px', marginBottom: '10px' }}>
                    <span style={{ marginRight: '20px', fontWeight: 'bold', fontSize: '15px' }}>(All Values In Crore)</span>
                    <span style={{ marginRight: '10px', fontWeight: 'bold', cursor: "pointer" }}>All</span>
                    <span style={{ fontWeight: 'bold', cursor: "pointer" }}>DIRECT</span>
                </div>
            </div>
            <div style={cardStyle}>
                <Doughnut data={Pidata} options={options} />
            </div>
        </div>
    );
};

export default TrafficChannelsChart;



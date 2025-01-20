import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from "chart.js";

// Register required components for Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const ExitPercentageCard = () => {
    // Sparkline data
    const chartData = {
        labels: ["", "", "", "", "", "", ""], // Empty labels for a simple sparkline
        datasets: [
            {
                data: [20, 25, 23, 30, 28, 32, 35], // Example values for the sparkline
                borderColor: "#4A90E2",
                borderWidth: 2,
                fill: false,
                tension: 0.4, // Smooth curve
                pointRadius: 0, // Hide points
            },
        ],
    };

    // Chart options
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }, // Hide legend
            tooltip: { enabled: false }, // Disable tooltips
        },
        scales: {
            x: { display: false }, // Hide x-axis
            y: { display: false }, // Hide y-axis
        },
    };

    const cardStyle = {
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    };

    const labelStyle = {
        fontSize: "12px",
        fontWeight: "600",
        color: "#9e9e9e",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        marginBottom: "5px",
    };

    const valueStyle = {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#333",
    };

    return (
        <div style={cardStyle}>
            <div>
                <div style={labelStyle}>Exit %</div>
                <div style={valueStyle}>35.5%</div>
            </div>
            {/* <div style={{ width: "80px", height: "50px" }}>
                <Line data={chartData} options={chartOptions} />
            </div> */}
        </div>
    );
};

export default ExitPercentageCard;

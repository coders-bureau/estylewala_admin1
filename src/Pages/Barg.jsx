import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const Barg = () => {
  const [data, setData] = useState({ months: [], orderCounts: [] });

  useEffect(() => {
    // Fetch data from your backend API
    axios.get(`${process.env.REACT_APP_BASE_API}/order/last-six-months-orders`).then((response) => {
      const { months, orderCounts } = response.data;
      setData({ months, orderCounts });
    });
  }, []);
console.log(data);
  const chartData = {
    labels: data.months,
    datasets: [
      {
        label: "Number of Orders",
        data: data.orderCounts,
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Specify a background color for the bars
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Orders",
        },
      },
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
    },
  };

  return (
    <div>
      <h2>Last Six Months' Orders</h2>
      {/* <Bar data={chartData} options={chartOptions} height={400} /> */}
    </div>
  );
};

export default Barg;

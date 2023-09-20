import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { AiOutlineGateway } from 'react-icons/ai';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const OrderBarChart = () => {

    const options = {
        title: {
          text: "Basic Column Chart in React"
        },
        data: [{
          type: "column",
          dataPoints: [
            { label: "Apple",  y: 10  },
            { label: "Orange", y: 15  },
            { label: "Banana", y: 25  },
            { label: "Mango",  y: 30  },
            { label: "Grape",  y: 28  }
          ]
        }]
      }

  const [chartData, setChartData] = useState({});
console.log(chartData);
  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_API}/admin/order/chart`);
      const data = response.data.chartData;

      if (!Array.isArray(data)) {
        console.error('Invalid chart data received:', data);
        return;
      }
      console.log(data);
      const months = [];
      const chartdata =[];
    const orderCounts = [];
    data.forEach(entry => {
        if (entry.month && entry.count) {
          months.push(entry.month);
          orderCounts.push(entry.count);
          chartdata.push({label:entry.month,y:entry.count})
        }
      });
      console.log(months);
setChartData(chartdata);

    //   setChartData({
    //     labels: months,
    //     datasets: [
    //       {
    //         label: 'Number of Orders',
    //         data: orderCounts,
    //         backgroundColor: 'rgba(75, 192, 192, 0.6)', // Adjust the color as needed
    //       },
    //     ],
    //   });
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  return (
    <div>
      <h2>Order Bar Chart</h2>
      <CanvasJSChart options = {options}
          /* onRef = {ref => this.chart = ref} */
        />
    </div>
  );
};

export default OrderBarChart;

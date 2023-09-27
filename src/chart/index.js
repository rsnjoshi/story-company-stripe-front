import React, { useState, useEffect, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";

// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [12, 34],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export default function LineChart() {
  // can't use react query for. now sorry for this recursive process :(

  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);


  async function fetchData() {
    const tryAnotherFetch = () => {
      setTimeout(() => {
        fetchData();
      }, 2000);
    };

    try {
      const response = await axios.get(
        "http://localhost:4000/stripe/getTransactions"
      );

      console.log(response.data);
      setLabels(response.data.map((data, index) => index + 1))
      setData(response.data.map(data => data.amount))
      tryAnotherFetch();
    } catch (error) {
      console.error(error);
      setLabels([])
      setData([])
      tryAnotherFetch();
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const finalData = useMemo(() => {
    return {
        labels,
        datasets: [
          {
            label: "Dataset 1",
            data: data.reverse(),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
    }
  }, [labels, data])
  return <Line options={options} data={finalData} />;
}

import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement);

const BarChart = ({ creditScores, amount }) => {
  const [isLegendVisible, setIsLegendVisible] = useState(true);
  const chartRef = useRef(null);

  const roundedCreditScore = Math.round(creditScores * 100);

  const labels = ["25%", "50%", "75%", "100%", `[CS] - ${roundedCreditScore}%`];

  const data = [4 * (creditScores * amount), 2 * (creditScores * amount), 1.33 * (creditScores * amount), creditScores * amount, 1 * amount];

  const getBackgroundColor = (score) => {
    if (score === 100) {
      return "green";
    } else if (score === 75) {
      return "yellow";
    } else if (score === 50) {
      return "grey";
    } else if (score === 25) {
      return "#FF0000";
    } else {
      return "#001965";
    }
  };

  const chartData = {
    labels,
    datasets: [
      {
        data: data,
        backgroundColor: labels.map(label => getBackgroundColor(parseInt(label))),
        borderColor: "#3f51b5",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Credit Score (%)",
        },
        scaleLabel: {
          display: true,
          labelString: "Credit Score",
        },
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "Amount",
        },
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: isLegendVisible,
        labelString: "Credit score analysis",
      },
    },
  };

  const chartContainerStyle = {
    width: "75%",
    marginLeft: "20%",
    position: "absolute",
    top: "105%",
    marginTop: "100px",
  };

  useEffect(() => {
    const newData = [50 * amount, creditScores * amount, 1 * amount];
    chartData.datasets[0].data = newData;

    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [creditScores, amount, chartData.datasets]);

  return (
    <div style={chartContainerStyle}>
      <Bar ref={chartRef} data={chartData} options={options} />
      <button style={{ marginLeft: "20px", padding: "5px", color: "white", backgroundColor: "darkblue" }} onClick={() => setIsLegendVisible(!isLegendVisible)}>
        Toggle Legend
      </button>
    </div>
  );
};

export default BarChart;

import React from 'react';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Wrapper = styled.div`
  width: 33%;
  position: absolute;
  top: 68%;
  right: 3%;
  padding: 40px 20px 50px 20px;
  background-color: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
`;

const CreditScoreChart = ({ creditScores }) => {
  const result = Math.round(100 * creditScores);
  const chartData = {
    labels: ["Credit Score"],
    datasets: [
      {
        data: [result, 100 - result],
        backgroundColor: 
        result >= 70 ? ['#2ecc71', '#e74c3c'] :
        result >= 40 ? ['#2ecc71', '#e74c3c'] :
          ['#2ecc71', '#e74c3c'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 80,
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
      custom: function(tooltipModel) {
        var tooltipEl = document.getElementById('credit-score-tooltip');

        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'credit-score-tooltip';
          tooltipEl.classList.add('chartjs-tooltip');
          tooltipEl.innerHTML = '<span style="color: black;"></span>';
          document.body.appendChild(tooltipEl);
        }

        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }

        var position = this._chart.canvas.getBoundingClientRect();

        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left =
          position.left + window.pageXOffset + this._chart.width / 2 + 'px';
        tooltipEl.style.top =
          position.top + window.pageYOffset + this._chart.height / 2 + 'px';
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.querySelector('span').innerHTML =
        result.toFixed(0) + '%';
      },
    },
    backgroundColor: ['#ffffff'],
  };

  return (
    <Wrapper>
      <Doughnut data={chartData} options={chartOptions} />
    </Wrapper>
  );
};

export default CreditScoreChart;
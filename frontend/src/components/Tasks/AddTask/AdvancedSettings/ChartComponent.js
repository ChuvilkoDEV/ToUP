import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import dragDataPlugin from 'chartjs-plugin-dragdata';

Chart.register(dragDataPlugin);

const ChartComponent = ({taskData, handleTaskDataChange}) => {
  const chartRef = useRef(null);

  const createChartData = () => {
    return {
    labels: Array.from({ length: taskData.countIntervals }, (_, i) => i.toString()),
    datasets: [
      {
        label: 'Bots',
        data: taskData.behavior,
        borderColor: 'rgba(45,142,255,1)',
        borderWidth: 3,
        pointBackgroundColor: 'white',
        pointRadius: 10,
        pointHoverRadius: 10,
        fill: true,
      },
    ],
  }};

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, chart.chartArea.bottom);
      gradient.addColorStop(0, 'rgba(45,142,255,1)');
      gradient.addColorStop(1, 'rgba(45,142,255,0)');
      chart.data.datasets[0].backgroundColor = gradient;
      chart.data.datasets[0].data = taskData.behavior;
      chart.data.labels = Array.from({ length: taskData.countIntervals }, (_, i) => i.toString());
      chart.update();
    }
  }, [taskData.behavior, taskData.countIntervals]);

  const updateBehavior = (behavior) => {
    const percentageRatio = [];
    const sum = behavior.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    behavior.forEach((value) => percentageRatio.push(taskData.count_actions * (value / sum)));

    let overflow = 0;
    for (let i = 0; i < percentageRatio.length; i++) {
      overflow += percentageRatio[i] % 1;
      percentageRatio[i] = Math.floor(percentageRatio[i]);
      if (overflow >= 1) {
        percentageRatio[i] += 1;
        overflow -= 1;
      }
    }
    return percentageRatio;
  };

  const handleDragEnd = (e, datasetIndex, index, value) => {
    const currentData = [...chartRef.current.data.datasets[0].data];
    currentData[index] = value;
    const newBehavior = updateBehavior(currentData);
    handleTaskDataChange({ behavior: newBehavior });
    chartRef.current.data.datasets[0].data = newBehavior;

    const maxValue = Math.max(...newBehavior);
    const chartInstance = chartRef.current;
    if (chartInstance) {
      chartInstance.options.scales.y.min = 0;
      chartInstance.options.scales.y.max = maxValue * 1.3;
      chartInstance.update('none');
    }
  };

  return (
    <Line
      ref={chartRef}
      data={createChartData()}
      options={{
        animation: false,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: Math.max(...taskData.behavior) * 1.3,
            max: Math.max(...taskData.behavior) * 1.3,
            grid: {
              display: false,
            },
            stepSize: 1,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => ` ${context.raw}`,
            },
          },
          dragData: {
            round: 1,
            showTooltip: true,
            onDragEnd: handleDragEnd,
          },
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
      }}
    />
  );
};

export default ChartComponent;
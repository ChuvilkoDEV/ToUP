import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import dragDataPlugin from 'chartjs-plugin-dragdata';

Chart.register(dragDataPlugin);

const ChartComponent = ({ taskData, handleTaskDataChange }) => {
  const chartRef = useRef(null);

  const createChartData = () => ({
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
  });

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, chart.chartArea.bottom);
      gradient.addColorStop(0, 'rgba(45,142,255,1)');
      gradient.addColorStop(1, 'rgba(45,142,255,0)');
      chart.data.datasets[0].backgroundColor = gradient;
      chart.data.datasets[0].data = taskData.behavior;
      chart.update();
    }
  }, [taskData.behavior]);

  const handleDragEnd = (e, datasetIndex, index, value) => {
    const newBehavior = [...chartRef.current.data.datasets[0].data];
    handleTaskDataChange({ behavior: newBehavior });

    const maxValue = Math.max(...newBehavior);
    const chartInstance = chartRef.current;
    if (chartInstance) {
      debugger
      Chart.defaults.scales.linear.min = 0;
      Chart.defaults.scales.linear.max = maxValue * 1.2;

      // chartInstance.options.scales.y.suggestedMax = maxValue * 1.2;
      // chartInstance.options.scales.y.suggestedMin = 0;
      chartInstance.update();
    }
  };

  return (
    <Line
      ref={chartRef}
      data={createChartData()}
      options={{
        scales: {
          y: {
            beginAtZero: true,
            // min: 0,
            // max: 100,
            suggestedMin: 0,
            suggestedMax: 100

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

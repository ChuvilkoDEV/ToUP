import React, { useRef, useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import dragDataPlugin from 'chartjs-plugin-dragdata';

Chart.register(dragDataPlugin);

const ChartComponent = ({ countIntervals }) => {
  const chartRef = useRef(null);
  const [data, setDataState] = useState({
    labels: Array.from({ length: countIntervals }, (_, i) => i.toString()),
    datasets: [
      {
        label: 'Bots',
        data: Array.from({ length: countIntervals }, (_, i) => 50),
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
    setDataState({
      labels: Array.from({ length: countIntervals }, (_, i) => i.toString()),
      datasets: [
        {
          label: 'Bots',
          data: Array.from({ length: countIntervals }, (_, i) => 50),
          borderColor: 'rgba(45,142,255,1)',
          borderWidth: 3,
          pointBackgroundColor: 'white',
          pointRadius: 10,
          pointHoverRadius: 10,
          fill: true,
        },
      ],
    });
  }, [countIntervals]);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, chart.chartArea.bottom);
      gradient.addColorStop(0, 'rgba(45,142,255,1)');
      gradient.addColorStop(1, 'rgba(45,142,255,0)');
      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
    }
  }, [data]);

  const handleDragEnd = (e, datasetIndex, index, value) => {
    const newData = { ...data };
    newData.datasets[datasetIndex].data[index] = value;
    setDataState(newData);

    const chartInstance = chartRef.current;
    if (chartInstance) {
      chartInstance.options.scales.y.max = 100;
      chartInstance.options.scales.y.min = 0;
      chartInstance.update();
    }
  };

  return (
    <Line
      ref={chartRef}
      data={data}
      options={{
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: 100,
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

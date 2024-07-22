import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import dragDataPlugin from 'chartjs-plugin-dragdata';

Chart.register(dragDataPlugin);

const ChartComponent = ({ bots }) => {
  const chartRef = useRef(null);
  const [data, setDataState] = useState({
    labels: Array.from({ length: 24 }, (_, i) => i.toString()),
    datasets: [
      {
        label: 'Bots',
        data: Array(24).fill(bots / 24), // Создает массив из 24 равных частей
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        pointBackgroundColor: 'white',
        pointRadius: 10,
        pointHoverRadius: 10,
      },
    ],
  });

  useEffect(() => {
    const chart = chartRef.current?.chartInstance;
    if (chart) {
      chart.options.plugins.dragData = {
        onDragEnd: (e, datasetIndex, index, value) => {
          const roundedValue = Math.round(value);
          const newData = [...data.datasets[0].data];
          newData[index] = roundedValue;
          setDataState((prevData) => ({
            ...prevData,
            datasets: [
              {
                ...prevData.datasets[0],
                data: newData,
              },
            ],
          }));
        },
        round: 1,
        showTooltip: true,
      };
      chart.update();
    }
  }, [data]);

  return (
    <Line
      ref={chartRef}
      data={data}
      options={{
        scales: {
          y: {
            beginAtZero: true,
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

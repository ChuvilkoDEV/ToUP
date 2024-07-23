import React, { useRef, useState } from 'react';
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
        data: Array.from({ length: 24 }, (_, i) => i),
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        pointBackgroundColor: 'white',
        pointRadius: 10,
        pointHoverRadius: 10,
      },
    ],
  });

  const handleDragEnd = (e, datasetIndex, index, value) => {
    console.log(`Точка перемещена: datasetIndex=${datasetIndex}, index=${index}, value=${value}`);

    // Обновление данных в состоянии
    const newData = { ...data };
    newData.datasets[datasetIndex].data[index] = value;
    setDataState(newData);

    // Обновление максимального значения оси y
    const chartInstance = chartRef.current;
    console.log(chartInstance)
    if (chartInstance) {
      chartInstance.options.scales.y.max = 100; // Пример фиксированного максимального значения
      chartInstance.options.scales.y.min = 0;   // Пример фиксированного минимального значения
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
            min: 0,  // Задайте минимальное значение
            max: 100 // Задайте максимальное значение
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

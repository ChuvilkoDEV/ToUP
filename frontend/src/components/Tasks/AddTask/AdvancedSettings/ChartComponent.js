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
        data: Array.from({ length: 24 }, (_, i) => i * i),
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        pointBackgroundColor: 'white',
        pointRadius: 10,
        pointHoverRadius: 10,
      },
    ],
  });

  const updateYAxisMax = (chart, newData) => {
    const maxValue = Math.max(...newData);
    const yAxisMax = maxValue * 1.2;
    console.log(yAxisMax);
    chart.options.scales.y.max = yAxisMax;
    chart.update();
  };

  useEffect(() => {
    const chart = chartRef.current?.chartInstance;
    if (chart) {
      chart.options.plugins.dragData = {
        onDragEnd: (e, datasetIndex, index, value) => {
          const boundedValue = Math.max(0, Math.min(100, Math.round(value)));
          const newData = [...data.datasets[0].data];
          newData[index] = boundedValue;
          console.log(1);
          setDataState((prevData) => ({
            ...prevData,
            datasets: [
              {
                ...prevData.datasets[0],
                data: newData,
              },
            ],
          }));
          updateYAxisMax(chart, newData);
        },
        round: 1,
        showTooltip: true,
      };
      chart.update();
    }
  }, [data]);

  useEffect(() => {
    const chart = chartRef.current?.chartInstance;
    if (chart) {
      updateYAxisMax(chart, data.datasets[0].data);
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

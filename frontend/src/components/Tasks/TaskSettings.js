import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import dragDataPlugin from 'chartjs-plugin-dragdata';
import InputField from '../shared/InputField';
import './TaskSettings.css'

import ImageUtils from '../imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/tasks', false, /\.(svg)$/));

Chart.register(dragDataPlugin);

const TaskSettings = ({ handleTaskSettingMenu }) => {
  const chartRef = useRef(null);
  const [timeUnit, setTimeUnit] = useState('Дни');
  const [interval, setInterval] = useState('');

  const handleTimeUnitChange = (e) => {
    setTimeUnit(e.target.value);
  };

  const handleIntervalChange = (e) => {
    setInterval(e.target.value);
  };

  const [data, setData] = useState({
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: 'Dataset 1',
        data: [300, 400, 450, 500, 300, 200, 400, 600, 700, 800, 600, 500, 700, 800, 600, 400, 500, 600, 700, 800, 700, 600, 500, 400],
        borderColor: 'blue',
        fill: true,
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        round: 1,
      },
    ],
  });

  useEffect(() => {
    const chart = chartRef.current?.chartInstance;
    if (chart) {
      chart.options.plugins.dragData = {
        onDragEnd: (e, datasetIndex, index, value) => {
          const newData = [...data.datasets[0].data];
          newData[index] = value;
          setData((prevData) => ({
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
  }, []);

  return (
    <div className="task-settings">
      <div className='task-setting-back-btn' onClick={handleTaskSettingMenu}>
        <svg width="12" height="10" viewBox="0 0 12 10" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.8333 4.16659H2.5L5.24167 1.42493C5.31977 1.34746 5.38177 1.25529 5.42408 1.15374C5.46638 1.05219 5.48817 0.943271 5.48817 0.833261C5.48817 0.723251 5.46638 0.61433 5.42408 0.512781C5.38177 0.411231 5.31977 0.319064 5.24167 0.241595C5.08553 0.0863855 4.87432 -0.000732422 4.65417 -0.000732422C4.43401 -0.000732422 4.2228 0.0863855 4.06667 0.241595L0.491667 3.82493C0.178677 4.13605 0.00186066 4.55861 0 4.99993C0.00405549 5.43835 0.180704 5.85751 0.491667 6.16659L4.06667 9.74993C4.14437 9.82708 4.2365 9.88817 4.33781 9.92972C4.43912 9.97126 4.54762 9.99245 4.65711 9.99206C4.76661 9.99167 4.87496 9.96972 4.97597 9.92746C5.07698 9.8852 5.16868 9.82346 5.24583 9.74576C5.32299 9.66806 5.38408 9.57593 5.42562 9.47462C5.46717 9.37331 5.48835 9.26481 5.48796 9.15531C5.48758 9.04582 5.46563 8.93747 5.42337 8.83646C5.38111 8.73545 5.31937 8.64375 5.24167 8.5666L2.5 5.83326H10.8333C11.0543 5.83326 11.2663 5.74546 11.4226 5.58918C11.5789 5.4329 11.6667 5.22094 11.6667 4.99993C11.6667 4.77891 11.5789 4.56695 11.4226 4.41067C11.2663 4.25439 11.0543 4.16659 10.8333 4.16659Z" />
        </svg>
      </div>
      <div className="task-settings-header">
        <h3>Продвинутые настройки задачи</h3>
      </div>
      <div className="task-settings-fields">
        <InputField
          label="Время на выполнение"
          type="select-input"
          placeholder="Выберите..."
          logo={images['todo.svg']}
          value={timeUnit}
          onChange={handleTimeUnitChange}
          options={[
            { label: 'Часы', value: 'hours' },
            { label: 'Дни', value: 'days' },
            { label: 'Недели', value: 'weeks' },
          ]}
        />
        <InputField
          label="Интервал"
          type="select"
          placeholder="Выберите..."
          logo={images['todo.svg']}
          value={timeUnit}
          onChange={handleTimeUnitChange}
          options={[
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
          ]}
        />
      </div>
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
      <div className="task-settings-footer">
        <button className="reset-button">Сбросить настройки</button>
        <button className="save-button">Сохранить изменения</button>
      </div>
    </div>
  );
};

export default TaskSettings;

import React, { Component } from 'react';
import axios from 'axios';
import BlueRectangle from './BlueRectangle';
import TaskForm from './TaskForm';
import './TaskWindow.css';
import TaskSettings from './AdvancedSettings/TaskSettings';

import { HandySvg } from 'handy-svg';
import ImageUtils from '@components/imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/tasks', false, /\.(svg)$/));

class TaskWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTaskSettingOpen: false,
      isError: false,
      errorMessage: '',
      taskData: this.TaskDataConstructor(),
    };
  }

  errorMessages = {
    'react': 'Вы должны выбрать хотя бы одну реакцию',
    'subs': 'Идентификатор канала должен содержать только цифры',
    'link': 'Введена неверная ссылка',
    'count_actions': 'Количество действий не может быть меньше 1',
    'behavior': 'Введен неверный график',
    'interval': 'Введен некорректный интервал',
    'time': 'Введено некорректное время',
    'unknown': "Неизвестная ошибка",
  };

  ErrorsConstructor = () => ({
    subs: false,
    link: false,
    spread: false,
    count_actions: false,
    interval: false,
    time: false,
  })

  TaskDataConstructor = () => ({
    task_type: 'subs',
    target_url: '',
    count_actions: 0,
    task_obj: [],
    task_time: 86400,
    time: 1,
    timeUnit: 'days',
    countIntervals: 5,
    behavior: Array.from({ length: 5 }, () => 0),
    bot_group: '',
    errors: this.ErrorsConstructor(),
  });

  handleCloseError = () => {
    this.setState({ isError: false });
    this.handleTaskDataChange({ errors: this.ErrorsConstructor() });
  };

  handleTaskDataChange = (newData) => {
    this.setState((prevState) => {
      const updatedData = {
        ...prevState.taskData,
        ...newData,
      };

      // Если изменяется countIntervals, сбросить и перестроить поведение
      if (newData.countIntervals !== undefined) {
        const averageCount = 0;
        if (newData.countIntervals !== 0)
          averageCount = this.state.taskData.count_actions / newData.countIntervals;
        updatedData.behavior = Array.from({ length: newData.countIntervals }, () => averageCount);
      } else if (newData.countIntervals !== undefined){
        const averageCount = 0;
        if (this.state.taskData.countIntervals !== 0)
          averageCount = newData.count_actions / this.state.taskData.countIntervals
        updatedData.behavior = Array.from({ length: newData.countIntervals }, () => averageCount);
      }

      return { taskData: updatedData };
    });
  };

  handleTaskSettingMenu = () => {
    this.setState((prevState) => ({ isTaskSettingOpen: !prevState.isTaskSettingOpen }));
  };

  errorHandler = (msg) => {
    let key = '';
    switch (msg) {
      case "You dount have reaction in task":
        key = 'react';
        break;
      case "Bad channel id":
        key = 'subs';
        break;
      case "Bad target url":
        key = 'link';
        break;
      case "The number of executions cannot be less than 1":
        key = 'count_actions';
        break;
      case "Bad behavior":
        key = 'behavior';
        break;
      default:
        key = 'unknown';
        break;
    }

    this.setState({
      isError: true,
      errorMessage: this.errorMessages[key],
    });
    let newErrors = this.ErrorsConstructor();
    newErrors[key] = true;
    this.handleTaskDataChange({ errors: newErrors });
  };


  handleBehaviour = () => {
    let overflow = 0;
    const countBotsPerInterval = (sumPercentage, index) => {
      let botsToInterval = parseInt(this.state.taskData.count_actions, 10) * (this.state.taskData.behavior[index] / sumPercentage);
      overflow += botsToInterval % 1;
      botsToInterval = Math.floor(botsToInterval)
      if (overflow >= 1) {
        botsToInterval += 1;
        overflow -= 1;
      }
      return botsToInterval;
    };

    const timeToInterval = Math.round(this.state.taskData.task_time / this.state.taskData.countIntervals * 1000);
    const now = Date.now();
    const ans = [[now, this.state.taskData.behavior[0]]];
    for (let i = 1; i < this.state.taskData.countIntervals; i++) {
      ans.push([ans[i - 1][0] + timeToInterval, this.state.taskData.behavior[i]]);
    }
    ans[ans.length - 1][1] += this.state.taskData.count_actions % this.state.taskData.countIntervals;
    return ans;
  };

  sendTasksToServer = async () => {
    try {
      const formattedData = {
        token: localStorage.getItem('token'),
        data: [
          {
            task_type: this.state.taskData.task_type,
            target_url: this.state.taskData.target_url,
            count_actions: parseInt(this.state.taskData.count_actions),
            task_obj: this.state.taskData.task_obj,
            task_time: parseInt(this.state.taskData.task_time),
            behavior: this.handleBehaviour(),
            channel_id: '7777777777',
          },
        ],
      };

      const response = await axios.post('http://147.45.111.226:8001/api/addtask', formattedData);
      if (response.data.status) {
        this.setState({ taskData: this.TaskDataConstructor() });
        this.props.handleClose();
      } else {
        this.errorHandler(response.data.msg);
      }
    } catch (error) {
      console.error('Ошибка при отправке задач:', error);
    }
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleMouseDown);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleMouseDown);
  }

  handleMouseDown = (e) => {
    if (!e.target.closest('.task-window')) {
      this.props.handleClose();
    }
  };

  render() {
    return (
      <div className="task-window-overlay">
        <div className="task-window">
          <div className="task-content">
            {this.state.isTaskSettingOpen ? (
              <TaskSettings
                taskData={this.state.taskData}
                handleTaskDataChange={this.handleTaskDataChange}
                handleTaskSettingMenu={this.handleTaskSettingMenu}
              />
            ) : (
              <>
                <TaskForm
                  handleTaskSettingMenu={this.handleTaskSettingMenu}
                  taskData={this.state.taskData}
                  handleTaskDataChange={this.handleTaskDataChange}
                  sendTasksToServer={this.sendTasksToServer}
                />
                <BlueRectangle />
              </>
            )}
          </div>
          {this.state.isError &&
            <div className='error-msg-container'>
              <div className='error-msg-content'>
                <HandySvg src={images['error.svg']} className={`logo-15x15 mr-5`} />
                <b className='mr-5'>Ошибка: </b>
                {this.state.errorMessage}
              </div>
              <HandySvg src={images['errorClose.svg']} className={`error-msg-close mr-5`} onClick={this.handleCloseError} />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default TaskWindow;

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
      isError: true,
      errorMessage: 'Проверка',
      taskData: this.TaskDataConstructor(),
    };
  }

  errorMessages = {
    'react': 'Вы должны выбрать хотя бы одну реакцию',
    'subs': 'Идентификатор канала должен содержать только цифры',
    'link': 'Введена неверная ссылка',
    'count': 'Количество действий не может быть меньше 1',
    'behavior': 'Введен неверный график',
  };

  ErrorsConstructor = () => ({
    spread: false,
    count_actions: false,
    link: false,
    interval: false,
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
    behavior: Array.from({ length: 5 }, () => 50),
    bot_group: '',
    errors: this.ErrorsConstructor(),
  });

  handleCloseError = () => {
    this.setState({ isError: false });
    this.handleTaskDataChange({ errors: this.ErrorsConstructor() });
  };

  handleTaskDataChange = (newData) => {
    this.setState((prevState) => ({
      taskData: {
        ...prevState.taskData,
        ...newData,
      },
    }));
  };

  handleTaskSettingMenu = () => {
    this.setState((prevState) => ({ isTaskSettingOpen: !prevState.isTaskSettingOpen }));
  };

  errorHandler = (msg) => {
    let newErrors = this.ErrorsConstructor();
    
    switch(msg) {
      case "You don't have reaction in task":
        this.setState({
          isError: true,
          errorMessage: this.errorMessages['react'],
        });
        break;
      case "Bad target url":
        newErrors['link'] = true; 
        this.setState({
          isError: true,
          errorMessage: this.errorMessages['link'],
        });
        break;
      default:
        this.setState({
          isError: true,
          errorMessage: this.errorMessages[msg] || 'Неизвестная ошибка',
        });
        break;
    }
  
    // Обновляем taskData.errors
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
    const sumPercentage = this.state.taskData.behavior.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const now = Date.now();
    const ans = [[now, countBotsPerInterval(sumPercentage, 0)]];
    for (let i = 1; i < this.state.taskData.countIntervals; i++) {
      ans.push([ans[i - 1][0] + timeToInterval, countBotsPerInterval(sumPercentage, i)]);
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
      debugger;
      if (response.data.status) {
        this.setState({ taskData: this.TaskDataConstructor() });
        this.props.handleClose();
      } else {
        this.errorHandler(response.msg);
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

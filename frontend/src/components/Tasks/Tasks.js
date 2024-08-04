import React, { Component } from 'react';
import axios from 'axios';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import TaskCard from './TaskCard';
import TaskWindow from './AddTask/TaskWindow';
import { AuthContext } from '../../context/AuthContext';
import './Tasks.css';

import ImageUtils from '../imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/tasks', false, /\.(svg)$/));

class Tasks extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      isTaskWindowOpen: false,
      tasks: [], // Инициализируем пустым массивом
    };
  }

  componentDidMount() {
    this.fetchTasks(0, 15);
  }

  fetchTasks = async (offset, limit) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://147.45.111.226:8001/api/gettask', {
        token: token,
        offset: offset,
        limit: limit,
      });
      if (response.data.status === false) {
        this.context.logout();
      } else {
        this.setState({ tasks: response.data.data || [] });
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  handleOpenTaskWindow = () => {
    this.setState({ isTaskWindowOpen: true });
  };

  handleCloseTaskWindow = () => {
    this.setState({ isTaskWindowOpen: false });
  };

  TasksTitle = () => (
    <div className='tasks-title'>
      <h1>Все задачи</h1>
      <div className='tasks-buttons'>
        <button className='px-5'>Сортировать</button>
        <button onClick={this.handleOpenTaskWindow}>
          <img src={images['add.svg']} alt="Добавить задачу" />
        </button>
      </div>
    </div>
  );

  TasksCards = () => (
    <div className="tasks-grid">
      {this.state.tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );

  render() {
    return (
      <>
        <Header />
        <div className="tasks">
          <this.TasksTitle />
          <this.TasksCards />
          {this.state.isTaskWindowOpen && <TaskWindow handleClose={this.handleCloseTaskWindow} />}
        </div>
        <Footer />
      </>
    );
  }
}

export default Tasks;

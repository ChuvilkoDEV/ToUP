import React, { Component } from 'react';
import axios from 'axios';
import InputField from '@components/shared/InputField';
import DropzoneField from '@components/shared/DropzoneField';
import './SessionWindow.css';

import ImageUtils from '@components/imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/admin/sessions', false, /\.(svg)$/));

class SessionWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      group: '',
      accountID: '',
      proxyFile: [],
      proxies: [],
      sessions: [],
      showProgress: false,
      uploaded: 0,
      successful: 0,
      errors: 0,
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleAddSessions = this.handleAddSessions.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleMouseDown);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleMouseDown);
  }

  handleMouseDown(e) {
    if (!e.target.closest('.session-window')) {
      this.props.handleClose();
    }
  }

  handleChange = (field) => (e) => {
    this.setState({ [field]: e.target.value });
  };

  handleProxyFileChange = (e) => {
    this.setState({ proxyFile: e.target.files });
  }

  handleProxiesUpload = () => {
    return new Promise((resolve, reject) => {
      const proxyFile = this.state.proxyFile;
      if (proxyFile.length === 0) {
        resolve([]);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const proxies = event.target.result.split('\n').filter(Boolean);
        this.setState({ proxies }, resolve);
      };
      reader.onerror = reject;
      reader.readAsText(proxyFile[0]);
    });
  }

  async handleAddSessions() {
    await this.handleProxiesUpload();
    const { group, proxies, sessions } = this.state;
    const token = localStorage.getItem('token');
    const category = '1';
    console.log(proxies ? true : false);
    console.log(proxies);

    this.setState({ showProgress: true, uploaded: 0, successful: 0, errors: 0 });

    for (let i = 0; i < sessions.length; i++) {
      const formData = new FormData();
      formData.append('token', token);
      formData.append('file', sessions[i]);
      formData.append('proxy', proxies.length ? proxies[Math.floor(i / 5)] : "-");
      formData.append('group', group);
      formData.append('category', category);

      try {
        const response = await axios.post('http://147.45.111.226:8001/api/uploadSessions', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Response:', response);
        this.setState((prevState) => ({
          uploaded: prevState.uploaded + 1,
          successful: prevState.successful + 1,
        }));
      } catch (error) {
        console.error('Error uploading session:', error);
        this.setState((prevState) => ({
          uploaded: prevState.uploaded + 1,
          errors: prevState.errors + 1,
        }));
      }
    }
  }


  render() {
    const { company, group, accountID, proxyFile, sessions, showProgress, uploaded, successful, errors } = this.state;

    return (
      <div className='session-window-overlay'>
        <div className='session-window'>
          <div className='session-form-container'>
            <span className='session-window-title'>Добавить сессии</span>
            <InputField
              label="Компания"
              type="text"
              placeholder="Введите название компании"
              logo={images['company.svg']}
              value={company}
              handleChange={this.handleChange('company')}
            />
            <InputField
              label="Группа"
              type="text"
              placeholder="Выберите группу"
              logo={images['group.svg']}
              value={group}
              handleChange={this.handleChange('group')}
            />
            <DropzoneField
              files={proxyFile}
              setFiles={(files) => this.setState({ proxyFile: files })}
              text="прокси (*.txt)"
              allowedExtensions={['txt']}
            />
            <DropzoneField
              files={sessions}
              setFiles={(files) => this.setState({ sessions: files })}
              text="сессий (*.session)"
              allowedExtensions={['session']}
              maxFiles={1000}
            />
            <button className='add-session-button' onClick={this.handleAddSessions}>Добавить</button>
          </div>
          <div className='session-window-divider' />
          <div className='session-form-container'>
            <span className='session-window-title'>Удалить сессию</span>
            <InputField
              label="Account ID"
              type="text"
              placeholder="Введите ID аккаунта"
              logo={images['user.svg']}
              value={accountID}
              handleChange={this.handleChange('accountID')}
            />
            <button className='delete-session-button'>Удалить</button>
          </div>
        </div>
        {showProgress && (
          <div className='progress-overlay'>
            <div className='progress-window'>
              <span>Загружено: {uploaded}/{sessions.length}</span><br />
              <span>Успешно: {successful}</span><br />
              <span>Ошибка: {errors}</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SessionWindow;

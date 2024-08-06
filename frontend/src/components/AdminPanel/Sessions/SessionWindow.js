import React, { Component } from 'react';
import axios from 'axios';
import InputField from '@components/shared/InputField';
import DropzoneField from '@components/shared/DropzoneField';
import './SessionWindow.css';

import ImageUtils from '@components/imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/admin', false, /\.(svg)$/));

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
    this.setState({ proxyFile: e.target.files[0] });
  }

  handleProxiesUpload() {
    debugger;
    const file = this.state.proxyFile[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      debugger;
      const text = event.target.result;
      const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
      this.setState({ proxies: lines });
    };
    reader.readAsText(file);
  }

  async handleAddSessions() {
    this.handleProxiesUpload();
    const { group, proxies, sessions } = this.state;
    const token = localStorage.getItem('token');
    const category = '1';

    for (let i = 0; i < sessions.length; i++) {
      const formData = {
        token: token,
        file: sessions[i],
        proxy: proxies[Math.floor(i / 5)],
        group: group,
        category: category,
      };

      try {
        const response = await axios.post('http://147.45.111.226:8001/api/uploadSessions', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }

  render() {
    const { company, group, accountID, proxyFile, sessions } = this.state;

    return (
      <div className='session-window-overlay'>
        <div className='session-window'>
          <div className='session-form-container'>
            <span className='session-window-title'>Добавить сессии</span>
            <InputField
              label="Компания"
              type="text"
              placeholder="Введите название компании"
              logo={images['link.svg']}
              value={company}
              handleChange={this.handleChange('company')}
            />
            <InputField
              label="Группа"
              type="text"
              placeholder="Выберите группу"
              logo={images['link.svg']}
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
          <div className='session-form-container'>
            <span className='session-window-title'>Удалить сессию</span>
            <InputField
              label="Account ID"
              type="text"
              placeholder="Введите ID аккаунта"
              logo={images['link.svg']}
              value={accountID}
              handleChange={this.handleChange('accountID')}
            />
            <button className='delete-session-button'>Удалить</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SessionWindow;

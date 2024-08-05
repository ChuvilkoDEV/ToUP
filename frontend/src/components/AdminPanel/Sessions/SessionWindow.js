import React, { Component } from 'react';
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
      proxies: [],
      sessions: [],
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
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

  render() {
    const { company, group, accountID, proxies, sessions } = this.state;

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
              files={proxies}
              setFiles={(files) => this.setState({ proxies: files })}
              text="прокси (*.txt)"
            />
            <DropzoneField
              files={sessions}
              setFiles={(files) => this.setState({ sessions: files })}
              text="сессий (*.session)"
            />
            <button className='add-session-button'>Добавить</button>
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

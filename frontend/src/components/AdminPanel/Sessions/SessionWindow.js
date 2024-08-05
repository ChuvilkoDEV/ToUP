import React, { useState } from 'react';
import InputField from '@components/shared/InputField';
import './SessionWindow.css';
import { HandySvg } from 'handy-svg';
import ImageUtils from '@components/imageUtils';
import { useDropzone } from 'react-dropzone';

const images = ImageUtils.importAllImages(require.context('@assets/admin', false, /\.(svg)$/));

export default function AddSession() {
  const [company, setCompany] = useState('');
  const [group, setGroup] = useState('');
  const [accountID, setAccountID] = useState('');
  const [files, setFiles] = useState([]);

  const onDrop = acceptedFiles => {
    setFiles([...files, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className='session-window-overlay'>
      <div className='session-window'>
        <div className='session-form-container'>
          <span className='session-window-title'>Добавить сессии</span>
          <InputField
            label="Компания" type="text" placeholder="Введите название компании"
            logo={images['link.svg']}
            value={company || ''}
            handleChange={(e) => setCompany(e.target.value)}
          />
          <InputField
            label="Группа" type="text" placeholder="Выберите группу"
            logo={images['link.svg']}
            value={group || ''}
            handleChange={(e) => setGroup(e.target.value)}
          />
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Перетащите файлы сюда...</p>
            ) : (
              <p>Перетащите файлы сюда или нажмите, чтобы выбрать файлы</p>
            )}
          </div>
          <div>
            {files.map(file => (
              <div key={file.name}>{file.name}</div>
            ))}
          </div>
          <button className='add-session-button'>Добавить</button>
        </div>
        <div className='session-form-container'>
          <span className='session-window-title'>Удалить сессию</span>
          <InputField
            label="Account ID" type="text" placeholder="Введите ID аккаунта"
            logo={images['link.svg']}
            value={accountID || ''}
            handleChange={(e) => setAccountID(e.target.value)}
          />
          <button className='delete-session-button'>Удалить</button>
        </div>
      </div>
    </div>
  );
}

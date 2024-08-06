import React from 'react';
import { useDropzone } from 'react-dropzone';
import './DropzoneField.css';

import ImageUtils from '@components/imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/admin', false, /\.(svg)$/));

export default function DropzoneField({ files, setFiles, text, allowedExtensions=[], maxFiles=1 }) {
  const onDrop = acceptedFiles => {
    // Фильтрация файлов по разрешенным расширениям
    const filteredFiles = acceptedFiles.filter(file => {
      const extension = file.name.split('.').pop().toLowerCase();
      return allowedExtensions.includes(extension);
    });

    // Проверка на превышение максимального количества файлов
    if (files.length + filteredFiles.length > maxFiles) {
      // Оставляем только последний загруженный файл
      const lastFile = filteredFiles[filteredFiles.length - 1];
      setFiles([...files.slice(0, maxFiles - 1), lastFile]);
    } else {
      setFiles([...files, ...filteredFiles]);
    }
  };

  const removeFile = fileName => {
    setFiles(files.filter(file => file.name !== fileName));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <span>Перетащите файлы сюда...</span>
        ) : (
          files.length ?
            <div className="file-list">
              {files.map(file => (
                <div key={file.name} className="file-item">
                  <div className='file-item-info'>
                    <div className='file-item-logo'>
                      <img src={images['document.svg']} className='logo-15x15' />
                    </div>
                    <div className='file-item-property'>
                      <span className='file-item-name'>{file.name}</span><br />
                      <span className='file-item-weight'>{file.size} байт</span>
                    </div>
                  </div>
                  <img src={images['remove.svg']} onClick={() => removeFile(file.name)} />
                </div>
              ))}
            </div>
            :
            <span>Перетащите файлы сюда или нажмите, чтобы выбрать файлы <span className='blue-text'>{text}</span>
            </span>
        )}
      </div>
    </>
  );
}
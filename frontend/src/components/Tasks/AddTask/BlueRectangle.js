import React from 'react'
import './BlueRectangle.css'

import ImageUtils from '../../imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/tasks', false, /\.(svg)$/));


export default function BlueRectangle() {
  return (
    <div className='task-form-blue-rectangle'>
      <h1>Откройте себе новые возможности</h1>
      <img src={images['chuvachki.svg']} alt="info" />
    </div>
  )
}

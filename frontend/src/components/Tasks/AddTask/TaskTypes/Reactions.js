import React, { useState } from 'react';
import InputField from '../../../shared/InputField';
import ImageUtils from '../../../imageUtils';

const images = ImageUtils.importAllImages(require.context('@assets/tasks', false, /\.(svg)$/));

const reactionsList = [
  '👍', '👎', '❤️', '🔥', '🥰', '👏', '😁', '🤔', '🤯', '😱', '🤬', '😢', '🎉', '🤩', '🤮', '💩', '🙏',
  '👌', '🕊', '🤡', '🥱', '🥴', '😍', '🐳', '❤️‍🔥', '🌚', '🌭', '💯', '🤣', '⚡️', '🍌', '🏆', '💔', '🤨',
  '😐', '🍓', '🍾', '💋', '🖕', '😈', '😴', '😭', '🤓', '👻', '👨‍💻', '👀', '🎃', '🙈', '😇', '😨', '🤝',
  '✍️', '🤗', '🎅', '🎄', '☃️', '💅', '🤪', '🗿', '🆒', '💘', '🙉', '🦄', '😘', '💊', '🙊', '😎', '👾',
  '🤷‍♀️', '🤷', '🤷‍♂️', '😡'
];

export default function Reactions({ handleTaskSettingMenu }) {
  const [error, setError] = useState(null);
  const [spreadValue, setSpreadValue] = useState('');
  const [subscriberCount, setSubscriberCount] = useState('');
  const [channelLink, setChannelLink] = useState('');
  const [taskTime, setTaskTime] = useState('');

  const [showReactions, setShowReactions] = useState(false);
  const [selectedReactions, setSelectedReactions] = useState([]);

  const toggleReaction = (reaction) => {
    setSelectedReactions(prevState => {
      if (prevState.includes(reaction)) {
        return prevState.filter(r => r !== reaction);
      } else {
        if (prevState.length < 9) {
          return [...prevState, reaction];
        } else {
          return prevState;
        }
      }
    });
  };

  return (
    <>
      <div className='task-form-data'>
        <div className='task-form-data-row'>
          <InputField
            label="Разброс кол-ва"
            type="text"
            placeholder="%"
            logo={images['percentage.svg']}
            value={spreadValue}
            onChange={(e) => setSpreadValue(e.target.value)}
          />
          <InputField
            label="Кол-во реакций"
            type="text"
            placeholder="Реакции"
            logo={images['users-alt.svg']}
            value={subscriberCount}
            onChange={(e) => setSubscriberCount(e.target.value)}
          />
        </div>
        <div className='task-form-data-row'>
          <div className='input-field'>
            <label>Реакции</label>
            <div className="input-container" onClick={() => setShowReactions(!showReactions)}>
              <img src={images['emoji.svg']} alt="logo" />
              <div className="divider"></div>
              Реакции: {selectedReactions.length}
            </div>
            {showReactions && (
              <div className="reactions-popup">
                {reactionsList.map((reaction, index) => (
                  <div
                    key={index}
                    className={`reaction-item ${selectedReactions.includes(reaction) ? 'selected' : ''}`}
                    onClick={() => toggleReaction(reaction)}
                  >
                    {reaction}
                    {selectedReactions.includes(reaction) && <div className="reaction-selected"></div>}
                  </div>
                ))}
              </div>
            )}
          </div>
          <InputField
            label="Ссылка на канал"
            type="text"
            placeholder="Ссылка"
            logo={images['link.svg']}
            value={channelLink}
            onChange={(e) => setChannelLink(e.target.value)}
          />
        </div>
        <InputField
          label="Время на выполнение"
          type="text"
          placeholder="Время на задачу"
          logo={images['calendarClock.svg']}
          value={taskTime}
          onChange={(e) => setTaskTime(e.target.value)}
        />
      </div>
      <div className='task-form-btn-box'>
        <button type="submit" className='task-form-submit-button'>
          Запустить задачу
        </button>
        <div className='advanced-setting-btn' onClick={handleTaskSettingMenu}>
          <img src={images['settings.svg']} alt="logo" />
        </div>
      </div>
      {error && <p className="error">{error}</p>}
    </>
  );
}

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

export default function Reactions({ taskData, handleTaskDataChange }) {
  const [showReactions, setShowReactions] = useState(false);

  const toggleReaction = (reaction) => {
    const newReactions = taskData.task_obj.includes(reaction)
      ? taskData.task_obj.filter(r => r !== reaction)
      : [...taskData.task_obj, reaction];

    handleTaskDataChange({ task_obj: newReactions });
  };

  const handleChange = (field, value) => {
    handleTaskDataChange({ [field]: value });
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
            value={taskData.spreadValue || ''}
            onChange={(e) => handleChange('spreadValue', e.target.value)}
          />
          <InputField
            label="Кол-во реакций"
            type="text"
            placeholder="Реакции"
            logo={images['users-alt.svg']}
            value={taskData.count_actions || ''}
            onChange={(e) => handleChange('count_actions', e.target.value)}
          />
        </div>
        <div className='task-form-data-row'>
          <div className='input-field'>
            <label>Реакции</label>
            <div className="input-container" onClick={() => setShowReactions(!showReactions)}>
              <img src={images['emoji.svg']} alt="logo" />
              <div className="divider"></div>
              Реакции: {taskData.task_obj.length}
            </div>
            {showReactions && (
              <div className="reactions-popup">
                {reactionsList.map((reaction, index) => (
                  <div
                    key={index}
                    className={`reaction-item ${taskData.task_obj.includes(reaction) ? 'selected' : ''}`}
                    onClick={() => toggleReaction(reaction)}
                  >
                    {reaction}
                    {taskData.task_obj.includes(reaction) && <div className="reaction-selected"></div>}
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
            value={taskData.target_url || ''}
            onChange={(e) => handleChange('target_url', e.target.value)}
          />
        </div>
        <InputField
          label="Время на выполнение"
          type="text"
          placeholder="Время на задачу"
          logo={images['calendarClock.svg']}
          value={taskData.task_time || ''}
          onChange={(e) => handleChange('task_time', e.target.value)}
        />
      </div>
    </>
  );
}

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
    let newReactions;
    if (taskData.task_obj.includes(reaction)) {
      newReactions = taskData.task_obj.filter(r => r !== reaction);
    } else if (taskData.task_obj.length < 9) {
      newReactions = [...taskData.task_obj, reaction];
    } else {
      return;
    }
    handleTaskDataChange({ task_obj: newReactions });
  };

  const handleDataChange = (field, value) => {
    handleTaskDataChange({ [field]: value });
  };

  return (
    <>
      <div className='task-form-data'>
        <div className='task-form-data-row'>
          <InputField
            label="Разброс кол-ва" type="number" placeholder="%"
            logo={images['percentage.svg']} error={taskData.errors.spread}
            value={taskData.spreadValue || ''}
            handleChange={(e) => handleDataChange('spreadValue', e.target.value)}
            options={{minValue: 0, maxValue: 100}}
          />
          <InputField
            label="Кол-во реакций" type="number" placeholder="Реакции"
            logo={images['users-alt.svg']} error={taskData.errors.count_actions}
            value={taskData.count_actions || ''}
            handleChange={(e) => handleDataChange('count_actions', e.target.value)}
            options={{minValue: 0, maxValue: 4000}}
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
            label="Ссылка на пост" type="text" placeholder="Укажите ссылку на пост"
            logo={images['link.svg']} error={taskData.errors.link}
            value={taskData.target_url || ''}
            handleChange={(e) => handleDataChange('target_url', e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

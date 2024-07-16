import React, { useState } from 'react';
import InputField from '../shared/InputField';
import ImageUtils from '../imageUtils';

const images = ImageUtils.importAllImages(require.context('@assets/tasks', false, /\.(svg)$/));

const reactionsList = [
    '👍', '👎', '❤️', '🔥', '🥰', '👏', '😁', '🤔', '🤯', '😱', '🤬', '😢', '🎉', '🤩', '🤮', '💩', '🙏',
    '👌', '🕊', '🤡', '🥱', '🥴', '😍', '🐳', '❤️‍🔥', '🌚', '🌭', '💯', '🤣', '⚡️', '🍌', '🏆', '💔', '🤨',
    '😐', '🍓', '🍾', '💋', '🖕', '😈', '😴', '😭', '🤓', '👻', '👨‍💻', '👀', '🎃', '🙈', '😇', '😨', '🤝',
    '✍️', '🤗', '🎅', '🎄', '☃️', '💅', '🤪', '🗿', '🆒', '💘', '🙉', '🦄', '😘', '💊', '🙊', '😎', '👾',
    '🤷‍♀️', '🤷', '🤷‍♂️', '😡'
];

export default function Reactions() {
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
                    label="Кол-во подписчиков"
                    type="text"
                    placeholder="Кол-во подписчиков"
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
                    label="Ссылка к каналу"
                    type="text"
                    placeholder="Укажите ссылку на канал"
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
    );
}

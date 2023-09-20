import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux'
import { selectMessageText, setMessageText } from '../slices/sliderSlice';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

const EmojiInput = () => {

    const dispatch = useDispatch();
    const messageText = useSelector(selectMessageText);

    return (
        <div className={'w-full p-2 '} dir='ltr'>
            <Picker onEmojiClick={(event, emojiObject) => dispatch(setMessageText(messageText + emojiObject.emoji))} pickerStyle={{ width: '100%', borderRadius: '15px' }} disableSearchBar={true} />
        </div>
    );
};

export default EmojiInput;
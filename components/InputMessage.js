import EmojiInput from './EmojiInput'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectMessageText, setMessageText} from '../slices/sliderSlice';

const InputMessage = () => {

    const dispatch = useDispatch();
    const messageText = useSelector(selectMessageText);

    const handleTextAreaInput = (e) => {
        dispatch(setMessageText(e.target.value))
    }

    return (
        <div className='h-full'>
            <div className='flex w-full h-full justify-center items-center'>
                <textarea onInput={handleTextAreaInput} value={messageText} placeholder='היי, אנו שמחים להזמינך אל חתונתינו' className='w-1/2 h-80 resize-none text-black  py-2 px-3 rounded-[15px] m-2 ' />
                <div className='w-1/2'>
                    <EmojiInput />
                </div>
            </div>
        </div>
    )
}

export default InputMessage;
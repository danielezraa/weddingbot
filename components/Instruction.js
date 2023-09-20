import React, { useEffect, useState } from 'react'
import InputMessage from './InputMessage';
import ScanQR from './ScanQR';
import UploadFile from './UploadFile';
import { useDispatch, useSelector } from 'react-redux'
import { selectMessageText, selectSlidersLength, selectCurrentSlideIndex, setCurrentSlideIndex, selectMessageContacts } from '../slices/sliderSlice';

const Instruction = ({ type }) => {

    const dispatch = useDispatch();
    const slidersLength = useSelector(selectSlidersLength);
    const messageText = useSelector(selectMessageText);
    const messageContacts = useSelector(selectMessageContacts);
    const currentIndex = useSelector(selectCurrentSlideIndex);
    const h1Array = ['יש למלא את תוכן ההודעה שברצונך לשלוח', 'הוסיפו סרטון או תמונה', 'הוסיפו את רשימת התפוצה', 'סרקו את קוד ה-QR כדי לשלוח את ההודעה אל רשימת התפוצה']

    const slide = (navigation) => {
        if (!messageText || messageText.trim().length <= 0) {
            alert("חובה למלא תוכן הודעה!")
            return
        }
        if (type === 2 && navigation == 'next' && (!messageContacts || messageContacts.length <= 0)) {
            alert('חובה להכניס רשימה');
            return;
        }
        if (navigation === 'next') {
            if (currentIndex === slidersLength) return;
            dispatch(setCurrentSlideIndex(currentIndex + 1));
        }
        else {
            if (currentIndex === 0) return;
            dispatch(setCurrentSlideIndex(currentIndex - 1));
        }
    }

    const renderInstruction = (index) => {
        switch (index) {
            case 0:
                return <InputMessage />;
            case 1:
                return <UploadFile type={'images'} />;
            case 2:
                return <UploadFile type={'contacts'} />;
            case 3:
                return <ScanQR />;
            default:
                break;
        }
    }

    return (
        <div className='flex flex-col w-full items-center justify-between shadow-lg bg-gray-100 rounded-3xl p-2 h-[460px] '>
            <div className='h-[7%] flex justify-center items-center font-semibold underline select-none'>
                <h1>{h1Array[currentIndex]}</h1>
            </div>
            <div className='h-[80%] flex justify-center items-center w-full'>
                {renderInstruction(currentIndex)}
            </div>
            <div className='flex w-4/5 justify-around mt-1 mb-1 h-[10%]'>
                <button className={`${currentIndex === 0 ? 'hidden text-gray-200 cursor-not-allowed' : 'text-black cursor-pointer'} py-1 mx-1 text-sm select-none transition-all rounded-xl px-3  shadow bg-blue-200 hover:bg-blue-400  ease-in-out duration-200 hover:scale-[1.07]`} onClick={() => slide('prev')}>לשלב הקודם</button>
                <button className={`${currentIndex === (slidersLength - 1) ? 'hidden text-gray-200 cursor-not-allowed' : 'text-black cursor-pointer'} py-1 mx-1 text-sm select-none transition-all rounded-xl px-3 shadow bg-blue-200 hover:bg-blue-400 ease-in-out duration-200 hover:scale-[1.07]`} onClick={() => slide('next')} >לשלב הבא</button>
            </div>
        </div >
    )
}

export default Instruction
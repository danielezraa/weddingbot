import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import * as XLSX from 'xlsx';
import { useDispatch, useSelector } from 'react-redux'
import { selectCorrectNumbers, setCorrectNumbers, setIncorrectNumbers, selectMessageContacts, selectMessageMedia, setMessageContacts, setMessageMedia, selectIncorrectNumbers } from '../slices/sliderSlice';

const UploadFile = ({ type }) => {

    const dispatch = useDispatch();
    const mediaFile = useSelector(selectMessageMedia);
    const messageContacts = useSelector(selectMessageContacts);
    const incorrectNumbers = useSelector(selectIncorrectNumbers);
    const correctNumbers = useSelector(selectCorrectNumbers);
    const isFileLoaded = mediaFile && type === 'images' || type === 'contacts' && messageContacts?.length > 0;

    const resetFile = () => {
        if (type === 'images') {
            dispatch(setMessageMedia(null));
        }
        else {
            dispatch(setMessageContacts(null));
            dispatch(setIncorrectNumbers(null));
            dispatch(setCorrectNumbers(null));
        }
    }

    const fileInputHandler = (e) => {
        const file = e?.target?.files[0];
        switch (type) {
            case 'images':
                if (!file || file.type.length == 0) { // || !file?.type.includes('image/')
                    alert("סוג קובץ לא נתמך, יש להעלות תמונה או סרטון בלבד");
                    return;
                }
                dispatch(setMessageMedia(file));
                break;

            case 'contacts':
                if (file.type.length <= 0 || file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                    alert("סוג קובץ לא נתמך, יש העלות קובץ אקסל לפי הפורמט שנתמך");
                    return;
                }
                const reader = new FileReader();
                reader.onload = (e) => {
                    const data = e.target.result;
                    const workbook = XLSX.read(data, { type: "array" });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const json = XLSX.utils.sheet_to_json(worksheet);
                    const numbersArray = json.map(row => row['מספרי טלפון']);
                    dispatch(setMessageContacts(numbersArray));
                    verifyPhoneNumbers(numbersArray);
                };
                reader.readAsArrayBuffer(e.target.files[0]);
                return;
            default:
                console.log("error,at fileInputHandler")
                return
        }
    }

    const verifyPhoneNumbers = (numbersArray) => {
        const regex = /[0][5][0-9]{8}$/g;
        const correctNumbersArray = [];
        const incorrectNumbersArray = [];
        numbersArray.forEach(number => {
            if (number.match(regex)?.[0]) correctNumbersArray.push(number)
            else incorrectNumbersArray.push(number);
        })
        dispatch(setIncorrectNumbers(incorrectNumbersArray));
        dispatch(setCorrectNumbers(correctNumbersArray));

    }

    return (
        <div className="flex justify-center items-center w-full select-none flex-col ">
            <div className='w-2/3 h-full'>
                <label htmlFor="dropzone-file" className={`flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-t-xl ${!isFileLoaded && 'rounded-b-xl'} border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}>
                    <div className="flex flex-col justify-center items-center pt-5 pb-6 w-full h-full">
                        {!isFileLoaded ?
                            <div className='flex flex-col items-center justify-center'>
                                <Image
                                    src={type === 'images' ? '/add-image-icon.png' : '/add-contacts-icon.png'}
                                    alt={type}
                                    width={54}
                                    height={54}
                                />
                                <p className="m-2 text-sm text-gray-500 dark:text-gray-400">לחצו כאן כדי לבחור קובץ</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{type === 'images' ? 'תמונות או סרטונים בלבד' : 'יש לבחור קובץ Excel לפי הפורמט שהוגדר מראש'}</p>
                            </div>
                            :
                            <div className='h-full w-full flex justify-around items-center flex-col'>
                                <div className='m-1 text-center '>
                                    <p className='text-gray-100 text-sm'>הקובץ הועלה בהצלחה</p>
                                    <p className='text-gray-200 text-xs'>אבל הכל טוב, אפשר גם להתחרט וללחוץ כאן כדי להעלות מחדש!</p>
                                </div>
                                {mediaFile && type === 'images' && <img className='m-2 max-h-[180px] max-w-[300px] rounded-xl shadow' src={URL.createObjectURL(mediaFile)} alt='oved li meod hazak' />}
                                {messageContacts?.length > 0 && correctNumbers?.length >= 0 && incorrectNumbers?.length >= 0 && type === 'contacts' && <div className='flex w-full h-full'>
                                    <div className='w-full m-1 h-full bg-gray-300/50 rounded-xl  p-1 flex flex-col justify-between items-center'>
                                        <p className='text-sm text-center font-semibold text-green-800'>מספרים תקינים ({correctNumbers.length})</p>
                                        <div className='max-h-32 w-full px-2 overflow-y-auto'>
                                            {correctNumbers.map((number, index) => <p key={index} className='rounded-lg shadow py-0.5 px-2 m-0.5 bg-gray-400 text-center'>{number}</p>)}
                                        </div>
                                    </div>
                                    <div className='w-full m-1 h-full bg-gray-300/50 rounded-xl  p-1 flex flex-col justify-between items-center'>
                                        <p className='text-sm text-center font-semibold text-red-900'>מספרים לא תקינים ({incorrectNumbers.length})</p>
                                        <div className='max-h-32 w-full px-2 overflow-y-auto'>
                                            {incorrectNumbers.map((number, index) => <p key={index} className='rounded-lg shadow py-0.5 px-2 m-0.5 bg-gray-400 text-center'>{number}</p>)}
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        }
                    </div>
                    <input onChange={e => fileInputHandler(e)}
                        onClick={(event) => {
                            event.target.value = null
                        }} id="dropzone-file" type="file" className="hidden" />
                </label>
                {isFileLoaded && <button onClick={resetFile} className='bg-gray-800 animate-[pulse_1.5s_ease-in-out] text-gray-200 py-1 px-2 rounded-b-xl font-bold shadow w-full'>{type === 'images' ? 'הסר תמונה' : 'הסר רשימה'}</button>}
            </div>
            {messageContacts?.length > 0 && correctNumbers?.length > 0 && incorrectNumbers?.length > 0 && type === 'contacts' && <p className='text-red-500 font-bold text-sm text-center mt-2'>מעבר לשלב הבא יאפשר שליחת הודעות לרשימת המספרים התקינים בלבד!</p>}
            {messageContacts?.length > 0 && correctNumbers?.length > 0 && incorrectNumbers?.length <= 0 && type === 'contacts' && <p className='text-black font-bold text-sm text-center mt-2'>שמע אתה תותח, אשכרה כל המספרים שהעלית תקינים!</p>}
        </div>
    )
}

export default UploadFile


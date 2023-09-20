import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectMessageText, selectMessageMedia, selectCurrentSlideIndex } from '../slices/sliderSlice';

const PreviewMessage = () => {

    const messageText = useSelector(selectMessageText);
    const mediaFile = useSelector(selectMessageMedia);
    const currentIndex = useSelector(selectCurrentSlideIndex);

    const getTime = () => {
        const date = new Date();
        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        return hours + ":" + minutes;
    }

    return (
        <div className='flex flex-col justify-center items-center w-[262px] h-[528px] relative select-none'>
            <div className='relative rounded-3xl w-[262px] h-[528px] flex items-center'>
                <img src={'/iphone_mockup_clean.png'} className="w-[262px] absolute z-50 rounded-3xl p-0.5" />
                <div className='px-6 py-1 pb-6 relative w-[262px] h-[528px]'>
                    <div className='w-[260px] h-[520px] absolute left-0 z-0 overflow-hidden shadow-xl rounded-[50px]'>
                        <img src={'/whatsapp_bg.png'} className="h-full w-full" />
                    </div>
                    <div className='flex flex-col justify-end absolute bottom-5 z-30 w-[81%] h-[95%] overflow-hidden '>
                        <div className=' max-w-[150px] bg-white shadow rounded-xl p-1 my-1 self-end'>
                            <p className='whitespace-pre-line text-[12px] p-1'>מה הולך?</p>
                            <p className='text-[10px] font-semibold left text-left px-2'>01:05</p>
                        </div>
                        <div className=' max-w-[150px] bg-white shadow rounded-xl p-1 my-1 self-end'>
                            <p className='whitespace-pre-line text-[12px] p-1'>מה הולך אבא'לה?</p>
                            <p className='text-[10px] font-semibold left text-left px-2'>01:06</p>
                        </div>
                        <div className=' max-w-[150px] bg-white shadow rounded-xl p-1 my-1 self-end'>
                            <p className='whitespace-pre-line text-[12px] p-1'>אה אתה יענו מסנן אותי? סבבה. הכל טוב. זוכר לך את זה. </p>
                            <p className='text-[10px] font-semibold left text-left px-2'>01:11</p>
                        </div>
                        {messageText && <div className='max-w-[150px] bg-[#d9fdd3] shadow rounded-xl p-1 my-1 justify-self-start'>
                            {mediaFile && <div className='max-w-[200px] max-h-[250px] overflow-hidden rounded-xl flex items-center'>
                                <img src={URL.createObjectURL(mediaFile)} className='w-full h-full' />
                            </div>}
                            <p className='whitespace-pre-line text-[12px] p-1 break-words'>{messageText}</p>
                            <p className='text-[10px] font-semibold left text-left px-2'>{getTime()}</p>
                        </div>}
                        {messageText && currentIndex > 0 && <div className=' max-w-[150px] bg-white shadow rounded-xl p-1 my-1 self-end'>
                            <p className='whitespace-pre-line text-[12px] p-1'>ברור, מה השאלה בכלל? יהיה פצצה 💥💣🧨🎊🎉</p>
                            <p className='text-[10px] font-semibold left text-left px-2'>{getTime()}</p>
                        </div>}
                        {messageText && currentIndex > 1 && <div className=' max-w-[150px] bg-white shadow rounded-xl p-1 my-1 self-end'>
                            <p className='whitespace-pre-line text-[12px] p-1'>בעצם לא בטוח שאני אבוא... אחשוב על זה ואעדכן אותך.</p>
                            <p className='text-[10px] font-semibold left text-left px-2'>{getTime()}</p>
                        </div>}
                        {messageText && currentIndex > 2 && <div className=' max-w-[150px] bg-white shadow rounded-xl p-1 my-1 self-end'>
                            <p className='whitespace-pre-line text-[12px] p-1'>טוב שכנעת אותי! אני בפנים!💯💯💯</p>
                            <p className='text-[10px] font-semibold left text-left px-2'>{getTime()}</p>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreviewMessage

{/* <div className='relative rounded-3xl overflow-hidden border-black border-[1px] w-full h-full'>
                <img src={'/whatsapp_bg.png'} className="w-full h-full object-none absolute top-0 left-0 z-0 rounded-3xl p-0.5" />
                <div className='z-0 absolute max-w-[200px] bg-[#d9fdd3] shadow bottom-[15%] right-[4%] rounded-xl p-0.5'>
                    {messageMedia && <div className='max-w-[200px] max-h-[250px] overflow-hidden rounded-xl flex items-center'>
                        <img src='/myImage.jpeg' className='w-full h-full' />
                    </div>}
                    <p className='whitespace-pre-line text-[13px] p-1 break-words'>{messageText}</p>
                    <p className='text-[10px] font-semibold left text-left px-2'>{getTime()}</p>
                </div>
                <div className='z-0 absolute  max-w-[250px] bg-white shadow bottom-[3%] left-[4%] rounded-xl p-0.5'>
                    <p className='whitespace-pre-line text-[13px] p-1'>ברור שאני בא, אתה מפגר?</p>
                    <p className='text-[10px] font-semibold left text-left px-2'>{getTime()}</p>
                </div>
            </div> */}
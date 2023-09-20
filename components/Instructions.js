import React, { useState, useEffect } from 'react'
import Instruction from './Instruction';
import initFirebase from '../firebase/initFirebase';
import PreviewMessage from './PreviewMessage';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { createListenersOnConnection } from '../firebase/connection_functions';
import { useDispatch, useSelector } from 'react-redux'
import { setIsQRCodeRequested, selectCurrentSlideIndex, setCurrentSlideIndex, selectResQRCode, selectSessionId, setSessionId, selectSlidersLength, setResQRCode, selectIsQRCodeRequested, selectMessageText, selectMessageContacts, selectMessageMedia, selectCorrectNumbers } from '../slices/sliderSlice';

const Instructions = () => {

    const dispatch = useDispatch();
    const slidersLength = useSelector(selectSlidersLength);
    const currentIndex = useSelector(selectCurrentSlideIndex);
    const resQRCode = useSelector(selectResQRCode);
    const sessionId = useSelector(selectSessionId);
    const isQRCodeRequested = useSelector(selectIsQRCodeRequested);
    const messageText = useSelector(selectMessageText);
    const messageMedia = useSelector(selectMessageMedia);
    const messageContacts = useSelector(selectMessageContacts);
    const correctNumbers = useSelector(selectCorrectNumbers);
    const { db, storage } = initFirebase();

    useEffect(() => {
        if (!isQRCodeRequested && (resQRCode || resQRCode != 'fetching') && currentIndex === slidersLength - 1) generateQRHandler();
    }, [isQRCodeRequested, currentIndex])

    useEffect(() => {
        if (sessionId && db) {
            createListenersOnConnection(db, dispatch, setResQRCode, sessionId);
        }
    }, [sessionId])

    const generateQRHandler = async () => {
        let imageId = Date.now();
        // when there is a sessionId => upload media with the same id
        uploadBytes(ref(storage, `images/${imageId}.mp4`), messageMedia, { contentType: 'video/mp4', }).then((snapshot) => { //  contentType: 'image/jpeg'
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                dispatch(setResQRCode("fetching"));
                dispatch(setIsQRCodeRequested(true));
                const params = {
                    contacts: correctNumbers,
                    text: messageText,
                    media: {
                        id: imageId,
                        url: downloadURL,
                    }
                }
                const payload = {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "content-Type": "application/json",
                    },
                    body: JSON.stringify(params),
                }
                fetch(`${location.origin}/api/bot`, payload).then(res => res.json()).then(id => dispatch(setSessionId(id)));
            });
        })
    }

    return (
        <div className='w-full m-5 flex items-center justify-between '>
            <div className='w-[60%] m-auto'>
                {Array(slidersLength).fill().map((slide, index) => {
                    return <div className={index === currentIndex ? 'slide active' : 'slide'} key={index}>
                        {currentIndex === index && <Instruction type={index} />}
                    </div>
                })}
            </div>
            <div className="px-10">
                <h1 className="text-center font-bold">תצוגה מקדימה</h1>
                <PreviewMessage />
                {messageText.length > 0 && currentIndex > 0 && <div className='flex'>
                    {currentIndex != 0 && <button className='m-1 flex-1 text-sm font-semibold' onClick={() => dispatch(setCurrentSlideIndex(0))}>לעריכת הטקסט</button>}
                    {currentIndex != 1 && <button className='m-1 flex-1 text-sm font-semibold' onClick={() => dispatch(setCurrentSlideIndex(1))}>לעריכת המדיה</button>}
                </div>}
            </div>
        </div>
    )
}

export default Instructions
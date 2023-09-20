import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    slidersLength: 4,
    messageText: '',
    messageMedia: null,
    messageContacts: null,
    currentSlideIndex: 0,
    resQRCode: null,
    prevQRCode: null,
    sessionId: null,
    isQRCodeRequested: false,
    correctNumbers: null,
    incorrectNumbers: null,
};

export const sliderSlice = createSlice({
    name: "slider",
    initialState,
    reducers: {
        setMessageText: (state, action) => void (state.messageText = action.payload),
        setMessageMedia: (state, action) => void (state.messageMedia = action.payload),
        setCurrentSlideIndex: (state, action) => void (state.currentSlideIndex = action.payload),
        setMessageContacts: (state, action) => void (state.messageContacts = action.payload),
        setResQRCode: (state, action) => void (state.resQRCode = action.payload),
        setPrevQRCode: (state, action) => void (state.prevQRCode = action.payload),
        setSessionId: (state, action) => void (state.sessionId = action.payload),
        setIsQRCodeRequested: (state, action) => void (state.isQRCodeRequested = action.payload),
        setCorrectNumbers: (state, action) => void (state.correctNumbers = action.payload),
        setIncorrectNumbers: (state, action) => void (state.incorrectNumbers = action.payload),
    },
});

export const { setResQRCode, setPrevQRCode, setCorrectNumbers, setIncorrectNumbers, setIsQRCodeRequested, setSessionId, setMessageText, setMessageMedia, setCurrentSlideIndex, setMessageContacts } = sliderSlice.actions;

// ----- Selectors: ----- //
export const selectMessageText = (state) => state.slider.messageText;
export const selectMessageMedia = (state) => state.slider.messageMedia;
export const selectMessageContacts = (state) => state.slider.messageContacts;
export const selectCurrentSlideIndex = (state) => state.slider.currentSlideIndex;
export const selectSlidersLength = (state) => state.slider.slidersLength;
export const selectResQRCode = (state) => state.slider.resQRCode;
export const selectPrevQRCode = (state) => state.slider.prevQRCode;
export const selectSessionId = (state) => state.slider.sessionId;
export const selectIsQRCodeRequested = (state) => state.slider.isQRCodeRequested;
export const selectCorrectNumbers = (state) => state.slider.correctNumbers;
export const selectIncorrectNumbers = (state) => state.slider.incorrectNumbers;

export default sliderSlice.reducer;


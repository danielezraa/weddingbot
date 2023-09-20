import { configureStore } from "@reduxjs/toolkit";
import sliderReducer from './slices/sliderSlice';

export const store = configureStore({
    reducer: {
        slider: sliderReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modal";
import sliceReducer from "./slices/user-data";

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        userData: sliceReducer
    }
});
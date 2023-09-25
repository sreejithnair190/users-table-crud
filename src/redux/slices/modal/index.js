import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    initialState: false,
    name:'modal',
    reducers: {
        toggleModal: (state) => !state,
    }
});

export const { toggleModal, setModalType } = modalSlice.actions;

export default modalSlice.reducer;
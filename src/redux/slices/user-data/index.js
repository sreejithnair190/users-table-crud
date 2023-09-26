import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
    initialState: [],
    name:'userData',
    reducers: {
        addUser: (state , action) => {
            return action.payload;
        }
    }
});

export const { addUser } = userDataSlice.actions;

export default userDataSlice.reducer;
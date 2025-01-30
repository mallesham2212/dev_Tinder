import { createSlice } from "@reduxjs/toolkit";

const pendingRequestsSlice = createSlice({
    name:'pendingRequests',
    initialState:null,
    reducers:{
        addPendingConnection:(state,action)=> action.payload,
        removeRequest :(state,action) => {
            const newArray = state.filter((r) => r._id !== action.payload);
            return newArray;
        }
    }
})

export const {addPendingConnection,removeRequest} = pendingRequestsSlice.actions

export default pendingRequestsSlice.reducer;
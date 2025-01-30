import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import feedReducer from './feedSlice';
import connectionReducer from './connections'
import pendingRequestReducer from './pendingRequestsSlice'

const appStore = configureStore({
    reducer:{
        user: userReducer,
        feed: feedReducer,
        connection: connectionReducer,
        pendingRequests:pendingRequestReducer,
        
    }
})

export default appStore;

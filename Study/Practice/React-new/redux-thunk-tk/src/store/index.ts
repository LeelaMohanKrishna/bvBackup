import { postReducer } from './postsSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: {
		postReducer: postReducer,
	},
});

export default store;

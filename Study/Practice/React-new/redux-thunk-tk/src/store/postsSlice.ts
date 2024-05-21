import { createSlice } from '@reduxjs/toolkit';
import { PostsType } from '../pages/posts';
import axios from 'axios';

export interface InitialStateData {
	posts: PostsType[];
	isLoading: boolean;
	error: string | null;
	showForm: boolean;
}

export const fetchPostsData = () => {
	return async (dispatch: any, state: any) => {
		dispatch(fetchPostsStart());
		try {
			const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
			const data: PostsType[] = await response.data;
			dispatch(fetchPostsSuccess(data));
		} catch (error) {
			dispatch(fetchPostsFailure(error));
		}
	};
};

const initialState: InitialStateData = {
	posts: [],
	isLoading: false,
	error: null,
	showForm: false,
};
const postSlice = createSlice({
	name: 'posts',
	initialState: initialState,
	reducers: {
		fetchPostsStart: (state) => {
			state.isLoading = true;
			state.error = null;
		},
		fetchPostsSuccess: (state, action) => {
			state.posts = action.payload;
			state.isLoading = false;
		},
		fetchPostsFailure: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

export const { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure } = postSlice.actions;

export const postReducer = postSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { PostsType } from '../pages/posts';
import axios from 'axios';

export interface InitialStateData {
	posts: PostsType[];
	isLoading: boolean;
	error: string | null;
	showForm: boolean;
}

const initialState: InitialStateData = {
	posts: [],
	isLoading: false,
	error: null,
	showForm: false,
};

const reducers = (state = initialState, action: { payload: any; type: string }) => {
	switch (action.type) {
		case 'fetchPostsStart':
			return { ...state, isLoading: true };
		case 'fetchPostsSuccess':
			return { ...state, posts: action.payload, isLoading: false };
		case 'fetchPostsFailure':
			return { ...state, error: action.payload, isLoading: false };
		default:
			return state;
	}
};

export const fetchPostsData = () => {
	return async (dispatch: any, state: any) => {
		dispatch({ type: 'fetchPostsStart' });
		try {
			const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
			const data: PostsType[] = await response.data;
			dispatch({ type: 'fetchPostsSuccess', payload: data });
		} catch (error) {
			dispatch({ type: 'fetchPostsFailure', payload: error });
		}
	};
};

export default reducers;

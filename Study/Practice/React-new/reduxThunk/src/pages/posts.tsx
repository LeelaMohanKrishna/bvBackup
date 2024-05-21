import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { InitialStateData, fetchPostsData } from '../store/reducer';
import { Dispatch } from '@reduxjs/toolkit';
export type PostsType = {
	body: string;
	id: number;
	title: string;
	userId: number;
};

const Posts = () => {
	const posts = useSelector((state: InitialStateData) => state.posts);
	const loading = useSelector((state: InitialStateData) => state.isLoading);
	const error = useSelector((state: InitialStateData) => state.error);
	const dispatch: Dispatch<any> = useDispatch();

	useEffect(() => {
		dispatch(fetchPostsData());
	}, [dispatch]);
	return (
		<div className='grid grid-cols-1 md:grid-cols-4 gap-4 m-4'>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{posts?.map((i) => (
				<Link to={`${i.id}`} key={i.id} className='bg-slate-100 p-5 shadow-lg rounded-md'>
					<h1 className='text-xl font-bold text-blue-900 mb-2'>{`${i.id}. ${i.title}`}</h1>
				</Link>
			))}
		</div>
	);
};

export default Posts;

import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { PostsType } from './posts';

export async function postDetail(id: string) {
	const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
	const data: PostsType = await response.json();
	return data;
}
const PostDetails = () => {
	const eachPost = useLoaderData();
	const data = eachPost as PostsType;
	return (
		<div className='flex flex-col items-center'>
			<div className='text-center bg-slate-300 w-96 rounded-md px-5 py-10 mt-20'>
				<h1 className='text-xl font-semibold mb-2 bg-slate-200 rounded-md'>{data?.title}</h1>
				<p>{data?.body}</p>
			</div>
			<Link to={'/'} className='p-3 border border-gray-600 rounded-full m-3 w-20 text-center'>
				Back
			</Link>
		</div>
	);
};
export default PostDetails;

export function loadEachPost({ params }: any) {
	const id = params.id;
	return postDetail(id);
}

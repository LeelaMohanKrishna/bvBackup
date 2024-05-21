import React from 'react';
import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import PostDetails, { loadEachPost } from './pages/postDetails';
import Posts from './pages/posts';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path='/' element={<Posts />} />
			<Route path=':id' element={<PostDetails />} loader={loadEachPost} />
		</Route>
	)
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;

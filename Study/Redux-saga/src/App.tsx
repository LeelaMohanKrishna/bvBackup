import React from 'react';
import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
// import Countries from './pages/countries';
import FormPage from './components/formContainer';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path='/' element={<FormPage />} />
		</Route>
	)
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;

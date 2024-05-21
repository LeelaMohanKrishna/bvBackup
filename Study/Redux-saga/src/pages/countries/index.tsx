import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, InitialStateData } from '../../store/reducer';
import AddEditCountry from './AddEditCountry';

const Countries = () => {
	const countries = useSelector((state: InitialStateData) => state.countries?.data.data);
	const loading = useSelector((state: InitialStateData) => state.isLoading);
	const error = useSelector((state: InitialStateData) => state.error);
	const addData = useSelector((state: InitialStateData) => state.addData);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: Actions.fetchStart });
	}, [dispatch]);

	return (
		<div role='CountriesData' className='w-3/4 bg-slate-200 m-auto'>
			<div className='flex justify-between items-center py-3 px-6'>
				<h1 className='text-3xl font-bold text-blue-950'>Countries</h1>
				<button className='p-2 rounded-md bg-blue-950 text-white' onClick={() => dispatch({ type: Actions.addCountryModal })}>
					Add New
				</button>
			</div>
			{addData && <AddEditCountry />}
			{loading && <p className='text-center'>Loading...</p>}
			{error && <p>Error</p>}
			{countries?.map((i, index) => (
				<div key={i.id} className='odd:bg-slate-200 even:bg-slate-100 p-6 w-full flex justify-between items-center'>
					<h1 className='text-xl font-bold text-blue-900 mb-2'>{index + 1}</h1>
					<h1 className='text-xl font-bold text-blue-900 mb-2'>{i.countryName}</h1>
					<div className='space-x-2'>
						<button
							className='bg-orange-500 text-white p-2 w-20 rounded-md'
							onClick={() => {
								dispatch({ type: Actions.getStart, payload: i.uuid });
								dispatch({ type: Actions.addCountryModal });
							}}
						>
							edit
						</button>
						<button
							className='bg-red-700 text-white p-2 w-20 rounded-md'
							onClick={() => {
								dispatch({ type: Actions.delStart, payload: i.uuid });
							}}
						>
							Delete
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default Countries;

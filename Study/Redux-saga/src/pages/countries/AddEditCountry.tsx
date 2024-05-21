import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions, InitialStateData } from '../../store/reducer';

enum FieldNames {
	countryCode = 'countryCode',
	phoneCode = 'phoneCode',
	countryName = 'countryName',
}

const AddEditCountry = () => {
	const dispatch = useDispatch();
	const [countryName, setCountryName] = useState<string>('');
	const [countryCode, setCountryCode] = useState<string>('');
	const [phoneCode, setPhoneCode] = useState<string | number>('');

	const countryData = useSelector((state: InitialStateData) => state.countryObject?.data);
	const loading = useSelector((state: InitialStateData) => state.isLoading);

	useEffect(() => {
		if (!loading) {
			setCountryName(countryData?.countryName as string);
			setCountryCode(countryData?.countryCode as string);
			setPhoneCode(countryData?.phoneCode as number);
		}
	}, [countryData, loading]);

	const closeBtnHandler = useCallback(() => {
		dispatch({ type: Actions.addCountryModal });
	}, [dispatch]);
	return (
		<div id='addCountyModal' className={'fixed top-0 left-0 right-0 z-50  w-full overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full grid place-content-center bg-black bg-opacity-30'}>
			<div className='w-full min-w-[30vw] max-w-2xl max-h-full shadow-lg'>
				{/* <!-- Modal content --> */}
				<div className=' bg-white rounded-lg shadow p-4'>
					<div className='flex justify-between items-center mb-4'>
						<h2 className='text-gray-900 font-bold'>Add Data</h2>
						<button className='btn btn-large text-lg' onClick={closeBtnHandler}>
							X
						</button>
					</div>
					<div className='text-center'>
						<div className='mb-4'>
							<input className='border-2 border-black rounded-md p-3' placeholder='Country name' name={FieldNames.countryName} onChange={(e) => setCountryName(e.target.value)} value={countryName} required />
						</div>
						<div className='mb-4'>
							<input className='border-2 border-black rounded-md p-3' placeholder='Country code' name={FieldNames.countryCode} onChange={(e) => setCountryCode(e.target.value)} value={countryCode} required />
						</div>
						<div className='mb-4'>
							<input className='border-2 border-black rounded-md p-3' type='number' placeholder='Phone code' name={FieldNames.phoneCode} onChange={(e) => setPhoneCode(e.target.value)} value={phoneCode} min={1} required />
						</div>
					</div>
					{/* <!-- Modal footer --> */}
					<div className='flex items-center justify-center p-4 pb-8 space-x-4'>
						<button
							className='bg-green-400 btn-large min-w-[100px] justify-center p-3 rounded-md'
							onClick={() => {
								if (countryData) {
									dispatch({ type: Actions.editStart, payload: { id: countryData.uuid, data: { countryName, countryCode, phoneCode } } });
								} else {
									dispatch({ type: Actions.addStart, payload: { countryName, countryCode, phoneCode } });
								}
							}}
						>
							Yes
						</button>
						<button className='bg-red-400 btn-large min-w-[100px] justify-center p-3 rounded-md' onClick={closeBtnHandler}>
							No
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddEditCountry;

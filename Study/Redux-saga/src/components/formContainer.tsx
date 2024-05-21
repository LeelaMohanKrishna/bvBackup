import React, { useState } from 'react';

const FormPage = () => {
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [age, setAge] = useState<string>('');
	const [info, setInfo] = useState<string>('');
	const [error1, setError1] = useState<boolean>(false);
	const [error2, setError2] = useState<boolean>(false);
	const [error3, setError3] = useState<boolean>(false);
	const [error4, setError4] = useState<boolean>(false);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (!firstName) {
			setError1(true);
		}
		if (!lastName) {
			setError2(true);
		}
		if (!age) {
			setError3(true);
		}
		if (!info) {
			setError4(true);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='mb-4'>
				<label htmlFor='fistName'>First Name</label>
				<br />
				<input
					className='border-2 border-black rounded-md p-2'
					type='text'
					id='firstName'
					placeholder='First Name'
					value={firstName}
					onChange={(e) => {
						setFirstName(e.target.value);
						setError1(!e.target.value);
					}}
				/>
				{error1 && <p className='text-red-600'>Please enter first name</p>}
			</div>
			<div className='mb-4'>
				<label htmlFor='lastName'>Last Name</label>
				<br />
				<input
					className='border-2 border-black rounded-md p-2'
					type='text'
					id='lastName'
					placeholder='Last Name'
					value={lastName}
					onChange={(e) => {
						setLastName(e.target.value);
						setError2(!e.target.value);
					}}
				/>
				{error2 && <p className='text-red-600'>Please enter last name</p>}
			</div>
			<div className='mb-4'>
				<label htmlFor='age'>Age</label>
				<br />
				<input
					className='border-2 border-black rounded-md p-2'
					type='text'
					id='age'
					placeholder='Age'
					value={age}
					onChange={(e) => {
						setAge(e.target.value);
						setError3(!e.target.value);
					}}
				/>
				{error3 && <p className='text-red-600'>Please enter age </p>}
			</div>
			<div className='mb-4'>
				<label htmlFor='info'>Info</label>
				<br />
				<input
					className='border-2 border-black rounded-md p-2'
					type='text'
					id='info'
					placeholder='Info'
					value={info}
					onChange={(e) => {
						setInfo(e.target.value);
						setError4(!e.target.value);
					}}
				/>
				{error4 && <p className='text-red-600'>Please enter info</p>}
			</div>
			<button className='bg-black p-2 text-white rounded-md' type='submit'>
				Submit
			</button>
		</form>
	);
};

export default FormPage;

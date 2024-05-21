import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './store/reducer';
import Countries from './pages/countries';

describe('Countries Component', () => {
	let store: any;

	beforeEach(() => {
		store = createStore(reducers);
	});

	test('displays loading state', async () => {
		store.dispatch({ type: 'FETCH_START' });

		const { getByText } = render(
			<Provider store={store}>
				<Countries />
			</Provider>
		);

		expect(getByText('Loading...')).toBeInTheDocument();
	});

	test('displays countries', async () => {
		const { getByText, getByRole } = render(
			<Provider store={store}>
				<Countries />
			</Provider>
		);
		expect(getByText('Countries')).toBeInTheDocument();
		expect(getByRole('CountriesData')).toBeInTheDocument();
	});

	test('displays add country modal when "Add New" button is clicked', async () => {
		const { getByText, queryByText } = render(
			<Provider store={store}>
				<Countries />
			</Provider>
		);
		expect(queryByText('Add Data')).toBeNull();

		const addNewButton = getByText('Add New');
		fireEvent.click(addNewButton);
		await waitFor(() => {
			expect(getByText('Add Data')).toBeInTheDocument();
		});
	});
});

import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { Actions } from './reducer';

export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTE1LCJ1dWlkIjoiZmZmNzhhZTQtZTc1YS00OThmLWIyZDMtMTU4NDQ4ZGVlNTk5IiwiZW1haWwiOiJzaWNhZG1pbkBtYWlsaW5hdG9yLmNvbSIsInVzZXJUeXBlIjoxLCJlbmNyeXB0VVVJRCI6IjExMDgxNDVlLTNjYmQtNDlhYS04OTU1LTgyOWQ3Y2E0YjA1MiIsImlhdCI6MTcwMTkyNjg5MX0.ode2wbAP54rPUArVaTYVm0xhbuSQGXFin7-TY4F7oR8';

export function* fetchCountries(): Generator<any, any, any> {
	try {
		const response = yield call(axios.get, 'https://devapi.singlearning.com/api/v1/admin/country-code/list', { headers: { Authorization: `Bearer ${token}` } });
		const data = response.data;
		yield put({ type: Actions.fetchSuccess, payload: data });
	} catch (err) {
		yield put({ type: Actions.fetchSuccess, payload: err });
		console.log(err);
	}
}

export function* createCountry(action: any): Generator<any, any, any> {
	try {
		const response = yield call(axios.post, 'https://devapi.singlearning.com/api/v1/admin/country-code', action.payload, { headers: { Authorization: `Bearer ${token}` } });
		if (response.status === 200) {
			yield put({ type: Actions.addCountryModal, payload: false });
			yield put({ type: Actions.fetchStart });
		}
		yield put({ type: Actions.addSuccess });
	} catch (err) {
		yield put({ type: Actions.addFail, payload: err });
		console.log(err);
	}
}

export function* getCountry(action: any): Generator<any, any, any> {
	try {
		const response = yield call(axios.get, `https://devapi.singlearning.com/api/v1/admin/country-code/${action.payload}`, { headers: { Authorization: `Bearer ${token}` } });
		const data = response.data;
		yield put({ type: Actions.getSuccess, payload: data });
	} catch (err) {
		yield put({ type: Actions.getFail, payload: err });
		console.log(err);
	}
}

export function* editCountry(action: any): Generator<any, any, any> {
	const { id, data } = action.payload;
	try {
		const response = yield call(axios.put, `https://devapi.singlearning.com/api/v1/admin/country-code/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });
		if (response.status === 200) {
			yield put({ type: Actions.addCountryModal, payload: false });
			yield put({ type: Actions.fetchStart });
		}
		yield put({ type: Actions.addSuccess });
	} catch (err) {
		yield put({ type: Actions.addFail, payload: err });
		console.log(err);
	}
}

export function* deleteCountry(action: any): Generator<any, any, any> {
	try {
		const response = yield call(axios.delete, `https://devapi.singlearning.com/api/v1/admin/country-code/${action.payload}`, { headers: { Authorization: `Bearer ${token}` } });
		if (response.status === 200) {
			yield put({ type: Actions.fetchStart });
		}
		yield put({ type: Actions.fetchSuccess });
	} catch (err) {
		yield put({ type: Actions.getFail, payload: err });
		console.log(err);
	}
}

export function* CountriesSaga() {
	yield takeEvery(Actions.fetchStart, fetchCountries);
	yield takeEvery(Actions.addStart, createCountry);
	yield takeEvery(Actions.getStart, getCountry);
	yield takeEvery(Actions.editStart, editCountry);
	yield takeEvery(Actions.delStart, deleteCountry);
}

export default CountriesSaga;

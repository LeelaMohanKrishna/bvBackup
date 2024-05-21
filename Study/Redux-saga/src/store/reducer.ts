export type CreateCountryData = {
	countryName: string;
	countryCode: string;
	phoneCode: string | number;
};

export type CountryArr = {
	status: number;
	message: string;
	data: {
		id: number;
		uuid: string;
		countryCode: string;
		phoneCode: string | number;
		countryName: string;
		isActive: boolean;
	};
};

export type AddEditCountryData = {
	onSubmit: () => void;
	onClose: () => void;
	editData: CountryArr | null;
	disabled: boolean;
};

export type CountryData = {
	status: number;
	message: string;
	data: {
		data: {
			id: number;
			uuid: string;
			countryCode: string;
			phoneCode: string | number;
			countryName: string;
			isActive: boolean;
		}[];
		count: number;
	};
} | null;

export interface InitialStateData {
	countries: CountryData;
	isLoading: boolean;
	error: string | null;
	addData: boolean;
	country: CreateCountryData;
	countryObject: CountryArr | null;
	id: string;
}

const initialState: InitialStateData = {
	countries: null,
	isLoading: false,
	error: null,
	addData: false,
	country: { countryName: '', countryCode: '', phoneCode: '' },
	countryObject: null,
	id: '',
};

export enum Actions {
	fetchStart = 'FETCH_COUNTRIES_START',
	fetchSuccess = 'FETCH_COUNTRIES_SUCCESS',
	fetchFail = 'FETCH_COUNTRIES_FAIL',
	addCountryModal = 'ADD_MODAL',
	addStart = 'ADD_COUNTRIES_START',
	addSuccess = 'ADD_COUNTRIES_SUCCESS',
	addFail = 'ADD_COUNTRIES_FAIL',
	getStart = 'GET_COUNTRIES_START',
	getSuccess = 'GET_COUNTRIES_SUCCESS',
	getFail = 'GET_COUNTRIES_FAIL',
	editStart = 'EDIT_COUNTRIES_START',
	delStart = 'DELETE_COUNTRIES_START',
}

const reducers = (state = initialState, action: { payload: any; type: string }) => {
	switch (action.type) {
		case Actions.fetchStart:
			return { ...state, isLoading: true };
		case Actions.fetchSuccess:
			return { ...state, countries: action.payload, isLoading: false };
		case Actions.fetchFail:
			return { ...state, error: action.payload, isLoading: false };
		case Actions.addCountryModal:
			return { ...state, addData: !state.addData };
		case Actions.addStart:
			return { ...state, country: action.payload, isLoading: true };
		case Actions.addSuccess:
			return { ...state, isLoading: false };
		case Actions.addFail:
			return { ...state, error: action.payload, isLoading: false };
		case Actions.getStart:
			return { ...state, id: action.payload, isLoading: true };
		case Actions.getSuccess:
			return { ...state, countryObject: action.payload, isLoading: false };
		case Actions.getFail:
			return { ...state, error: action.payload, isLoading: false };
		case Actions.editStart:
			return { ...state, id: action.payload.id, country: action.payload.data, isLoading: true };
		case Actions.delStart:
			return { ...state, id: action.payload, isLoading: true };
		default:
			return state;
	}
};

export default reducers;

import { applyMiddleware, createStore } from 'redux';
import reducers from './reducer';
import createSagaMiddleware from 'redux-saga';
import CountriesSaga from './saga';

const sagaMiddleware: any = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(CountriesSaga);

export default store;

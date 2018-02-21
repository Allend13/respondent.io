import {createStore, applyMiddleware, compose} from 'redux'
import 'babel-polyfill';
import createSagaMiddleware from 'redux-saga'
import reducer from '../reducers/index'
import logger from '../middlewares/logger'
import {rootSaga} from '../middlewares/sagas'


const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const enhancer = process.env.NODE_ENV === 'production' ? applyMiddleware(sagaMiddleware)
  : applyMiddleware(sagaMiddleware, logger)


const store = createStore(reducer, {}, composeEnhancers(enhancer))

sagaMiddleware.run(rootSaga)

window.store = store

export default store
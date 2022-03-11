import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from '../reducers/Reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const loggerMiddleware = createLogger();

const store = createStore(
    reducer,composeWithDevTools(applyMiddleware(
        thunk,
        loggerMiddleware
    ))
    
);

export default store;


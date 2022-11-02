
import { createStore, combineReducers } from 'redux';
import reducer from './reducer';
import reducercopy from './reducercopy';
const reducerr = combineReducers({todo:reducer, user:reducercopy })
const store = createStore(reducerr)

export default store
import { combineReducers } from 'redux';
import reducer from './hotelReducer';
import brandReducer from './brandReducer';

const rootReducer = combineReducers({
  hotels: reducer,
  brands: brandReducer, 
});

export default rootReducer;

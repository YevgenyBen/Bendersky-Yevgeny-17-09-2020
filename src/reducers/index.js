
import { combineReducers } from 'redux';
import favoritesReducer from './FavoritesReducer';
import currentLocationReducer from './CurrentLocationReducer'
import tempReducer from './TempReducer'

const rootReducer = combineReducers({
	favoritesReducer,
	currentLocationReducer,
	tempReducer
});

export default rootReducer;

import { combineReducers } from 'redux';
import favoritesReducer from './FavoritesReducer';

const rootReducer = combineReducers({
	favoritesReducer,
});

export default rootReducer;
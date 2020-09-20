
const initialState = {
	favorites: [],
};

const FavoritesReducer = (state = initialState, action) => {

	switch (action.type) {
		case 'ADD_FAVORITE':
			return {
				...state,
				favorites:[...state.favorites, action.payload]
			};
		case 'REMOVE_FAVORITE':
			return {
				...state,
				items: [
					...state.favorites.slice(0, action.payload),
					...state.favorites.slice(action.payload + 1)
				],
			};
		default:
			return state;
	}
};

export default FavoritesReducer;
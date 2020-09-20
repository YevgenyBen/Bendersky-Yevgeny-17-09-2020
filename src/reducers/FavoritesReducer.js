const FavoritesReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_FAVORITE':
			return [...state, action.payload]
		case 'REMOVE_FAVORITE':
			return [...state.filter(item=>item.location!==action.payload.location)]
		default:
			return state;
	}
};

export default FavoritesReducer;
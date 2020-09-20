const initialState = {
    location:'',
    locationKey:''
  };
  
  const currentLocationReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_LOCATION":
        return {
          ...state,
          location: action.payload.location,
          locationKey:action.payload.locationKey
        };
      default:
        return state;
    }
  };
  export default currentLocationReducer;
const initialState = {
    Fahrenheit:false
  };
  
  const tempReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_UNITS":
        return {
          ...state,
          Fahrenheit:!state.Fahrenheit
        };
      default:
        return state;
    }
  };
  export default tempReducer;
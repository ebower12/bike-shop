export const initialState = {
  availableBikes: [],
};

function bikesReducer(state, action) {
  switch (action.type) {
    case "update": {
      const newState = {
        availableBikes: action.availableBikes,
      };
      state = newState;
      break;
    }
    default: {
      console.log("Invalid action type");
      break;
    }
  }

  return state;
}

export default bikesReducer;

export const initialState = {
  options: {
    frame: "Full-Suspension",
    finish: "Matte",
    wheels: "Road",
    rimColor: "Red",
    chain: "Single-Speed",
  },
};

function configReducer(state, action) {
  switch (action.type) {
    case "update": {
      const newState = {
        options: action.options,
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

export default configReducer;

import ConfigData from "../config-data";

export const initialState = {
  options: {
    frame: ConfigData.frame[0],
    finish: ConfigData.finish[0],
    wheels: ConfigData.wheels[0],
    rimColor: ConfigData.rimColor[0],
    chain: ConfigData.chain[0],
  },
};

function configReducer(state, action) {
  switch (action.type) {
    case "update": {
      const newState = {
        options: action.options,
      };

      if (action.options.wheels === "Mountain") {
        newState.options.frame = "Full-Suspension";
      }

      if (action.options.wheels === "Fat Bike") {
        newState.options.rimColor = undefined;
      }

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

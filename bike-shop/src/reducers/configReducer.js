export const initialState = {
  availableOptions: {
    frame: ["Full-Suspension", "Diamond", "Step-Through"],
    finish: ["Matte", "Shiny"],
    wheels: ["Road", "Mountain", "Fat Bike"],
    rimColor: ["Red", "Black", "Blue"],
    chain: ["Single-Speed", "8-Speed"],
  },
  selectedOptions: {
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
        availableOptions: action.availableOptions,
        selectedOptions: action.selectedOptions,
      };

      if (action.selectedOptions.wheels === "Mountain") {
        newState.selectedOptions.frame = "Full-Suspension";
      }

      if (action.selectedOptions.wheels === "Fat Bike") {
        newState.selectedOptions.rimColor = undefined;
      }

      state = newState;
      break;
    }
    case "updateAvailableOptions": {
      const newState = {
        availableOptions: action.availableOptions,
        selectedOptions: action.selectedOptions,
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

export const initialState = {
  cartItems: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "update": {
      const newState = {
        cartItems: action.cartItems,
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

export default cartReducer;

const init_state = {
  cartList: [],
  message: "",
};

const reducer = (state = init_state, action) => {
  switch (action.type) {
    case "FILL_CART":
      return { ...state, cartList: action.payload };
    case "ERROR_CART":
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

export default reducer;

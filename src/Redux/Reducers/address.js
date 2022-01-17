const init_state = {
  addressList: [],
  message: "",
};

const reducer = (state = init_state, action) => {
  switch (action.type) {
    case "USER_ADDRESS":
      return { ...state, addressList: action.payload };
    case "ERROR_CART":
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

export default reducer;

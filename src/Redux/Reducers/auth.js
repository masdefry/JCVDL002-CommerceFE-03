const init_state = {};

const auth = (state = init_state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { dataLogin: action.payload };
    default:
      return state;
  }
};

export default auth;

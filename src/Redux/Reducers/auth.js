const init_state = {
  username: "",
  email: "",
  user_role_id: 3,
  id: 0,
  token: "",
  message: "",
  error: "",
  storageIsChecked: false,
};

const auth = (state = init_state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, ...action.payload };
    case "USER_LOGIN_ERROR":
      return { ...state, error: action.payload };
    case "USER_REGISTER":
      return { ...state, message: action.payload };
    case "USER_REGISTER_ERROR":
      return { ...state, message: action.payload };
    case "USER_LOGOUT":
      return { ...init_state, storageIsChecked: true };
    default:
      return state;
  }
};

export default auth;

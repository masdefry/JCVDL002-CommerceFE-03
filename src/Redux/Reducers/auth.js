const init_state = {
  username: "",
  email: "",
  user_role_id: 3,
  id: 0,
  token: "",
  error: "",
  storageIsChecked: false,
};

const auth = (state = init_state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...init_state, ...action.payload };
    case "USER_LOGIN_ERROR":
      return { ...init_state, error: action.payload };
    case "USER_REGISTER":
      return { ...init_state, ...action.payload };
    case "USER_REGISTER_ERROR":
      return { ...init_state, error: action.payload };
    case "USER_LOGOUT":
      return { ...init_state, storageIsChecked: true };
    default:
      return state;
  }
};

export default auth;

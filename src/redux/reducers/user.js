const INITIAL_STATE = {
  email: 'peksks',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;

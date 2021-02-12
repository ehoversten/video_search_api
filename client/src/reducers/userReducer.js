
export const userReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USER_INFO':
      return state.user
    default:
      return state;
  }
};

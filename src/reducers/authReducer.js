
export const authReducer = (state, action) => {
  switch(action.type) {
    case 'SIGN_IN':
      return {user: action.user, token: action.token}
    case 'SIGN_OUT':
      return {}
    default:
      return state
  }
}
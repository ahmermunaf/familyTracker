import SignIn_Action from '../actions/signin_action.js'
function SignIn_Reducer(state = {err:''}, action) {
  switch (action.type) {
  case SignIn_Action.SignIn:
    console.log(Object.assign({}, action.data),'reducer')
    return Object.assign({}, action.data);
  default:
    return state
  }
}

export default SignIn_Reducer;
import SignUp_Action from '../actions/signup_action.js'
function SignUp_Reducer(state = {err:''}, action) {
  switch (action.type) {
  case SignUp_Action.SignUp:
    console.log(Object.assign({}, action.data),'reducer')
    return Object.assign({}, action.data);
  default:
    return state
  }
}

export default SignUp_Reducer;
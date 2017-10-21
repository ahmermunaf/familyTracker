import GettingUserName_Action from '../actions/gettingUserName_action.js'
function GettingUserName_Reducer(state = [], action) {
  switch (action.type) {
  case GettingUserName_Action.UserName:
    return action.data;
  default:
    return state
  }
}

export default GettingUserName_Reducer;
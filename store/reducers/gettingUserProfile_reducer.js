import GettingUserProfile_Action from '../actions/gettingUserProfile_action.js'
function GettingUserProfile_Reducer(state = [], action) {
  switch (action.type) {
  case GettingUserProfile_Action.UserProfile:
    return action.data;
  default:
    return state
  }
}

export default GettingUserProfile_Reducer;
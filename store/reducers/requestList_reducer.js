import RequestList_Action from '../actions/requestList_action.js'
export default function RequestList_Reducer(state = [], action) {
  switch (action.type) {
  case RequestList_Action.RequestList:
    return action.data;
  default:
    return state
  }
}
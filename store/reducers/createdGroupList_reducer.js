import CreatedGroupList_Action from '../actions/createdGroupList_action.js'
export default function CreatedGroupList_Reducer(state = [], action) {
  switch (action.type) {
  case CreatedGroupList_Action.GroupList:
    return action.data;
  default:
    return state
  }
}
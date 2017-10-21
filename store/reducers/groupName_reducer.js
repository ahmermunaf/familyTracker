import CreatedGroupList_Action from '../actions/createdGroupList_action.js'
export default function GroupName_Reducer(state = '', action) {
    switch (action.type) {
    case CreatedGroupList_Action.GroupName:
      return action.data;
    default:
      return state
    }
  }
  
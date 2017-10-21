import JointGroup_Action from '../actions/jointGroup_action.js'
export default function Name_Reducer(state = '', action) {
  switch (action.type) {
  case JointGroup_Action.Name:
    return action.data;
  default:
    return state
  }
}
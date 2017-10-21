import JointGroup_Action from '../actions/jointGroup_action.js'
export default function JointGroup_Reducer(state = {}, action) {
  switch (action.type) {
  case JointGroup_Action.JointGroup:
    return Object.assign({}, action.data);
  default:
    return state
  }
}
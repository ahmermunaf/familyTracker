import CreateGroup_Action from '../actions/createGroup_action.js'
function CreateGroup_Reducer(state = {err:''}, action) {
  switch (action.type) {
  case CreateGroup_Action.CreateGroup:
    console.log(Object.assign({}, action.data),'reducer')
    return Object.assign({}, action.data);
  default:
    return state
  }
}

export default CreateGroup_Reducer;
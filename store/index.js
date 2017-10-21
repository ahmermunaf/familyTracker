import { createStore } from 'redux'
import { combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import SignUp_Reducer from './reducers/signup_reducer.js'
import GettingUserName_Reducer from './reducers/gettingUserName_reducer.js'
import GettingUserProfile_Reducer from './reducers/gettingUserProfile_reducer.js'
import CreatedGroupList_Reducer from './reducers/createdGroupList_reducer.js'
import RequestList_Reducer from './reducers/requestList_reducer.js'
import GroupName_Reducer from './reducers/groupName_reducer.js'
import JointGroup_Reducer from './reducers/jointGroup_reducer.js'
import SignIn_Reducer from './reducers/signin_reducer.js'
import Name_Reducer from './reducers/name_reducer.js'

const middleware = applyMiddleware(thunk);
export const rootReducer = combineReducers({
    SignUp_Reducer,
    GettingUserName_Reducer,
    SignIn_Reducer,
    GettingUserProfile_Reducer,
    CreatedGroupList_Reducer,
    GroupName_Reducer,
    RequestList_Reducer,
    JointGroup_Reducer,
    Name_Reducer
})
let store = createStore(
  rootReducer,
  middleware
  )
export default store;
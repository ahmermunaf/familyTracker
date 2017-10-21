import SignIn_Action from "./../actions/signin_action.js";
import * as firebase from 'firebase';
export default class SignIn_Middleware {
    static asyncSignInData(data) {
          return (dispatch) => {
            var userData = data
            firebase.auth().signInWithEmailAndPassword(userData.email,userData.password).then(()=>{
                dispatch(SignIn_Action.SignInData({err:'success'}))
            
    }).catch((error)=>{
                    dispatch(SignIn_Action.SignInData({err:error.message}))
            })
        }
    }
}
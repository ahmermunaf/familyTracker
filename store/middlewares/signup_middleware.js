import SignUp_Action from "./../actions/signup_action.js";
import * as firebase from 'firebase';
export default class SignUp_Middleware {
    static asyncSignUpData(data) {
          return (dispatch) => {
            var userData = data
            var errFlag = false
            var err = ''
           // console.log(data)
            firebase.auth().createUserWithEmailAndPassword(userData.email,userData.password).catch((error)=>{
                    console.log(error,'middleware')
                    errFlag = true
                    dispatch(SignUp_Action.SignUpData({err:error.message}))
            }).then(()=>{
                if(errFlag === false ){
                        const uid = firebase.auth().currentUser.uid
                        firebase.database().ref('users').child('user'+uid).set({
                            email:userData.email,
                            userName:userData.userName,
                            phoneNumber:userData.phoneNumber
                        })
                        firebase.database().ref('userNames').child(userData.userName).set({
                            admin:'',
                            joinGroups:'',
                            requests:''
                        })
                        dispatch(SignUp_Action.SignUpData({err:'success'}))
                    }
            })
        }
    } 
}
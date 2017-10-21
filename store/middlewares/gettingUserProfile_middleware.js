import GettingUserProfile_Action from "./../actions/gettingUserProfile_action.js";
import * as firebase from 'firebase';
export default class GettingUserProfile_Middleware {
    static asyncUserProfileData() {
          return (dispatch) => {  
            var arr = [];
            var uid = firebase.auth().currentUser.uid
            firebase.database().ref('users').child('user'+uid).once('value').then((snapshot)=>{
                var data = snapshot.val()
                firebase.database().ref('userNames').child(data.userName).on('value',(snap)=>{
                    var mainObj = snap.val()
                    arr.push(mainObj)
                    dispatch(GettingUserProfile_Action.UserProfileData(arr))
                })
            })
        }
    } 
}
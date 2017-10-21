import JointGroup_Action from "./../actions/jointGroup_action.js";
import * as firebase from 'firebase';
export default class JointGroup_Middleware {
    static asyncJointGroupData() {
          return (dispatch) => {  
            var uid = firebase.auth().currentUser.uid
            var arr = [];
            var mainArr=[]
            firebase.database().ref('users').child('user'+uid).once('value').then((snapshot)=>{
                var userName = snapshot.val().userName
                firebase.database().ref('userNames').child(userName).child('joinGroups').once('value').then((snap)=>{
                    var mainObj = snap.val()
                    if(mainObj!=='' && mainObj!==null){ 
                        for(let a in mainObj){
                            arr.push(a)
                            mainArr.push(mainObj[a])
                        }
                        dispatch(JointGroup_Action.JointGroupData({groupName:arr,mainArr:mainArr}))
                    }
                    })
                })
            }
        }
        static asyncGroupName(value) {
            return (dispatch) => {
                dispatch(JointGroup_Action.GroupName(value))
            }
        }
    }
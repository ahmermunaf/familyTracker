import CreatedGroupList_Action from "./../actions/createdGroupList_action.js";
import * as firebase from 'firebase';
export default class CreatedGroupList_Middleware {
    static asyncGroupListData() {
          return (dispatch) => {  
            var uid = firebase.auth().currentUser.uid
            var arr = [];
            firebase.database().ref('users').child('user'+uid).once('value').then((snapshot)=>{
                var userName = snapshot.val().userName
                firebase.database().ref('userNames').child(userName).child('admin').once('value').then((snap)=>{
                    var mainObj = snap.val()
                    if(mainObj!=='' && mainObj!==null){ 
                        for(let a in mainObj){
                            arr.push(a)
                        }
                        dispatch(CreatedGroupList_Action.GroupListData(arr))
                    }
                    })
                })
            }
        }
    static asyncGroupNameData(value){
        return (dispatch) => {  
                  dispatch(CreatedGroupList_Action.GroupNameData(value))
            }
        } 
    }
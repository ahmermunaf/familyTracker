import GettingUserName_Action from "./../actions/gettingUserName_action.js";
import * as firebase from 'firebase';
export default class GettingUserName_Middleware {
    static asyncUserNameData() {
          return (dispatch) => {  
            var arr = [];
            firebase.database().ref('userNames').on('value',(snap)=>{
                  var mainObj = snap.val()
                for(let a in mainObj){
                    arr.push(a)
                }
                console.log(arr)
            })
          dispatch(GettingUserName_Action.UserNameData(arr))
        }
    } 
}
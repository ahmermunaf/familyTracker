import RequestList_Action from "./../actions/requestList_action.js";
import * as firebase from 'firebase';
import { Dimensions } from 'react-native';

export default class RequestList_Middleware {
    static asyncRequestListData() {
          return (dispatch) => {  
            var uid = firebase.auth().currentUser.uid
            var arr = [];
            firebase.database().ref('users').child('user'+uid).once('value').then((snapshot)=>{
                var userName = snapshot.val().userName
                firebase.database().ref('userNames').child(userName).child('requests').once('value').then((snap)=>{
                    var mainObj = snap.val()
                    if(mainObj!=='' && mainObj!==null){ 
                        for(let a in mainObj){
                            arr.push(a)
                        }
                        dispatch(RequestList_Action.RequestListData(arr))
                    }
                    })
                })
            }
        }
        static asyncResponseData(value) {
            return (dispatch) => {
                const {width,height} = Dimensions.get('window')
                const SCREEN_HEIGHT = height
                const SCREEN_WIDTH = width
                const ASPECT_RATIO = width/height
                const LATITUDE_DELTA = 0.098
                const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO 
                var lat
                var long
                navigator.geolocation.getCurrentPosition((position)=>{
                     lat = parseFloat(position.coords.latitude)
                     long = parseFloat(position.coords.longitude)
                })  
                var response = value
                var uid = firebase.auth().currentUser.uid
                firebase.database().ref('users').child('user'+uid).once('value').then((snapshot)=>{
                    var userName = snapshot.val().userName
                    if(response.flag === 'accept'){
                        firebase.database().ref('userNames').child(userName).child('joinGroups').update({
                            [response.groupName]:'member'
                        })
                    firebase.database().ref('groupNames').child(response.groupName).child('members').update({
                        [userName]:{
                            latitude:lat,
                            longitude:long,
                            latitudeDelta:LATITUDE_DELTA,
                            longitudeDelta:LONGITUDE_DELTA
                        }
                    })
                    firebase.database().ref('userNames').child(userName).child('requests').child(response.groupName).remove()
                    }
                else if(response.flag === 'ignore'){
                    firebase.database().ref('userNames').child(userName).child('requests').child(response.groupName).remove()
                }
                })
            }
        }
    }
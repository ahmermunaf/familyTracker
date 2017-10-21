import CreateGroup_Action from "./../actions/createGroup_action.js";
import * as firebase from 'firebase';
import { Dimensions } from 'react-native';

export default class CreateGroup_Middleware {
    static asyncCreateGroupData(data) {
          return (dispatch) => {
            const {width,height} = Dimensions.get('window')
            const SCREEN_HEIGHT = height
            const SCREEN_WIDTH = width
            const ASPECT_RATIO = width/height
            const LATITUDE_DELTA = 0.098
            const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO 
            var createGroupData = data
            var uid = firebase.auth().currentUser.uid
            var userName;
            var lat
            var long
            navigator.geolocation.getCurrentPosition((position)=>{
                 lat = parseFloat(position.coords.latitude)
                 long = parseFloat(position.coords.longitude)
            })
            firebase.database().ref('users').child('user'+uid).once('value').then((snap)=>{
                var mainObj = snap.val()
                userName = mainObj.userName
                firebase.database().ref('groupNames').child(createGroupData).set({
                    admin:userName,
                    members:{
                        [userName]:{
                            latitude:lat,
                            longitude:long,
                            latitudeDelta:LATITUDE_DELTA,
                            longitudeDelta:LONGITUDE_DELTA
                        }
                    }
                })
                firebase.database().ref('userNames').child(userName).child('admin').set({
                    [createGroupData]:'admin'
                })
                firebase.database().ref('userNames').child(userName).child('joinGroups').set({
                    [createGroupData]:'admin'
                })
            })
        }
    }
}
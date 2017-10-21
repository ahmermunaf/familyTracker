import React, { Component } from 'react';
import MapPage_Component from './../components/mapPage_component.js'
import { connect } from 'react-redux'
import GettingUserProfile_Middleware from './../store/middlewares/gettingUserProfile_middleware.js'
import { Dimensions } from 'react-native'
import * as firebase from 'firebase';

function mapStateToProps(state) {
    return {
        userProfile:state.GettingUserProfile_Reducer
    }
}
function mapDispatchToProps(dispatch) { 
    return {
        gettingUserProfile:()=>dispatch(GettingUserProfile_Middleware.asyncUserProfileData())
    };
};

const {width,height} = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width/height
const LATITUDE_DELTA = 0.098
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO 

class MapPage_Container extends Component{
    componentWillMount(){
        this.props.gettingUserProfile()
    }
//     watchID: ?number = null
//     async componentDidMount () {
//     this.watchID =navigator.geolocation.watchPosition((position)=>{
//       var lat = parseFloat(position.coords.latitude)
//       var long = parseFloat(position.coords.longitude)
//       var lastRegion = {
//         latitude: lat,
//         longitude: long,
//         latitudeDelta: LATITUDE_DELTA,
//         longitudeDelta: LONGITUDE_DELTA
//       }
//       var userName;
//       var arr=[];
//         firebase.database().ref('users').child('user'+firebase.auth().currentUser.uid).on('value',(snap)=>{
//         userName=snap.val().userName
//         firebase.database().ref('userNames').child(userName).child('joinGroups').on('value',(snapshot)=>{
//           var mainObj = snap.val()
//           if(mainObj!=='' && mainObj!==null){ 
//               for(let a in mainObj){
//                   arr.push(a)
//               }
//               for(var i = 0;i<arr.length;i++){
//                 firebase.database().ref('groupName').child(arr[i]).child('members').update(lastRegion)
//               }
//             }
//         })
//       })
//     })
//   }
//   componentWillUnmount(){
//     navigator.geolocation.clearWatch(this.watchID)
//   }
    render(){
        return(
            <MapPage_Component userProfile={this.props.userProfile} />
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MapPage_Container)
import React, { Component } from 'react';
import Signin_Container from './../containers/signin_container.js';
import Signup_Container from './../containers/signup_container.js';
import MapPage_Container from './../containers/mapPage_container.js';
import CreateGroup_Container from './../containers/createGroup_container.js';
import AddMember_Container from './../containers/addMember_container.js';
import CreatedGroupList_Container from './../containers/createdGroupList_container.js';
import RequestList_Container from './../containers/requestList_container.js';
import JointGroup_Container from './../containers/jointGroup_container.js';
import UserMap_Container from './../containers/userMap_container.js';
import * as firebase from 'firebase';
import {Router, Scene , Actions } from 'react-native-router-flux';

export default class Route extends Component {
    render(){
        return(
            <Router>
                <Scene key="root">
                    <Scene 
                    key="signin_container"
                    component={Signin_Container}
                    hideNavBar={true}
                    initial={true}
                    />
                    <Scene 
                    key="signup_container"
                    component={Signup_Container}
                    hideNavBar={true} 
                    />
                    <Scene 
                    key="mapPage_container"
                    component={MapPage_Container}
                    hideNavBar={true}
                    />
                    <Scene 
                    key="createGroup_container"
                    component={CreateGroup_Container}
                    hideNavBar={true}
                    />
                    <Scene 
                    key="addMember_container"
                    component={AddMember_Container}
                    hideNavBar={true}
                    />
                    <Scene 
                    key="createdGroupList_container"
                    component={CreatedGroupList_Container}
                    hideNavBar={true}
                    />
                    <Scene 
                    key="requestList_container"
                    component={RequestList_Container}
                    hideNavBar={true}
                    />
                    <Scene 
                    key="jointGroup_container"
                    component={JointGroup_Container}
                    hideNavBar={true}
                    />
                    <Scene 
                    key="userMap_container"
                    component={UserMap_Container}
                    hideNavBar={true}
                    />
                </Scene>
            </Router>
        )
    }
}
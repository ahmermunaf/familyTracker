import React, { Component } from 'react';
import { Content , Text , Button } from 'native-base'
import { StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import * as firebase from 'firebase';

export default class Drawer_Component extends Component{
    render(){
        return(
            <Content style={{backgroundColor:'#ffffff'}}>
                <Button transparent style={{width:'100%'}} onPress={()=>{Actions.createGroup_container()}} >
                    <Text note>
                        Create Group
                    </Text>
                </Button>
                <Button transparent style={{width:'100%'}} onPress={()=>{
                    Actions.createdGroupList_container()
                }}>
                    <Text note>
                        Your Created Groups
                    </Text>
                </Button>
                <Button transparent style={{width:'100%'}} onPress={()=>{Actions.jointGroup_container()}}>
                    <Text note>
                         Your Joint Groups
                    </Text>
                </Button>
                <Button transparent style={{width:'100%'}} onPress={()=>{Actions.requestList_container()}}>
                    <Text note>
                         Requests
                    </Text>
                </Button>
                <Button transparent style={{width:'100%'}} onPress={()=>{
                    firebase.auth().signOut()
                    Actions.signin_container()
                    }}>
                    <Text note>
                         Logout
                    </Text>
                </Button>
            </Content>
        )
    }
}

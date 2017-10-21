import React, { Component } from 'react';
import Signin_Component from './../components/signin_component'
import { connect } from 'react-redux'
import SignIn_Middleware from './../store/middlewares/signin_middleware.js'
import SignIn_Action from './../store/actions/signin_action.js'
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

function mapStateToProps(state) {
    return {
        err : state.SignIn_Reducer,
    };
}
function mapDispatchToProps(dispatch) { 
    return {
        signin : function(value){
            dispatch(SignIn_Middleware.asyncSignInData(value))
        },
        signMutation: function (value){
            dispatch(SignIn_Action.SignInData({err:''}))
        },
    };
};

class Signin_Container extends Component{
    constructor(props){
        super(props)
        this.state={
    //        user:firebase.auth().currentUser,
            err:this.props.err,
        }
    }
    async componentWillMount () {
       // alert(this.state.user)
        await firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
                 Actions.mapPage_container()
             }
           });
     }
    async componentWillReceiveProps(props){
        await this.setState({err:props.err})
    }
   async userData(value){
        await this.props.signin(value)
    }
    async mutingSignIn(value){
        await this.props.signMutation()
    }
    render(){
        return(
            <Signin_Component userData={this.userData.bind(this)} mutingSignIn={this.mutingSignIn.bind(this)} err={this.props.err.err} />
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Signin_Container)
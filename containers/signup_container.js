import React, { Component } from 'react';
import Signup_Component from './../components/signup_component'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import SignUp_Middleware from './../store/middlewares/signup_middleware.js'
import GettingUserName_Middleware from './../store/middlewares/gettingUserName_middleware.js'
import SignUp_Action from './../store/actions/signup_action.js'
import GettingUserName_Action from './../store/actions/gettingUserName_action.js'
function mapStateToProps(state) {
    return {
        err : state.SignUp_Reducer,
        userName:state.GettingUserName_Reducer
    };
}
function mapDispatchToProps(dispatch) { 
    return {
        signup : function(value){
            dispatch(SignUp_Middleware.asyncSignUpData(value))
        },
        signMutation: function (value){
            dispatch(SignUp_Action.SignUpData({err:''}))
        },
        gettingUserName:function(){
            dispatch(GettingUserName_Middleware.asyncUserNameData())
        },
        mutingUserName:function(value){
            dispatch(GettingUserName_Action.UserNameData([]))
        }
    };
};

class Signup_Container extends Component{
    constructor(props){
        super(props)
        this.state={
            err:this.props.err,
            userNameList:this.props.userName
        }
    }
    async componentWillReceiveProps(props){
        await this.setState({err:props.err,userNameList:props.userName})
    }
    async userData(value){
        await this.props.signup(value)
    }
    async mutingSignUp(value){
        await this.props.signMutation()
    }
    async gettingUserName(){
        await this.props.gettingUserName()
    }
    async mutingUserName(){
        await this.props.mutingUserName()
    }
    render(){
        console.log(this.state.err,'container')
        return(
            <Signup_Component 
            userData={this.userData.bind(this)}
            gettingUserName={this.gettingUserName.bind(this)}
            mutingUserName={this.mutingUserName.bind(this)}
            userNameList={this.state.userNameList}
            err={this.state.err.err}
            mutingSignUp={this.mutingSignUp.bind(this)}
            />
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Signup_Container)
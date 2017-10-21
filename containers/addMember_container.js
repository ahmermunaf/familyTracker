import React, { Component } from 'react';
import AddMember_Component from './../components/addMember_component.js'
import GettingUserName_Middleware from './../store/middlewares/gettingUserName_middleware.js'
import GettingUserName_Action from './../store/actions/gettingUserName_action.js'
import { connect } from 'react-redux'


function mapStateToProps(state) {
    return {
         userName:state.GettingUserName_Reducer,
         groupName:state.GroupName_Reducer
    };
}

function mapDispatchToProps(dispatch) { 
    return {
        gettingUserName:function(){
            dispatch(GettingUserName_Middleware.asyncUserNameData())
        },
        mutingUserName:function(value){
            dispatch(GettingUserName_Action.UserNameData([]))
        }
    };
};

class AddMember_Container extends Component{
    constructor(props){
            super(props)
            this.state={
                userNameList:this.props.userName,
                groupName:this.props.groupName
            }
        }
        async componentWillReceiveProps(props){
            await this.setState({userNameList:props.userName,groupName:props.groupName})
        }
        async gettingUserName(){
            await this.props.gettingUserName()
        }
    render(){
        alert(this.state.groupName)
        return(
            <AddMember_Component 
            userNameList={this.state.userNameList}
            groupName={this.state.groupName}
            gettingUserName={this.gettingUserName.bind(this)}
            mutingUserName={this.props.mutingUserName}
            />
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddMember_Container)
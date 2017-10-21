import React, { Component } from 'react';
// import GettingUserName_Middleware from './../store/middlewares/gettingUserName_middleware.js'
// import GettingUserName_Action from './../store/actions/gettingUserName_action.js'
import CreateGroup_Middleware from './../store/middlewares/createGroup_middleware.js'
import CreateGroup_Component from './../components/createGroup_component.js'
import { connect } from 'react-redux'

function mapDispatchToProps(dispatch) { 
    return {
        createUser:function(value){
            dispatch(CreateGroup_Middleware.asyncCreateGroupData(value))
        }
    };
};

class CreateGroup_Container extends Component{
    async groupData(value){
        await this.props.createUser(value)
    }
    render(){
        return(
            <CreateGroup_Component
            groupData={this.groupData.bind(this)} 
             />
        )
    }
}

export default connect(null,mapDispatchToProps)(CreateGroup_Container)
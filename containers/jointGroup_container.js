import React, { Component } from 'react';
import JointGroup_Component from './../components/jointGroup_component.js'
import { connect } from 'react-redux'
import JointGroup_Middleware from './../store/middlewares/jointGroup_middleware.js'
import JointGroup_Action from './../store/actions/jointGroup_action.js'

function mapStateToProps(state) {
    return {
        dataObj:state.JointGroup_Reducer
    };
}
function mapDispatchToProps(dispatch) { 
    return {
        gettingJointGroupData:function(){
            dispatch(JointGroup_Middleware.asyncJointGroupData())
        },
        groupName:function(value){
            dispatch(JointGroup_Middleware.asyncGroupName(value))
        }
    };
};

class JointGroup_Container extends Component{
    constructor(props){
        super(props)
        this.state={
            dataObj:this.props.dataObj
        }
    }
    componentWillReceiveProps(props){
        this.setState({dataObj:props.dataObj})
    }
    render(){
        return(
            <JointGroup_Component 
            gettingJointGroupData={this.props.gettingJointGroupData}
            dataObj={this.state.dataObj}
            groupName={this.props.groupName}
            />
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(JointGroup_Container)
import React, { Component } from 'react';
import CreatedGroupList_Component from './../components/createdGroupList_component.js'
import { connect } from 'react-redux'
import CreatedGroupList_Middleware from './../store/middlewares/createdGroupList_middleware.js'
import CreatedGroupList_Action from './../store/actions/createdGroupList_action.js'

function mapStateToProps(state) {
    return {
        groupNameList:state.CreatedGroupList_Reducer
    };
}
function mapDispatchToProps(dispatch) { 
    return {
        gettingGroupList:function(){
            dispatch(CreatedGroupList_Middleware.asyncGroupListData())
        },
        groupName:function(value){
            dispatch(CreatedGroupList_Middleware.asyncGroupNameData(value))
        }
    };
};

class CreatedGroupList_Container extends Component{
    constructor(props){
        super(props)
        this.state={
            groupNameList:this.props.groupNameList
        }
    }
    componentWillReceiveProps (nextProps) {
        this.setState({groupNameList:nextProps.groupNameList})   
    }
    render(){
        return(
            <CreatedGroupList_Component 
            gettingGroupList={this.props.gettingGroupList}
            list={this.state.groupNameList}
            groupName={this.props.groupName}
            />
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CreatedGroupList_Container)
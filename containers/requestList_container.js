import React, { Component } from 'react';
import RequestList_Component from './../components/requestList_component.js'
import { connect } from 'react-redux'
import RequestList_Middleware from './../store/middlewares/requestList_middleware.js'
import RequestList_Action from './../store/actions/requestList_action.js'

function mapStateToProps(state) {
    return {
        requestList:state.RequestList_Reducer
    };
}
function mapDispatchToProps(dispatch) { 
    return {
        gettingRequestList:function(){
            dispatch(RequestList_Middleware.asyncRequestListData())
        },
        mutingRequestList:function(){
            dispatch(RequestList_Action.RequestListData([]))
        },
        response:function(value){
            dispatch(RequestList_Middleware.asyncResponseData(value))
        }
    };
};

class RequestList_Container extends Component{
    constructor(props){
        super(props)
        this.state={
            requestList:this.props.requestList
        }
    }
    componentWillReceiveProps(props){
        this.setState({requestList:props.requestList})
    }
    render(){
        return(
            <RequestList_Component 
            gettingRequestList={this.props.gettingRequestList}
            mutingRequestList={this.props.mutingRequestList}
            requestList={this.state.requestList}
            response={this.props.response}
            />
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RequestList_Container)
import React, { Component } from 'react';
import UserMap_Component from './../components/userMap_component.js'
import { connect } from 'react-redux'
import * as firebase from 'firebase';

function mapStateToProps(state) {
    return {
        groupName:state.Name_Reducer
    };
}

class UserMap_Container extends Component{
    constructor(props){
        super(props)
        this.state={
            groupName:this.props.groupName,
            arr:[],
            mainArr:[]
        }
    }
    componentWillReceiveProps (nextProps) {
        this.setState({groupName:nextProps.groupName})
    }
    
    componentDidMount(){
        firebase.database().ref('groupNames').child(this.state.groupName).child('members').on('value',(snap)=>{
            var arr = []
            var mainArr = []
            var mainObj = snap.val() 
                for(let a in mainObj){
                    arr.push(a)
                    mainArr.push(mainObj[a])
                }
            this.setState({arr:arr,mainArr:mainArr})
        })
    }
    render(){
        return(
            <UserMap_Component 
            arr={this.state.arr}
            mainArr={this.state.mainArr}
            />
        )
    }
}

export default connect(mapStateToProps)(UserMap_Container)
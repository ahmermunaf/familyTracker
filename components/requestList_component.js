import React, { Component } from 'react';
import { Text , Button , Thumbnail , List , ListItem , Title , Header , Left , Right , Body , Container , Content , StyleProvider } from 'native-base';
import getTheme from './../native-base-theme/components/index.js';
import commonColor from './../native-base-theme/variables/commonColor.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions } from 'react-native-router-flux'
import * as firebase from 'firebase';

export default class RequestList_Component extends Component{
    constructor(props){
        super(props)
        this.state={
            requestList:this.props.requestList
        }
    }
    
   async componentWillMount() {
    await this.props.gettingRequestList()   
    }

    componentWillReceiveProps (nextProps) {
        this.setState({requestList:nextProps.requestList})
    }
    
    render(){
        return(
            <StyleProvider style={getTheme(commonColor)}>
                <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={()=>{Actions.pop()}}>
                                <Icon size={25} style={{color:'#5988ff'}} name='arrow-left' />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{color:'#5988ff'}}>Requests</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Content>
                        <List>
                            {
                                this.state.requestList.map((list,ind)=>(
                                    <ListItem style={{marginLeft:'0.5%'}} key={ind}>
                                        <Left>
                                            <Text>{list}</Text>
                                        </Left>
                                        <Right style={{flexDirection:'row'}}>
                                            <Button bordered style={{borderColor:'#4756e5',width:43,flexDirection:'row',justifyContent:'center',marginRight:5}} onPress={()=>{
                                                this.props.response({flag:'accept',groupName:list})
                                                this.props.mutingRequestList()
                                                setTimeout(()=>{this.props.gettingRequestList()},1000)
                                                }} >
                                                <Icon name='check' size={25} style={{color:'#4756e5'}} />
                                            </Button>
                                            <Button bordered style={{borderColor:'#f9183e',width:43,flexDirection:'row',justifyContent:'center',marginRight:5}} onPress={()=>{
                                                this.props.response({flag:'ignore',groupName:list})
                                                this.props.mutingRequestList()
                                                setTimeout(()=>{this.props.gettingRequestList()},1000)
                                                
                                                }} >
                                                <Icon name='close' size={25} style={{color:'#f9183e'}}/>
                                            </Button>
                                        </Right>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}
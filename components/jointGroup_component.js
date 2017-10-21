import React, { Component } from 'react';
import { Text , Button , Thumbnail , List , ListItem , Title , Header , Left , Right , Body , Container , Content , StyleProvider } from 'native-base';
import getTheme from './../native-base-theme/components/index.js';
import commonColor from './../native-base-theme/variables/commonColor.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions } from 'react-native-router-flux'
import * as firebase from 'firebase';

export default class JointGroup_Component extends Component{
    constructor(props){
        super(props)
        this.state={
            dataObj:{
                groupName:[],
                mainArr:[]
            }
        }
    }
    
   async componentWillMount() {
    await this.props.gettingJointGroupData()   
    }

    componentWillReceiveProps (nextProps) {
        this.setState({dataObj:nextProps.dataObj})
    }
    
    render(){
        alert(JSON.stringify(this.state.dataObj))
        return(
            <StyleProvider style={getTheme(commonColor)}>
                <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={()=>{Actions.mapPage_container()}}>
                                <Icon size={25} style={{color:'#5988ff'}} name='arrow-left' />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{color:'#5988ff'}}>Joint Groups</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Content>
                        <List>
                             {
                                this.state.dataObj.groupName.map((list,ind)=>(
                                    <ListItem style={{marginLeft:'0.5%'}} key={ind}>
                                        <Left>
                                            <Text>{list}</Text>
                                            <Text note>{this.state.dataObj.mainArr[ind]}</Text>
                                        </Left>
                                        <Right style={{flexDirection:'row'}}>
                                            <Button bordered style={{borderColor:'#4756e5',width:80,flexDirection:'row',justifyContent:'center',marginRight:5}} onPress={()=>{
                                                this.props.groupName(list)
                                                Actions.userMap_container()
                                                }} >
                                                <Text>View</Text>
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
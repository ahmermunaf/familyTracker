import React, { Component } from 'react';
import { Text , Button , Thumbnail , List , ListItem , Title , Header , Left , Right , Body , Container , Content , StyleProvider } from 'native-base';
import getTheme from './../native-base-theme/components/index.js';
import commonColor from './../native-base-theme/variables/commonColor.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions } from 'react-native-router-flux'

export default class CreatedGroupList_Component extends Component{
    constructor(props){
        super(props);
        this.state={
            groupList:this.props.list
        }
    }
    
    componentWillMount () {
        this.props.gettingGroupList()
    }
    componentWillReceiveProps (nextProps) {
        this.setState({groupList:nextProps.list})
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
                            <Title style={{color:'#5988ff'}}>Your Created Groups</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Content>
                        <List>
                            {
                                this.state.groupList.map((list,ind)=>(
                                    <ListItem style={{marginLeft:'0.5%'}} key={ind}>
                                        <Left>
                                            <Text>{list}</Text>
                                        </Left>
                                        <Right>
                                            <Button bordered style={{borderColor:'#4756e5',width:115,flexDirection:'row',justifyContent:'center'}} onPress={()=>{
                                                this.props.groupName(list)
                                                Actions.addMember_container()
                                                }} >
                                                <Text>Add Members</Text>
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
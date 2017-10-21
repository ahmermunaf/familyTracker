import React, { Component } from 'react';
import { Text , Container , Content , Header , Item , Input , Button , Title , Drawer , StyleProvider , Body , Left , Right } from 'native-base'
import { Dimensions ,View } from 'react-native'
import getTheme from './../native-base-theme/components/index.js';
import commonColor from './../native-base-theme/variables/commonColor.js';
import { Actions } from 'react-native-router-flux'
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class AddMember_Component extends Component{
    constructor(props){
        super(props);
        this.state={
            borderColorUsername:'#cccccc',
            userNameFlag:'',
            userName:'',
            groupName:this.props.groupName,
            userNameList:this.props.userNameList,
            mode:(Dimensions.get('window').width<Dimensions.get('window').height) ? 'portrait':'landscape',
        }
    }    
    componentWillMount(){
        Dimensions.addEventListener('change',(data)=>{
          this.setState({
            mode:(Dimensions.get('window').width<Dimensions.get('window').height) ? 'portrait':'landscape'
          })
        })
        this.props.gettingUserName()
      }
      componentWillUnmount(){
        Dimensions.removeEventListener('change',(data)=>{
          this.setState({
            mode:(Dimensions.get('window').width<Dimensions.get('window').height) ? 'portrait':'landscape'
          })
        })
      }
      async componentWillReceiveProps(props){
        await this.setState({userNameList:props.userNameList,groupName:props.groupName})
    }
    render(){
        return(
            <StyleProvider style={getTheme(commonColor)}>
                <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={()=>{Actions.pop()}}>
                                <Icon size={25} name='arrow-left' />
                            </Button>
                        </Left>
                        <Body>
                            <Title style={{color:'#5988ff'}}>Create Group</Title>
                        </Body>
                    </Header>
                    <Content style={{backgroundColor:'#fff'}}>
                        <View style={(this.state.mode==='landscape') ? {flexDirection:'column',alignItems:'center',marginTop:'7%'}:{flexDirection:'column',alignItems:'center',marginTop:'35%'}}>
                            <View style={{flexDirection:'column',justifyContent:'center',width:'95%'}}>
                                <Item
                                style={{marginBottom:10,borderWidth:1,borderColor:this.state.borderColorUsername,backgroundColor:'#ededed',borderRadius:10,width:'100%',height:50}} 
                                >
                                <Input 
                                onFocus={()=>{
                                    this.setState({borderColorUsername:'#6d6d6d'})
                                    }}
                                onBlur={()=>{
                                    this.setState({borderColorUsername:'#cccccc'})
                                }}
                                placeholder='Add Member'
                                value={this.state.userName}
                                onChangeText={(data)=>{
                                    this.setState({userName:data})
                                    if(this.state.userNameFlag===''||this.state.userNameFlag===true){
                                        this.setState({userNameFlag:false})
                                    }
                                    if(data===''){
                                        this.setState({userNameFlag:''})
                                    }
                                    for(var i = 0;i < this.state.userNameList.length;i++){
                                        if(data === this.state.userNameList[i]){
                                            this.setState({userNameFlag:true})
                                        }
                                    }
                                }} 
                                />
                                {(this.state.userName !== '') ? 
                                <Icon size={30} style={{color:(this.state.userNameFlag === false) ? 'red':'green'}} name={(this.state.userNameFlag === false) ? 'alert-circle':'check-circle'}/>:
                                <Text></Text>}
                                </Item> 
                                <Button 
                                bordered
                                onPress={()=>{
                                    if(this.state.userNameFlag === true){
                                        firebase.database().ref('userNames').child(this.state.userName).child('requests').update({
                                            [this.state.groupName]:'request'
                                        })
                                        Actions.mapPage_container()
                                    }
                                }}
                                style={{justifyContent:'center',marginBottom:10,borderWidth:1,borderColor:'#5988ff',borderRadius:10,width:'100%',height:50}} 
                                >
                                    <Text style={{color:'#b3c7f9'}}>
                                        Create
                                    </Text>
                                </Button>
                            </View>
                        </View>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}
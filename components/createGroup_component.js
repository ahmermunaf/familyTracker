import React, { Component } from 'react';
import { Text , Container , Content , Header , Item , Input , Button , Title , Drawer , StyleProvider , Body , Left , Right } from 'native-base'
import { Dimensions ,View } from 'react-native'
import getTheme from './../native-base-theme/components/index.js';
import commonColor from './../native-base-theme/variables/commonColor.js';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from 'firebase';

export default class CreateGroup_Component extends Component{
    constructor(props){
        super(props);
        this.state={
            borderColorGroupName:'#cccccc',
            // borderColorUsername:'#cccccc',
            groupName:'',
            groupNameFlag:'',
            groupNameList:[],
            // userNameFlag:'',
            // userName:'',
            // userNameList:this.props.userNameList,
            mode:(Dimensions.get('window').width<Dimensions.get('window').height) ? 'portrait':'landscape',
        }
    }
    async componentDidMount(){
        var arr = []
       await firebase.database().ref('groupNames').on('value',(snap)=>{
            var mainObj = snap.val()
            for(let a in mainObj){
                arr.push(a)
            }
        })
       await this.setState({groupNameList:arr})
    }
    componentWillMount(){
        Dimensions.addEventListener('change',(data)=>{
          this.setState({
            mode:(Dimensions.get('window').width<Dimensions.get('window').height) ? 'portrait':'landscape'
          })
        })
        // this.props.gettingUserName()
      }
      componentWillUnmount(){
        Dimensions.removeEventListener('change',(data)=>{
          this.setState({
            mode:(Dimensions.get('window').width<Dimensions.get('window').height) ? 'portrait':'landscape'
          })
        })
      }
    //   async componentWillReceiveProps(props){
    //     await this.setState({userNameList:props.userNameList})
    // }
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
                                style={{marginBottom:10,borderWidth:1,borderColor:this.state.borderColorGroupName,backgroundColor:'#ededed',borderRadius:10,width:'100%',height:50}} 
                                >
                                <Input 
                                onFocus={()=>{
                                    this.setState({borderColorGroupName:'#6d6d6d'})
                                    }}
                                onBlur={()=>{
                                //    this.props.mutingUserName()
                                    this.setState({borderColorGroupName:'#cccccc'})
                                    }}
                                placeholder='Group Name'
                                value={this.state.groupName}
                                onChangeText={(data)=>{
                                    this.setState({groupName:data})
                                    if(this.state.groupNameFlag===''||this.state.groupNameFlag===true){
                                        this.setState({groupNameFlag:false})
                                    }
                                    if(data===''){
                                        this.setState({groupNameFlag:''})
                                    }
                                    if(this.state.groupNameList.length === 0){
                                        this.setState({groupNameFlag:true})
                                    }
                                    for(var i = 0;i < this.state.groupNameList.length;i++){
                                        if(data !== this.state.groupNameList[i]){
                                            this.setState({groupNameFlag:true})
                                        }
                                    }
                                    console.log(this.state.groupNameFlag)
                                }} 
                                />
                                {(this.state.groupName !== '') ? 
                                <Icon size={30} style={{color:(this.state.groupNameFlag === false) ? 'red':'green'}} name={(this.state.groupNameFlag === false) ? 'alert-circle':'check-circle'}/>:
                                <Text></Text>}
                                </Item>
                                <Button 
                                bordered 
                                onPress={()=>{
                                    if(this.state.groupNameFlag === true){
                                        this.props.groupData(this.state.groupName)
                                        Actions.mapPage_container()
                                    }
                                    else{
                                        alert('something went wrong')
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
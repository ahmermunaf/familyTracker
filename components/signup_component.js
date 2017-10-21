import React, { Component } from 'react';
import { Text , Container , StyleProvider , Title , Content , Header , Footer , Left , Body , Right , Item , Form , Input , Label , Button } from 'native-base';
import getTheme from './../native-base-theme/components/index.js';
import { Dimensions ,View } from 'react-native'
import commonColor from './../native-base-theme/variables/commonColor.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Actions } from 'react-native-router-flux'

export default class Signup_Component extends Component{
    constructor(props){
        super(props);
        this.state={
            borderColorEmail:'#cccccc',
            borderColorPass:'#cccccc',
            borderColorUser:'#cccccc',
            borderColorNum:'#cccccc',
            mode:(Dimensions.get('window').width<Dimensions.get('window').height) ? 'portrait':'landscape',
            userNameFlag:'',
            email:'',
            password:'',
            userName:'',
            phoneNumber:'',
            err:this.props.err,
            userNameList:this.props.userNameList
        }
        this.submitData = this.submitData.bind(this)
    }
    submitData(){
            if(this.state.email != ''&&this.state.password != ''&&this.state.userName!=''&&this.state.phoneNumber!=''&&this.state.userNameFlag===true){
                this.props.userData({
                    email:this.state.email,
                    password:this.state.password,
                    userName:this.state.userName,
                    phoneNumber:this.state.phoneNumber,
                })
            }
            else if(this.state.email === ''&&this.state.password === ''&&this.state.userName===''&&this.state.phoneNumber===''&&this.state.userNameFlag!==true){
                alert('somethig went wrong')
            }
        }
        async componentWillReceiveProps(props){
            await this.setState({err:props.err,userNameList:props.userNameList})
            if(props.err === 'success'){
                Actions.mapPage_container()
                this.props.mutingSignUp('')
            }
            else if(props.err !== 'success'&& props.err !== ''){
                alert(this.state.err)
                this.props.mutingSignUp('')
            }
    }
    componentWillMount(){
        this.props.gettingUserName()
        Dimensions.addEventListener('change',(data)=>{
            this.setState({
                mode:(Dimensions.get('window').width<Dimensions.get('window').height) ? 'portrait':'landscape'
            })
        })
    }
    componentWillUnmount(){
        Dimensions.removeEventListener('change',(data)=>{
            this.setState({
                mode:(Dimensions.get('window').width<Dimensions.get('window').height) ? 'portrait':'landscape'
            })
        })
    }
    render(){
        console.log(this.props.err,'component')
        return(
            <StyleProvider style={getTheme(commonColor)}>
                <Container>
                    <Header 
                    style={{justifyContent:'center',flexDirection:'column'}}
                    >
                        <Title style={{color:'#5988ff'}}>Family Tracker</Title>
                    </Header>
                    <Content style={{backgroundColor:'#fff'}}>
                            <View style={(this.state.mode==='landscape') ? {flexDirection:'column',alignItems:'center',marginTop:'7%'}:{flexDirection:'column',alignItems:'center',marginTop:'25%'}}>
                                <View style={{flexDirection:'column',justifyContent:'center',width:'95%'}}>
                                    <Item
                                    style={{marginBottom:10,borderWidth:1,borderColor:this.state.borderColorEmail,backgroundColor:'#ededed',borderRadius:10,width:'100%',height:50}} 
                                    >
                                    <Input
                                    placeholder='Email' 
                                    onFocus={()=>{this.setState({borderColorEmail:'#6d6d6d'})}}
                                    onBlur={()=>{this.setState({borderColorEmail:'#cccccc'})}}
                                    value={this.state.email}
                                    onChangeText={(data)=>{
                                        this.setState({email:data})
                                    }}
                                    />
                                    </Item>
                                    <Item
                                    style={{marginBottom:10,borderWidth:1,borderColor:this.state.borderColorUser,backgroundColor:'#ededed',borderRadius:10,width:'100%',height:50}} 
                                    >
                                    <Input 
                                    onFocus={()=>{
                                        this.setState({borderColorUser:'#6d6d6d'})
                                        }}
                                    onBlur={()=>{
                                    //    this.props.mutingUserName()
                                        this.setState({borderColorUser:'#cccccc'})
                                        }}
                                    placeholder='User Name'
                                    value={this.state.userName}
                                    onChangeText={(data)=>{
                                        this.setState({userName:data})
                                        if(this.state.userNameFlag===''||this.state.userNameFlag===true){
                                            this.setState({userNameFlag:false})
                                        }
                                        if(data===''){
                                            this.setState({userNameFlag:''})
                                        }
                                        if(this.state.userNameList.length === 0){
                                            this.setState({userNameFlag:true})
                                        }
                                        for(var i = 0;i < this.state.userNameList.length;i++){
                                            if(data !== this.state.userNameList[i]){
                                                this.setState({userNameFlag:true})
                                            }
                                        }
                                    }} 
                                    />
                                       {(this.state.userName !== '') ? <Icon size={30} style={{color:(this.state.userNameFlag === false) ? 'red':'green'}} name={(this.state.userNameFlag === false) ? 'alert-circle':'check-circle'}/>
                                      : 
                                      <Text></Text>
                                      }
                                    </Item>
                                    <Item
                                    style={{marginBottom:10,borderWidth:1,borderColor:this.state.borderColorNum,backgroundColor:'#ededed',borderRadius:10,width:'100%',height:50}} 
                                    >
                                    <Input 
                                    onFocus={()=>{this.setState({borderColorNum:'#6d6d6d'})}}
                                    onBlur={()=>{this.setState({borderColorNum:'#cccccc'})}}
                                    placeholder='Phone Number'
                                    value={this.state.phoneNumber} 
                                    onChangeText={(data)=>{
                                        this.setState({phoneNumber:data})
                                    }}
                                    />
                                    </Item>
                                    <Item
                                    style={{marginBottom:10,borderWidth:1,borderColor:this.state.borderColorPass,backgroundColor:'#ededed',borderRadius:10,width:'100%',height:50}} 
                                    >
                                    <Input 
                                    secureTextEntry={true}
                                    onFocus={()=>{this.setState({borderColorPass:'#6d6d6d'})}}
                                    onBlur={()=>{this.setState({borderColorPass:'#cccccc'})}}
                                    placeholder='Password' 
                                    value={this.state.password}
                                    onChangeText={(data)=>{
                                        this.setState({password:data})
                                    }}
                                    />
                                    </Item>
                                    <Button 
                                    bordered 
                                    onPress={()=>{
                                        this.submitData()
                                    }}
                                    style={{justifyContent:'center',marginBottom:10,borderWidth:1,borderColor:'#5988ff',borderRadius:10,width:'100%',height:50}} 
                                    >
                                        <Text style={{color:'#b3c7f9'}}>
                                            Sign Up
                                        </Text>
                                    </Button>
                                    <Button onPress={()=>{Actions.signin_container()}} transparent style={{justifyContent:'center',marginBottom:10,height:50}}>
                                        <Text>Already A User</Text>
                                    </Button>
                                </View>
                            </View>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}
import React, { Component } from 'react';
import { Text , Container , StyleProvider , Title , Content , Header , Footer , Left , Body , Right , Item , Form , Input , Label , Button } from 'native-base';
import getTheme from './../native-base-theme/components/index.js';
import { Dimensions ,View } from 'react-native'
import commonColor from './../native-base-theme/variables/commonColor.js';
import { Actions } from 'react-native-router-flux'

export default class Signin_Component extends Component{
    constructor(props){
        super(props);
        this.state={
            borderColorEmail:'#cccccc',
            borderColorPass:'#cccccc',
            email:'',
            password:'',
            mode:(Dimensions.get('window').width<Dimensions.get('window').height) ? 'portrait':'landscape',
            err:this.props.err,
        }
        this.submitData = this.submitData.bind(this)
    }
    submitData(){
        if(this.state.email != ''&&this.state.password != ''){
            this.props.userData({
                email:this.state.email,
                password:this.state.password,
            })
        }
        else if(this.state.email === ''&&this.state.password === ''){
            alert('somethig went wrong')
        }
    }
    async componentWillReceiveProps(props){
        await this.setState({err:props.err})
        console.log(props.err)
        if(props.err === 'success'){
            Actions.mapPage_container()
            this.props.mutingSignIn('')
        }
        else if(props.err !== 'success'&& props.err !== ''){
            alert(props.err)
            this.props.mutingSignIn('')
        }
}
    componentWillMount(){
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
        return(
            <StyleProvider style={getTheme(commonColor)}>
                <Container>
                    <Header 
                    style={{justifyContent:'center',flexDirection:'column'}}
                    >
                        <Title style={{color:'#5988ff'}}>Family Tracker</Title>
                    </Header>
                    <Content style={{backgroundColor:'#fff'}}>
                            <View style={(this.state.mode==='landscape') ? {flexDirection:'column',alignItems:'center',marginTop:'7%'}:{flexDirection:'column',alignItems:'center',marginTop:'35%'}}>
                                <View style={{flexDirection:'column',justifyContent:'center',width:'95%'}}>
                                    <Input
                                    placeholder='Email' 
                                    onFocus={()=>{this.setState({borderColorEmail:'#6d6d6d'})}}
                                    onBlur={()=>{this.setState({borderColorEmail:'#cccccc'})}}
                                    onChangeText={(email)=>{
                                        this.setState({email:email})
                                    }}
                                    value={this.state.email}
                                    style={{marginBottom:10,borderWidth:1,borderColor:this.state.borderColorEmail,backgroundColor:'#ededed',borderRadius:10,width:'100%',height:50}} 
                                    />
                                    <Input 
                                    secureTextEntry={true}
                                    onFocus={()=>{this.setState({borderColorPass:'#6d6d6d'})}}
                                    onBlur={()=>{this.setState({borderColorPass:'#cccccc'})}}
                                    onChangeText={(password)=>{
                                        this.setState({password:password})
                                    }}
                                    value={this.state.password}
                                    placeholder='Password' 
                                    style={{marginBottom:10,borderWidth:1,borderColor:this.state.borderColorPass,backgroundColor:'#ededed',borderRadius:10,width:'100%',height:50}} 
                                    />
                                    <Button 
                                    bordered 
                                    onPress={()=>{
                                        this.submitData()
                                    }}
                                    style={{justifyContent:'center',marginBottom:10,borderWidth:1,borderColor:'#5988ff',borderRadius:10,width:'100%',height:50}} 
                                    >
                                        <Text style={{color:'#b3c7f9'}}>
                                            Sign In
                                        </Text>
                                    </Button>
                                    <Button onPress={()=>{Actions.signup_container()}} transparent style={{justifyContent:'center',marginBottom:10,height:50}}>
                                        <Text>Create A New Account Click Here</Text>
                                    </Button>
                                </View>
                            </View>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}
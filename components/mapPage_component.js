import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions
} from 'react-native';
import MapView from 'react-native-maps'
import getTheme from './../native-base-theme/components/index.js';
import commonColor from './../native-base-theme/variables/commonColor.js';
import { Root , Container,Content, Header , View , Left, Body, Right, Button , StyleProvider , Drawer , Text ,Title , Input , Item , Icon, Fab , Footer , Spinner , ActionSheet } from 'native-base';
import Drawer_Component from './drawer_component.js'

const {width,height} = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width/height
const LATITUDE_DELTA = 0.098
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO 
export default class MapPage_Component extends Component {
  constructor(props){
    super(props);
    this.state={
      initialPosition:{
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      changingData:{
        latitudeDelta:LATITUDE_DELTA,
        longitudeDelta:LONGITUDE_DELTA
      },
    }
  }

  watchID: ?number = null
  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position)=>{
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)
      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
       this.setState({
         initialPosition:initialRegion,
        })
    },(err)=>{console.log(JSON.stringify(err))},
    {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000})
    this.watchID =navigator.geolocation.watchPosition((position)=>{
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)
      var lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
      var lastMarker = {
        latitude: lat,
        longitude: long,
        }
      this.setState({
        initialPosition:lastRegion,
      })
    })
  }
  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchID)
  }
  render() {
    return (
        <StyleProvider style={getTheme(commonColor)}>
          <Drawer
          ref={(ref) => { this._drawer = ref; }}
          content={<Drawer_Component navigator={this._navigator}/>}
          onClose={() => this._drawer._root.close()}
          >
            <Container>
              <Header style={styles.header}>
                <Left>
                  <Button onPress={()=>{this._drawer._root.open()}} transparent >
                    <Icon name='menu' style={{color:'#000000'}}/>
                  </Button>
                </Left>
                <Body>
                  <Title>Map Page</Title>
                </Body>
              </Header>
                <View style={styles.view}>
                  <MapView
                  region={this.state.initialPosition}
                  onRegionChange={(region)=>{this.setState({initialPosition:region,changingData:{latitudeDelta:region.latitudeDelta,longitudeDelta:region.longitudeDelta}})}}
                  style={styles.map}
                  showsCompass={true}
                  loadingEnabled={true}
                  showsUserLocation={true}
                  showsBuildings={true}
                  provider='google'
                  >
                  </MapView>
                </View>
            </Container>
          </Drawer>
        </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  view: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex:1,
  },
  header: {
    bottom: '9.485%',
  },
  map: {
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
  },
});
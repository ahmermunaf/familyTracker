/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions
} from 'react-native';
import store from './store/index.js'
import { Provider } from 'react-redux' 
import Route from './components/route.js'
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAASAIPF8RSJJ7rDwzKOjR7U4G0r9QUJJM",
  authDomain: "finalproject-2dbe9.firebaseapp.com",
  databaseURL: "https://finalproject-2dbe9.firebaseio.com",
  projectId: "finalproject-2dbe9",
  storageBucket: "finalproject-2dbe9.appspot.com",
  messagingSenderId: "182379171631"
};
firebase.initializeApp(config);

export default class tourist_app extends Component {
  render() {
    return (
      <Provider store={store}>
        <Route />
      </Provider>
    );
  }
}


AppRegistry.registerComponent('tourist_app', () => tourist_app);

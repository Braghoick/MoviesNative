import React from "react";
import { View, StatusBar } from "react-native";

import Router from './Router';

import LoadAssets from './src/utils/loadAssets';

import {fonts} from './src/utils/fonts';

const assets = [];

const App = () => {
  return (
    <LoadAssets {...{fonts, assets}}>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={'light-content'}></StatusBar>
        <Router></Router>
	  	</View>
    </LoadAssets>
    
  )
}

export default App;

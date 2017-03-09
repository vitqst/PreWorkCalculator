'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,Navigator,TouchableOpacity,AsyncStorage
} from 'react-native';
import Calculator from './calculator.js'
import Setting from './Settings.js';
var NavigationBarRouteMapper = {
  LeftButton: (route, navigator, index, navState) =>{
    return
  },
  RightButton: (route, navigator, index, navState) => {
    if(route.id != 'CalculatorPage'){
      return (
        <TouchableOpacity style={styles.tabbarHeadr} onPress={() => navigator.pop()}>
          <Text style={styles.rightButton}>Save</Text>
        </TouchableOpacity>
      );
    }else{
      return (
        <TouchableOpacity style={styles.tabbarHeadr} onPress={() => navigator.push({id: 'Setting'})}>
          <Text style={styles.rightButton}>Setting</Text>
        </TouchableOpacity>
      );
    }
  },
  Title: (route, navigator, index, navState) => {
    return;
  },
}
export default class Powerrange extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sceneTransition: 'FloatFromRight',
        }
    }
  render() {
    return (
        <Navigator
          initialRoute={{id: 'CalculatorPage'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          navigationBar={
              <Navigator.NavigationBar
                    style = { styles.navigationBar }
                    routeMapper={NavigationBarRouteMapper} />}
          configureScene={this.configureScene.bind(this)}
        />
    );
  }

  // To navigate to page based on page ID
  renderScene(route, navigator) {
    switch (route.id) {
            case 'CalculatorPage':
              return <Calculator/>
              break;
          case 'Setting':
              return <Setting/>
              break;
          default:
    }
  }

  // config scene transition, change scene transition based on Setting
  configureScene(route, routeStack){
    //@Todo, change to scene transition from Asynstorage vale
    this.getSceneTransition() ;
    var temp = this.state.sceneTransition ;
    return Navigator.SceneConfigs[temp];
  }

  async getSceneTransition(){
    try{
      let sceneTransitionValue = await AsyncStorage.getItem("SCENE_SELECTED");
      // Store value to State
      this.setState({
        sceneTransition : sceneTransitionValue
      });
    }catch(error){
      console.log("Hmm, something when wrong when get data..." + error);
    }
  }
}


const styles = StyleSheet.create({
   navigationBar: {
      backgroundColor: '#ECEFF1',
      padding: 5,
      flex:1,
      marginBottom:5
   },
   rightButton: {
      color: '#000',
      margin: 10,
      fontSize: 16
   }
})


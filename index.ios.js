/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


import Powerrange from './Apps/powerranger.js'
export default class PreWorkCalculator extends Component {
  render() {
    return (
      <Powerrange/>
    );
  }
}



AppRegistry.registerComponent('PreWorkCalculator', () => PreWorkCalculator);

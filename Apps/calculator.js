'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,TextInput,Button
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab'

export default class Calculator extends Component {
constructor(props) {
        super(props)
        this.state = {
            segmentSelectedIndex: 0,
            billAmount: 0,
            result: 0,
            tipAmount:0,
        }
    }

handleSegmentChange(index){
    this.setState({
        segmentSelectedIndex: index
    })
    this.handleBillAmount(this.state.billAmount,index);
}

handleBillAmount(bill,index){
    this.setState({
        billAmount : bill
    })
    if(!index && index != 0){
        index = this.state.segmentSelectedIndex;
    }
    bill = parseFloat(bill) ;
    var percent = this.getSegementValues()[index]; // get percent
    percent = parseFloat(percent)/100; // convert to 0.1, 0.15, 0.5
    var billAmountTemp = bill*percent ;
    this.setState({
        tipAmount: billAmountTemp,
        result: bill + billAmountTemp
    })
}
getSegementValues(){
    return ['10%', '15%', '50%'];
}
  render() {
    return (
        <View style={styles.container}>
            <View
                style={{marginTop:60,padding:10}}
            />
            <View>
                <Text style = {styles.title}>
                    Tip Caculator
                </Text>
            </View>
            <View>
                <Text>
                    Bill Amount
                </Text>
                <TextInput
                    style={{height: 40}}
                    keyboardType='numeric'
                    maxLength={10}
                    placeholder="Type here !!"
                    onChangeText={(billAmount) => this.handleBillAmount(billAmount)}
                />
            </View>
            <View>
                <Text>
                    Tip amount : 0
                </Text>
                
            </View>
            <View>
                <SegmentedControlTab
                    values={this.getSegementValues()}
                    onTabPress= {index => this.handleSegmentChange(index)}
                    />
            </View>
            <View>
                <Text>Bill input : {this.state.billAmount}</Text>
                <Text>Tip amount : {this.state.tipAmount}</Text>
                <Text>Segment control : {this.getSegementValues()[this.state.segmentSelectedIndex]}</Text>
            </View>
            <View>
                <Text style={styles.special_item}>Result : {this.state.result}</Text>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  special_item:{
      fontSize: 20,
      fontWeight:'bold'
  }
});

module.export = Calculator
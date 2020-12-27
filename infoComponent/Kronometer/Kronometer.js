import React, { Component , ReactPropTypes} from "react";
import{ 
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ViewPropTypes,
} from "react-native";

import Time from "./Time.js";

import BackgroundTimer from "react-native-background-timer";

import PropTypes from "prop-types";


class Kronometer extends Component{
    constructor(props){
        super(props)
        this.state = {kronometerTimer:"00:00:00"};

        this.timer = null;
        this.isTimerEnabled = false;

        this.props = props;

        this.pause = this.pause.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
    };

    style = StyleSheet.create({
        container:{
            justifyContent:"center",
            alignItems:"center",
            flex:1,
            flexDirection:"column",
            width:"100%",
        },
        topPanel:{
            flex:1,
            flexDirection:"row",
            width:"100%",
            justifyContent:"center",
            alignItems:"center",
        },
        buttonContainer:{
            flex:1,
            flexDirection:"row",
            width:"100%"
        },
        buttonStyle:{
            alignItems:"center",
            justifyContent:"center",
            flex:1,
        }


    });

    static propTypes  = {
        backgroundStyle : ViewPropTypes.style,
        textStyle: Text.propTypes.style,
        buttonBackground: ViewPropTypes.style,
        returnFunc: PropTypes.func,
    };

    render(){
        return (
        <View style={this.style.container}>
            <View style={[this.style.topPanel,this.props.backgroundStyle]}>
              <Text style={this.props.textStyle}>{this.state.kronometerTimer}</Text>
            </View>
            <View style={this.style.buttonContainer}>
                <TouchableOpacity style={[this.props.buttonBackground,this.style.buttonStyle,Kronometer.propTypes.backgroundStyle]} onPress={this.start }>
                  <Text style={this.props.textStyle}>Play</Text>
                </TouchableOpacity>
    
                <TouchableOpacity style={[this.props.buttonBackground,this.style.buttonStyle,Kronometer.propTypes.backgroundStyle]} onPress={this.pause} >
                  <Text style={this.props.textStyle}>Pause</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[this.props.buttonBackground,this.style.buttonStyle,Kronometer.propTypes.backgroundStyle]} onPress={this.stop}>
                  <Text style={this.props.textStyle}>Stop</Text>
                </TouchableOpacity>
            </View>
          </View>);
    }

    componentWillUnmount(){
        BackgroundTimer.stopBackgroundTimer();
    }

    pause(){
        if(this.isTimerEnabled){
          BackgroundTimer.stopBackgroundTimer();
          this.isTimerEnabled=false;
        }
        else{
          BackgroundTimer.runBackgroundTimer(this.setTimeing,1000);
          this.isTimerEnabled = true;
        }
      }
    
      start(){
        if(this.timer == null){
          this.kronoTime = new Time();
          BackgroundTimer.runBackgroundTimer(this.setTimeing,1000);
          this.isTimerEnabled = true;
          this.timer = 1;
        }
      }
    
      stop(){
        if(this.timer ==1){
          BackgroundTimer.stopBackgroundTimer();
          this.props.returnFunc(this.kronoTime.toString());
          this.isTimerEnabled = false;
          this.timer = null;
        }
      }
    
      setTimeing = () =>{
        this.setState({kronometerTimer:this.kronoTime.toString()});
        this.kronoTime.addSecond(1);
      }
}
export default Kronometer;


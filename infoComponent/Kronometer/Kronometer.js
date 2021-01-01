import React, { Component , ReactPropTypes} from "react";
import{ 
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ViewPropTypes,
    Image
} from "react-native";

import Time from "./Time.js";

import BackgroundTimer from "react-native-background-timer";

import PropTypes from "prop-types";

play = require("./Play.png");

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
            padding:10
        },
        buttonImage:{
          flex:1,
          width:"100%",
          height:"100%",
          resizeMode:"center",
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
                  <Image style={this.style.buttonImage} source={require("./Play.png")}></Image>
                </TouchableOpacity>
    
                <TouchableOpacity style={[this.props.buttonBackground,this.style.buttonStyle,Kronometer.propTypes.backgroundStyle]} onPress={this.pause} >
                  <Image style={this.style.buttonImage} source={require("./Pause.png")}></Image>
                </TouchableOpacity>
                
                <TouchableOpacity style={[this.props.buttonBackground,this.style.buttonStyle,Kronometer.propTypes.backgroundStyle]} onPress={this.stop}>
                  <Image style={this.style.buttonImage} source={require("./Stop.png")}></Image>
                </TouchableOpacity>
            </View>
          </View>);
    }

    componentWillUnmount(){
        BackgroundTimer.stopBackgroundTimer();
    }

    pause(){
      if(this.timer==null){
        this.props.toast("Timer Hasn't Started")
      }
      else if(this.isTimerEnabled){
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
        else if(this.timer == 1){
          this.props.toast("Can't Start Twice");
        }
      }
    
      stop(){
        if(this.timer==null ){
          this.props.toast("Timer Hasn't Started")
        }
        else if(this.kronoTime.hour<1 && this.kronoTime.minute < 5 ){
          this.props.toast("Less Than 5 Minute. This Session Not Saved");
          this.setState({kronometerTimer:"00:00:00"})
          BackgroundTimer.stopBackgroundTimer();
          this.kronoTime = new Time()
          this.isTimerEnabled = false;
          this.timer = null;
        }
        else if(this.timer == 1){
          BackgroundTimer.stopBackgroundTimer();
          this.setState({kronometerTimer:"00:00:00"})
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


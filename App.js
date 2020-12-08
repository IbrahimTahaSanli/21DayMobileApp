import React,{ Component } from 'react';

import {
  StyleSheet,
  View,
  Text,

  Image,
  TouchableOpacity,
  Button
} from 'react-native';

import {
  mainPageBackground,
  mainPageText,
  kronometerButtonBackground
} from "./Values/Colors.json";

import BackgroundTimer from "react-native-background-timer";

const RNFS = require("react-native-fs");


class Appi extends Component{ 

  state = {kronometerTimer:"00:00:00"};

  styles = StyleSheet.create({
    background:{
      flex:1,
      backgroundColor:mainPageBackground,
      flexDirection:"column",
      justifyContent: 'flex-start',
    },
    row:{
      justifyContent:"center",
      alignItems:"center",
      flex:1,
      flexDirection:"row"
    },
    row1:{
      flex:0.4
    },
    backgroundPadding:{
      padding:5
    },
    header:{


    },
    picture:{
      flex:1,
      width:"100%",
      height:"100%",
      resizeMode:"stretch",
    },
    dayHasBeenDone:{
      flex:1,
      width:"100%",
      height:"100%"
      
    },
    backgroundStyle:{
      backgroundColor: kronometerButtonBackground,
      borderRadius:20,
      margin:4
    },
    textt:{
      textAlign:"center",
      color: mainPageText,
    },
    Information:{
      flex:1,
      flexDirection:"column",
      borderColor:"#000000",
      width:"100%"
    },
    KronometerCol:{
      flexDirection:"column",
      flex:1,
      width:"100%",
    },
    kronometerRows:{
      flex:1,
      flexDirection:"row"
    },
    kronometerButton:{
      alignItems:"center",
      justifyContent:"center",
      flex:1,
      backgroundColor:kronometerButtonBackground,
      margin:2,
      borderRadius:20,
    },
    alignIt:{
      margin:4,
    },
    mar:{
      margin:0,
      marginRight:4
    }
  });

  constructor(props){
    super(props);

    this.dayHasBeenDone = "1";
    
    this.kronoTime = new Time();
    
    this.timer = null;
    this.isTimerEnabled = false;

    this.treeRawData = props.route.params.treeData;
    this.treeData = new Tree(props.route.params.treeData);
    this.currentFile = props.route.params.currentFile;
  
    this.pause = this.pause.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  componentWillUnmount(){
    BackgroundTimer.stopBackgroundTimer();
  }

  
  render(){ 
    return (
    <View style={[this.styles.background,this.styles.backgroundPadding]}>
      <View style={[this.styles.row,this.styles.row1,this.styles.backgroundStyle]}>
        <Text style={[this.styles.header,this.styles.textt]}>{this.treeData.getTreeName()}</Text>
      </View>
      <View style={[this.styles.row,this.styles.alignIt]}>
        <View style={[this.styles.backgroundStyle,this.styles.dayHasBeenDone,this.styles.row,this.styles.mar]}><Text numberOfLines={1} style={[this.styles.textt]} >{this.treeData.getDayHasBeenDone()+1}</Text></View>
        <Image style={this.styles.picture} source={{uri:"https://test001001.azurewebsites.net/"+(this.treeData.getDayHasBeenDone()+1)+".png"}}></Image>
      </View>
      
      <View style={[this.styles.row,this.styles.Information,this.styles.backgroundStyle]}>
        <Text style={this.styles.textt}>{this.treeData.getUserName()}</Text>
        <Text style={this.styles.textt}>Mean: {this.treeData.getMean()}</Text>
      </View>

      <View style={[this.styles.row,this.styles.Information,this.styles.KronometerCol]}>
        <View style={[this.styles.Information,this.styles.backgroundStyle,this.styles.row]}>
          <Text style={this.styles.textt}>{this.state.kronometerTimer}</Text>
        </View>
        <View style={[this.styles.Information]}>
          <View style={this.styles.kronometerRows}>
            <TouchableOpacity style={this.styles.kronometerButton} onPress={this.start }>
              <Text style={this.styles.textt}>Play</Text>
            </TouchableOpacity>

            <TouchableOpacity style={this.styles.kronometerButton} onPress={this.pause} >
              <Text style={this.styles.textt}>Pause</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={this.styles.kronometerButton} onPress={this.stop}>
              <Text style={this.styles.textt}>Stop</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
      <View style={[this.styles.row,this.styles.row1]}>
        <Button title="New" color={kronometerButtonBackground} onPress={()=>{this.props.navigation.push("signup",{currentDir:this.currentFile.replace("/data.json",""),isCorrupted:false,isNew:true});}}></Button>
      </View>
    </View>
  );
  };
  
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
      this.treeRawData[this.treeData.getDayHasBeenDone()+1] = this.kronoTime.toString();
      RNFS.writeFile(this.currentFile,JSON.stringify(this.treeRawData),"utf8");
      this.treeData = new Tree(this.treeRawData);
      this.isTimerEnabled = false;
      this.forceUpdate();
      this.timer = null;
    }

  }

  setTimeing = () =>{
    this.setState({kronometerTimer:this.kronoTime.toString()});
    this.kronoTime.addSecond(1);
  }

  
};
export default Appi;


class Tree{
  userName = "";
  treeName = "";
  dayHasBeenDone = 0;
  mean = "00:00:00";

  constructor(data){
    this.userName = data.userName;
    this.treeName = data.treeName;
    this.dayHasBeenDone = Object.keys(data).length - 2;
    this.mean = Object.keys(data).length == 2 ?"00:00:00" :Tree.calcMean(data);
  }
  
  setUserName(str){
    this.userName = str;
  }
  getUserName(){
    return this.userName;
  }


  setTreeName(str){
    this.treeName = str;
  }

  getTreeName(str){
    return this.treeName;
  }

  setDayHasBeenDone(int){
    this.dayHasBeenDone = int;
  }
  getDayHasBeenDone(){
    return this.dayHasBeenDone;
  }

  setMean(str){
    if(typeof(str) == "string")
      this.mean = str;

    else 
      this.mean = str.toString(); 
  }

  getMean(){
    return this.mean;
  }

  static calcMean(data){
    time = new Time();

    func = (timetmp)=>{
      timetmp = timetmp.split(":");
      time.addSecond(parseInt(timetmp[2]));
      time.addMinute(parseInt(timetmp[1]));
      time.addHour(parseInt(timetmp[0]));
    };

    Object.keys(data).map(function(index){
      if(!(index == "treeName" || index == "userName"))
      func(data[index]);
      
    }
    );

    int = ((time.hour * 60) + time.minute)*60 + time.second;

    int /= Object.keys(data).length-2;

    time.minute = Math.floor(int/60);
    time.second = int%60;

    time.hour = Math.floor(time.minute/60);

    time.minute = time.minute%60;

    return time.toString();

  }
  
}

class Time{
  constructor(){ 
    this.second = 0;
    this.minute = 0;
    this.hour = 0;
  }

  addSecond(int){
    this.second += int;
    if(this.second  >= 60){
      this.addMinute(Math.round(this.second/60));
      this.second = this.second% 60;
    }

  }

  addMinute(int){
    this.minute += int;
    if(this.minute  >= 60){
      this.addHour(Math.round(this.second/60));
      this.minute = this.minute% 60;
    }

  }

  addHour(int){
    this.hour += int;
  }

  toString(){
    return Math.floor(this.hour).toString().padStart(2,'0')+ ":"+ Math.floor(this.minute).toString().padStart(2,'0')+ ":" + Math.floor(this.second).toString().padStart(2,'0') ;
  }
}

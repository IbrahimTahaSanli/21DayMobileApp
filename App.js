import React,{ Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  Button
} from 'react-native';

import responsive_font_size from "./responsive-font-size.js";

import {
  mainPageBackground,
  mainPageText,
  kronometerButtonBackground
} from "./Values/Colors.json";

import BackgroundTimer from "react-native-background-timer";

import Kronometer from "./infoComponent/Kronometer/Kronometer.js";
import Time from "./infoComponent/Kronometer/Time.js";
import kronometerInfo from './infoComponent/Kronometer/kronometerInfo.js';

import Counter from "./infoComponent/Counter/Counter.js";
import counterInfo from "./infoComponent/Counter/counterInfo.js" 

const RNFS = require("react-native-fs");


class Appi extends Component{
  constructor(props){
    super(props);

    this.fontSizer = new responsive_font_size(0.0012);

    this.treeRawData = props.route.params.treeData;
    this.treeData = new Tree(props.route.params.treeData);
    this.currentFile = props.route.params.currentFile;

    this.handleData = this.handleData.bind(this);

    this.styles = StyleSheet.create({
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
        alignSelf:"center",
        backgroundColor: 'transparent',
        backfaceVisibility:"visible"

      },
      dayHasBeenDone:{
        flex:1,
        width:"100%",
        height:"100%"
      },
      dayHasBeenDoneText:{
        fontSize:this.fontSizer.ViaWidth(30)
      },
      backgroundStyle:{
        backgroundColor: kronometerButtonBackground,
        borderRadius:20,
        margin:4
      },
      textt:{
        fontSize:this.fontSizer.ViaWidth(15),
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
  
    this.state = {kronometerTimer:"00:00:00"};
  }

  componentWillUnmount(){
    BackgroundTimer.stopBackgroundTimer();
  }

  
  render(){
    this.infoPanel = <View/>;
    this.tool = <View/>;

    switch(this.treeData.getInfoPanel()){
      case "Kronometer":
        this.infoPanel = (<View style={[this.styles.row,this.styles.Information,this.styles.backgroundStyle,{alignSelf:"center"}]}>
          <Text style={this.styles.textt}>{this.treeData.getUserName()}</Text>
          <Text style={this.styles.textt}>Mean: {this.treeData.labels["Mean: "]}</Text>
          <Text style={this.styles.textt}>Sum:{this.treeData.labels["Sum: "]}</Text>
        </View>);

        this.tool = <Kronometer buttonBackground={this.styles.kronometerButton} backgroundStyle={this.styles.backgroundStyle} textStyle={this.styles.textt} buttonBackground={this.styles.backgroundStyle} returnFunc={this.handleData}></Kronometer>;
        break;
      case "Counter":
        this.infoPanel = (<View style={[this.styles.row,this.styles.Information,this.styles.backgroundStyle,{alignSelf:"center"}]}>
          <Text style={this.styles.textt}>{this.treeData.getUserName()}</Text>
          <Text style={this.styles.textt}>Mean: {this.treeData.labels["Mean: "]}</Text>
          <Text style={this.styles.textt}>Sum: {this.treeData.labels["Sum: "]}</Text>
        </View>);
        this.tool = <Counter buttonBackground={this.styles.kronometerButton} backgroundStyle={this.styles.backgroundStyle} textStyle={this.styles.textt} buttonBackground={this.styles.backgroundStyle} returnFunc={this.handleData}></Counter>
        break;

    }
    
    return (
    <View style={[this.styles.background,this.styles.backgroundPadding]}>
      <View style={[this.styles.row,this.styles.row1,this.styles.backgroundStyle]}>
        <Text style={[this.styles.header,this.styles.textt]}>{this.treeData.getTreeName()}</Text>
      </View>
      <View style={[this.styles.row,this.styles.alignIt]}>
        <View style={[this.styles.backgroundStyle,this.styles.dayHasBeenDone,this.styles.row,this.styles.mar]}><Text numberOfLines={1} style={[this.styles.textt,this.styles.dayHasBeenDoneText]} >{this.treeData.getDayHasBeenDone()+1}</Text></View>
        <View style={[this.styles.backgroundStyle,this.styles.dayHasBeenDone,this.styles.row,this.styles.mar]} ><Image style={this.styles.picture} source={{uri:"https://test001001.azurewebsites.net/"+(this.treeData.getDayHasBeenDone()+1)+".png"}}></Image></View>
      </View>
      
      {this.infoPanel}
      {this.tool}
      <View style={[this.styles.row,this.styles.row1]}>
        <Button title="New" color={kronometerButtonBackground} onPress={()=>{this.props.navigation.push("signup",{currentDir:this.currentFile.replace("/data.json",""),isCorrupted:false,isNew:true});}}></Button>
      </View>

    </View>
  );
  };
  
  handleData(pro){
    this.treeRawData[this.treeData.getDayHasBeenDone()+1] = pro;
    RNFS.writeFile(this.currentFile,JSON.stringify(this.treeRawData),"utf8");
    this.treeData = new Tree(this.treeRawData);
    this.forceUpdate();
  }

  
};
export default Appi;


class Tree{
  userName = "";
  treeName = "";
  dayHasBeenDone = 0;
  infoPanel = "";
  labels = {};

  constructor(data){
    this.userName = data.userName;
    this.treeName = data.treeName;
    this.infoPanel = data.treeInfo;
    this.dayHasBeenDone = Object.keys(data).length - 3;

    switch(this.infoPanel){
      case "Kronometer":
        this.labels = (new kronometerInfo(data)).data;                  //static Yapılacak;
        break;
      
      case "Counter":
        this.labels = new counterInfo(data).data;
        break;
    }
    
  }
  
  setUserName(str){this.userName = str;}
  getUserName(){return this.userName;}

  setTreeName(str){this.treeName = str;}
  getTreeName(){return this.treeName;}

  setDayHasBeenDone(int){this.dayHasBeenDone = int;}
  getDayHasBeenDone(){return this.dayHasBeenDone;}

  setInfoPanel(str){this.infoPanel = str};
  getInfoPanel(){return this.infoPanel;};

}



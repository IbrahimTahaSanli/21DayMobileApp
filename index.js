import React ,{Component} from "react";
import {
    ActivityIndicator,
    AppRegistry, 
    View,
    StyleSheet,
    Text
} from 'react-native';

import {name as appName,version} from './app.json';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Appi from "./App.js"
import signupScreen from "./signupScreen.js";


const RNFS = require("react-native-fs");
const Stack = createStackNavigator();


class loadingScreen extends Component{
    styles = StyleSheet.create({
        cont:{
            flex:1,
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
        }
    });

    constructor(props,route){
        super(props);
        this.props = props;

        
        this.currentDir = Platform.OS == "ios"? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath;

        this.checkFile();

        this.props.navigation.addListener("focus",()=>{this.checkFile()});
    };

    render(){
        return(
        <View style={this.styles.cont}>
            <Text>{appName}</Text>
            <Text>Version:{version}</Text>
            <ActivityIndicator size="large" color={"#000"} animating={true} />
        </View>);
    };

    async checkFile(){
        await RNFS.exists(this.currentDir+"/data.json").then((exists)=>{
            if(exists)
                this.isfileexist = true;
            else
                this.isfileexist = false;
        });

        if(this.isfileexist){
            try{
                this.treeData = JSON.parse(await RNFS.readFile(this.currentDir+"/data.json","utf8"));
                this.props.navigation.navigate("Home",{treeData:this.treeData,currentFile:this.currentDir+"/data.json"});
            }
            catch{
                alert("Corrupted Data");
                this.props.navigation.push("signup",{currentDir:this.currentDir,isCorrupted:true,isNeedToUpdate:false});
            }
            
        }
        else{
            this.props.navigation.push("signup",{currentDir:this.currentDir,isCorrupted:false,isNeedToUpdate:false});
        }

        if(this.props.route.params?.status)
            if(this.props.route.params.status == "updated"){
                this.props.navigation.navigate("Home",{treeData:this.treeData});
            }
    }


};

export default function Navigator(){
    return(
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="loading" component={loadingScreen} options={{headerShown:false}}/>
            <Stack.Screen name="signup" component={signupScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Home" component={Appi} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
};
  

AppRegistry.registerComponent(appName, () => Navigator);
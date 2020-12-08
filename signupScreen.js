import React,{ Component } from 'react';
import { 
    View ,
    Text ,
    Button,
    StyleSheet
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const RNFS = require("react-native-fs");

export default class signupScreen extends Component{
    styles = StyleSheet.create({
        cont:{
            flex:1,
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
        },
        input:{
            borderColor:"#7070a0",
            borderWidth:1,
            borderRadius:7,
            width:"98%",
        }

    });


    constructor(props){
        super(props);
        this.props = props;

        this.text= "";
        this.text1= "";



        if(props.route.params.isCorrupted || props.route.params.isNew)
            RNFS.unlink(props.route.params.currentDir+"/data.json").then(()=>console.log("deleted!"));
        

        this.currentDir = props.route.params.currentDir;
        this.writeToFile = this.writeToFile.bind(this);
    }

    render(){
        return (
        <View style={this.styles.cont}>
            <TextInput placeholder="username" placeholderTextColor="#707070" autoCompleteType="username" onChangeText={this.setText} style={this.styles.input}></TextInput>
            <TextInput placeholder="treename" placeholderTextColor="#707070" autoCompleteType="name" onChangeText={this.setText1} style={this.styles.input}></TextInput>
            <Button title="finish" onPress={()=>{this.writeToFile()}}></Button>
        </View>);
    };

    setText = (text)=>{
        this.text = text;
    }

    setText1 = (text)=>{
        this.text1 = text;
    }

    writeToFile(){
        RNFS.writeFile(this.currentDir+"/data.json",JSON.stringify({"userName":this.text, "treeName":this.text1 }),"utf8").then((success) => {
            console.log('FILE WRITTEN!');
          })
          .catch((err) => {
            console.log(err.message);
          });
        this.props.navigation.navigate("loading" ,{status:"updated"});
    }


}
import React,{ Component } from 'react';
import { 
    View ,
    Text ,
    Button,
    StyleSheet,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import ComboBox from './infoComponent/CustomComponent/ComboBox';

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
            marginLeft: "2%",
            marginRight:"2%",
            marginBottom:"1%",
            width:"96%",
        },
        buttonStyle:{
            position:"relative",
            zIndex:0,
        },
        comboInitButton:{
            alignItems:"baseline",
            paddingLeft:"1%",
            paddingVertical:"3.5%",
        },
        comboInitButtonText : {
            color: "#727272",
        },
        comboButtonTyle:{
            position:"relative",
            zIndex:10,
            borderWidth:1,
            borderRadius:7,
            width:"96%",
            backgroundColor:"#f2f2f2",
            marginLeft: "2%",
            marginRight:"2%",
            paddingLeft:"1%",
            paddingVertical:"3.5%",
        },

    });


    constructor(props){
        super(props);
        this.props = props;

        this.text= "";
        this.text1= "";
        this.info= "";



        if(props.route.params.isCorrupted || props.route.params.isNew)
            RNFS.unlink(props.route.params.currentDir+"/data.json").then(()=>console.log("deleted!"));
        
        this.state = {currentInfo:""};


        this.currentDir = props.route.params.currentDir;
        this.onValueChange = this.onValueChange.bind(this);
        this.writeToFile = this.writeToFile.bind(this);
        this.finalize= this.finalize.bind(this);
    }

    render(){
        return (
        <View style={this.styles.cont}>
            <TextInput placeholder="username" multiline={false} placeholderTextColor="#707070" autoCompleteType="username" onChangeText={this.setText} style={this.styles.input}></TextInput>
            <TextInput placeholder="treename" multiline={false} placeholderTextColor="#707070" autoCompleteType="name" onChangeText={this.setText1} style={this.styles.input}></TextInput>
            <ComboBox placeholder="Click Here" data = {["Kronometer","Counter"]} buttonStyle={[this.styles.input,this.styles.comboInitButton]} buttonTextStyle={this.styles.comboInitButtonText} comboButtonStyle={this.styles.comboButtonTyle} currentValue={this.onValueChange}></ComboBox>
            <View style={this.styles.buttonStyle}><Button title="Finish" onPress={this.finalize}></Button></View>
        </View>);
    };

    onValueChange(str){
        this.setState({currentInfo:str});
    }

    setText = (tex)=>{
        this.text = tex;
    }

    setText1 = (text)=>{
        this.text1 = text;
    }

    finalize(){
        if( this.text1.length == 0 || this.text.length==0 || this.state.currentInfo == "")
            alert("Null Input");
        else
            this.writeToFile();
    }

    writeToFile(){
        RNFS.writeFile(this.currentDir+"/data.json",JSON.stringify({"userName":this.text, "treeName":this.text1 ,"treeInfo":this.state.currentInfo}),"utf8").then((success) => {
            console.log('FILE WRITTEN!');
          })
          .catch((err) => {
            console.log(err.message);
          });
        this.props.navigation.navigate("loading" ,{status:"updated"});
    }


}
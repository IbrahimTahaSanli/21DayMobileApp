import React, { Component } from "react";
import { Text, View ,StyleSheet, ViewPropTypes} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import PropTypes from "prop-types";

class ComboBox extends Component{
    constructor(props){
        super(props);

        this.style = StyleSheet.create({
            comboStyle:{
                flex:1,
                zIndex:10,
                position:"absolute",
                flexDirection:"column",
                width:"100%",
            },
            container:{
                flexDirection:"column",
                width:"100%",
                margin:5% 5,
            }
        });


        this.state = {isOn:false,placeholder:this.props.placeholder,textColor:{color:"#727272"}};



        this.onValueChange = this.onValueChange.bind(this);
    }

    static propTypes = {
        placeholder:PropTypes.string,
        data:PropTypes.array,
        buttonStyle: PropTypes.symbol,
        buttonTextStyle: PropTypes.symbol,
        comboButtonStyle: PropTypes.symbol,
        textStyle: PropTypes.symbol,
        currentValue: PropTypes.func,
    }



    render(){
        combo = [];

        for(const [index,value]of this.props.data.entries()){
            combo.push(<TouchableOpacity onPress={()=>{this.onValueChange(value)}} key={index} style={this.props.comboButtonStyle}><Text style={this.props.textStyle}>{value}</Text></TouchableOpacity>);
        }

        return(
        <View style={this.style.container}>
            <TouchableOpacity style={this.props.buttonStyle} onPress={()=>{this.setState({isOn:!(this.state.isOn)})}}>
                <Text style={[this.props.textStyle,this.props.buttonTextStyle,this.state.textColor]}>{this.state.placeholder}</Text>
            </TouchableOpacity>
            {this.state.isOn?
            <View style={this.style.comboStyle}>{[combo]}</View>:
            <View></View>}
        </View>
        );
    }

    onValueChange(str){
        this.props.currentValue(str);
        this.setState({isOn:false,placeholder:str,textColor:{color:"#000000"}});
    }
}
export default ComboBox;
import React, { Component } from "react";
import { StyleSheet, View, Text, ViewPropTypes, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";

class Counter extends Component{
    constructor(props){
        super(props);

        this.state = {count:0};

        this.style = StyleSheet.create({
            topContainer:{
                flex:1,
                width:"100%",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center"
            },
            topPanel:{
                flex:1,
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"center",
                width:"100%",
            },
            bottomPane:{
                flex:1,
                flexDirection:"row",
                width:"100%",

            },
            buttonStyle:{
                flex:1,
                alignItems:"center",
                justifyContent:"center",  
            },
        });

        this.inc = this.inc.bind(this);
        this.dec = this.dec.bind(this);
        this.save = this.save.bind(this);
    }

    static propTypes  = {
        backgroundStyle : ViewPropTypes.style,
        textStyle: Text.propTypes.style,
        buttonBackground: ViewPropTypes.style,
        returnFunc: PropTypes.func,
    };


    render(){
        console.log("Counter:56 " , JSON.stringify(this.props));
        return(
            <View style = {this.style.topContainer}>
                <View style={[this.style.topPanel,this.props.backgroundStyle]}>
                    <Text style={this.props.textStyle}>{this.state.count}</Text>
                </View>

                <View style={this.style.bottomPane}>
                    <TouchableOpacity style={[this.style.buttonStyle,this.props.buttonBackground]} onPress={this.inc}> 
                        <Text style={this.props.textStyle}>Inc</Text> 
                    </TouchableOpacity>

                    <TouchableOpacity style={[this.style.buttonStyle,this.props.buttonBackground]} onPress={this.dec}> 
                        <Text style={this.props.textStyle}>Dec</Text> 
                    </TouchableOpacity>

                    <TouchableOpacity style={[this.style.buttonStyle,this.props.buttonBackground]} onPress={this.save}>
                        <Text style={this.props.textStyle}>Save</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    };

    inc(){
        this.setState({count:this.state.count+1});
    }

    dec(){
        this.setState({count:this.state.count-1});
    }

    save(){
        this.props.returnFunc(this.state.count);
        this.setState({count:0});
    }


}
export default Counter;
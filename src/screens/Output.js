import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import styles from "../utils/styles";

const specifics = StyleSheet.create({
    mood: {
        fontWeight: "bold",
        fontSize: 30,
        margin: 10,
        marginBottom: 50,
    }
});

export default class Output extends React.Component{
    render() {
        return (
            <View style={[styles.screen, {...StyleSheet.absoluteFill}, {backgroundColor: this.props.mood.color}]}>
                <Text style={[styles.text, {color: this.props.textColor}]}>
                    I feel {this.props.mood.intensity}
                </Text>
                <Text style={[styles.text, specifics.mood, {color: this.props.textColor}]}>
                    {this.props.mood.name} {this.props.mood.emoji}
                </Text>
                <Button title="Again" onPress={this.props.onPress}/>
            </View>
        );
    }
}

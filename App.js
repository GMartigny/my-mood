import React from "react";
import { Text, View, ActivityIndicator, Button, TouchableOpacity } from "react-native";
import { Accelerometer } from "expo-sensors";
import * as Haptics from 'expo-haptics';
import convert from "color-convert";
import getColor from "./utils/get-color";
import getMood from "./utils/get-mood";
import getIntensity from "./utils/get-intensity";
import styles from "./utils/styles";

export default class App extends React.Component {
    state = {
        canShake: null,
        isLoading: false,
        color: "#282828",
        output: null,
        textColor: "#222",
    };

    async componentWillMount () {
        const canShake = await Accelerometer.isAvailableAsync();
        this.setState({
            canShake,
        });
        this.prepare();
    }

    prepare () {
        this.setState({
            color: "#282828",
            mood: null,
            output: null,
        });
        if (this.state.canShake) {
            this.listenForShake();
            Accelerometer.setUpdateInterval(16);
        }
    }

    listenForShake () {
        const threshold = 2.5;
        this.shakeListener = Accelerometer.addListener((data) => {
            const strength = Math.hypot(data.x, data.y, data.z);
            if (strength > threshold) {
                this.selectMood();
            }
        });
    }
    stopListenForShake () {
        if (this.shakeListener) {
            this.shakeListener.remove();
        }
        this.shakeListener = null;
    }

    async selectMood () {
        this.stopListenForShake();
        this.setState({
            isLoading: true,
        });

        try {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        catch (e) {}

        const color = await getColor();
        if (color) {
            const hsl = convert.hex.hsl(color.slice(1));
            const mood = getMood(hsl[0] / 360);
            const intensity = getIntensity(hsl[1] / 100);

            this.setState({
                color,
                output: {
                    mood,
                    intensity,
                },
                textColor: hsl[2] < 50 ? "#fff" : "#222",
            });
        }
        this.setState({
            isLoading: false,
        })
    }

    getView () {
        if (this.state.output) {
            return (
                <View>
                    <Text style={[styles.text, {color: this.state.textColor}]}>
                        I feel {this.state.output.intensity}
                    </Text>
                    <Text style={[styles.text, styles.mood, {color: this.state.textColor}]}>
                        {this.state.output.mood}
                    </Text>
                    <Button style={styles.button} title="Again" onPress={() => this.prepare()}/>
                </View>
            );
        }

        if (this.state.isLoading) {
            return (
                <View>
                    <ActivityIndicator size="large" color="#1C7FFF"/>
                </View>
            );
        }

        if (this.state.canShake) {
            return (
                <Text style={styles.text}>👋 Shake your phone!</Text>
            );
        }

        return (
            <TouchableOpacity style={styles.press} onLongPress={() => this.selectMood()}>
                <Text style={styles.text}>Press you thumb</Text>
                <Text style={styles.text}>here!</Text>
            </TouchableOpacity>
        );
    }

    render () {
        return (
            <View style={[styles.screen, {backgroundColor: this.state.color}]}>
                {this.getView()}
            </View>
        );
    }
}

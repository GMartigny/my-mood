import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Pie } from "react-native-progress";
import styles from "../utils/styles";
import { Accelerometer } from "expo-sensors";

let canShake = null;

const threshold = 20;

export default class Main extends React.Component {
    state = {
        shake: null,
    };

    async componentWillMount() {
        if (!canShake) {
            canShake = await Accelerometer.isAvailableAsync();
        }
        this.setState({
            shake: 0,
        });
        if (canShake) {
            Accelerometer.setUpdateInterval(1000 / 60);
            this.listenForShake();
        }
    }

    componentWillUnmount() {
        this.stopListenForShake();
    }

    callback () {
        this.setState({
            shake: null,
        });
        this.props.callback();
    }

    listenForShake () {
        this.shakeListener = Accelerometer.addListener((data) => {
            const strength = Math.max(Math.hypot(data.x, data.y, data.z) - 1.1, 0);
            this.setState({
                shake: this.state.shake + strength,
            });
            if (this.state.shake > threshold) {
                this.stopListenForShake();
                this.callback();
            }
        });
    }

    stopListenForShake () {
        if (this.shakeListener) {
            this.shakeListener.remove();
        }
        this.shakeListener = null;
    }

    startPress () {
        this.press = setInterval(() => {
            this.setState({
                shake: this.state.shake + 0.3,
            });
            if (this.state.shake > threshold) {
                this.stopPress();
                this.callback();
            }
        }, 16);
    }

    stopPress () {
        if (this.press) {
            clearInterval(this.press);
        }
        this.press = null;
    }

    render() {
        if (canShake === null) {
            return <></>;
        }

        const text = canShake ?
            <Text style={styles.text}>👋 Shake your device!</Text> :
            <TouchableOpacity onPressIn={() => this.startPress()} onPressOut={() => this.stopPress()} style={{padding: 30, backgroundColor: "#222"}}>
                <Text style={styles.text}>👍 Press your thumb!</Text>
            </TouchableOpacity>;
        return (
            <>
                {text}
                <Pie
                    style={{margin: 30}}
                    indeterminate={this.state.shake === null}
                    animated={this.state.shake === null}
                    progress={this.state.shake / threshold}
                    color="#1C7FFF"
                    size={80}/>
            </>
        );
    }
}

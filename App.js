import React from "react";
import { View, ToastAndroid } from "react-native";
import { NotificationFeedbackType } from "expo-haptics";
import convert from "color-convert";
import Main from "./src/screens/Main";
import Output from "./src/screens/Output";
import getColor from "./src/utils/get-color";
import getMood from "./src/utils/get-mood";
import getIntensity from "./src/utils/get-intensity";
import vibrate from "./src/utils/vibrate";
import styles from "./src/utils/styles";

export default class App extends React.Component {
    state = {
        ready: false,
        isLoading: true,
        mood: null,
        textColor: "#222",
    };

    componentWillMount () {
        this.prepare();
    }

    prepare () {
        this.setState({
            mood: null,
            isLoading: true,
        });
        this.promise = this.selectMood()
            .catch(() => {
                ToastAndroid.show("Check your internet connection.", ToastAndroid.LONG);
                setTimeout(() => this.prepare(), 5000);
            });
    }

    componentDidMount() {
        // Hack because early "react-progress" render fails
        setTimeout(() => {
            this.setState({
                ready: true,
            });
        }, 0);
    }

    async done () {
        vibrate(NotificationFeedbackType.Success);

        await this.promise;

        this.setState({
            isLoading: false,
        });
    }

    async selectMood () {
        const color = await getColor();
        if (color) {
            const hsl = convert.hex.hsl(color.slice(1));
            const { name, emoji } = getMood(hsl[0] / 360);
            const intensity = getIntensity(hsl[1] / 100);

            this.setState({
                mood: {
                    name,
                    emoji,
                    intensity,
                    color,
                },
                textColor: hsl[2] < 50 ? "#fff" : "#222",
            });
        }
        else {
            throw new Error("Couldn't fetch a color.")
        }
    }

    getView () {
        if (!this.state.isLoading && this.state.mood) {
            return <Output mood={this.state.mood} textColor={this.state.textColor} onPress={() => this.prepare()}/>;
        }

        if (this.state.ready) {
            return <Main callback={() => this.done()}/>;
        }

        return <></>;
    }

    render () {
        return (
            <View style={styles.screen}>
                {this.getView()}
            </View>
        );
    }
}


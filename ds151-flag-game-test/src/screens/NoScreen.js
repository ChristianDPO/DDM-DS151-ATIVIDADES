import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { X } from "react-native-feather";
import Icon from 'react-native-vector-icons/AntDesign';

import { AppContext } from '../context/AppContext';

function NoScreen({ navigation }) {

    const { appState, max_stages, nextStage, generateNextStage, timedOut } = useContext(AppContext);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Errou!</Text>
            {/* <X width={300} height={300}/> */}
            <View style={styles.icon}>
                <Icon name="close" size={300} />
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {

                    if(appState.with_time){
                        generateNextStage();
                        nextStage();

                        if(timedOut){
                            navigation.navigate("End");
                        }
                        else{
                            navigation.navigate("Game");
                        }
                    }
                    else{
                        if (appState.stage + 1 == max_stages) {
                            navigation.navigate("End");
                        }
                        else {
                            nextStage();
                            navigation.navigate("Game");
                        }
                    }

                }}
            >
                <Text style={styles.textButton}>Continuar</Text>
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ff6666',
        padding: 20
    },
    text: {
        fontWeight: 'bold',
        fontSize: 60,
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'red',
        //   width: 'max-content',
        padding: 10
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold'
    },
    icon: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#000'
      }
});

export default NoScreen;
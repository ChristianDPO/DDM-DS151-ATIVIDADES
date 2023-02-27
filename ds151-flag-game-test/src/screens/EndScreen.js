import React, { useContext } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import api from '../api/api';

import { AppContext } from '../context/AppContext';

function EndScreen({navigation}){

    const { appState, createGame, createGameWithTime, clearGame} = useContext(AppContext);

    async function postScore(){
        let score = {
            name: appState.name,
            score: appState.points
        }
        
        if(appState.with_time){
                    
            const response = await api.post('timedscores', score);
            console.log(response)
            
        }
        else{
            const response = await api.post('scores', score);
            console.log(response)
        }
    }

    return(
        <View style={styles.container}>
            <Text style={{... styles.text, fontSize: 60}}>Fim de Jogo!</Text>
            <Text style={{... styles.text, fontSize: 50}}>{appState.name}</Text>
            <Text style={{... styles.text, fontSize: 50}}>{appState.points} pontos!</Text>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity
                    style={{...styles.button, backgroundColor: 'blue'}}
                    onPress={() => {
                        
                        postScore();
                        
                        if(appState.with_time){
                            createGameWithTime();
                        }
                        else{
                            createGame();
                        }
                        navigation.navigate("Game");
                    }}
                >
                    <Text style={styles.textButton}>Recomeçar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{...styles.button, backgroundColor: 'red'}}
                    onPress={() => {
                        postScore();
                        clearGame();
                        navigation.navigate("Home");
                    }}
                >
                    <Text style={styles.textButton}>Encerrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'lightblue',
      padding: 20
    },
    text: {
        fontWeight: 'bold'
    },
    button:{
        alignItems: 'center',
       // width: 'max-content',
        padding: 10
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold'
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    }
});

export default EndScreen;
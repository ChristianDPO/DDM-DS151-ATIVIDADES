import React, {useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Button} from 'react-native';

import { AppContext } from '../context/AppContext';

function GameScreen({navigation}){

    const image_uri = "https://countryflagsapi.com/png/"
    const { appState, max_stages, addPoint, clearGame, timer } = useContext(AppContext);
    const [answer, setAnswer] = useState("");
    
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        clearGame();
                        navigation.navigate("Home");
                    }}
                >
                    <Text style={styles.textHeader}>X</Text>
                </TouchableOpacity>
                <Text style={!appState.with_time? styles.textHeader: {...styles.textHeader, display:'none'}}>
                    {appState.stage + 1}/{max_stages}
                </Text>
                <Text style={appState.with_time? styles.textHeader: {...styles.textHeader, display:'none'}}>
                    { timer } 
                </Text>
                <Text style={styles.textHeader}>Pontos: {appState.points}</Text>
            </View>
            <Text style={styles.text}>{appState.name},</Text>
            <Text style={styles.text}>selecione qual país a bandeira abaixo pertence:</Text>
            <Image
                style={styles.image}
                source={{
                    uri: image_uri + appState.game[appState.stage].answer
                }}
            />
            <FlatList
                data={appState.game[appState.stage].options}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity
                            style={answer == item? styles.textInputSelected: styles.textInput}
                            onPress={() => setAnswer(item)}
                        >
                            <Text>{item}</Text>    
                        </TouchableOpacity>
                    );
                }}
            />
            <Button
                title='Confirmar'
                disabled={!answer}
                onPress={() => {
                    if(answer == appState.game[appState.stage].answer){
                        addPoint();
                        setAnswer("");
                        navigation.navigate("Yes");
                    }
                    else{
                        setAnswer("");
                        navigation.navigate("No");   
                    }
                }}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'center',
      margin: 20,
      alignItems: 'stretch'
    },
    header:{
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        gap: 100,

    },
    textInput: {
      flex: 1,
      alignItems: 'stretch',
      borderWidth: 2,
      borderRadius: 5,
      padding: 10,
      margin: 10
    },
    textInputSelected: {
        flex: 1,
        alignItems: 'stretch',
        borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        margin: 10,
        borderColor: 'green',
        backgroundColor: 'lightgreen'
    },
    text:{
        fontSize: 20,
        margin: 10,
        textAlign: 'center',
        alignContent: 'center',
        fontWeight: 'bold'
    },
    textHeader: {
        fontSize: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        fontWeight: 'bold'
    },
    image: {
        width: 300,
        height: 200,
        alignSelf: 'center',
        margin: 10
    }
}); 


export default GameScreen;
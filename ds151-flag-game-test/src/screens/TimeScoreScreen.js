import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList } from 'react-native';

import api from '../api/api';

import { AppContext } from '../context/AppContext';

const renderItem = ({ item }) => {
    //the app will represent each list item via a Text component
    return <Text style={styles.text}>{item.name}: {item.score} pontos</Text>;
};

function TimeScoreScreen({ navigation }) {

    const {setNamesTime, namesTime} = useContext(AppContext);

    useEffect(() => {
    
        async function getNames(){
            const response = await api.get('timedscores');
            setNamesTime(response.data.sort((a, b) => b.score - a.score));
            console.log(namesTime);
        }
        
        getNames();
    
    }, []);


    return (
        <View style={styles.container}>
            {/* <Text style={styles.text}>PointsScoreScreen</Text> */}

            <FlatList
                style={styles.text}
                data={namesTime}
                keyExtractor={(key) => key.toString()}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: 'center',
    },
    text: {
        fontSize: 20,
        fontFamily: "monospace"
    },
});

export default TimeScoreScreen;
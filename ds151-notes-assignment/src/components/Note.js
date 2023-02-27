import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet} from 'react-native'

function Note({props, navigation}){
    return(
        <TouchableOpacity style={styles.note}
            onPress={() => navigation.navigate('UpdateNote', {props: props})}
        >
            <View style={styles.title}>
                <Text>{props.title}</Text>
            </View>
            <View style={styles.body}>
                <Text>{props.text}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    note: {
        flex: 1,
        backgroundColor: '#f0e056',
        minHeight: 200,
        minWidth: 200,
        flexWrap: 'wrap',
        margin: 20
    },
    title:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        flexWrap: 'wrap'
    },
    body:{
        flex: 5,
        alignItems: 'start',
        borderWidth: 1,
        padding: 10,
        flexWrap: 'wrap'
    }
});

export default Note;
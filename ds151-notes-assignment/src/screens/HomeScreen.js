import React, { useContext }from 'react';
import { Text, View, Button, StyleSheet, FlatList } from 'react-native';

import Note from '../components/Note';

import { NotesContext } from '../context/NotesContext'

// const initial_notes = [
//     {id: 0, title: 'Nota 1', text: 'Texto 1'},
//     {id: 1, title: 'Nota 2', text: 'Texto 2'}
// ]

function HomeScreen({navigation}) {

    const notesContext = useContext(NotesContext)

    return (
    <View>
        <Button 
        title='Create a New Note' 
        onPress={() => navigation.navigate('CreateNote')}
        />
        <Text style={styles.title}>Click on a note to edit or delete it!</Text>
        <View style={styles.container}> 
            <FlatList
                data={notesContext.state.notesList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={ ({item}) => (
                    <Note props={item} navigation={navigation}/>
                )}
            />
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    }, 
    title:
    {
        fontSize: 28,
        margin: 10
    }
});


export default HomeScreen;

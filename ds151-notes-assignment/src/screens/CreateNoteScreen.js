import React, { useState, useContext }from 'react'
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';

import { NotesContext } from '../context/NotesContext'


function CreateNoteScreen({navigation}) {
  
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const notesContext = useContext(NotesContext)

  return (
      <View>
        <Text style={styles.title}>Create a Note</Text>
        <Text>Choose a Title (not empty):</Text>
        <TextInput 
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Title"
          style={styles.textInput}
          onChangeText={(oldTitle) => setTitle(oldTitle)}  
        />
        <Text>Choose a text for the note (not empty):</Text>
        <TextInput 
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Text"
          style={styles.textInput}
          onChangeText={(oldText) => setText(oldText)}
        />
        <Button 
          title='Create New Note' 
          onPress={() => {
            
            if(title && text){
              notesContext.add({title: title, text: text})
              navigation.navigate("Home")
            }

          }
        }
        />
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'lightgrey',
    margin: 10,
    alignItems: 'center',
  },
  textInput: {
    fontSize: 18,
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  title:{
    fontSize: 28,
    margin: 10
  }
});
  

export default CreateNoteScreen;
  
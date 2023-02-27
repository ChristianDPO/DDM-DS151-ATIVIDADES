import React, { useState, useContext, useEffect }from 'react'
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';

import { NotesContext } from '../context/NotesContext'


function UpdateNoteScreen({navigation, route}) {
  
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const notesContext = useContext(NotesContext)

  useEffect(() => {
    let props = route.params.props
    setTitle(props.title)
    setText(props.text)
  }, []);

  return (
      <View>
        <Text style={styles.title}>Update Note</Text>
        <Text>Choose a Title (not empty):</Text>
        <TextInput 
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Title"
          value={title}
          style={styles.textInput}
          onChangeText={(oldTitle) => setTitle(oldTitle)}  
        />
        <Text>Choose a text for the note (not empty):</Text>
        <TextInput 
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Text"
          value={text}
          style={styles.textInput}
          onChangeText={(oldText) => setText(oldText)}
        />
        <Button 
          title='Update Note' 
          onPress={() => {
            
            let props = route.params.props

            if(title && text){
              notesContext.upd({... props, title: title, text: text})
              navigation.navigate("Home")
            }
          }
        }
        />
        <Button 
          title='Delete this Note' 
          onPress={() => {
            
            let props = route.params.props
            notesContext.del(props.id)
            navigation.navigate("Home")
            
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
  

export default UpdateNoteScreen;
  
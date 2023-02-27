import React,  { useState , useContext} from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

import { AppContext } from '../context/AppContext';

const HomeScreen = ({ navigation }) => {
  const [nome, setNome] = useState("")
  const { setPlayerName, createGame, createGameWithTime } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>BEM-VINDO!</Text>
      <Text style={styles.subtitulo}>Digite seu nome</Text>

      <TextInput 
        style={styles.textInput}
        multiline={true}
       scrollEnabled={true}
        autoCorrect={true}
        onChangeText={(value) => setNome(value)}
      /> 
      <Button
        title="INICIAR JOGO NORMAL"
        disabled={!nome}
        onPress={() => {
          setPlayerName(nome);
          createGame();
          navigation.navigate("Game");          
        }}
      />
      <Button
        title="INICIAR JOGO POR TEMPO"
        disabled={!nome}
        onPress={() => {
          setPlayerName(nome);
          createGameWithTime();
          navigation.navigate("Game");
        }}
      />
      <Button
        title="QUADRO DE PONTUAÇÃO"
        onPress={() => {
          navigation.navigate("Scores");
        }}
      />
    </View>
 
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#d3d3d3",
      alignContent: 'center',
    },
    titulo: {
      fontSize: 30,
      marginVertical: 2,
      fontFamily: "monospace"
    },
    subtitulo: {
      fontSize: 20,
      fontFamily: "monospace"
    },
    textInput: {
      // borderWidth: 2,
      // borderRadius: 5,
      // padding: 10,
      // margin: 10
      height: 40,
      padding: 10,
      paddingStart: 10,
      fontSize: 20,
      borderWidth: 2,
      width: 160,
      borderColor: "black",
      borderRadius: 10,
      margin: 10,
      fontFamily: "monospace"
    },
});

export default HomeScreen;
import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

function LoginScreen({ navigation }){
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { authState, signIn, tryLocalSignIn } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignIn();
  },[]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gitlab Login</Text>
      <Text>Username:</Text>
      <TextInput
        placeholder="Username"
        onChangeText={(value) => setUsername(value)}
        value={username}
        style={styles.textInput}
      />
      <Text>Password:</Text>
      <TextInput
        placeholder="Password"
        onChangeText={(value) => setPassword(value)}
        value={password}
        secureTextEntry={true}
        style={styles.textInput}
      />
      <Button
        title="Entrar"
        onPress={() => {
          signIn({ username, password });
        }}
      />
      {authState.error ? <Text>{authState.error}</Text> : null}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    marginTop: 40
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




export default LoginScreen;
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 

import HomeScreen from './src/screens/HomeScreen';
import CreateNoteScreen from './src/screens/CreateNoteScreen';
import UpdateNoteScreen from './src/screens/UpdateNoteScreen';

import { NotesProvider } from './src/context/NotesContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    < NotesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CreateNote" component={CreateNoteScreen} />
          <Stack.Screen name="UpdateNote" component={UpdateNoteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NotesProvider>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import NoScreen from './src/screens/NoScreen';
import YesScreen from './src/screens/YesScreen';
import EndScreen from './src/screens/EndScreen';
import PointsScoreScreen from './src/screens/PointsScoreScreen';
import TimeScoreScreen from './src/screens/TimeScoreScreen';

import { AppProvider } from './src/context/AppContext';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function ScoreScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="PointsScore" component={PointsScoreScreen} options={{title: 'NORMAL'}}/>
      <Tab.Screen name="TimeScore" component={TimeScoreScreen} options={{title: 'POR TEMPO'}}/>
    </Tab.Navigator>
  );
}

function App() {
  return (
    <AppProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Game" component={GameScreen} options={{headerShown: false}}/>
            <Stack.Screen name="No" component={NoScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Yes" component={YesScreen} options={{headerShown: false}}/>
            <Stack.Screen name="End" component={EndScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Scores" component={ScoreScreen} options={{ title: 'Quadro de Pontuação' }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </AppProvider>
  );
}

export default App;
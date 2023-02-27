import React from 'react';
import { View, Button } from 'react-native';

function HomeScreen({navigation}) {
  return (
    <View>
      <Button 
        title='Vai para TodoList' 
        onPress={() => navigation.navigate("TodoList")}
      />
    </View>
  );
}

export default HomeScreen;
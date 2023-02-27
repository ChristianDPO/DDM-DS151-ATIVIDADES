import React, { useEffect, useContext, useState } from "react";
import { View, Text, Button, StyleSheet, Image} from "react-native";
import { AuthContext } from '../context/AuthContext';
import gitlab from '../api/gitlab';

const ProfileScreen = ({ navigation }) => {

  const [user, setUser] = useState({});
  const { signOut } = useContext(AuthContext);

  useEffect(() => {
    
    async function getUser(){
      const response = await gitlab.get('user');
      setUser(response.data);
    }

    getUser();

  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <View style={{flexDirection: "row", margin: 10}}>
        <Image 
            style={styles.image}
            source={{
                uri: user.avatar_url,
            }}
        />
        <View style={styles.containerProfile}>
            <Text>Username: {user.username}</Text>
            <Text>Name: {user.name}</Text>
            <Text>Email: {user.email}</Text>
            <Text>Profile Url: {user.web_url}</Text>
        </View>
      </View>
    </View>
  );

};


const styles = StyleSheet.create({
    container: {
      padding: 10,
      borderRadius: 10,
      margin: 10,
      alignItems: 'start'
    },
    containerProfile: {
        flexDirection:'column', 
        alignItems:"start", 
        margin: 3, 
        borderWidth: 1, 
        borderRadius: 10,
        padding: 10,
        height: 100,
      },
    title:{
      fontSize: 28,
      margin: 10
    },
    image:{
        width: 100,
        height: 100,
        borderRadius: 10
    }
  });

export default ProfileScreen;
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

import { AuthContext } from '../context/AuthContext';


const Drawer = createDrawerNavigator();

function RootScreen() {

    const { signOut } = useContext(AuthContext);

    function DrawerProps(props){
        return(
            <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem style={styles.btnLoggout} label="Logout" onPress={() => signOut()} />
            </DrawerContentScrollView>
        )
    }

    return (
    <Drawer.Navigator drawerContent={DrawerProps}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    btnLoggout:{
        backgroundColor: 'red'
    }
});

export default RootScreen;
import React from "react";
import { View, Text, StyleSheet } from "react-native";

function ProjectBox({ item }){

    return(
        <View style={styles.container}>
            <Text>
                <Text style={{fontWeight: "bold"}} >Namespace: </Text>
                {item.namespace.name}
            </Text>
            <Text>
                <Text style={{fontWeight: "bold"}} >Name: </Text>
                {item.name}
            </Text>
            <Text>
                <Text style={{fontWeight: "bold"}} >Visibility: </Text>
                {item.visibility}
            </Text>
            <Text>
                <Text style={{fontWeight: "bold"}} >SSH url: </Text>
                {item.ssh_url_to_repo}
            </Text>
            <Text>
                <Text style={{fontWeight: "bold"}} >HTTP url: </Text>
                {item.http_url_to_repo}
            </Text>
            <Text>
                <Text style={{fontWeight: "bold"}} >Description: </Text>
                {item.description}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flexDirection:'column', 
      alignItems:"start", 
      margin: 3, 
      borderWidth: 1, 
      borderRadius: 10,
      margin: 10,
      padding: 10
    },
    text: {
      fontSize: 15, 
      marginLeft: 5
    }
});

export default ProjectBox;
import React from 'react';
import { View, Text , Button, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
    task: {
      height: 40,
      margin: 12,
      padding: 10,
      backgroundColor: 'yellow'
    },
    taskMarked: {
        height: 40,
        margin: 12,
        padding: 10,
        backgroundColor: 'gray',
        textDecorationLine: 'line-through'
      }
  });

function TaskBox({taskObj, markTask}){
    
    let taskStyle = styles.task;

    if(taskObj.marked){
        taskStyle= styles.taskMarked;
    }
    

    return(
        <View style={taskStyle}>
           <TouchableOpacity onPress = {() => markTask(taskObj.name)}>
               <Text>{taskObj.name}</Text>
           </TouchableOpacity>
        </View>
    );

}

export default TaskBox;
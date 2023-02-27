import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';

import TaskBox from '../components/TaskBox';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "gray"
  }
});

function TodoListScreen() {
  const [tasks, setTasks] = useState([]);

  function createNewTask(event){
    setTasks( prevTasks => {
      //console.log(event.target.value)
      const taskText = event.target.value;

      const newTasks = [...prevTasks];
      newTasks.push({name: taskText, marked: false});
      
      // console.log(newTasks)
      return(newTasks);
    })
  }
  
  function markTask(task_name){
    setTasks(prevTasks => {

      //Logica passada pra somente modificair o valor da task
      // const newTasks = prevTasks.map(task => {
      //   return task_name === task.name ? {... task, marked: !task.marked} : task
      // })

      const taskToMark = prevTasks.find(task => task_name === task.name);
      taskToMark.marked = !taskToMark.marked;
      
      const newTasks = prevTasks.filter(task => task_name !== task.name);
      
      //Logica para inserir as tasks marcadas no final e as desmarcadas no comeco
      if(taskToMark.marked){
        newTasks.push(taskToMark);
      }
      else
        newTasks.unshift(taskToMark);
        
      return(newTasks);
    })
  }

  return (
    <View>
      <TextInput style={styles.input}
        placeholder="Nova Tarefa"
        onSubmitEditing={createNewTask}
      />
      <FlatList 
        data={tasks}
        renderItem={ ({item}) => (
          <TaskBox taskObj={item} markTask={markTask}/>
        )}
      />
    </View>
  );


}

export default TodoListScreen;

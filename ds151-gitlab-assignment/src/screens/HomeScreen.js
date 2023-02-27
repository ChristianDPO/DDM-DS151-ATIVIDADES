import React, { useEffect, useState} from "react";
import { Text, FlatList, StyleSheet } from "react-native";

import ProjectBox from '../components/ProjectBox';

import gitlab from '../api/gitlab';


const HomeScreen = ({ navigation }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    
    async function getProjects(){
      const response = await gitlab.get('projects', {params: {owned: true}});
      setProjects(response.data);
    }

    getProjects();

  }, []);

  return (
    <>
      <Text style={styles.title}>My Projects</Text>
      <FlatList
        data={projects}
        renderItem={({ item }) => (
          <ProjectBox item={item}/>
        )}
      />
    </>
  );

};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center'
  },
  title:{
    fontSize: 28,
    margin: 10
  }
});

export default HomeScreen;
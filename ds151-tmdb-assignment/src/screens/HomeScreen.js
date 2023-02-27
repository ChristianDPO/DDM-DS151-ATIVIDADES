import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image} from 'react-native';
import SearchBar from '../components/SearchBar';
import tmdb from '../api/tmdb';

const HomeScreen = ({navigation}) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('')
  const [resultsMovies, setResultsMovies] = useState([]);
  const [resultsTV, setResultsTV] = useState([]);
  const [resultsPeople, setResultsPeople] = useState([]);

  const default_image_path = require('../../assets/image-not-found.jpg');
  const image_api_path = "https://image.tmdb.org/t/p/w300/";

  useEffect(() => {  
    // searchTmdb('Fight Club');
  },[]);

  //Gets from all APIs to be ready to display
  async function searchTmdb(query) {
    
    //GET movies
    try {
      const response = await tmdb.get('/search/movie', {
        params: {
          query,
          include_adult: false,
        }
      })
      setResultsMovies(response.data.results);
    }
    catch (err) {
      console.log(err);
    }

    //GET TV
    try {
      const response = await tmdb.get('/search/tv', {
        params: {
          query,
          include_adult: false,
        }
      })
      setResultsTV(response.data.results);
    }
    catch (err) {
      console.log(err);
    }

    //GET People
    try {
      const response = await tmdb.get('/search/person', {
        params: {
          query,
          include_adult: false,
        }
      })
      setResultsPeople(response.data.results);
    }
    catch (err) {
      console.log(err);
    }
    
  }

  //returns the list for the category
  function selectAPIList(category){

    if(category === "tv")
      return resultsTV

    if(category === "people")
      return resultsPeople

    //Defaults to movies
    return resultsMovies

  }

  //renders all objects based on the 'category' state
  function renderAPIObjects(item, category){

    //Defaults to movies
    let image_uri = image_api_path
    let image_path = ''
    let object_title = ''

    if(category === "tv"){
      image_path = item.backdrop_path
      object_title = item.original_name;
    }
    else if (category === "people"){
      image_path = item.profile_path
      object_title = item.name;
    } else{
      //defaults to 'movies'
      image_path = item.backdrop_path
      object_title = item.original_title;
    }

    if(!image_path){
      image_uri = default_image_path;
    }
    else
      image_uri = image_uri + image_path

    return(
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Details", {
            category: category,
            id: item.id
          })}
        >
          <Image
            style={{width: 100, height: 100}}
            source={{uri: image_uri}}
          />
        </TouchableOpacity>
        <Text>{object_title}</Text>
      </View>
    )
  }

  return (
    <>
      <SearchBar 
        onChangeText={(t) => setText(t)}
        onEndEditing={(t) => searchTmdb(t)}
        value={text}
      />
      <View style={styles.container}>
        <TouchableOpacity
          style={category === "movies" ? styles.buttonPressed : styles.button}
          onPress={() => setCategory('movies')}
        >
          <Text>Movies</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={category === "tv" ? styles.buttonPressed : styles.button}
          onPress={() => setCategory('tv')}
        >
          <Text>TV</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={category === "people" ? styles.buttonPressed : styles.button}
          onPress={() => setCategory('people')}
        >
          <Text>People</Text>
        </TouchableOpacity>
      </View>
      <FlatList 
        data={selectAPIList(category)}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => renderAPIObjects(item, category)}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection:'row',   
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    flex: 1,
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 20,
    padding: 5,
    margin: 5,
  },
  buttonPressed: {
    flex: 1,
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 20,
    padding: 5,
    margin: 5,
    borderColor: 'red',
    color: 'red'
  }
});

export default HomeScreen;

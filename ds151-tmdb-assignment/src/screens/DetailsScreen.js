import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import tmdb from '../api/tmdb';

const DetailsScreen = ({ navigation, route }) => {
  const [item, setItem] = useState({});
  
  const default_image_path = require('../../assets/image-not-found.jpg');
  const image_api_path = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {

    const category = route.params.category;
    const id = route.params.id;

    if(category === "tv"){
      getTV(id);
    }
    else if(category === "people"){
      getPerson(id);
    }
    else
      getMovie(id);

  }, []);
  
  async function getMovie(id) {
    try {
      const response = await tmdb.get(`/movie/${id}`, {
        params: {
        }
      })
      setItem(response.data);
    }
    catch (err) {
      console.log(err);
    }

  }

  async function getTV(id) {
    try {
      const response = await tmdb.get(`/tv/${id}`, {
        params: {
        }
      })
      setItem(response.data);
    }
    catch (err) {
      console.log(err);
    }

  }

  async function getPerson(id) {
    try {
      const response = await tmdb.get(`/person/${id}`, {
        params: {
        }
      })
      setItem(response.data);
    }
    catch (err) {
      console.log(err);
    }

  }

  function renderAPIItem(item){
    
    let category = route.params.category;
    let image_uri = image_api_path;
    let image_path = '';

    if(category === "tv"){
      image_path = item.backdrop_path
    }
    else if (category === "people"){
      image_path = item.profile_path
    } else{
      //defaults to 'movies'
      image_path = item.backdrop_path
    }

    if(!image_path){
      image_uri = default_image_path;
    }
    else
      image_uri = image_uri + image_path

    if(category === "tv"){
      return (
        <View style={styles.container}>
          <Image
            style={{width: 300, height: 300}}
            source={{uri: image_uri}}
          />
          <Text>
            <Text style={{fontWeight: "bold"}} >Título: </Text> 
            {item.name}
          </Text>
          <Text>
            <Text style={{fontWeight: "bold"}} >Título Original: </Text> 
            {item.original_name}
          </Text>
          <Text>
            <Text style={{fontWeight: "bold"}} >Número de Episodios: </Text> 
            {item.number_of_episodes}
          </Text>
          <Text>
            <Text style={{fontWeight: "bold"}} >Número de Temporadas: </Text> 
            {item.number_of_seasons}
          </Text>
          <Text>
            <Text style={{fontWeight: "bold"}} >Primeira data de exibição: </Text> 
            {item.first_air_date}
          </Text>
          <Text>
            <Text style={{fontWeight: "bold"}} >Última data de exibição: </Text> 
            {item.last_air_date}
          </Text>
          <Text>
            <Text style={{fontWeight: "bold"}} >Sinopse: </Text> 
            {item.overview}
          </Text>
        </View>
      )
    }
  
    if(category === "people")
      return (
        <View style={styles.container}>
          <Image
            style={{width: 300, height: 300}}
            source={{uri: image_uri}}
          />
          <Text>
            <Text style={{fontWeight: "bold"}} >Nome: </Text>  
            {item.name}
          </Text>
          <Text>
            <Text style={{fontWeight: "bold"}} >Data de nascimento: </Text>  
            {item.birthday}
          </Text>
          <Text>
            <Text style={{fontWeight: "bold"}} >Falecido(a) em: </Text>  
            {item.deathday}
          </Text>
          <Text>
            <Text style={{fontWeight: "bold"}} >Conhecido(a) por: </Text>  
            {item.known_for_department}
          </Text>
          <Text>
            <Text style={{fontWeight: "bold"}} >Biografia: </Text>  
            {item.biography}
          </Text>
        </View>
      )
  
    //defaults to 'movie'
    return (
      <View style={styles.container}>
        <Image
          style={{width: 300, height: 300}}
          source={{uri: image_uri}}
        />
        <Text>
          <Text style={{fontWeight: "bold"}} >Título: </Text> 
          {item.title}
        </Text>
        <Text>
          <Text style={{fontWeight: "bold"}} >Título Original: </Text> 
          {item.original_title}
        </Text>
        <Text>
          <Text style={{fontWeight: "bold"}} >Data de lançamento: </Text> 
          {item.release_date}
        </Text>
        <Text>
          <Text style={{fontWeight: "bold"}} >Orçamento (dólares): </Text> 
          {item.budget != 0? item.budget : 'sem dados'}
        </Text>
        <Text>
          <Text style={{fontWeight: "bold"}} >Rendimento (dólares): </Text> 
          {item.revenue != 0? item.revenue : 'sem dados'}
        </Text>
        <Text>
          <Text style={{fontWeight: "bold"}} >Sinopse: </Text> 
          {item.overview}
        </Text>
      </View>
    )
  }

  return renderAPIItem(item);

}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 30,
    margin: 30,
  },
});

export default DetailsScreen;

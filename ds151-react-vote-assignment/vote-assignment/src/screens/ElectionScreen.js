import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, FlatList } from "react-native";


const styles = StyleSheet.create({
    box: {
        borderWidth: 5,
        borderStyle: 'dashed',
        height: '300px',
        width: '300px',
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


function ElectionScreen({registered_candidates}){
    const [candidates, setCandidates] = useState([]);
    const [endElection, setEndElection] = useState(false);    
  
    function updateVotes(name){
  
      const new_candidates = candidates.map(candidate => {
        return candidate.name === name ? {... candidate, votes: candidate.votes + 1}: candidate
      })
  
      setCandidates(new_candidates)
  
    }
  
    function chooseWinner(final_candidates){
  
      var winner = final_candidates[0];
  
      for(var i = 1; i < final_candidates.length; i++){
        
        if(final_candidates[i].votes > winner.votes){
          winner = final_candidates[i];
        } else if(final_candidates[i].votes === winner.votes){
          winner = {name: 'Tied election', votes: winner.votes}
        } 
      }
  
      return winner;
  
    }
  
    useEffect( () => {
      setCandidates(registered_candidates);
    },[]);
  
    if(endElection){
      
      const current_winner = chooseWinner(candidates);
      
      return (
        <View style={styles.container}>
          <h1>Results:</h1>
          <FlatList 
          data={candidates}
          renderItem={ ({item}) => (
            <View style={styles.container}>
              <Text>{item.name}: {item.votes}</Text>
            </View>
          )}
          />
          <h2>Winner: {current_winner.name} with {current_winner.votes} votes!</h2>
        </View>
      ); 
    }
  
    return (
      <View style={styles.container}>
        <h1>Current Election:</h1>
        <FlatList 
        data={candidates}
        renderItem={ ({item}) => (
          <View style={styles.box}>
            <Text>{item.name}</Text>
            <Text>{item.votes}</Text>
            <Button title="Vote" color="gray" onPress={ () => updateVotes(item.name)}/>
          </View>
        )}
        />
        <Button title="Finish Election" color="gray" onPress={() => setEndElection(true)}></Button>
      </View>
    );
}

export default ElectionScreen;
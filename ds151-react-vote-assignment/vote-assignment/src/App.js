import { View } from "react-native";

import ElectionScreen from "./screens/ElectionScreen";

const candidates = [
  {name: 'Marty', votes: 0},
  {name: 'John', votes: 0},
  {name: 'Andrey', votes: 0}
]

function App() {

  return (
    <View>
      <ElectionScreen registered_candidates={candidates}/>
    </View>
  );

}

export default App;
import { FlatList, View } from "react-native";
import { Card } from "./components";

type Pokemon = {
  name: string;
  picture: string;
};

type Props = {
  list: Pokemon[];
  selectPokemon: (name: string) => void;
};

const PokemonList = ({ list, selectPokemon }: Props) => {
  return (
    <View>
      <FlatList
        data={list}
        keyExtractor={(item, index) => `${index}-${item.name}`}
        numColumns={2}
        contentContainerStyle={{
          alignItems: "center",
          flexGrow: 1,
        }}
        renderItem={({ item }) => (
          <View style={{ width: 140, height: 140, margin: 10 }}>
            <Card {...item} onPress={selectPokemon} />
          </View>
        )}
      />
    </View>
  );
};

export default PokemonList;

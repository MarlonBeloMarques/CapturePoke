import { FlatList, View } from "react-native";
import { Card } from "./components";
import { ThemedText } from "../global/components/ThemedText";

type Pokemon = {
  name: string;
  picture: string;
};

type Props = {
  list: Pokemon[];
  errorMessage: string;
  selectPokemon: (name: string) => void;
};

const PokemonList = ({ list, errorMessage, selectPokemon }: Props) => {
  return (
    <View>
      {errorMessage && (
        <ThemedText testID="error_message_id">{errorMessage}</ThemedText>
      )}
      {list && list.length > 0 && (
        <FlatList
          testID="pokemon_list_id"
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
      )}
    </View>
  );
};

export default PokemonList;

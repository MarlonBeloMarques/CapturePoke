import { useMemo } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Card } from "./components";
import { ThemedText } from "../global/components/ThemedText";
import PokemonListViewModel from "./PokemonListViewModel";

const PokemonList = ({
  list,
  errorMessage,
  findingPokemons,
  selectPokemon,
  fetchNextList,
}: PokemonListViewModel) => {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {!findingPokemons && errorMessage && (
        <View style={{ alignItems: "center" }}>
          <ThemedText testID="error_message_id">{errorMessage}</ThemedText>
        </View>
      )}
      {findingPokemons && <ActivityIndicator testID="loading_id" />}
      {useMemo(
        () =>
          !errorMessage &&
          list &&
          list.length > 0 && (
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
              onEndReached={fetchNextList}
              onEndReachedThreshold={0.9}
            />
          ),
        [list, fetchNextList, selectPokemon, errorMessage],
      )}
    </View>
  );
};

export default PokemonList;

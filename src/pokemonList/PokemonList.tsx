import { useMemo } from "react";
import { ActivityIndicator } from "react-native";
import { Card } from "./components";
import { ThemedText } from "../global/components/ThemedText";
import PokemonListViewModel from "./PokemonListViewModel";
import { CardWrapper, ErrorMessageWrapper, Pokemons, Wrapper } from "./styles";
import { Pokemon } from "./domain/PokemonList";

const PokemonList = ({
  list,
  errorMessage,
  findingPokemons,
  selectPokemon,
  fetchNextList,
}: PokemonListViewModel) => {
  return (
    <Wrapper>
      {!findingPokemons && errorMessage && (
        <ErrorMessageWrapper>
          <ThemedText testID="error_message_id">{errorMessage}</ThemedText>
        </ErrorMessageWrapper>
      )}
      {findingPokemons && <ActivityIndicator testID="loading_id" />}
      {useMemo(
        () =>
          !errorMessage &&
          list &&
          list.length > 0 && (
            <Pokemons
              testID="pokemon_list_id"
              data={list}
              keyExtractor={(_, index) => `${index}`}
              renderItem={({ item }: { item: Pokemon }) => (
                <CardWrapper>
                  <Card {...item} onPress={selectPokemon} />
                </CardWrapper>
              )}
              onEndReached={fetchNextList}
            />
          ),
        [list, fetchNextList, selectPokemon, errorMessage],
      )}
    </Wrapper>
  );
};

export default PokemonList;

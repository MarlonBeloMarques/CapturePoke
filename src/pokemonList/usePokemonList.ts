import { useCallback, useMemo } from "react";
import PokemonList from "./domain/PokemonList";
import PokemonListViewModel from "./PokemonListViewModel";

type Props = {
  pokemonList: PokemonList;
  seePokemonDetails: (id: number) => void;
};

const usePokemonList = ({
  pokemonList,
  seePokemonDetails,
}: Props): PokemonListViewModel => {
  const list = pokemonList.get() || [];

  const getErrorMessage = () => {
    if (list.length === 0) {
      return "Parece que não encontramos nenhum pokemon.";
    }

    return "";
  };

  const selectPokemon = (name: string) => {
    const foundPokemon = list.find(
      (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase(),
    );
    if (foundPokemon) {
      seePokemonDetails(foundPokemon.id);
    }
  };

  const fetchNextList = useCallback(() => {
    pokemonList.fetchNextList();
  }, [pokemonList]);

  const findingPokemons = useMemo(() => pokemonList.finding(), [pokemonList]);

  return {
    errorMessage: getErrorMessage(),
    findingPokemons,
    list,
    selectPokemon,
    fetchNextList,
  };
};

export default usePokemonList;

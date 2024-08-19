import { PokemonList } from "./domain/PokemonList";
import PokemonListViewModel from "./PokemonListViewModel";

type Props = {
  pokemonList: PokemonList;
  seePokemonDetails: (id: number) => void;
};

type PokemonDetail = {
  name: string;
  picture: string;
  id: number;
};

const usePokemonList = ({
  pokemonList,
  seePokemonDetails,
}: Props): PokemonListViewModel => {
  const list: PokemonDetail[] = pokemonList.get() || [];

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

  return {
    errorMessage: getErrorMessage(),
    findingPokemons: pokemonList.finding(),
    list,
    selectPokemon,
  };
};

export default usePokemonList;

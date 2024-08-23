export type Pokemon = {
  name: string;
  picture: string;
};

type PokemonListViewModel = {
  list: Pokemon[];
  errorMessage: string;
  findingPokemons: boolean;
  selectPokemon: (name: string) => void;
  fetchNextList: () => void;
};

export default PokemonListViewModel;

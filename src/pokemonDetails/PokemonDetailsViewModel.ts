type PokemonDetailsViewModel = {
  name: string;
  picture: string;
  abilities: string[];
  types: string[];
  specie: { name: string; species: string[] };
  findingPokemonDetails: boolean;
  errorMessage: string;
  capturePokemon: (name: string, picture: string) => void;
};

export default PokemonDetailsViewModel;

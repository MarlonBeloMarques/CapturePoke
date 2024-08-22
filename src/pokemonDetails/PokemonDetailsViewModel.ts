type PokemonDetailsViewModel = {
  name: string;
  picture: string;
  abilities: string[];
  types: string[];
  specie: { name: string; species: string[] };
  findingPokemonDetails: boolean;
  errorMessage: string;
};

export default PokemonDetailsViewModel;

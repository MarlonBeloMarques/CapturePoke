export type Details = {
  name: string;
  picture: string;
  abilities: string[];
  types: string[];
  specie: { name: string; species: string[] };
};

interface PokemonDetails {
  get: () => Details;
  finding: () => boolean;
}

export default PokemonDetails;

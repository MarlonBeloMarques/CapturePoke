export type Pokemon = {
  id: number;
  name: string;
  picture: string;
};

export default interface PokemonList {
  get: () => Pokemon[];
  finding: () => boolean;
  fetchNextList: () => void;
}

import PokemonList, { Pokemon } from "@/src/pokemonList/domain/PokemonList";
import getPokemonListFake from "./getPokemonListFake";

export default class PokemonListFake implements PokemonList {
  pokemonList: Pokemon[] = [];
  fetchNextListHasBeenCalled = false;
  constructor(
    pokemonList: Pokemon[],
    readonly isFinding: boolean = true,
    readonly newPokemonList: Pokemon[] = getPokemonListFake(3),
  ) {
    this.pokemonList = pokemonList;
  }
  get = (): any[] => {
    if (this.fetchNextListHasBeenCalled) {
      this.addInPokemonList(this.newPokemonList);
    }
    return this.pokemonList;
  };

  addInPokemonList = (pokemonList: Pokemon[]) => {
    this.pokemonList = [...this.pokemonList, ...pokemonList];
  };

  finding = () => {
    return this.isFinding;
  };

  fetchNextList = () => {
    this.fetchNextListHasBeenCalled = true;
  };
}

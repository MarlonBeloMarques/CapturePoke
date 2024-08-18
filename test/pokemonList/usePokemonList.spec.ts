import { renderHook } from "@testing-library/react-native";
import getPokemonListFake from "../doubles/fakers/getPokemonListFake";
import PokemonListViewModel, {
  Pokemon,
} from "@/src/pokemonList/PokemonListViewModel";

interface PokemonList {
  get: () => any[];
}

class PokemonListFake implements PokemonList {
  constructor(readonly pokemonList: Pokemon[]) {}
  get = (): any[] => {
    return this.pokemonList;
  };
}

describe("PokemonList: usePokemonList", () => {
  test("should get the pokemonList with success", () => {
    const list = getPokemonListFake(5);
    const pokemonList = new PokemonListFake(list);
    const { result } = renderHook(() => usePokemonList({ pokemonList }));

    expect(result.current.list).toEqual(list);
  });

  test("should get empty pokemonList", () => {
    const pokemonList = new PokemonListFake(null!);
    const { result } = renderHook(() => usePokemonList({ pokemonList }));

    expect(result.current.list).toEqual([]);
  });
});

type Props = {
  pokemonList: PokemonList;
};

const usePokemonList = ({ pokemonList }: Props): PokemonListViewModel => {
  return {
    errorMessage: "",
    findingPokemons: false,
    list: pokemonList.get() || [],
    selectPokemon: () => {},
  };
};

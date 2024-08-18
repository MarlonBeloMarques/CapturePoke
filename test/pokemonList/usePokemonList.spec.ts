import { renderHook } from "@testing-library/react-native";
import getPokemonListFake from "../doubles/fakers/getPokemonListFake";
import PokemonListViewModel, {
  Pokemon,
} from "@/src/pokemonList/PokemonListViewModel";

interface PokemonList {
  get: () => any[];
  finding: () => boolean;
}

class PokemonListFake implements PokemonList {
  constructor(
    readonly pokemonList: Pokemon[],
    readonly isFinding: boolean = true,
  ) {}
  get = (): any[] => {
    return this.pokemonList;
  };

  finding = () => {
    return this.isFinding;
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

  test("should get the errorMessage when pokemonList is empty", () => {
    const pokemonList = new PokemonListFake(null!);
    const { result } = renderHook(() => usePokemonList({ pokemonList }));

    expect(result.current.errorMessage).toEqual(
      "Parece que não encontramos nenhum pokemon.",
    );
  });

  test("should get empty errorMessage when pokemonList is not empty", () => {
    const pokemonList = new PokemonListFake(getPokemonListFake(5));
    const { result } = renderHook(() => usePokemonList({ pokemonList }));

    expect(result.current.errorMessage).toEqual("");
  });

  test("should get the findingPokemons equals true when its getting the pokemonList", () => {
    const pokemonList = new PokemonListFake(getPokemonListFake(5));
    const { result } = renderHook(() => usePokemonList({ pokemonList }));

    expect(result.current.findingPokemons).toEqual(true);
  });

  test("should get the findingPokemons equals false when it is finished of the get the pokemonList", () => {
    const pokemonList = new PokemonListFake(getPokemonListFake(5), false);
    const { result } = renderHook(() => usePokemonList({ pokemonList }));

    expect(result.current.findingPokemons).toEqual(false);
  });
});

type Props = {
  pokemonList: PokemonList;
};

const usePokemonList = ({ pokemonList }: Props): PokemonListViewModel => {
  const list = pokemonList.get() || [];
  const getErrorMessage = () => {
    if (list.length === 0) {
      return "Parece que não encontramos nenhum pokemon.";
    }

    return "";
  };
  return {
    errorMessage: getErrorMessage(),
    findingPokemons: pokemonList.finding(),
    list,
    selectPokemon: () => {},
  };
};

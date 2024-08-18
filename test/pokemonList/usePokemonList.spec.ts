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
    const { result } = makeSut({ pokemonList: list });

    expect(result.current.list).toEqual(list);
  });

  test("should get empty pokemonList", () => {
    const { result } = makeSut({ pokemonList: null! });

    expect(result.current.list).toEqual([]);
  });

  test("should get the errorMessage when pokemonList is empty", () => {
    const { result } = makeSut({ pokemonList: null! });

    expect(result.current.errorMessage).toEqual(
      "Parece que não encontramos nenhum pokemon.",
    );
  });

  test("should get empty errorMessage when pokemonList is not empty", () => {
    const { result } = makeSut({});

    expect(result.current.errorMessage).toEqual("");
  });

  test("should get the findingPokemons equals true when its getting the pokemonList", () => {
    const { result } = makeSut({ findingPokemons: true });

    expect(result.current.findingPokemons).toEqual(true);
  });

  test("should get the findingPokemons equals false when it is finished of the get the pokemonList", () => {
    const { result } = makeSut({ findingPokemons: false });

    expect(result.current.findingPokemons).toEqual(false);
  });
});

type SutProps = {
  pokemonList?: Pokemon[];
  findingPokemons?: boolean;
};

const makeSut = ({
  pokemonList = getPokemonListFake(5),
  findingPokemons = false,
}: SutProps) => {
  const list = new PokemonListFake(pokemonList, findingPokemons);
  return renderHook(() => usePokemonList({ pokemonList: list }));
};

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

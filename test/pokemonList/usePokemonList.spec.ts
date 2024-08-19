import { renderHook } from "@testing-library/react-native";
import getPokemonListFake from "../doubles/fakers/getPokemonListFake";
import { Pokemon } from "@/src/pokemonList/PokemonListViewModel";
import usePokemonList from "@/src/pokemonList/usePokemonList";
import { PokemonList } from "@/src/pokemonList/domain/PokemonList";

const formatName = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1);

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

  test("should call the seePokemonDetails function correctly when calling the selectPokemon function", () => {
    const list = getPokemonListFake(5);
    const seePokemonDetails = jest.fn();
    const { result } = makeSut({ seePokemonDetails, pokemonList: list });

    result.current.selectPokemon(formatName(list[2].name));

    expect(seePokemonDetails).toHaveBeenCalledTimes(1);
    expect(seePokemonDetails).toHaveBeenCalledWith(list[2].id);
  });

  test("should not call the seePokemonDetails function if pokemon is not found", () => {
    const list = getPokemonListFake(5);
    const seePokemonDetails = jest.fn();
    const { result } = makeSut({ seePokemonDetails, pokemonList: list });

    result.current.selectPokemon("bulbasaur");

    expect(seePokemonDetails).not.toHaveBeenCalled();
  });
});

type SutProps = {
  pokemonList?: Pokemon[];
  findingPokemons?: boolean;
  seePokemonDetails?: (id: number) => void;
};

const makeSut = ({
  pokemonList = getPokemonListFake(5),
  findingPokemons = false,
  seePokemonDetails = () => {},
}: SutProps) => {
  const list = new PokemonListFake(pokemonList, findingPokemons);
  return renderHook(() =>
    usePokemonList({ pokemonList: list, seePokemonDetails }),
  );
};

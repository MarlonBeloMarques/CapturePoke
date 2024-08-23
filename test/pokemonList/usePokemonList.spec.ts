import { renderHook, waitFor } from "@testing-library/react-native";
import getPokemonListFake from "../doubles/fakers/getPokemonListFake";
import { Pokemon } from "@/src/pokemonList/PokemonListViewModel";
import usePokemonList from "@/src/pokemonList/usePokemonList";
import PokemonList from "@/src/pokemonList/domain/PokemonList";

const formatName = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1);

class PokemonListFake implements PokemonList {
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

  test("should update the pokemonList when calling the fetchNextList function with success", async () => {
    const list = getPokemonListFake(5);
    const listFetched = getPokemonListFake(5);
    const seePokemonDetails = jest.fn();
    const { result, rerender } = makeSut({
      seePokemonDetails,
      pokemonList: list,
      newPokemonList: listFetched,
    });

    await waitFor(() => {
      result.current.fetchNextList();
    });

    rerender({ pokemonList: list, seePokemonDetails });

    expect(result.current.list).toEqual([...list, ...listFetched]);
  });
});

type SutProps = {
  pokemonList?: Pokemon[];
  newPokemonList?: Pokemon[];
  findingPokemons?: boolean;
  seePokemonDetails?: (id: number) => void;
};

const makeSut = ({
  pokemonList = getPokemonListFake(5),
  newPokemonList = getPokemonListFake(2),
  findingPokemons = false,
  seePokemonDetails = () => {},
}: SutProps) => {
  const list = new PokemonListFake(
    pokemonList,
    findingPokemons,
    newPokemonList,
  );
  return renderHook(() =>
    usePokemonList({ pokemonList: list, seePokemonDetails }),
  );
};

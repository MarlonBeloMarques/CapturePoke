import * as getMyPokemonList from "@/src/pokemonList/data/getMyPokemonList";
import useLocalMyPokemonList from "@/src/pokemonList/data/useLocalMyPokemonList";
import getPokemonListFake from "@/test/doubles/fakers/getPokemonListFake";
import { renderHook, waitFor } from "@testing-library/react-native";

jest.mock("@react-native-async-storage/async-storage", () => {
  return {
    getItem: jest.fn(),
  };
});

jest.useFakeTimers();

describe("PokemonList: useLocalMyPokemonList", () => {
  test("should get the myPokemonList with success", async () => {
    const myPokemonListFake = getPokemonListFake(2).map((pokemon) => ({
      name: pokemon.name,
      picture: pokemon.picture,
      id: 1,
    }));

    jest
      .spyOn(getMyPokemonList, "default")
      .mockReturnValue(Promise.resolve(myPokemonListFake));
    const { result } = renderHook(() => useLocalMyPokemonList());

    await waitFor(() => {
      expect(result.current.get()).toEqual(myPokemonListFake);
    });
  });

  test("should return the finding like true if has been getting myPokemonList", async () => {
    const myPokemonListFake = getPokemonListFake(2).map((pokemon) => ({
      name: pokemon.name,
      picture: pokemon.picture,
      id: 1,
    }));

    jest
      .spyOn(getMyPokemonList, "default")
      .mockReturnValue(Promise.resolve(myPokemonListFake));
    const { result } = renderHook(() => useLocalMyPokemonList());

    await waitFor(() => {
      expect(result.current.finding()).toEqual(true);
    });
  });

  test("should return the finding like false if has finished the get myPokemonList", async () => {
    const myPokemonListFake = getPokemonListFake(2).map((pokemon) => ({
      name: pokemon.name,
      picture: pokemon.picture,
      id: 1,
    }));

    jest.spyOn(getMyPokemonList, "default").mockImplementation(() => {
      setTimeout(() => {}, 1000);
      return Promise.resolve(myPokemonListFake);
    });
    const { result } = renderHook(() => useLocalMyPokemonList());

    await waitFor(() => {
      expect(result.current.finding()).toEqual(true);
    });

    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(result.current.finding()).toEqual(false);
    });
  });
});

import formatName from "@/src/global/helpers/formatName";
import getMyPokemonList from "@/src/pokemonList/data/getMyPokemonList";
import getPokemonListFake from "@/test/doubles/fakers/getPokemonListFake";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage", () => {
  return {
    getItem: jest.fn(),
  };
});

describe("PokemonList: getMyPokemonList", () => {
  test("should get myPokemonList with success when calling the getItem of AsyncStorage correctly", async () => {
    const pokemonList = getPokemonListFake(5).map((pokemon) => ({
      ...pokemon,
      picture: pokemon.picture + `pokemon/${pokemon.id}.png`,
    }));

    (AsyncStorage.getItem as jest.Mock).mockReturnValue(
      Promise.resolve(
        JSON.stringify(
          pokemonList.map((pokemon) => ({
            name: pokemon.name,
            picture: pokemon.picture,
          })),
        ),
      ),
    );
    const myPokemonList = await getMyPokemonList();

    expect(myPokemonList).toEqual(
      pokemonList.map((pokemon) => ({
        ...pokemon,
        name: formatName(pokemon.name),
      })),
    );
  });

  test("should get empty myPokemonList when calling the getItem of AsyncStorage with error", async () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation(() => {
      throw new Error("ocorreu um erro");
    });

    const myPokemonList = await getMyPokemonList();

    expect(myPokemonList).toEqual([]);
  });

  test("should get empty myPokemonList when calling the getItem of AsyncStorage returning empty", async () => {
    (AsyncStorage.getItem as jest.Mock).mockReturnValue(Promise.resolve(""));

    const myPokemonList = await getMyPokemonList();

    expect(myPokemonList).toEqual([]);
  });
});

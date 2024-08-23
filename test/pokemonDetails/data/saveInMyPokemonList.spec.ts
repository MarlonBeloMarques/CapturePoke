import saveInMyPokemonList from "@/src/pokemonDetails/data/saveInMyPokemonList";
import * as getMyPokemonList from "@/src/pokemonList/data/getMyPokemonList";
import getPictureFake from "@/test/doubles/fakers/getPictureFake";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage", () => {
  return {
    setItem: jest.fn(),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("PokemonDetails: saveInMyPokemonList", () => {
  test("should call setItem of AsyncStorage correctly with success", async () => {
    const picture = getPictureFake();
    const saved = await saveInMyPokemonList("Bulbasaur", picture);

    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "my-pokemon-list",
      `[{\"name\":\"bulbasaur\",\"picture\":\"${picture}\"}]`,
    );
    expect(saved).toBe(true);
  });

  test("should call setItem of AsyncStorage with more than one pokemon", async () => {
    const picture = getPictureFake();

    jest
      .spyOn(getMyPokemonList, "default")
      .mockReturnValue(
        Promise.resolve([{ name: "Charmander", picture, id: 2 }]),
      );

    const saved = await saveInMyPokemonList("Bulbasaur", picture);

    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "my-pokemon-list",
      `[{\"name\":\"charmander\",\"picture\":\"${picture}\"},{\"name\":\"bulbasaur\",\"picture\":\"${picture}\"}]`,
    );
    expect(saved).toBe(true);
  });

  test("should try call setItem of AsyncStorage without success", async () => {
    (AsyncStorage.setItem as jest.Mock).mockImplementation(() => {
      throw new Error("ocorreu um erro");
    });
    const picture = getPictureFake();
    const saved = await saveInMyPokemonList("Bulbasaur", picture);

    expect(saved).toBe(false);
  });
});

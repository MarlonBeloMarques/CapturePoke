import saveInMyPokemonList from "@/src/pokemonDetails/data/saveInMyPokemonList";
import getPictureFake from "@/test/doubles/fakers/getPictureFake";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage", () => {
  return {
    setItem: jest.fn(),
  };
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

  test("should try call setItem of AsyncStorage without success", async () => {
    (AsyncStorage.setItem as jest.Mock).mockImplementation(() => {
      throw new Error("ocorreu um erro");
    });
    const picture = getPictureFake();
    const saved = await saveInMyPokemonList("Bulbasaur", picture);

    expect(saved).toBe(false);
  });
});

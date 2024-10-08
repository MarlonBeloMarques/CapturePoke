import useSeePokemonDetails from "@/src/pokemonList/helpers/useSeePokemonDetails";
import { useNavigation } from "expo-router";
import { Alert } from "react-native";

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock("expo-router", () => ({
  useNavigation: jest.fn().mockReturnValue({
    navigate: jest.fn(),
  }),
}));

describe("pokemonList: useSeePokemonDetails", () => {
  test("should call navigate function to PokemonDetails with correct id, isFromPokemonList param", () => {
    const navigation = useNavigation as jest.Mock;
    const id = 1234;

    useSeePokemonDetails(false).seePokemonDetails(id);

    expect(navigation().navigate).toHaveBeenCalledTimes(1);
    expect(navigation().navigate).toHaveBeenCalledWith("pokemonDetails", {
      id: id,
      isFromPokemonList: false,
    });
  });

  test("should only call the alert function if the id parameter is undefined", () => {
    const alertSpy = jest.spyOn(Alert, "alert");
    const navigation = useNavigation as jest.Mock;
    const id = undefined;

    useSeePokemonDetails().seePokemonDetails(id as unknown as number);

    expect(navigation().navigate).not.toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledTimes(1);
  });
});

import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

jest.mock("expo-router", () => ({
  useNavigation: jest.fn().mockReturnValue({
    navigate: jest.fn(),
  }),
}));

describe("pokemonList: useSeePokemonDetails", () => {
  test("should call navigate function to PokemonDetails with correct id param", () => {
    const navigation = useNavigation as jest.Mock;

    const id = 1234;
    useSeePokemonDetails(id);

    expect(navigation().navigate).toHaveBeenCalledTimes(1);
    expect(navigation().navigate).toHaveBeenCalledWith("pokemonDetails", {
      id: id,
    });
  });
});

export type RootStackParamList = {
  pokemonDetails: { id: number } | undefined;
};

const useSeePokemonDetails = (id: number) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  navigation.navigate("pokemonDetails", { id: id });
};

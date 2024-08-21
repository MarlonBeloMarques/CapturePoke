import { useNavigation } from "expo-router";
import { Alert } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

afterEach(() => {
  jest.clearAllMocks();
});

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

  test("should only call the alert function if the id parameter is undefined", () => {
    const alertSpy = jest.spyOn(Alert, "alert");

    const navigation = useNavigation as jest.Mock;

    const id = undefined;
    useSeePokemonDetails(id as unknown as number);

    expect(navigation().navigate).not.toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledTimes(1);
  });
});

export type RootStackParamList = {
  pokemonDetails: { id: number } | undefined;
};

const useSeePokemonDetails = (id: number) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (id) {
    navigation.navigate("pokemonDetails", { id: id });
  }

  if (!id) {
    Alert.alert("Ocorreu um erro ao visualizar os detalhes.");
  }
};

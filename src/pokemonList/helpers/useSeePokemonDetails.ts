import { useNavigation } from "expo-router";
import { Alert } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

export type RootStackParamList = {
  pokemonDetails: { id: number } | undefined;
};

const useSeePokemonDetails = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const seePokemonDetails = (id: number) => {
    if (id) {
      navigation.navigate("pokemonDetails", { id: id });
    }

    if (!id) {
      Alert.alert("Ocorreu um erro ao visualizar os detalhes.");
    }
  };

  return { seePokemonDetails };
};

export default useSeePokemonDetails;

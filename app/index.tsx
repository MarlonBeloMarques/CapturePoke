import { useEffect } from "react";
import { useNavigation } from "expo-router";
import PokemonListFactory from "@/src/pokemonList";
import { ThemedView } from "@/src/global/components/ThemedView";
import { Button } from "react-native";
import { NavigationProp } from "@react-navigation/native";

export type RootStackParamList = {
  myPokemonList: undefined;
};

export default function PokemonList() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "",
      headerTransparent: true,
    });
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="My pokemons"
          onPress={() => navigation.navigate("myPokemonList")}
        />
      ),
    });
  }, [navigation]);

  return (
    <ThemedView
      style={{
        flex: 1,
        paddingTop: 100,
        justifyContent: "center",
      }}
    >
      <PokemonListFactory />
    </ThemedView>
  );
}

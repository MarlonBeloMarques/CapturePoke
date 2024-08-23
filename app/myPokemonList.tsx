import { useEffect } from "react";
import { useNavigation } from "expo-router";
import { ThemedView } from "@/src/global/components/ThemedView";
import MyPokemonListFactory from "@/src/pokemonList/myPokemonListFactory";

export default function MyPokemonList() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "",
      headerBackTitle: "Voltar",
    });
  }, [navigation]);

  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <MyPokemonListFactory />
    </ThemedView>
  );
}

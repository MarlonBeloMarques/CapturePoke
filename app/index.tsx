import { useEffect } from "react";
import { useNavigation } from "expo-router";
import PokemonListFactory from "@/src/pokemonList";
import { ThemedView } from "@/src/global/components/ThemedView";

export default function PokemonList() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
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

import { useEffect } from "react";
import { useNavigation } from "expo-router";
import { ThemedView } from "@/src/global/components/ThemedView";
import PokemonDetailsFactory from "@/src/pokemonDetails";

export default function PokemonDetails() {
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
      <PokemonDetailsFactory />
    </ThemedView>
  );
}

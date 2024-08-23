import PokemonListFactory from "@/src/pokemonList";
import { ThemedView } from "@/src/global/components/ThemedView";

export default function PokemonList() {
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

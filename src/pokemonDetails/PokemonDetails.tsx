import { Image } from "react-native";
import { ThemedText } from "../global/components/ThemedText";

type PokemonDetailsViewModel = {
  name: string;
  picture: string;
  abilities: string[];
  types: string[];
  specie: { name: string; species: string[] };
};

const PokemonDetails = ({
  name,
  picture,
  abilities,
  types,
  specie,
}: PokemonDetailsViewModel) => {
  return (
    <>
      {name && <ThemedText testID="pokemon_name_id">{name}</ThemedText>}
      {picture && (
        <Image testID="pokemon_picture_id" source={{ uri: picture }} />
      )}
      {abilities && abilities.length > 0 && <ThemedText>Abilities</ThemedText>}
      {abilities &&
        abilities.map((ability, index) => (
          <ThemedText key={index}>{ability}</ThemedText>
        ))}
      {types && types.length > 0 && <ThemedText>Types</ThemedText>}
      {types &&
        types.map((type, index) => <ThemedText key={index}>{type}</ThemedText>)}
      {specie && specie.name && (
        <ThemedText testID="pokemon_specie_id">{specie.name}</ThemedText>
      )}
      {specie &&
        specie.species &&
        specie.species.map((specie, index) => (
          <ThemedText key={index}>{specie}</ThemedText>
        ))}
    </>
  );
};

export default PokemonDetails;

import { ActivityIndicator } from "react-native";
import {
  CapturePokemonButton,
  HorizontalScroll,
  LoadingWrapper,
  Name,
  Picture,
  PictureWrapper,
  PokeBallImage,
  PokemonName,
  Title,
  Wrapper,
} from "./styles";
import { ThemedText } from "../global/components/ThemedText";
import PokemonDetailsViewModel from "./PokemonDetailsViewModel";

const PokemonDetails = ({
  name,
  picture,
  abilities,
  types,
  specie,
  findingPokemonDetails,
  errorMessage,
  capturePokemon,
  isFromPokemonList,
}: PokemonDetailsViewModel) => {
  return (
    <>
      {!findingPokemonDetails && errorMessage && (
        <ThemedText testID="error_message_id">{errorMessage}</ThemedText>
      )}
      {findingPokemonDetails && (
        <LoadingWrapper>
          <ActivityIndicator testID="loading_id" size="large" />
        </LoadingWrapper>
      )}
      {!findingPokemonDetails && (
        <Wrapper>
          {name && <PokemonName testID="pokemon_name_id">{name}</PokemonName>}
          {picture && (
            <PictureWrapper>
              <Picture testID="pokemon_picture_id" source={{ uri: picture }} />
            </PictureWrapper>
          )}
          {abilities && abilities.length > 0 && <Title>Abilities</Title>}
          {abilities && (
            <HorizontalScroll>
              {abilities.map((ability, index) => (
                <Name key={index}>{ability}</Name>
              ))}
            </HorizontalScroll>
          )}
          {types && types.length > 0 && <Title>Types</Title>}
          {types && (
            <HorizontalScroll>
              {types.map((type, index) => (
                <Name key={index}>{type}</Name>
              ))}
            </HorizontalScroll>
          )}

          {specie && specie.name && (
            <Title testID="pokemon_specie_id">{`${specie.name} species`}</Title>
          )}
          {specie && specie.species && (
            <HorizontalScroll>
              {specie.species.map((specie, index) => (
                <Name key={index}>{specie}</Name>
              ))}
            </HorizontalScroll>
          )}
        </Wrapper>
      )}
      {!findingPokemonDetails && isFromPokemonList && name && picture && (
        <CapturePokemonButton
          testID="capture_pokemon_id"
          onPress={() => capturePokemon(name, picture)}
        >
          <PokeBallImage />
        </CapturePokemonButton>
      )}
    </>
  );
};

export default PokemonDetails;

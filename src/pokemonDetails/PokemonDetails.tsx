import { ActivityIndicator } from "react-native";
import {
  HorizontalScroll,
  LoadingWrapper,
  Name,
  Picture,
  PictureWrapper,
  PokemonName,
  Title,
  Wrapper,
} from "./styles";

type PokemonDetailsViewModel = {
  name: string;
  picture: string;
  abilities: string[];
  types: string[];
  specie: { name: string; species: string[] };
  findingPokemonDetails: boolean;
};

const PokemonDetails = ({
  name,
  picture,
  abilities,
  types,
  specie,
  findingPokemonDetails,
}: PokemonDetailsViewModel) => {
  return (
    <Wrapper>
      {findingPokemonDetails && (
        <LoadingWrapper>
          <ActivityIndicator testID="loading_id" size="large" />
        </LoadingWrapper>
      )}
      {!findingPokemonDetails && (
        <>
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
        </>
      )}
    </Wrapper>
  );
};

export default PokemonDetails;

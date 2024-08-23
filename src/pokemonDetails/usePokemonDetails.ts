import formatName from "../global/helpers/formatName";
import PokemonDetails, { Details } from "./domain/PokemonDetails";
import PokemonDetailsViewModel from "./PokemonDetailsViewModel";

export const pokemonDetailsEmpty: Details = {
  id: 0,
  abilities: [],
  name: "",
  picture: "",
  specie: { name: "", species: [] },
  types: [],
};

const usePokemonDetails = (
  pokemonDetails: PokemonDetails,
): PokemonDetailsViewModel => {
  const details = pokemonDetails.get();

  const getName = () => {
    if (details) {
      return formatName(details.name || "");
    }
  };

  const getSpecieName = () => {
    if (details) {
      return formatName(details.specie.name || "");
    }

    return "";
  };

  const getErrorMessage = () => {
    if (!details || details === pokemonDetailsEmpty) {
      return "Parece que não encontramos os detalhes do pokemon.";
    }

    return "";
  };

  return {
    abilities: details?.abilities || [],
    specie: {
      name: getSpecieName() || "",
      species: details?.specie.species || [],
    },
    errorMessage: getErrorMessage(),
    findingPokemonDetails: pokemonDetails.finding(),
    name: getName() || "",
    picture: details?.picture || "",
    types: details?.types || [],
  };
};

export default usePokemonDetails;

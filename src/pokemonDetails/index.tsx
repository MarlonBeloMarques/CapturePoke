import React from "react";
import PokemonDetails from "./PokemonDetails";
import usePokemonDetails from "./usePokemonDetails";
import useRemotePokemonDetails from "./data/useRemotePokemonDetails";
import { useLocalSearchParams } from "expo-router";
import saveInMyPokemonList from "./data/saveInMyPokemonList";
import Url from "../global/constants/Urls";

const PokemonDetailsFactory = () => {
  const { id } = useLocalSearchParams();
  const pokemonDetails = useRemotePokemonDetails({
    url: Url.baseUrlWithParamId(id as unknown as number),
    queryFn: fetch,
    urlPicture: Url.urlPicture,
    urlSpecies: Url.urlSpecies,
  });

  return (
    <PokemonDetails
      {...usePokemonDetails(pokemonDetails, saveInMyPokemonList)}
    />
  );
};

export default PokemonDetailsFactory;

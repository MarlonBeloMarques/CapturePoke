import React from "react";
import PokemonDetails from "./PokemonDetails";
import usePokemonDetails from "./usePokemonDetails";
import useRemotePokemonDetails from "./data/useRemotePokemonDetails";
import { useLocalSearchParams } from "expo-router";
import saveInMyPokemonList from "./data/saveInMyPokemonList";

const PokemonDetailsFactory = () => {
  const params = useLocalSearchParams();
  const pokemonDetails = useRemotePokemonDetails({
    url: `https://pokeapi.co/api/v2/pokemon/${params.id}`,
    queryFn: fetch,
    urlPicture:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon",
    urlSpecies: "https://pokeapi.co/api/v2/egg-group/",
  });

  return (
    <PokemonDetails
      {...usePokemonDetails(pokemonDetails, saveInMyPokemonList)}
    />
  );
};

export default PokemonDetailsFactory;

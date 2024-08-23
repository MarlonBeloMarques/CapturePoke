import React from "react";
import PokemonListView from "./PokemonList";
import usePokemonList from "./usePokemonList";
import useRemotePokemonList from "./data/useRemotePokemonList";
import useSeePokemonDetails from "./helpers/useSeePokemonDetails";

const PokemonListFactory = () => {
  const { seePokemonDetails } = useSeePokemonDetails();
  const pokemonList = useRemotePokemonList({
    url: "https://pokeapi.co/api/v2/pokemon",
    urlPicture:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon",
    queryFn: fetch,
  });

  return (
    <PokemonListView
      {...usePokemonList({
        pokemonList: pokemonList,
        seePokemonDetails: seePokemonDetails,
      })}
    />
  );
};

export default PokemonListFactory;

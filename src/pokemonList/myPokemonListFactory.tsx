import React from "react";
import PokemonListView from "./PokemonList";
import usePokemonList from "./usePokemonList";
import useSeePokemonDetails from "./helpers/useSeePokemonDetails";
import PokemonList from "./domain/PokemonList";

const MyPokemonListFactory = () => {
  const { seePokemonDetails } = useSeePokemonDetails();
  const pokemonList: PokemonList = { get: () => [], finding: () => true };
  return (
    <PokemonListView
      {...usePokemonList({
        pokemonList: pokemonList,
        seePokemonDetails: seePokemonDetails,
      })}
    />
  );
};

export default MyPokemonListFactory;

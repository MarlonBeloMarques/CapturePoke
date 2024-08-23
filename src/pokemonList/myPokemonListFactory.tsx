import React from "react";
import PokemonListView from "./PokemonList";
import usePokemonList from "./usePokemonList";
import useSeePokemonDetails from "./helpers/useSeePokemonDetails";
import PokemonList from "./domain/PokemonList";
import useLocalPokemonList from "./data/useLocalMyPokemonList";

const MyPokemonListFactory = () => {
  const { get, finding } = useLocalPokemonList();
  const { seePokemonDetails } = useSeePokemonDetails();

  const pokemonList: PokemonList = {
    get,
    finding,
    fetchNextList: () => {},
  };

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

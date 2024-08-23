const getSpeciesDataStub = () => {
  return {
    name: "monster",
    pokemon_species: [
      {
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon-species/1/",
      },
      {
        name: "ivysaur",
        url: "https://pokeapi.co/api/v2/pokemon-species/2/",
      },
    ],
  };
};

export default getSpeciesDataStub;

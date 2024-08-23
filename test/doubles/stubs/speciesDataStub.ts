const getSpeciesDataStub = () => {
  return {
    name: "monster",
    egg_groups: [
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

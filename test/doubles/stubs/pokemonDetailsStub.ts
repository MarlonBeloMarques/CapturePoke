const getPokemonDetailsStub = () => {
  return {
    id: 1,
    name: "bulbasaur",
    picture:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    abilities: ["overgrow"],
    types: ["grass"],
    specie: {
      name: "monster",
      species: ["bulbasaur", "ivysaur"],
    },
  };
};

export default getPokemonDetailsStub;

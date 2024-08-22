import { PokemonDetailsViewModel } from "@/src/pokemonDetails/PokemonDetails";
import { renderHook } from "@testing-library/react-native";

type Details = {
  name: string;
  picture: string;
  abilities: string[];
  types: string[];
  specie: { name: string; species: string[] };
};

class PokemonDetailsFake implements PokemonDetails {
  constructor(
    readonly pokemonDetails: Details = {
      name: "bulbasaur",
      picture:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      abilities: ["overgrow", "chlorophyll"],
      types: ["grass", "poison"],
      specie: {
        name: "monster",
        species: ["bulbasaur", "ivysaur"],
      },
    },
    readonly isFinding: boolean = true,
  ) {}
  get = (): any => {
    return this.pokemonDetails;
  };

  finding = () => {
    return this.isFinding;
  };
}

interface PokemonDetails {
  get: () => Details;
  finding: () => boolean;
}

const formatName = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1);

describe("PokemonDetails: usePokemonDetails", () => {
  test("should get the pokemonDetails correctly", () => {
    const pokemonDetails = new PokemonDetailsFake();
    const { result } = renderHook(() => usePokemonDetails({ pokemonDetails }));

    expect(result.current.name).toEqual(
      formatName(pokemonDetails.pokemonDetails.name),
    );
    expect(result.current.abilities).toEqual(
      pokemonDetails.pokemonDetails.abilities,
    );
    expect(result.current.picture).toEqual(
      pokemonDetails.pokemonDetails.picture,
    );
    expect(result.current.types).toEqual(pokemonDetails.pokemonDetails.types);
    expect(result.current.specie.name).toEqual(
      formatName(pokemonDetails.pokemonDetails.specie.name),
    );
    expect(result.current.specie.species).toEqual(
      pokemonDetails.pokemonDetails.specie.species,
    );
  });
});

type Props = {
  pokemonDetails: PokemonDetails;
};

const usePokemonDetails = ({
  pokemonDetails,
}: Props): PokemonDetailsViewModel => {
  const { name, abilities, picture, specie, types } = pokemonDetails.get();

  const getName = () => {
    return formatName(name);
  };

  const getSpecieName = () => {
    return formatName(specie.name);
  };

  return {
    abilities,
    specie: { name: getSpecieName(), species: specie.species },
    errorMessage: "",
    findingPokemonDetails: false,
    name: getName(),
    picture,
    types,
  };
};

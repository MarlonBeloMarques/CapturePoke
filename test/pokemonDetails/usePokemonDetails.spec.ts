import { PokemonDetailsViewModel } from "@/src/pokemonDetails/PokemonDetails";
import { renderHook } from "@testing-library/react-native";

type Details = {
  name: string;
  picture: string;
  abilities: string[];
  types: string[];
  specie: { name: string; species: string[] };
};

const pokemonDetailsEmpty: Details = {
  abilities: [],
  name: "",
  picture: "",
  specie: { name: "", species: [] },
  types: [],
};

const details = {
  name: "bulbasaur",
  picture:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  abilities: ["overgrow", "chlorophyll"],
  types: ["grass", "poison"],
  specie: {
    name: "monster",
    species: ["bulbasaur", "ivysaur"],
  },
};

class PokemonDetailsFake implements PokemonDetails {
  constructor(
    readonly pokemonDetails: Details = details,
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
    const { result } = renderHook(() => usePokemonDetails(pokemonDetails));

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

  test.each([pokemonDetailsEmpty, null])(
    "should get the pokemonDetails empty",
    (details) => {
      const pokemonDetails = new PokemonDetailsFake(details!);
      const { result } = renderHook(() => usePokemonDetails(pokemonDetails));

      expect(result.current.name).toEqual("");
      expect(result.current.abilities).toEqual([]);
      expect(result.current.picture).toEqual("");
      expect(result.current.types).toEqual([]);
      expect(result.current.specie.name).toEqual("");
      expect(result.current.specie.species).toEqual([]);
    },
  );

  test.each([pokemonDetailsEmpty, null])(
    "should get the errorMessage when pokemonDetails is empty",
    (details) => {
      const pokemonDetails = new PokemonDetailsFake(details!);
      const { result } = renderHook(() => usePokemonDetails(pokemonDetails));

      expect(result.current.errorMessage).toEqual(
        "Parece que não encontramos os detalhes do pokemon.",
      );
    },
  );

  test("should get empty errorMessage when pokemonDetails is not empty", () => {
    const pokemonDetails = new PokemonDetailsFake();
    const { result } = renderHook(() => usePokemonDetails(pokemonDetails));

    expect(result.current.errorMessage).toEqual("");
  });

  test("should get the findingPokemonDetails equals true when its getting the pokemonDetails", () => {
    const pokemonDetails = new PokemonDetailsFake(details, true);
    const { result } = renderHook(() => usePokemonDetails(pokemonDetails));

    expect(result.current.findingPokemonDetails).toEqual(true);
  });

  test("should get the findingPokemonDetails equals false when it is finished of the get the pokemonDetails", () => {
    const pokemonDetails = new PokemonDetailsFake(details, false);
    const { result } = renderHook(() => usePokemonDetails(pokemonDetails));

    expect(result.current.findingPokemonDetails).toEqual(false);
  });
});

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

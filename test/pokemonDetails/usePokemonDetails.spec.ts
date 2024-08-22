import formatName from "@/src/global/helpers/formatName";
import PokemonDetails, {
  Details,
} from "@/src/pokemonDetails/domain/PokemonDetails";
import usePokemonDetails, {
  pokemonDetailsEmpty,
} from "@/src/pokemonDetails/usePokemonDetails";
import { renderHook } from "@testing-library/react-native";

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

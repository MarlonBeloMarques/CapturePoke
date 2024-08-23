import formatName from "@/src/global/helpers/formatName";
import PokemonDetails, {
  Details,
} from "@/src/pokemonDetails/domain/PokemonDetails";
import usePokemonDetails, {
  pokemonDetailsEmpty,
} from "@/src/pokemonDetails/usePokemonDetails";
import { renderHook } from "@testing-library/react-native";
import { Alert } from "react-native";

const details = {
  id: 1,
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

afterEach(() => {
  jest.clearAllMocks();
});

describe("PokemonDetails: usePokemonDetails", () => {
  const saveInMyPokemonList = async () => {
    return false;
  };
  test("should get the pokemonDetails correctly", () => {
    const pokemonDetails = new PokemonDetailsFake();
    const { result } = renderHook(() =>
      usePokemonDetails(pokemonDetails, saveInMyPokemonList, false),
    );

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
      const { result } = renderHook(() =>
        usePokemonDetails(pokemonDetails, saveInMyPokemonList, false),
      );

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
      const { result } = renderHook(() =>
        usePokemonDetails(pokemonDetails, saveInMyPokemonList, false),
      );

      expect(result.current.errorMessage).toEqual(
        "Parece que não encontramos os detalhes do pokemon.",
      );
    },
  );

  test("should get empty errorMessage when pokemonDetails is not empty", () => {
    const pokemonDetails = new PokemonDetailsFake();
    const { result } = renderHook(() =>
      usePokemonDetails(pokemonDetails, saveInMyPokemonList, false),
    );

    expect(result.current.errorMessage).toEqual("");
  });

  test("should get the findingPokemonDetails equals true when its getting the pokemonDetails", () => {
    const pokemonDetails = new PokemonDetailsFake(details, true);
    const { result } = renderHook(() =>
      usePokemonDetails(pokemonDetails, saveInMyPokemonList, false),
    );

    expect(result.current.findingPokemonDetails).toEqual(true);
  });

  test("should get the findingPokemonDetails equals false when it is finished of the get the pokemonDetails", () => {
    const pokemonDetails = new PokemonDetailsFake(details, false);
    const { result } = renderHook(() =>
      usePokemonDetails(pokemonDetails, saveInMyPokemonList, false),
    );

    expect(result.current.findingPokemonDetails).toEqual(false);
  });

  test("should call saveInMyPokemonList and Alert correctly when calling capturePokemon function", async () => {
    const alertSpy = jest.spyOn(Alert, "alert");
    const saveInMyPokemonList = jest
      .fn()
      .mockReturnValue(Promise.resolve(true));
    const pokemonDetails = new PokemonDetailsFake(details, false);
    const { result } = renderHook(() =>
      usePokemonDetails(pokemonDetails, saveInMyPokemonList, false),
    );

    await result.current.capturePokemon(details.name, details.picture);

    expect(saveInMyPokemonList).toHaveBeenCalledWith(
      details.name,
      details.picture,
    );
    expect(alertSpy).toHaveBeenCalledTimes(1);
  });

  test.each([{ name: "", picture: "" }, null])(
    "should not call saveInMyPokemonList when calling capturePokemon function if name or picture are undefined",
    async (params) => {
      const alertSpy = jest.spyOn(Alert, "alert");
      const saveInMyPokemonList = jest
        .fn()
        .mockReturnValue(Promise.resolve(true));
      const pokemonDetails = new PokemonDetailsFake(details, false);
      const { result } = renderHook(() =>
        usePokemonDetails(pokemonDetails, saveInMyPokemonList, false),
      );

      await result.current.capturePokemon(params?.name!, params?.picture!);

      expect(saveInMyPokemonList).not.toHaveBeenCalled();
      expect(alertSpy).not.toHaveBeenCalled();
    },
  );

  test("should call alert with unsuccess when calling saveInMyPokemonList no success", async () => {
    const alertSpy = jest.spyOn(Alert, "alert");
    const saveInMyPokemonList = jest
      .fn()
      .mockReturnValue(Promise.resolve(false));
    const pokemonDetails = new PokemonDetailsFake(details, false);
    const { result } = renderHook(() =>
      usePokemonDetails(pokemonDetails, saveInMyPokemonList, false),
    );

    await result.current.capturePokemon(details.name, details.picture);

    expect(saveInMyPokemonList).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith(
      "Você não conseguiu capturar o pokemon :(",
    );
  });
});

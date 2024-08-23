import useRemotePokemonDetails, {
  Response,
  SpeciesResponse,
} from "@/src/pokemonDetails/data/useRemotePokemonDetails";
import { faker } from "@faker-js/faker";
import { useQuery } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

const useQueryMock = (
  data1: Response,
  data2: SpeciesResponse,
  data1IsSuccess = true,
  data2IsSuccess = true,
  isFetchingData1 = false,
  isFetchingData2 = false,
) => {
  return (useQuery as jest.Mock)
    .mockImplementationOnce(({ queryFn }) => {
      queryFn();
      return {
        data: data1,
        isSuccess: data1IsSuccess,
        isFetching: isFetchingData1,
      };
    })
    .mockImplementationOnce(({ queryFn }) => {
      queryFn();
      return {
        data: data2,
        isSuccess: data2IsSuccess,
        isFetching: isFetchingData2,
      };
    });
};

describe("pokemonDetails: useRemotePokemonDetails", () => {
  const data = {
    abilities: [
      {
        ability: {
          name: "overgrow",
          url: "https://pokeapi.co/api/v2/ability/65/",
        },
      },
    ],
    name: "bulbasaur",
    types: [
      {
        type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
      },
    ],
    id: 1,
  };

  const details = {
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

  const speciesData = {
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

  test("should get the pokemon details with correct url", () => {
    useQueryMock(data, speciesData);
    const queryFnSpy = jest.fn((url: string) =>
      Promise.resolve({
        json: jest.fn().mockResolvedValue(data),
      }),
    );

    const url = faker.internet.url();
    const urlSpecies = faker.internet.url();

    const { get } = useRemotePokemonDetails({
      url: url,
      urlPicture: "",
      urlSpecies,
      queryFn: queryFnSpy,
    });

    get();

    expect(queryFnSpy).toHaveBeenCalledTimes(2);
    expect(queryFnSpy.mock.calls[0]).toEqual([url]);
    expect(queryFnSpy.mock.calls[1]).toEqual([urlSpecies + data.id]);
  });

  test("should get the pokemon details with success", () => {
    useQueryMock(data, speciesData);
    const queryFn = (url: string) =>
      Promise.resolve({
        json: jest.fn().mockResolvedValue(data),
      });

    const url = faker.internet.url();
    const { get } = useRemotePokemonDetails({
      url: url,
      urlPicture:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon",
      urlSpecies: "https://pokeapi.co/api/v2/egg-group/",
      queryFn: queryFn as unknown as (url: string) => Promise<any>,
    });

    const pokemonDetails = get();

    expect(pokemonDetails).toEqual(details);
  });

  test("should get empty pokemon details if isSuccess of pokemonDetails is false", () => {
    const data1IsSuccess = false;
    useQueryMock(data, speciesData, data1IsSuccess);
    const queryFn = (url: string) =>
      Promise.resolve({
        json: jest.fn().mockResolvedValue(data),
      });

    const url = faker.internet.url();
    const { get } = useRemotePokemonDetails({
      url: url,
      urlPicture:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon",
      urlSpecies: "https://pokeapi.co/api/v2/egg-group/",
      queryFn: queryFn as unknown as (url: string) => Promise<any>,
    });

    const pokemonDetails = get();

    expect(pokemonDetails).toEqual({
      id: 0,
      abilities: [],
      name: "",
      picture: "",
      specie: { name: "", species: [] },
      types: [],
    });
  });

  test("should get empty pokemon details if isSuccess of pokemonSpecies is false", () => {
    const data1IsSuccess = true;
    const data2IsSuccess = false;
    useQueryMock(data, speciesData, data1IsSuccess, data2IsSuccess);
    const queryFn = (url: string) =>
      Promise.resolve({
        json: jest.fn().mockResolvedValue(data),
      });

    const url = faker.internet.url();
    const { get } = useRemotePokemonDetails({
      url: url,
      urlPicture:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon",
      urlSpecies: "https://pokeapi.co/api/v2/egg-group/",
      queryFn: queryFn as unknown as (url: string) => Promise<any>,
    });

    const pokemonDetails = get();

    expect(pokemonDetails).toEqual({
      id: pokemonDetails.id,
      abilities: pokemonDetails.abilities,
      name: pokemonDetails.name,
      picture: pokemonDetails.picture,
      specie: { name: "", species: [] },
      types: pokemonDetails.types,
    });
  });

  test("should finding return true when both isFetching are true", () => {
    const isFetchingData1 = true;
    const isFetchingData2 = true;
    useQueryMock(
      data,
      speciesData,
      true,
      true,
      isFetchingData1,
      isFetchingData2,
    );
    const queryFn = (url: string) =>
      Promise.resolve({
        json: jest.fn().mockResolvedValue(data),
      });

    const url = faker.internet.url();
    const { get, finding } = useRemotePokemonDetails({
      url: url,
      urlPicture:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon",
      urlSpecies: "https://pokeapi.co/api/v2/egg-group/",
      queryFn: queryFn as unknown as (url: string) => Promise<any>,
    });

    get();

    expect(finding()).toEqual(true);
  });

  test("should finding return false when isFetching is false", () => {
    const isFetchingData1 = true;
    const isFetchingData2 = false;
    useQueryMock(
      data,
      speciesData,
      true,
      true,
      isFetchingData1,
      isFetchingData2,
    );
    const queryFn = (url: string) =>
      Promise.resolve({
        json: jest.fn().mockResolvedValue(data),
      });

    const url = faker.internet.url();
    const { get, finding } = useRemotePokemonDetails({
      url: url,
      urlPicture:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon",
      urlSpecies: "https://pokeapi.co/api/v2/egg-group/",
      queryFn: queryFn as unknown as (url: string) => Promise<any>,
    });

    get();

    expect(finding()).toEqual(false);
  });
});

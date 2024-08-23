import PokemonDetails, {
  Details,
} from "@/src/pokemonDetails/domain/PokemonDetails";
import { faker } from "@faker-js/faker";
import { useQuery } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

type Response = {
  id: number;
  abilities: { ability: { name: string; url: string } }[];
  name: string;
  types: {
    type: { name: string; url: string };
  }[];
};

type SpeciesResponse = {
  name: string;
  pokemon_species: { name: string; url: string }[];
};

const useQueryMock = (
  data1: Response,
  data2: SpeciesResponse,
  data1IsSuccess = true,
  data2IsSuccess = true,
) => {
  return (useQuery as jest.Mock)
    .mockImplementationOnce(({ queryFn }) => {
      queryFn();
      return {
        data: data1,
        isSuccess: data1IsSuccess,
        isFetching: false,
      };
    })
    .mockImplementationOnce(({ queryFn }) => {
      queryFn();
      return {
        data: data2,
        isSuccess: data2IsSuccess,
        isFetching: false,
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
});

const useRemotePokemonDetails = ({
  url,
  urlSpecies,
  urlPicture,
  queryFn,
}: {
  url: string;
  urlPicture: string;
  urlSpecies: string;
  queryFn: (url: string) => Promise<any>;
}): PokemonDetails => {
  const useGet = (): Details => {
    const { data, isSuccess } = useQuery({
      queryKey: ["remotePokemonDetails"],
      queryFn: () => queryFn(url).then((res) => res.json()),
    });

    if (isSuccess) {
      const detail = data as Response;
      return {
        id: detail.id,
        name: detail.name,
        abilities: detail.abilities.map((ability) => ability.ability.name),
        picture: urlPicture + `/${1}.png`,
        types: detail.types.map((type) => type.type.name),
        specie: { name: "", species: [] },
      };
    }

    return {
      id: 0,
      abilities: [],
      name: "",
      picture: "",
      specie: { name: "", species: [] },
      types: [],
    };
  };

  const useGetDetailsBuilder = (): Details => {
    const details = useGet();
    const specie = useGetSpecie(details.id || 0);

    if (details.name && details.picture && details.abilities)
      return { ...details, specie: specie };

    return details;
  };

  const useGetSpecie = (id: number): { name: string; species: string[] } => {
    const { data, isSuccess } = useQuery({
      queryKey: ["remotePokemonSpecies"],
      queryFn: () => queryFn(urlSpecies + id).then((res) => res.json()),
    });

    if (isSuccess) {
      const specie = data as SpeciesResponse;
      return {
        name: specie.name,
        species: specie.pokemon_species.map((specie) => specie.name),
      };
    }

    return { name: "", species: [] };
  };

  const finding = () => {
    return false;
  };
  return {
    get: useGetDetailsBuilder,
    finding,
  };
};

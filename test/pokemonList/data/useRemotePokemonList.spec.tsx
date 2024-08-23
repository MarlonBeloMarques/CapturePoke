import useRemotePokemonList, {
  Response,
} from "@/src/pokemonList/data/useRemotePokemonList";
import { faker } from "@faker-js/faker";
import { useQuery } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

const useQueryMock = (data: Response, isFetching = false, isSuccess = true) => {
  return (useQuery as jest.Mock).mockImplementation(({ queryFn }) => {
    queryFn();
    return {
      data,
      isSuccess,
      isFetching,
    };
  });
};

describe("pokemonList: useRemotePokemonList", () => {
  const data: Response = { count: 0, next: "", previous: "", results: [] };
  const list = [
    {
      name: "bulbasaur",
      url: "http://test.comhttps://pokeapi.co/api/v2/pokemon/1/",
    },
  ];

  test("should get the pokemon list with correct url", () => {
    useQueryMock(data);
    const queryFnSpy = jest.fn((url: string) =>
      Promise.resolve({
        json: jest.fn().mockResolvedValue(data),
      }),
    );

    const url = faker.internet.url();

    const { get } = useRemotePokemonList({
      url: url,
      urlPicture: "",
      queryFn: queryFnSpy,
    });

    get();

    expect(queryFnSpy).toHaveBeenCalledTimes(1);
    expect(queryFnSpy).toHaveBeenCalledWith(url);
  });

  test("should get the pokemon list with success", () => {
    const data = { count: 0, next: "", previous: "", results: list };
    useQueryMock(data);
    const queryFn = (url: string) =>
      Promise.resolve({
        json: jest.fn().mockResolvedValue({
          count: 0,
          next: "",
          previous: "",
          results: list,
        }),
      });

    const url = faker.internet.url();
    const { get } = useRemotePokemonList({
      url: url,
      urlPicture:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon",
      queryFn: queryFn as unknown as (url: string) => Promise<any>,
    });

    const pokemonList = get();

    expect(pokemonList).toEqual([
      {
        id: 1,
        name: "bulbasaur",
        picture:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      },
    ]);
  });

  test("should get empty pokemon list if isSuccess is false", () => {
    const isSuccess = false;
    useQueryMock(data, true, isSuccess);
    const queryFnSpy = (url: string) =>
      Promise.resolve({
        json: jest.fn().mockResolvedValue(data),
      });

    const url = faker.internet.url();
    const { get } = useRemotePokemonList({
      url: url,
      urlPicture:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon",
      queryFn: queryFnSpy,
    });

    const pokemonList = get();

    expect(pokemonList).toEqual([]);
  });

  test("should finding return true when isFetching is true", () => {
    useQueryMock(data, true);
    const queryFnSpy = (url: string) =>
      Promise.resolve({
        json: jest.fn().mockResolvedValue(data),
      });

    const url = faker.internet.url();
    const { get, finding } = useRemotePokemonList({
      url: url,
      urlPicture:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon",
      queryFn: queryFnSpy,
    });

    get();

    expect(finding()).toEqual(true);
  });

  test("should finding return false when isFetching is false", () => {
    useQueryMock(data);
    const queryFnSpy = (url: string) =>
      Promise.resolve({
        json: jest.fn().mockResolvedValue(data),
      });

    const url = faker.internet.url();
    const { get, finding } = useRemotePokemonList({
      url: url,
      urlPicture:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon",
      queryFn: queryFnSpy,
    });

    get();

    expect(finding()).toEqual(false);
  });
});

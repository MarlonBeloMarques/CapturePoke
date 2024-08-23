import useRemotePokemonList, {
  Response,
} from "@/src/pokemonList/data/useRemotePokemonList";
import { faker } from "@faker-js/faker";
import { useInfiniteQuery } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
  useInfiniteQuery: jest.fn(),
}));

const offset = 20;

const useInfiniteQueryMock = (
  pages: Response[],
  isFetching = false,
  isFetchingNextPage = false,
  hasNextPage = true,
  isSuccess = true,
) => {
  return (useInfiniteQuery as jest.Mock).mockImplementation(({ queryFn }) => {
    queryFn({ pageParam: offset });
    return {
      data: { pages },
      isSuccess,
      isFetching,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage: jest.fn(),
    };
  });
};

describe("pokemonList: useRemotePokemonList", () => {
  const urlPicture =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
  const list = [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    },
  ];
  const data: Response = {
    count: 0,
    next: "https://pokeapi.co/api/v2/pokemon?offset=40&limit=20",
    previous: "",
    results: list,
  };

  test("should get the pokemon list with correct url", () => {
    useInfiniteQueryMock([data]);
    const queryFnSpy = jest.fn((url: string) => {
      return Promise.resolve({
        json: jest.fn().mockResolvedValue(data),
      });
    });

    const url = faker.internet.url();

    const { get } = useRemotePokemonList({
      url,
      urlPicture: "",
      queryFn: queryFnSpy,
    });

    get();

    expect(queryFnSpy).toHaveBeenCalledTimes(1);
    expect(queryFnSpy).toHaveBeenCalledWith(url + `?offset=${20}&limit=20`);
  });

  test("should get the pokemon list with success", () => {
    useInfiniteQueryMock([data]);
    const queryFn = (url: string) =>
      Promise.resolve({
        json: jest.fn().mockResolvedValue(data),
      });

    const url = faker.internet.url();
    const { get } = useRemotePokemonList({
      url,
      urlPicture,
      queryFn: queryFn as unknown as (url: string) => Promise<any>,
    });

    const pokemonList = get();

    expect(pokemonList).toEqual([
      {
        id: 1,
        name: "bulbasaur",
        picture: urlPicture + "/1.png",
      },
    ]);
  });

  test("should get empty pokemon list if isSuccess is false", () => {
    const isSuccess = false;
    useInfiniteQueryMock([data], false, false, true, isSuccess);
    const queryFnSpy = (url: string) =>
      Promise.resolve({
        json: jest.fn().mockResolvedValue(data),
      });

    const url = faker.internet.url();
    const { get } = useRemotePokemonList({
      url,
      urlPicture,
      queryFn: queryFnSpy,
    });

    const pokemonList = get();

    expect(pokemonList).toEqual([]);
  });

  test("should finding return true when isFetching or isFetchingNextPage is true", () => {
    useInfiniteQueryMock([data], true);
    const queryFnSpy = (url: string) =>
      Promise.resolve({
        json: jest.fn().mockResolvedValue(data),
      });

    const url = faker.internet.url();
    const { get, finding } = useRemotePokemonList({
      url,
      urlPicture,
      queryFn: queryFnSpy,
    });

    get();

    expect(finding()).toEqual(true);
  });

  test("should finding return false when isFetching and isFetchingNextPage are false", () => {
    useInfiniteQueryMock([data]);
    const queryFnSpy = (url: string) =>
      Promise.resolve({
        json: jest.fn().mockResolvedValue(data),
      });

    const url = faker.internet.url();
    const { get, finding } = useRemotePokemonList({
      url,
      urlPicture,
      queryFn: queryFnSpy,
    });

    get();

    expect(finding()).toEqual(false);
  });
});

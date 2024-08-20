import useRemotePokemonList from "@/src/pokemonList/data/useRemotePokemonList";
import { faker } from "@faker-js/faker";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react-native";

jest.useFakeTimers();

const makeWrapper = () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: any }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return wrapper;
};

describe("pokemonList: useRemotePokemonList", () => {
  test("should get the pokemon list with correct url", () => {
    const wrapper = makeWrapper();
    const queryFnSpy = jest
      .fn()
      .mockReturnValue({ count: 0, next: "", previous: "", results: [] });
    const url = faker.internet.url();

    const { get } = useRemotePokemonList({
      url: url,
      urlPicture: "",
      queryFn: queryFnSpy,
    });

    renderHook(() => get(), { wrapper });

    expect(queryFnSpy).toHaveBeenCalledTimes(1);
    expect(queryFnSpy).toHaveBeenCalledWith(url);
  });

  test("should get the pokemon list with success", async () => {
    const wrapper = makeWrapper();
    const list = [
      {
        name: "bulbasaur",
        url: "http://test.comhttps://pokeapi.co/api/v2/pokemon/1/",
      },
    ];
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

    const { result } = renderHook(() => get(), { wrapper });

    await waitFor(() => {
      expect(result.current).toEqual([
        {
          id: 1,
          name: "bulbasaur",
          picture:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        },
      ]);
    });
  });

  test("should get empty pokemon list", async () => {
    const wrapper = makeWrapper();
    const queryFnSpy = async () => {
      throw new Error("ocorreu um erro.");
    };

    const url = faker.internet.url();
    const { get } = useRemotePokemonList({
      url: url,
      urlPicture:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon",
      queryFn: queryFnSpy,
    });

    const { result } = renderHook(() => get(), { wrapper });

    await waitFor(() => {
      expect(result.current).toEqual([]);
    });
  });

  test("should finding return true when get is being called", async () => {
    const wrapper = makeWrapper();
    const list = [
      {
        name: "bulbasaur",
        url: "http://test.comhttps://pokeapi.co/api/v2/pokemon/1/",
      },
    ];
    const queryFnSpy = async () => {
      return { count: 0, next: "", previous: "", results: list };
    };

    const url = faker.internet.url();
    const { get, finding } = useRemotePokemonList({
      url: url,
      urlPicture:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon",
      queryFn: queryFnSpy,
    });

    renderHook(() => get(), { wrapper });

    const { result } = renderHook(() => finding(), { wrapper });

    await waitFor(() => {
      expect(result.current).toEqual(true);
    });
  });
});

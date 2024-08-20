import PokemonList from "@/src/pokemonList/domain/PokemonList";
import { faker } from "@faker-js/faker";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react-native";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: any }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

jest.useFakeTimers();

describe("pokemonList: useRemotePokemonList", () => {
  test("should get the pokemon list with correct url", () => {
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
    const { get } = useRemotePokemonList({
      url: url,
      urlPicture:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon",
      queryFn: queryFnSpy,
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
});

type Response = {
  count: number;
  next: string;
  previous: string;
  results: { name: string; url: string }[];
};

const useRemotePokemonList = ({
  url,
  urlPicture,
  queryFn,
}: {
  url: string;
  urlPicture: string;
  queryFn: (url: string) => Promise<any>;
}): PokemonList => {
  const useGet = () => {
    const { data, isSuccess } = useQuery({
      queryKey: ["remotePokemonList"],
      queryFn: () => queryFn(url),
    });

    if (isSuccess) {
      const list = (data as Response).results;
      return list.map((pokemon) => ({
        id: getId(pokemon.url),
        name: pokemon.name,
        picture: urlPicture + `/${getId(pokemon.url)}.png`,
      }));
    }

    return [];
  };

  const getId = (url: string) => {
    if (url) {
      const urlArr = url.split("pokemon/");
      return Number(urlArr[1].replace("/", ""));
    }

    return 0;
  };

  return {
    get: useGet,
    finding: () => false,
  };
};

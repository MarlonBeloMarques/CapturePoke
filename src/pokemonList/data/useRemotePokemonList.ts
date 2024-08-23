import { useInfiniteQuery } from "@tanstack/react-query";
import PokemonList from "../domain/PokemonList";

export type Response = {
  count: number;
  next: string;
  previous: string;
  results: { name: string; url: string }[];
};

const getOffset = (url: string) => {
  const urlObj = new URL(url);
  const offset = urlObj.searchParams.get("offset");
  return offset ? parseInt(offset, 10) : null;
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
  const queryFnBuilder = async ({ pageParam = 20 }) => {
    return queryFn(`${url}?offset=${pageParam}&limit=20`).then((res) =>
      res.json(),
    );
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: ["remotePokemonList"],
    queryFn: queryFnBuilder,
    initialPageParam: 20,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        return getOffset(lastPage.next);
      } else {
        return undefined;
      }
    },
  });

  const getPokemonList = () => {
    if (!isSuccess) return [];

    return data.pages.flatMap((page: Response) =>
      page.results.map((pokemon) => ({
        id: getId(pokemon.url),
        name: pokemon.name,
        picture: `${urlPicture}/${getId(pokemon.url)}.png`,
      })),
    );
  };

  const getId = (url: string) => {
    if (url) {
      const urlArr = url.split("pokemon/");
      return Number(urlArr[1].replace("/", ""));
    }
    return 0;
  };

  const finding = () => isFetching || isFetchingNextPage;

  const fetchNextList = hasNextPage ? fetchNextPage : () => {};

  return {
    get: getPokemonList,
    fetchNextList,
    finding,
  };
};

export default useRemotePokemonList;

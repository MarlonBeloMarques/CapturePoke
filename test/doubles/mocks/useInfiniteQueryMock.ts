import { Response } from "@/src/pokemonList/data/useRemotePokemonList";
import { useInfiniteQuery } from "@tanstack/react-query";

export const offset = 20;

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

export default useInfiniteQueryMock;

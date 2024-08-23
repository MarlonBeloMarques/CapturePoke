import {
  Response,
  SpeciesResponse,
} from "@/src/pokemonDetails/data/useRemotePokemonDetails";
import { useQuery } from "@tanstack/react-query";

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

export default useQueryMock;

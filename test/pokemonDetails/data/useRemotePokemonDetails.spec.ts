import PokemonDetails, {
  Details,
} from "@/src/pokemonDetails/domain/PokemonDetails";
import { faker } from "@faker-js/faker";
import { useQuery } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

type Response = {
  abilities: { ability: { name: string; url: string } }[];
  name: string;
  types: {
    type: { name: string; url: string };
  }[];
};

const useQueryMock = (data: Response, isFetching = false) => {
  return (useQuery as jest.Mock).mockImplementation(({ queryFn }) => {
    queryFn();
    return {
      data,
      isSuccess: true,
      isFetching,
    };
  });
};

describe("pokemonDetails: useRemotePokemonDetails", () => {
  const data = {
    abilities: [{ ability: { name: "", url: "" } }],
    name: "",
    types: [
      {
        type: { name: "", url: "" },
      },
    ],
  };

  test("should get the pokemon details with correct url", () => {
    useQueryMock(data);
    const queryFnSpy = jest.fn((url: string) =>
      Promise.resolve({
        json: jest.fn().mockResolvedValue(data),
      }),
    );

    const url = faker.internet.url();

    const { get } = useRemotePokemonDetails({
      url: url,
      urlPicture: "",
      queryFn: queryFnSpy,
    });

    get();

    expect(queryFnSpy).toHaveBeenCalledTimes(1);
    expect(queryFnSpy).toHaveBeenCalledWith(url);
  });
});

const useRemotePokemonDetails = ({
  url,
  urlPicture,
  queryFn,
}: {
  url: string;
  urlPicture: string;
  queryFn: (url: string) => Promise<any>;
}): PokemonDetails => {
  const useGet = (): Details => {
    useQuery({
      queryKey: ["remotePokemonDetails"],
      queryFn: () => queryFn(url).then((res) => res.json()),
    });
  };

  const finding = () => {
    return false;
  };
  return {
    get: useGet,
    finding,
  };
};

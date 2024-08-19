import { PokemonList } from "@/src/pokemonList/domain/PokemonList";
import { faker } from "@faker-js/faker";

describe("pokemonList: useRemotePokemonList", () => {
  test("should get the pokemon list with correct url", () => {
    const queryFnSpy = jest.fn();
    const url = faker.internet.url();
    const pokemonList = useRemotePokemonList({
      url: url,
      queryFn: queryFnSpy,
    });

    pokemonList.get();

    expect(queryFnSpy).toHaveBeenCalledTimes(1);
    expect(queryFnSpy).toHaveBeenCalledWith(url);
  });
});

const useRemotePokemonList = ({
  url,
  queryFn,
}: {
  url: string;
  queryFn: (url: string) => Promise<any>;
}): PokemonList => {
  const get = () => {
    queryFn(url);
    return [];
  };

  return {
    get,
    finding: () => false,
  };
};

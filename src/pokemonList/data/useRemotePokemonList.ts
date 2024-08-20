import { useQuery } from "@tanstack/react-query";
import PokemonList from "../domain/PokemonList";

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
  let isFetchingState = false;

  const useGet = () => {
    const { data, isSuccess, isFetching } = useQuery({
      queryKey: ["remotePokemonList"],
      queryFn: () => queryFn(url).then((res) => res.json()),
    });

    isFetchingState = isFetching;

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

  const finding = () => isFetchingState;

  return {
    get: useGet,
    finding,
  };
};

export default useRemotePokemonList;

import { useQuery } from "@tanstack/react-query";
import PokemonDetails, { Details } from "../domain/PokemonDetails";

export type Response = {
  id: number;
  abilities: { ability: { name: string; url: string } }[];
  name: string;
  types: {
    type: { name: string; url: string };
  }[];
};

export type SpeciesResponse = {
  name: string;
  pokemon_species: { name: string; url: string }[];
};

const useRemotePokemonDetails = ({
  url,
  urlSpecies,
  urlPicture,
  queryFn,
}: {
  url: string;
  urlPicture: string;
  urlSpecies: string;
  queryFn: (url: string) => Promise<any>;
}): PokemonDetails => {
  let isFetchingPokemonDetails = false;
  let isFetchingPokemonSpecies = false;

  const useGet = (): Details => {
    const { data, isSuccess, isFetching } = useQuery({
      queryKey: ["remotePokemonDetails"],
      queryFn: () => queryFn(url).then((res) => res.json()),
    });

    isFetchingPokemonDetails = isFetching;

    if (isSuccess) {
      const detail = data as Response;
      return {
        id: detail.id,
        name: detail.name,
        abilities: detail.abilities.map((ability) => ability.ability.name),
        picture: urlPicture + `/${detail.id}.png`,
        types: detail.types.map((type) => type.type.name),
        specie: { name: "", species: [] },
      };
    }

    return {
      id: 0,
      abilities: [],
      name: "",
      picture: "",
      specie: { name: "", species: [] },
      types: [],
    };
  };

  const useGetDetailsBuilder = (): Details => {
    const details = useGet();
    const specie = useGetSpecie(details.id || 0);

    if (details.name && details.picture && details.abilities)
      return { ...details, specie: specie };

    return details;
  };

  const useGetSpecie = (id: number): { name: string; species: string[] } => {
    const { data, isSuccess, isFetching } = useQuery({
      queryKey: ["remotePokemonSpecies"],
      queryFn: () => queryFn(urlSpecies + id).then((res) => res.json()),
    });

    isFetchingPokemonSpecies = isFetching;

    if (isSuccess) {
      const specie = data as SpeciesResponse;
      return {
        name: specie.name,
        species: specie.pokemon_species.map((specie) => specie.name),
      };
    }

    return { name: "", species: [] };
  };

  const finding = () => {
    return isFetchingPokemonDetails && isFetchingPokemonSpecies;
  };

  return {
    get: useGetDetailsBuilder,
    finding,
  };
};

export default useRemotePokemonDetails;

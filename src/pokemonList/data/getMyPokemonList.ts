import formatName from "@/src/global/helpers/formatName";
import { Pokemon } from "@/src/pokemonList/domain/PokemonList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getMyPokemonList = async (): Promise<Pokemon[]> => {
  const getId = (picture: string) => {
    if (picture) {
      const urlArr = picture.split("pokemon/");
      return Number(urlArr[1].replace("/", "").split(".png")[0]);
    }

    return 0;
  };

  const item = await AsyncStorage.getItem("my-pokemon-list");
  if (item) {
    const itemParsed = JSON.parse(item);

    const pokemonList = (itemParsed as Pokemon[]).map((pokemon) => ({
      ...pokemon,
      id: getId(pokemon.picture),
      name: formatName(pokemon.name),
    }));

    if (pokemonList) {
      return pokemonList;
    }
  }
  return [];
};

export default getMyPokemonList;

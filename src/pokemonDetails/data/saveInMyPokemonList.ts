import getMyPokemonList from "@/src/pokemonList/data/getMyPokemonList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const saveInMyPokemonList = async (
  name: string,
  picture: string,
): Promise<boolean> => {
  let list: { name: string; picture: string }[] = [];

  const myPokemonList = await getMyPokemonList();

  if (myPokemonList) {
    list = [...myPokemonList].map((pokemon) => ({
      name: pokemon.name.toLowerCase(),
      picture: pokemon.picture,
    }));
  }

  try {
    list.push({ name: name.toLowerCase(), picture });
    await AsyncStorage.setItem("my-pokemon-list", JSON.stringify(list));
    return true;
  } catch (_) {
    return false;
  }
};

export default saveInMyPokemonList;

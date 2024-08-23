import AsyncStorage from "@react-native-async-storage/async-storage";

const saveInMyPokemonList = async (
  name: string,
  picture: string,
): Promise<boolean> => {
  const list: { name: string; picture: string }[] = [];

  try {
    list.push({ name: name.toLowerCase(), picture });
    await AsyncStorage.setItem("my-pokemon-list", JSON.stringify(list));
    return true;
  } catch (_) {
    return false;
  }
};

export default saveInMyPokemonList;

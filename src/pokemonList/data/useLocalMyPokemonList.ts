import { useEffect, useState } from "react";
import PokemonList, { Pokemon } from "../domain/PokemonList";
import getMyPokemonList from "./getMyPokemonList";

const useLocalMyPokemonList = (): PokemonList => {
  const [myPokemonList, setMyPokemonList] = useState<Pokemon[]>([]);
  const [isFinding, setIsFinding] = useState(false);

  useEffect(() => {
    updateMyPokemonList();
  }, []);

  const updateMyPokemonList = async () => {
    setIsFinding(true);
    const list = await getMyPokemonList();
    setMyPokemonList(list);
    setIsFinding(false);
  };

  return {
    get: () => myPokemonList,
    finding: () => isFinding,
    fetchNextList: () => {},
  };
};

export default useLocalMyPokemonList;

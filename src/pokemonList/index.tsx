import React, { useEffect, useState } from "react";
import PokemonListView from "./PokemonList";
import usePokemonList from "./usePokemonList";
import useRemotePokemonList from "./data/useRemotePokemonList";
import useSeePokemonDetails from "./helpers/useSeePokemonDetails";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { Button } from "react-native";
import ReactNativeInputSearchBar from "react-native-input-search-bar";
import { ThemedView } from "../global/components/ThemedView";
import Url from "../global/constants/Urls";

export type RootStackParamList = {
  myPokemonList: undefined;
};

const HeaderLeft = ({
  onSubmitSearch,
}: {
  onSubmitSearch: (val: string) => void;
}) => (
  <ThemedView style={{ marginLeft: 0, width: 220 }}>
    <ReactNativeInputSearchBar
      buttonText="Search"
      onSubmitSearch={onSubmitSearch}
      onActiveSearch={() => {}}
      inputProps={{ placeholder: "Search" }}
    />
  </ThemedView>
);

const HeaderRight = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>;
}) => (
  <Button
    title="My pokemons"
    onPress={() => navigation.navigate("myPokemonList")}
  />
);

const PokemonListFactory = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const onSubmitSearch = (val: string) => {
    if (typeof val === "string") setSearchValue(val);
  };

  const { seePokemonDetails } = useSeePokemonDetails(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const pokemonList = useRemotePokemonList({
    url: Url.baseUrl,
    urlPicture: Url.urlPicture,
    pokemonSearched: searchValue,
    queryFn: fetch,
  });

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "",
      headerTransparent: true,
    });
    navigation.setOptions({
      headerLeft: () => <HeaderLeft onSubmitSearch={onSubmitSearch} />,
      headerRight: () => <HeaderRight navigation={navigation} />,
    });
  }, [navigation]);

  return (
    <PokemonListView
      {...usePokemonList({
        pokemonList: pokemonList,
        seePokemonDetails: seePokemonDetails,
      })}
    />
  );
};

export default PokemonListFactory;

import { Card } from "@/src/pokemonList/components";
import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react-native";
import { FlatList } from "react-native";

const getPokemonListFake = (length: number) => {
  const list = [];
  for (let index = 0; index < length; index++) {
    list.push({
      name: faker.word.sample(),
      picture: faker.image.url(),
    });
  }

  return list;
};

describe("PokemonList", () => {
  test("should show pokemon list correctly", () => {
    const list = getPokemonListFake(5);
    render(<PokemonList list={list} />);

    list.forEach((pokemon, index) => {
      expect(
        screen.getByText(
          pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        ),
      ).toBeTruthy();
      expect(
        screen.getAllByTestId("picture_id")[index].props.source.uri,
      ).toEqual(pokemon.picture);
    });
  });
});

type Pokemon = {
  name: string;
  picture: string;
};

type Props = {
  list: Pokemon[];
};

const PokemonList = ({ list }: Props) => {
  return (
    <FlatList
      data={list}
      renderItem={({ item }) => <Card {...item} onPress={() => {}} />}
    />
  );
};

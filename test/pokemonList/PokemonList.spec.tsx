import { faker } from "@faker-js/faker";
import PokemonList from "@/src/pokemonList/PokemonList";
import { fireEvent, render, screen } from "@testing-library/react-native";

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

const formatName = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1);

describe("PokemonList", () => {
  test("should show pokemon list correctly", () => {
    const list = getPokemonListFake(5);
    render(
      <PokemonList list={list} selectPokemon={() => {}} errorMessage="" />,
    );

    list.forEach((pokemon, index) => {
      expect(screen.getByText(formatName(pokemon.name))).toBeTruthy();
      expect(
        screen.getAllByTestId("picture_id")[index].props.source.uri,
      ).toEqual(pokemon.picture);
    });
  });

  test("should call selectPokemon function correctly when press one pokemon of list", () => {
    const selectPokemon = jest.fn();
    const list = getPokemonListFake(5);
    render(
      <PokemonList list={list} selectPokemon={selectPokemon} errorMessage="" />,
    );

    fireEvent.press(screen.getAllByTestId("card_button_id")[3]);

    expect(selectPokemon).toHaveBeenCalledTimes(1);
    expect(selectPokemon).toHaveBeenCalledWith(formatName(list[3].name));
  });

  test.each([null, undefined, []])(
    "should not show pokemon list if list is empty",
    (list) => {
      const selectPokemon = jest.fn();
      render(
        <PokemonList
          list={list!}
          selectPokemon={selectPokemon}
          errorMessage=""
        />,
      );

      expect(screen.queryByTestId("pokemon_list_id")).not.toBeTruthy();
    },
  );

  test("should show error message if errorMessage is not empty", () => {
    const selectPokemon = jest.fn();
    const errorMessage = "Parece que não encontramos nenhum pokemon.";
    render(
      <PokemonList
        list={[]}
        selectPokemon={selectPokemon}
        errorMessage={errorMessage}
      />,
    );

    expect(screen.getByText(errorMessage)).toBeTruthy();
  });

  test.each([null, undefined, ""])(
    "should not show error message if errorMessage is empty",
    () => {
      const selectPokemon = jest.fn();
      render(
        <PokemonList
          list={[]}
          selectPokemon={selectPokemon}
          errorMessage={""}
        />,
      );

      expect(screen.queryByTestId("error_message_id")).not.toBeTruthy();
    },
  );
});

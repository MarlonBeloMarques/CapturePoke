import PokemonList from "@/src/pokemonList/PokemonList";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Pokemon } from "@/src/pokemonList/PokemonListViewModel";
import getPokemonListFake from "../doubles/fakers/getPokemonListFake";
import formatName from "@/src/global/helpers/formatName";

describe("PokemonList", () => {
  test("should show pokemon list correctly", () => {
    const list = getPokemonListFake(5);
    makeSut({ list: list });

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
    makeSut({ list: list, selectPokemon });

    fireEvent.press(screen.getAllByTestId("card_button_id")[3]);

    expect(selectPokemon).toHaveBeenCalledTimes(1);
    expect(selectPokemon).toHaveBeenCalledWith(formatName(list[3].name));
  });

  test.each([null, undefined, []])(
    "should not show pokemon list if list is empty",
    (list) => {
      makeSut({ list: list! });

      expect(screen.queryByTestId("pokemon_list_id")).not.toBeTruthy();
    },
  );

  test("should only show error message if errorMessage is not empty", () => {
    const errorMessage = "Parece que não encontramos nenhum pokemon.";
    makeSut({ errorMessage });

    expect(screen.queryByTestId("pokemon_list_id")).not.toBeTruthy();
    expect(screen.getByText(errorMessage)).toBeTruthy();
  });

  test.each([null, undefined, ""])(
    "should not show error message if errorMessage is empty",
    (errorMessage) => {
      makeSut({ errorMessage: errorMessage! });

      expect(screen.queryByTestId("error_message_id")).not.toBeTruthy();
    },
  );

  test("should show the loading animation if findingPokemons is true", () => {
    const list = getPokemonListFake(1);
    makeSut({ findingPokemons: true, list });

    expect(screen.getByTestId("loading_id")).toBeTruthy();
  });

  test("should not show loading animation if findingPokemons is false", () => {
    makeSut({ findingPokemons: false });

    expect(screen.queryByTestId("loading_id")).not.toBeTruthy();
  });
});

type SutProps = {
  list?: Pokemon[];
  selectPokemon?: (name: string) => void;
  errorMessage?: string;
  findingPokemons?: boolean;
};

const makeSut = ({
  list = [],
  errorMessage = "",
  findingPokemons = false,
  selectPokemon = () => {},
}: SutProps) => {
  return render(
    <PokemonList
      list={list}
      selectPokemon={selectPokemon}
      errorMessage={errorMessage}
      findingPokemons={findingPokemons}
      fetchNextList={() => {}}
    />,
  );
};

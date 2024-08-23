import { fireEvent, render, screen } from "@testing-library/react-native";
import getNameFake from "../doubles/fakers/getNameFake";
import getPictureFake from "../doubles/fakers/getPictureFake";
import PokemonDetails from "@/src/pokemonDetails/PokemonDetails";

describe("PokemonDetails: ", () => {
  test("should show pokemon name with success", () => {
    const name = getNameFake();
    makeSut({ name });

    expect(screen.getByText(name)).toBeTruthy();
  });

  test("should not show pokemon name if its undefined", () => {
    const name = undefined;
    makeSut({ name: name! });

    expect(screen.queryByTestId("pokemon_name_id")).not.toBeTruthy();
  });

  test("should show pokemon picture with success", () => {
    const picture = getPictureFake();
    makeSut({ picture });

    expect(screen.getByTestId("pokemon_picture_id").props.source.uri).toEqual(
      picture,
    );
  });

  test("should not show pokemon picture if its undefined", () => {
    const picture = undefined;
    makeSut({ picture: picture! });

    expect(screen.queryByTestId("pokemon_picture_id")).not.toBeTruthy();
  });

  test("should show the pokemon abilities correctly", () => {
    const abilities = ["overgrow", "chlorophyll"];
    makeSut({ abilities });

    expect(screen.getByText("Abilities")).toBeTruthy();
    abilities.forEach((ability) => {
      expect(screen.getByText(ability)).toBeTruthy();
    });
  });

  test.each([null, []])(
    "should not show the pokemon abilities if abilities are empty",
    (abilities) => {
      makeSut({ abilities: abilities! });

      expect(screen.queryByText("Abilities")).not.toBeTruthy();
    },
  );

  test("should show the pokemon types correctly", () => {
    const types = ["grass", "poison"];
    makeSut({ types });

    expect(screen.getByText("Types")).toBeTruthy();
    types.forEach((type) => {
      expect(screen.getByText(type)).toBeTruthy();
    });
  });

  test.each([null, []])(
    "should not show the pokemon types if types are empty",
    (types) => {
      makeSut({ types: types! });

      expect(screen.queryByText("Abilities")).not.toBeTruthy();
    },
  );

  test("should show the pokemon species correctly", () => {
    const specie = { name: "monster", species: ["bulbasaur", "ivysaur"] };
    makeSut({ specie });

    expect(screen.getByText(`${specie.name} species`)).toBeTruthy();
    specie.species.forEach((specie) => {
      expect(screen.getByText(specie)).toBeTruthy();
    });
  });

  test.each([null, { name: "", species: [] }])(
    "should not show the pokemon species if types are empty",
    (specie) => {
      makeSut({ specie: specie! });

      expect(screen.queryByTestId("pokemon_specie_id")).not.toBeTruthy();
    },
  );

  test("should only show the loading animation if findingPokemonDetails is true", () => {
    makeSut({ findingPokemonDetails: true, name: "bulbasaur" });

    expect(screen.getByTestId("loading_id")).toBeTruthy();
    expect(screen.queryByTestId("pokemon_name_id")).not.toBeTruthy();
  });

  test("should not show loading animation if findingPokemonDetails is false", () => {
    makeSut({ findingPokemonDetails: false });

    expect(screen.queryByTestId("loading_id")).not.toBeTruthy();
  });

  test("should only show error message if errorMessage is not empty", () => {
    const errorMessage = "Parece que não encontramos os detalhes do pokemon";
    makeSut({ errorMessage });

    expect(screen.queryByTestId("pokemon_name_id")).not.toBeTruthy();
    expect(screen.getByText(errorMessage)).toBeTruthy();
  });

  test.each([null, undefined, ""])(
    "should not show error message if errorMessage is empty",
    (errorMessage) => {
      makeSut({ errorMessage: errorMessage! });

      expect(screen.queryByTestId("error_message_id")).not.toBeTruthy();
    },
  );

  test("should call the capturePokemon with success when pressing the button", () => {
    const capturePokemon = jest.fn();
    const name = getNameFake();
    const picture = getPictureFake();
    makeSut({ name, picture, capturePokemon });

    fireEvent.press(screen.getByTestId("capture_pokemon_id"));

    expect(capturePokemon).toHaveBeenCalledTimes(1);
    expect(capturePokemon).toHaveBeenCalledWith(name, picture);
  });

  test.each([{ name: "", picture: "" }, null])(
    "should not show capturePokemon button if name and picture are undefined",
    (details) => {
      makeSut({
        name: details?.name,
        picture: details?.picture,
      });

      expect(screen.queryByTestId("capture_pokemon_id")).not.toBeTruthy();
    },
  );
});

type SutProps = {
  name?: string;
  picture?: string;
  abilities?: string[];
  types?: string[];
  specie?: { name: string; species: string[] };
  findingPokemonDetails?: boolean;
  errorMessage?: string;
  capturePokemon?: (name: string, picture: string) => Promise<void>;
};

const makeSut = ({
  name = "",
  picture = "",
  abilities = [],
  types = [],
  specie = { name: "", species: [] },
  findingPokemonDetails = false,
  errorMessage = "",
  capturePokemon = async () => {},
}: SutProps) => {
  return render(
    <PokemonDetails
      name={name}
      picture={picture}
      abilities={abilities}
      specie={specie}
      types={types}
      findingPokemonDetails={findingPokemonDetails}
      errorMessage={errorMessage}
      capturePokemon={capturePokemon}
    />,
  );
};
